import { useState } from 'react';

import { Link } from 'react-router-dom';

import { LinkedTaskProps, TaskColor } from '../../../../types/Task/Task.interface';
import styles from './LinkedTask.module.scss';
import close_icon from '/assets/images/icons/close.svg';

const LinkedTaskTag: React.FC<LinkedTaskProps> = ({ id, title, color, isEditing }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  function deleteTag() {
    console.log('delete', id);
  }
  return (
    <Link to={'/' + id}>
      <span
        style={{
          backgroundColor: `var(--${color}`,
          color: `black`,
          borderColor: isHovered ? `black` : 'transparent',
        }}
        className={styles.linked_tag}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <TaskIcon color={color} />
        <p>{title}</p>
        {isEditing && (
          <img className={styles.close_icon} onClick={() => deleteTag()} src={close_icon} />
        )}
      </span>
    </Link>
  );
};

export default LinkedTaskTag;

interface TaskIconProps {
  color: TaskColor;
}

const TaskIcon: React.FC<TaskIconProps> = ({ color }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.task_icon}
  >
    <g clip-path="url(#clip0_506_11204)">
      <path
        d="M5.59984 2.9561C5.41631 3.37662 5.32188 3.8306 5.32251 4.28943C5.32251 4.64305 5.46299 4.98219 5.71303 5.23224C5.96308 5.48229 6.30222 5.62276 6.65584 5.62276H10.6558C11.0095 5.62276 11.3486 5.48229 11.5987 5.23224C11.8487 4.98219 11.9892 4.64305 11.9892 4.28943C11.9892 3.81543 11.8905 3.3641 11.7118 2.9561H12.6558C13.0095 2.9561 13.3486 3.09657 13.5987 3.34662C13.8487 3.59667 13.9892 3.93581 13.9892 4.28943V14.2894C13.9892 14.6431 13.8487 14.9822 13.5987 15.2322C13.3486 15.4823 13.0095 15.6228 12.6558 15.6228H4.65584C4.30222 15.6228 3.96308 15.4823 3.71303 15.2322C3.46299 14.9822 3.32251 14.6431 3.32251 14.2894V4.28943C3.32251 3.93581 3.46299 3.59667 3.71303 3.34662C3.96308 3.09657 4.30222 2.9561 4.65584 2.9561H5.59984ZM8.65584 10.2894H6.65584C6.47903 10.2894 6.30946 10.3597 6.18444 10.4847C6.05941 10.6097 5.98918 10.7793 5.98918 10.9561C5.98918 11.1329 6.05941 11.3025 6.18444 11.4275C6.30946 11.5525 6.47903 11.6228 6.65584 11.6228H8.65584C8.83265 11.6228 9.00222 11.5525 9.12725 11.4275C9.25227 11.3025 9.32251 11.1329 9.32251 10.9561C9.32251 10.7793 9.25227 10.6097 9.12725 10.4847C9.00222 10.3597 8.83265 10.2894 8.65584 10.2894ZM10.6558 7.62276H6.65584C6.48592 7.62295 6.32249 7.68802 6.19893 7.80466C6.07537 7.92131 6.00102 8.08073 5.99106 8.25036C5.9811 8.41999 6.03629 8.58702 6.14535 8.71732C6.25441 8.84762 6.40911 8.93136 6.57784 8.95143L6.65584 8.9561H10.6558C10.8327 8.9561 11.0022 8.88586 11.1272 8.76084C11.2523 8.63581 11.3225 8.46624 11.3225 8.28943C11.3225 8.11262 11.2523 7.94305 11.1272 7.81803C11.0022 7.693 10.8327 7.62276 10.6558 7.62276ZM8.65584 2.28943C8.9373 2.28902 9.21565 2.34821 9.47258 2.46312C9.7295 2.57802 9.95919 2.74603 10.1465 2.9561C10.4318 3.27476 10.6158 3.68476 10.6498 4.13743L10.6558 4.28943H6.65584C6.65584 3.8061 6.82718 3.36276 7.11251 3.01743L7.16518 2.9561C7.53184 2.54676 8.06384 2.28943 8.65584 2.28943Z"
        fill={`var(--${color}-text)`}
      />
    </g>
    <defs>
      <clipPath id="clip0_506_11204">
        <rect width="16" height="16" fill="white" transform="translate(0.655762 0.956055)" />
      </clipPath>
    </defs>
  </svg>
);
