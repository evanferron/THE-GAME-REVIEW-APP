import { useEffect, useState } from 'react';

import { TaskColor, TaskPreviewProps } from '../../../../interfaces/Task/Task.interface';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import ProgressBar from '../../ProgressBar/ProgressBar';
import DifficultyTag from '../DifficultyTag/DifficultyTag';
import LinkedTaskTag from '../LinkedTask/LinkedTask';
import Tag from '../Tag/Tag';
import styles from './TaskPreview.module.scss';

const TaskPreview: React.FC<TaskPreviewProps> = ({
  id,
  title,
  description,
  isPinned,
  difficulty,
  tags,
  linkedTask,
  color,
  dueDate,
  members,
  checklistProgress,
}) => {
  const [reformatedDate, setReformatedDate] = useState<string | null>(dueDate);
  const [newIsPinned, setNewIsPinned] = useState<boolean>(isPinned);

  const reformatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    setReformatedDate(`${month}/${day}/${year}`);
  };

  const handlePin = () => {
    setNewIsPinned(!newIsPinned);
  };

  const isDueDateExpired = (): boolean => {
    if (dueDate != null) {
      return new Date(dueDate).getTime() < Date.now();
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (dueDate != null) {
      reformatDate(dueDate);
    }
  }, [dueDate]);

  return (
    <div key={id} className={styles.task_preview}>
      <span className={styles.background} style={{ background: `var(--${color})` }}></span>
      <div className={styles.header}>
        {/* Si Linked Task est présent on affiche Linked Task et Difficulty & pin en header */}
        {linkedTask ? (
          <>
            <div className={styles.linked_difficulty}>
              <LinkedTaskTag id={linkedTask.id} title={linkedTask.title} color={linkedTask.color} />
              <div className={styles.difficulty_pinned}>
                <DifficultyTag level={difficulty} />
                <button className={styles.pinned_button} onClick={handlePin}>
                  <img
                    src={`/assets/images/icons/${newIsPinned ? 'pinned' : 'not_pinned'}.png`}
                    alt="pinned button"
                  />
                </button>
              </div>
            </div>
            {tags && (
              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    id={tag.id}
                    background_color={tag.background_color}
                    name={tag.name}
                    isEditing={tag.isEditing}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.tags_difficulty}>
            {/* Sinon on affiche les tags et difficulty & pin en header */}
            {tags && (
              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    id={tag.id}
                    background_color={tag.background_color}
                    name={tag.name}
                    isEditing={tag.isEditing}
                  />
                ))}
              </div>
            )}
            <div className={styles.difficulty_pinned}>
              <DifficultyTag level={difficulty} />
              <button className={styles.pinned_button} onClick={handlePin}>
                <img
                  src={`/assets/images/icons/${newIsPinned ? 'pinned' : 'not_pinned'}.png`}
                  alt="pinned button"
                />
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Title & Description */}
      <div className={styles.title_desc}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      {/* Checklist Progress  */}
      {checklistProgress && (
        <div className={styles.progress_container}>
          <div className={styles.progress_header}>
            <div className={styles.progress_title}>
              <img src="/assets/images/icons/checklist.png" />
              <p>Progress</p>
            </div>
            <p>{checklistProgress[0] + '/' + checklistProgress[1]}</p>
          </div>
          <ProgressBar
            color={TaskColor.Purple}
            value={checklistProgress[0]}
            max={checklistProgress[1]}
          />
        </div>
      )}
      {(dueDate || members) && (
        <div className={styles.footer}>
          {/* Due date  */}
          <div className={styles.due_date}>
            <svg width="18" height="18" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5 6.75C11.4946 6.75 12.4484 7.14509 13.1517 7.84835C13.8549 8.55161 14.25 9.50544 14.25 10.5C14.25 11.4946 13.8549 12.4484 13.1517 13.1517C12.4484 13.8549 11.4946 14.25 10.5 14.25C9.50544 14.25 8.55161 13.8549 7.84835 13.1517C7.14509 12.4484 6.75 11.4946 6.75 10.5C6.75 9.50544 7.14509 8.55161 7.84835 7.84835C8.55161 7.14509 9.50544 6.75 10.5 6.75ZM9.75 0C9.94891 0 10.1397 0.0790176 10.2803 0.21967C10.421 0.360322 10.5 0.551088 10.5 0.75V1.5H12C12.3978 1.5 12.7794 1.65804 13.0607 1.93934C13.342 2.22064 13.5 2.60218 13.5 3V5.25H12V3H1.5V12H5.25V13.5H1.5C1.10218 13.5 0.720644 13.342 0.43934 13.0607C0.158035 12.7794 0 12.3978 0 12V3C0 2.60218 0.158035 2.22064 0.43934 1.93934C0.720644 1.65804 1.10218 1.5 1.5 1.5H3V0.75C3 0.551088 3.07902 0.360322 3.21967 0.21967C3.36032 0.0790176 3.55109 0 3.75 0C3.94891 0 4.13968 0.0790176 4.28033 0.21967C4.42098 0.360322 4.5 0.551088 4.5 0.75V1.5H9V0.75C9 0.551088 9.07902 0.360322 9.21967 0.21967C9.36032 0.0790176 9.55109 0 9.75 0ZM10.5 8.25C9.90326 8.25 9.33097 8.48705 8.90901 8.90901C8.48705 9.33097 8.25 9.90326 8.25 10.5C8.25 11.0967 8.48705 11.669 8.90901 12.091C9.33097 12.5129 9.90326 12.75 10.5 12.75C11.0967 12.75 11.669 12.5129 12.091 12.091C12.5129 11.669 12.75 11.0967 12.75 10.5C12.75 9.90326 12.5129 9.33097 12.091 8.90901C11.669 8.48705 11.0967 8.25 10.5 8.25ZM10.5 8.625C10.6989 8.625 10.8897 8.70402 11.0303 8.84467C11.171 8.98532 11.25 9.17609 11.25 9.375V9.75C11.4489 9.75 11.6397 9.82902 11.7803 9.96967C11.921 10.1103 12 10.3011 12 10.5C12 10.6989 11.921 10.8897 11.7803 11.0303C11.6397 11.171 11.4489 11.25 11.25 11.25H10.5C10.3011 11.25 10.1103 11.171 9.96967 11.0303C9.82902 10.8897 9.75 10.6989 9.75 10.5V9.375C9.75 9.17609 9.82902 8.98532 9.96967 8.84467C10.1103 8.70402 10.3011 8.625 10.5 8.625ZM4.125 8.25C4.31616 8.25021 4.50002 8.32341 4.63903 8.45464C4.77803 8.58586 4.86168 8.76521 4.87288 8.95605C4.88408 9.14688 4.82199 9.33478 4.6993 9.48137C4.57661 9.62796 4.40257 9.72217 4.21275 9.74475L4.125 9.75H3.75C3.55884 9.74979 3.37498 9.67659 3.23597 9.54536C3.09697 9.41414 3.01332 9.23479 3.00212 9.04395C2.99092 8.85312 3.05301 8.66522 3.1757 8.51863C3.29839 8.37204 3.47243 8.27783 3.66225 8.25525L3.75 8.25H4.125ZM6 5.25C6.19891 5.25 6.38968 5.32902 6.53033 5.46967C6.67098 5.61032 6.75 5.80109 6.75 6C6.75 6.19891 6.67098 6.38968 6.53033 6.53033C6.38968 6.67098 6.19891 6.75 6 6.75H3.75C3.55109 6.75 3.36032 6.67098 3.21967 6.53033C3.07902 6.38968 3 6.19891 3 6C3 5.80109 3.07902 5.61032 3.21967 5.46967C3.36032 5.32902 3.55109 5.25 3.75 5.25H6Z"
                fill={isDueDateExpired() ? `var(--red)` : 'none'}
              />
            </svg>
            {dueDate && (
              <p style={{ color: isDueDateExpired() ? `var(--red)` : 'black' }}>{reformatedDate}</p>
            )}
          </div>
          {/* Members  */}
          {members && (
            <div className={styles.members}>
              {/* On affiche en preview que 5 utilisateurs max */}
              {members.slice(0, 6).map((member, index) => (
                <ProfilePicture id={member.id} key={index} username={member.username} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPreview;
