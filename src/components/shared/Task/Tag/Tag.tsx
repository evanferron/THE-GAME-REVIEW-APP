import { useState } from 'react';

import { TagProps } from '../../../../types/Task/Tags/Tag.interface';
import styles from './Tag.module.scss';
import close_icon from '/assets/images/icons/close.svg';

const Tag: React.FC<TagProps> = ({ id, background_color, name, isEditing }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  function deleteTag() {
    console.log('delete', id);
  }

  return (
    <span
      style={{
        backgroundColor: `var(--${background_color}-bg`,
        color: `var(--${background_color}-text`,
        borderColor: isHovered ? `var(--${background_color}-text` : 'transparent',
      }}
      className={styles.tag}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name}
      {isEditing && <img onClick={() => deleteTag()} src={close_icon} />}
    </span>
  );
};

export default Tag;
