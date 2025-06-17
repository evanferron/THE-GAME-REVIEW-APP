import GameCard from '@components/shared/GameCard/GameCard';

import styles from './Carousel.module.scss';

interface Game {
  id: number;
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
  setGamePopup: React.Dispatch<React.SetStateAction<number | null>>;
}

const GameCarousel = ({ title, games, setGamePopup }: GameCarouselProps) => {
  return (
    <div className={styles['game-carousel']} data-testid="game-carousel">
      <section className={styles['game-carousel__header']}>
        <h2 className={styles['game-carousel__title']}>
          <span className={styles['game-carousel__title-hashtag']}>#</span>
          {title}
        </h2>
        {games.length > 5 && (
          <div className={styles['game-carousel__slider-arrow']}>
            <button className={styles['game-carousel__slider-arrow-left']}>←</button>
            <button className={styles['game-carousel__slider-arrow-right']}>→</button>
          </div>
        )}
      </section>
      <section className={styles['game-carousel__slider']}>
        <div className={styles['game-carousel__slider-track']}>
          {games.length > 5 && (
            <div className={styles['game-carousel__slider-track-inner']}>
              {games.slice(0, 5).map((game, index) => (
                <GameCard
                  id={game.id}
                  key={index}
                  title={game.title}
                  developer={game.developer}
                  imageSrc={game.imageSrc}
                  score={game.score}
                  userScore={game.userScore}
                  setGamePopup={setGamePopup}
                />
              ))}
            </div>
          )}
        </div>
        {games.length <= 5 && (
          <div className={styles['game-carousel__slider-track-inner']}>
            {games.map((game, index) => (
              <GameCard
                id={game.id}
                key={index}
                title={game.title}
                developer={game.developer}
                imageSrc={game.imageSrc}
                score={game.score}
                userScore={game.userScore}
                setGamePopup={setGamePopup}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default GameCarousel;
