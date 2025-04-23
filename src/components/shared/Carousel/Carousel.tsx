import GameCard from '@components/shared/GameCard/GameCard';

import './Carousel.scss';

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
    <div className="game-carousel">
      <h2 className="game-carousel__title">
        <span className="game-carousel__title-hashtag">#</span>
        {title}
      </h2>
      <section className="game-carousel__slider">
        {games.map((game) => (
          <GameCard
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
