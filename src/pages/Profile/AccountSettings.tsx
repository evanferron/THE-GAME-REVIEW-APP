import { useState } from 'react';
import styles from './AccountSettings.module.scss';
import { UserDetailsData } from '@interfaces/api/User';
import { updateUserDetails, updateUserPassword } from '@api/user';
import { Navigate, useLocation } from 'react-router-dom';


const AccountSettings = () => {
  // récupérer les données de l'utilisateur depuis le state de la route
  const location = useLocation();
  const { pseudo, email } = location.state || {};

  if (!pseudo || !email) {
    return <Navigate to="/" replace />;
  }

  const [userDetails, setUserDetails] = useState<UserDetailsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Formulaire pour les informations de base
  const [updating, setUpdating] = useState(false);
  
  // État pour le changement de mot de passe
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handleUpdateProfile = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccess(null);
    
    try {
      await updateUserDetails(email, pseudo);
      setSuccess('Informations mises à jour avec succès');
      
      // Mettre à jour les détails locaux
      if (userDetails) {
        await setUserDetails({
          ...userDetails,
          email,
          pseudo
        });
      }
    } catch (error) {
      setError('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
      console.error('Erreur de mise à jour du profil:', error);
    }
    
    setUpdating(false);
    
    // Effacer le message de succès après 3 secondes
    if (!error) {
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  };

  const handleUpdatePassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setPasswordError(null);
    setSuccess(null);
    
    // Validation des mots de passe
    if (newPassword.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }
    
    setUpdatingPassword(true);
    
    try {
      await updateUserPassword(newPassword);
      setSuccess('Mot de passe mis à jour avec succès');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (error) {
      setPasswordError('Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.');
      console.error('Erreur de mise à jour du mot de passe:', error);
    }
    
    setUpdatingPassword(false);
    
    // Effacer le message de succès après 3 secondes
    if (!passwordError) {
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  };

  if (error && !userDetails) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles['account-settings']}>
      <div className={styles['account-settings-container']}>
        <header className={styles.header}>
          <button className={styles.backButton} onClick={() => window.history.back()}>
            ← Retour
          </button>
          <h1 className={styles.title}>Paramètres du compte</h1>
          <p className={styles.subtitle}>Gérez vos informations personnelles</p>
        </header>

        <section className={styles.section}>
          {success && <div className={styles.successMessage}>{success}</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <form onSubmit={handleUpdateProfile}>
            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                className={styles.inputField}
                placeholder={email}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="pseudo">Pseudo</label>
              <input
                type="text"
                id="pseudo"
                value={pseudo}
                className={styles.inputField}
                placeholder={pseudo}
              />
            </div>

            <button 
              type="submit" 
              className={styles.updateButton}
              disabled={updating}
            >
              {updating ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
          </form>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Mot de passe</h2>
          <p className={styles.sectionDescription}>
            Définissez un nouveau mot de passe pour votre compte
          </p>

          {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

          {!showPasswordForm ? (
            <button 
              className={styles.passwordButton}
              onClick={() => setShowPasswordForm(true)}
            >
              Définir un nouveau mot de passe
            </button>
          ) : (
            <form onSubmit={handleUpdatePassword} className={styles.passwordForm}>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.buttonGroup}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowPasswordForm(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordError(null);
                  }}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className={styles.saveButton}
                  disabled={updatingPassword}
                >
                  {updatingPassword ? 'Mise à jour...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className={styles.dangerZone}>
          <h2 className={styles.dangerTitle}>Zone dangereuse</h2>
          {/* Vous pouvez ajouter ici des options comme supprimer le compte */}
        </section>
      </div>
    </div>
  );
};

export default AccountSettings;