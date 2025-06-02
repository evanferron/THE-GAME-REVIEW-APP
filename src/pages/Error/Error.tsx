import { Link } from 'react-router-dom';

import { navLinks } from '../../constants/routes';
import styles from './Error.module.scss';

const ErrorPage = () => {
  return (
    <div className={styles.error_page}>
      <div className={styles.error_content}>
        <h1>404 Error</h1>
        <p>
          We couldn’t find the page you <br />
          were looking for
        </p>
        <Link to={navLinks.home.href}>Go back to Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
