import Image from "next/image";
import { useRouter } from "next/router";
import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "./SignInButton";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="ig.news" width={100} height={100} />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            Home
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            Posts
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
