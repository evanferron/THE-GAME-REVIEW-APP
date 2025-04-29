import GameCarousel from '@components/shared/Carousel/Carousel';
import LittleGameList from '@components/shared/ListeLittleCards/ListLittleCards';

import styles from './Home.module.scss';
import ProfilCard from '@components/shared/ProfilCard/ProfilCard';

const Home = () => {
  const bestRatedGames = [
    {
      title: 'Space Marine 2',
      developer: 'Saber Interactive',
      imageSrc: '../../../public/assets/pictures/Test.png',
    },
    {
      title: 'Sekiro: Shadows Die Twice',
      developer: 'FromSoftware',
      imageSrc: '/7d767f50-6086-48a7-af35-8e1407c408b0.png',
    },
    {
      title: 'Cyberpunk 2077',
      developer: 'CD Projekt RED',
      imageSrc: '/path-to-cyberpunk.png',
    },
    {
      title: 'S.T.A.L.K.E.R. 2 : Heart Of Chornobyl',
      developer: 'GSC Game World',
      imageSrc: '/path-to-stalker2.png',
    },
    {
      title: 'Doom Eternal',
      developer: 'id Software',
      imageSrc: '/path-to-doom-eternal.png',
    },
  ];

  const mostPlayedGames = [
    {
      title: 'Ghost of Tsushima',
      developer: 'Sucker Punch Productions',
      imageSrc: '/path-to-ghost.png',
    },
    {
      title: "Baldur's Gate 3",
      developer: 'Larian Studios',
      imageSrc: '/path-to-baldurs.png',
    },
    {
      title: 'Red Dead Redemption II',
      developer: 'Rockstar Games',
      imageSrc: '/path-to-rdr2.png',
    },
    {
      title: 'Metro Exodus',
      developer: '4A Games',
      imageSrc: '/path-to-metro.png',
    },
    {
      title: 'Katana Zero',
      developer: 'Askiisoft',
      imageSrc: '/path-to-katana.png',
    },
  ];

  const mostReviewedGames = [
    {
      title: 'The Witcher 3',
      developer: 'CD Projekt RED',
      imageSrc: '/path-to-witcher3.png',
    },
    {
      title: 'Horizon Forbidden West',
      developer: 'Guerrilla Games',
      imageSrc: '/path-to-horizon.png',
    },
    {
      title: 'Star Wars : Jedi Fallen Order',
      developer: 'Respawn Entertainment',
      imageSrc: '/path-to-jedi.png',
    },
    {
      title: 'Ghostrunner',
      developer: 'Slipgate Ironworks',
      imageSrc: '/path-to-ghostrunner.png',
    },
    {
      title: 'Atomic Heart',
      developer: 'Mundfish',
      imageSrc: '/path-to-atomic.png',
    },
  ];

  const games = [
    {
      title: 'Star Wars Squadrons',
      developer: 'Motive Studios',
      imageSrc: '../../../public/assets/pictures/Test.png',
      score: 7.4,
      userScore: 8.2,
    },
    {
      title: 'Horizon Forbidden West',
      developer: 'Guerrilla Games',
      imageSrc: '../../../public/assets/pictures/Test.png',
      score: 8.6,
    },
    {
      title: 'Doom Eternal',
      developer: 'id Software',
      imageSrc: '../../../public/assets/pictures/Test.png',
      score: 8.5,
    },
    {
      title: 'Ghostrunner',
      developer: 'Slipgate Ironworks',
      imageSrc: '../../../public/assets/pictures/Test.png',
      score: 7.8,
    },
    {
      title: 'Enter The Gungeon',
      developer: 'Dodge Roll',
      imageSrc: '../../../public/assets/pictures/Test.png',
      score: 7.7,
    },
  ];

  return (
    <div className={styles['home']}>
      <GameCarousel title="Les jeux" games={games} />
      <div className={styles['home__lists']}>
        <LittleGameList title="Les mieux notés" games={bestRatedGames} />
        <LittleGameList title="Les plus joués" games={mostPlayedGames} />
        <LittleGameList title="Les plus critiqués" games={mostReviewedGames} />
      </div>
    </div>
  );
};

export default Home;
