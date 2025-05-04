import { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import ProfilCard from '@components/shared/ProfilCard/ProfilCard';
import useAuth from '@hooks/useAuth';
import { UserDetailsData } from '@interfaces/api/User';
import { getUserDetails } from '@api/user';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  
  const [userDetails, setUserDetails] = useState<UserDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabSelected, setTabSelected] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'The game review | 404';

    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const { data } = await getUserDetails();
        setUserDetails(data);
        
      } catch (error) {
        setError('Failed to fetch user details. Please try again later.');
        console.error('Error fetching user details:', error);
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

    // Fonction pour naviguer vers la page des paramètres du compte
    const goToAccountSettings = () => {
      navigate('/account-settings', { 
        state: { 
          email: userDetails?.email,
          pseudo: userDetails?.pseudo,
        } 
      });
    };

  return (
    <div className={styles['profile']}>
      <div className={styles['profile-container']}>
        {/* mettre la navbar */}
        {/* Profile Card */}
        <header>
          <ProfilCard
            pseudo={userDetails?.pseudo || ''}
            email={userDetails?.email || ''}
            nbrGame={userDetails?.nbrGame || 0}
            nbrReview={userDetails?.nbrReview || 0}
            profilPictureId={userDetails?.profilePictureId || 1}
            bannerPictureId={userDetails?.bannerId || 1}
          />
        </header>

        <section>
          <nav className={styles.tabs}>
            <button className={`${styles.tab} ${tabSelected === 1 ? styles.active : ''}`}
               onClick={() => setTabSelected(1) }>Collection</button>
            <button className={`${styles.tab} ${tabSelected === 2 ? styles.active : ''}`}
               onClick={() => setTabSelected(2)}>Reviews</button>
            <button className={`${styles.tab} ${tabSelected === 3 ? styles.active : ''}`}
               onClick={() => setTabSelected(3)}>Lists</button>
          </nav>
        </section>
      </div>
    </div>
    );
};

export default Profile;
