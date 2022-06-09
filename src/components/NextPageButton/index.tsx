import Link from 'next/link';
import styles from './next-page-button.module.scss';

interface NextPageButtonProps {
  fetchPosts: () => void;
}

export default function NextPageButton({ fetchPosts }: NextPageButtonProps) {
  return (
    <a onClick={fetchPosts} className={styles.nextPageButton}>
      Carregar mais posts
    </a>
  );
}
