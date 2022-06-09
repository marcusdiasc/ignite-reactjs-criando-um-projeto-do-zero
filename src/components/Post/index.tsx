import Link from 'next/link';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import styles from './post.module.scss';
import commonStyles from '../../styles/common.module.scss';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

type Post = {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
};

interface PostProps {
  post: Post;
}

export default function Post({
  post: { uid, first_publication_date, data },
}: PostProps) {
  return (
    <Link href={`/post/${uid}`}>
      <a className={styles.post}>
        <h2>{data.title}</h2>
        <h3>{data.subtitle}</h3>
        <div>
          <time>
            <FiCalendar className={commonStyles.icon} />
            {format(new Date(first_publication_date), 'd MMM yyyy', {
              locale: ptBR,
            })}
          </time>
          <p>
            <FiUser className={commonStyles.icon} />
            {data.author}
          </p>
        </div>
      </a>
    </Link>
  );
}
