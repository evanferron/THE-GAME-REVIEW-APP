import { useState } from 'react';

import { difficultyLevels } from '../../../../constants/TASK_DIFFICULTIES';
import { DifficultyTagProps } from '../../../../interfaces/Task/Tags/Tag.interface';
import styles from './DifficultyTag.module.scss';

const DifficultyTag: React.FC<DifficultyTagProps> = ({ level }) => {
  const difficulty = difficultyLevels[Math.min(Math.max(level, 0), 5)];
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    difficulty && (
      <span
        className={styles.difficulty_tag}
        style={{
          color: `var(--${difficulty.label}-text)`,
          backgroundColor: `var(--${difficulty.label}-bg)`,
          borderColor: isHovered ? `var(--${difficulty.label}-text)` : 'transparent',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {difficulty.label.toUpperCase()}
      </span>
    )
  );
};

export default DifficultyTag;
