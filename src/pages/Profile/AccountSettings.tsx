import { useState } from 'react';
import styles from './AccountSettings.module.scss';
import { UserDetailsData } from '@interfaces/api/User';
import { updateUserDetails, updateUserPassword, deleteUserAccount } from '@api/user';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const location = useLocation();
  const { pseudo, email } = location.state || {};

  if (!pseudo || !email) {
    return <Navigate to="/" replace />;
  }

  const [userDetails, setUserDetails] = useState<UserDetailsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pseudoState, setPseudoState] = useState<string>(pseudo);
  const [emailState, setEmailState] = useState<string>(email);
  const [updating, setUpdating] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const navigate = useNavigate();

  const handleUpdateProfile = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUserDetails(emailState, pseudoState);
      setSuccess('Profile updated successfully.');

      if (userDetails) {
        await setUserDetails({
          ...userDetails,
          email: emailState,
          pseudo: pseudoState
        });
      }
    } catch (error) {
      setError('Error updating profile. Please try again.');
    }

    setUpdating(false);

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

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setUpdatingPassword(true);

    try {
      await updateUserPassword(newPassword);
      setSuccess('Password updated successfully.');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (error) {
      setPasswordError('Error updating password. Please try again.');
    }

    setUpdatingPassword(false);

    if (!passwordError) {
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  };

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteUserAccount();
      setSuccess('Your account has been successfully deleted.');
      navigate('/');
    } catch (error) {
      setError('Error deleting account. Please try again.');
    }

    setDeletingAccount(false);
  };

  if (error && !userDetails) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles['account-settings']}>
      <div className={styles['account-settings-container']}>
        <header className={styles.header}>
          <button className={styles.backButton} onClick={() => window.history.back()}>
            ← Back
          </button>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>Manage your personal information</p>
        </header>

        <section className={styles.section}>
          {success && <div className={styles.successMessage}>{success}</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleUpdateProfile}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={emailState}
                onChange={(e) => setEmailState(e.target.value)}
                className={styles.inputField}
                placeholder={email}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="pseudo">Username</label>
              <input
                type="text"
                id="pseudo"
                value={pseudoState}
                onChange={(e) => setPseudoState(e.target.value)}
                className={styles.inputField}
                placeholder={pseudo}
              />
            </div>

            <button
              type="submit"
              className={styles.updateButton}
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
          </form>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Password</h2>
          <p className={styles.sectionDescription}>
            Set a new password for your account
          </p>

          {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

          {!showPasswordForm ? (
            <button
              className={styles.passwordButton}
              onClick={() => setShowPasswordForm(true)}
            >
              Set a new password
            </button>
          ) : (
            <form onSubmit={handleUpdatePassword} className={styles.passwordForm}>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password</label>
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
                <label htmlFor="confirmPassword">Confirm Password</label>
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={updatingPassword}
                >
                  {updatingPassword ? 'Updating...' : 'Save'}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className={styles.dangerZone}>
          <h2 className={styles.dangerTitle}>Danger Zone</h2>
          <button
            className={styles.updateButton}
            onClick={handleDeleteAccount}
            disabled={deletingAccount}
          >
            {deletingAccount ? 'Deleting...' : 'Delete my account'}
          </button>
        </section>
      </div>
    </div>
  );
};

export default AccountSettings;