import React, { useEffect, useState } from 'react';

import { login } from '@api/auth';
import { setUser } from '@store/slices/auth';
import { validateLogin } from '@utils/validation/validators/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { authLinks } from '../../constants/routes';
import { ValidatorErrorsLogin } from '../../types/auth/error';
import styles from './Auth.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ### Erreurs ### //
  const [apiError, setApiError] = useState<string | null>(null);
  const [errorsForm, setErrorsForm] = useState<ValidatorErrorsLogin | null>({
    email: null,
    password: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ### Modification du titre de la page ### //
  useEffect(() => {
    document.title = 'Tash | Sign in';
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // ### Vérification du formulaire ### //
    const validationErrors = validateLogin(email, password);
    setErrorsForm(validationErrors);

    // ### Si erreur alors on abandonne ### //
    if (validationErrors !== null) {
      return;
    }

    try {
      // ### Envoi des données du formulaire ### //
      const { token, user } = await login(email, password);

      // ### Sauvegarde des données renvoyées par l'API ### //
      dispatch(setUser({ token, user }));
      navigate('/');
    } catch (error: any) {
      setApiError(error.message);
    }
  };

  return (
    <main className={styles.container_auth}>
      <img src={'/assets/images/others/connexion-bg.png'} className={styles.background} />
      <div className={styles.form_wrap}>
        <div className={styles.form_container}>
          <img className={styles.logo} src="/assets/images/others/logo-black.png" alt="logo" />

          <h1>Welcome back!</h1>

          <p className={styles.description}>
            Log in to access your account and continue where you left off. We're glad to have you
            back on Tash!
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errorsForm?.email ? styles.error_input : ''}
              required
            />
            {errorsForm?.email && <span className={styles.error_text}>{errorsForm.email}</span>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errorsForm?.password ? styles.error_input : ''}
              required
            />

            {errorsForm?.password && (
              <span className={styles.error_text}>{errorsForm.password}</span>
            )}

            <button type="submit">Sign In</button>

            {apiError && <span className={styles.error_text}>{apiError}</span>}

            <p className={styles.switch}>
              Don't have an account yet ? <Link to={authLinks.register.href}>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
