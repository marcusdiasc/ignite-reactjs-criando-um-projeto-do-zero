import Link from 'next/link';
import commonstyles from './../../styles/common.module.scss';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={commonstyles.container}>
      <header className={styles.header}>
        <Link href="/">
          <img src="/Logo.svg" alt="logo" />
        </Link>
      </header>
    </div>
  );
}
