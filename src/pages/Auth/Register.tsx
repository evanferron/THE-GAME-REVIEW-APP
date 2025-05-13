import React, { useEffect, useState } from 'react';

import { register } from '@api/auth';
import { setUser } from '@store/slices/auth';
import { validateRegister } from '@utils/validation/validators/auth';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { authLinks } from '../../constants/routes';
import { ValidatorErrorsRegister } from '../../interfaces/errors/Auth';
import styles from './Auth.module.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pseudo, setpseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  // ### Erreurs ### //
  const [apiError, setApiError] = useState<string | null>(null);
  const [errorsForm, setErrorsForm] = useState<ValidatorErrorsRegister | null>({
    email: null,
    pseudo: null,
    password: null,
  });

  const navigate = useNavigate();

  // ### Modification du titre de la page ### //
  useEffect(() => {
    document.title = 'The Game Review - Sign up';
  });

  const goHome = () => {
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // ### Vérification du formulaire ### //
    const validationErrors = validateRegister(email, pseudo, password, confirmPassword);
    setErrorsForm(validationErrors);
    // ### Si erreur alors on abandonne ### //
    if (validationErrors != null) {
      return;
    }

    try {
      // ### Envoi des données du formulaire ### //
      const { success, message, token, user } = await register(
        email,
        pseudo,
        password,
        confirmPassword
      );
      if (!success) {
        setApiError(message);
        return;
      }

      dispatch(setUser({ token, user }));
      navigate('/');
    } catch (error: any) {
      setApiError(error.message);
    }
  };

  return (
    <main className={styles.container_auth}>
      <section className={styles.section_auth}>
        <div className={styles.form_wrap}>
          <button className={styles.back_button} onClick={goHome}>
            <FaArrowLeft style={{ marginRight: '8px' }} />
            Retour
          </button>
          <div className={styles.form_container}>
            <h1>Create an account !</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.form_block_input}>
                <label>
                  Email<span className={styles.required_input}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errorsForm?.email ? styles.error_input : ''}
                />
                {errorsForm?.email && <span className={styles.error_text}>{errorsForm.email}</span>}
              </div>
              <div className={styles.form_block_input}>
                <label>
                  Mot de passe<span className={styles.required_input}>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errorsForm?.password ? styles.error_input : ''}
                />
                {errorsForm?.password && (
                  <span className={styles.error_text}>{errorsForm.password}</span>
                )}
              </div>
              <div className={styles.form_block_input}>
                <label>
                  Confirmer le mot de passe<span className={styles.required_input}>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={errorsForm?.password ? styles.error_input : ''}
                />
                {errorsForm?.password && (
                  <span className={styles.error_text}>{errorsForm.password}</span>
                )}
              </div>
              <div className={styles.form_block_input}>
                <label>
                  Pseudonyme<span className={styles.required_input}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your nickname"
                  value={pseudo}
                  onChange={(e) => setpseudo(e.target.value)}
                  className={errorsForm?.pseudo ? styles.error_input : ''}
                />

                {errorsForm?.pseudo && (
                  <span className={styles.error_text}>{errorsForm.pseudo}</span>
                )}
              </div>
              <button type="submit">Register</button>
              {apiError && <span className={styles.error_text}>{apiError}</span>}
              <p className={styles.switch}>
                already have an account ? <Link to={authLinks.login.href}>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      <section className={styles.section_auth}>
        <img
          src={'/assets/pictures/form_illustration.svg'}
          className={styles.form_illustration}
          alt="form_illustration"
        />
      </section>
    </main>
  );
};

export default Register;
