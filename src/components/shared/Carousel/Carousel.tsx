import GameCard from '@components/shared/GameCard/GameCard';

import styles from './Carousel.module.scss';

interface Game {
  title: string;
  developer: string;
  imageSrc: string;
  score: number;
  userScore?: number | null;
  status?: string | null;
}

interface GameCarouselProps {
  title: string;
  games: Game[];
}

const GameCarousel = ({ title, games }: GameCarouselProps) => {
  return (
    <div className={styles['game-carousel']}>
      <h2 className={styles['game-carousel__title']}>
        <span className={styles['game-carousel__title-hashtag']}>#</span>
        {title}
      </h2>
      <section className={styles['game-carousel__slider']}>
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            developer={game.developer}
            imageSrc={game.imageSrc}
            score={game.score}
            userScore={game.userScore}
          />
        ))}
      </section>
    </div>
  );
};

export default GameCarousel;
