import React, { useEffect, useState } from 'react';

import { login } from '@api/auth';
import { setUser } from '@store/slices/auth';
import { validateLogin } from '@utils/validation/validators/auth';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { authLinks } from '../../constants/routes';
import { ValidatorErrorsLogin } from '../../interfaces/errors/Auth';
import styles from './Auth.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ### Errors ### //
  const [apiError, setApiError] = useState<string | null>(null);
  const [errorsForm, setErrorsForm] = useState<ValidatorErrorsLogin | null>({
    email: null,
    password: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ### Update page title ### //
  useEffect(() => {
    document.title = 'The Game Review - Sign in';
  });

  const goHome = () => {
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit called'); // Check if this line appears
    e.preventDefault();
    setApiError(null);

    // ### Form validation ### //
    const validationErrors = validateLogin(email, password);
    setErrorsForm(validationErrors);

    // ### Abort if there are errors ### //
    if (validationErrors !== null) {
      return;
    }

    try {
      // ### Send form data ### //
      const { success, message, user, token } = await login(email, password);

      // ### Save API response data ### //
      if (!success) {
        setApiError('Incorrect email or password');
        return;
      }
      navigate('/');
    } catch (error: any) {
      setApiError(error.message);
    }
  };

  return (
    <main className={styles.container_auth}>
      <section className={styles.section_auth}>
        <div className={styles.form_wrap}>
          <button type="button" className={styles.back_button} onClick={goHome}>
            <FaArrowLeft style={{ marginRight: '8px' }} />
            Back
          </button>
          <div className={styles.form_container}>
            <h1>Log in!</h1>

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
                  required
                />
                {errorsForm?.email && <span className={styles.error_text}>{errorsForm.email}</span>}
              </div>
              <div className={styles.form_block_input}>
                <label>
                  Password<span className={styles.required_input}>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errorsForm?.password ? styles.error_input : ''}
                  required
                />
                {errorsForm?.password && (
                  <span className={styles.error_text}>{errorsForm.password}</span>
                )}
              </div>
              <button type="submit">Sign in</button>
              {apiError && <span className={styles.error_text}>{apiError}</span>}

              <p className={styles.switch}>
                Don't have an account yet? <Link to={authLinks.register.href}>Register</Link>
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

export default Login;