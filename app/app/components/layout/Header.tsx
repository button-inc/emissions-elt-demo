import { useTranslation } from "@/i18n/client";
import { fallbackLng } from "@/i18n/settings";
import { Header } from "@button-inc/button-theme";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./header.module.css";

export default function HeaderCT() {
  const { data: session } = useSession();
  // 👇️ vars for language management
  const lng = fallbackLng;
  const { t } = useTranslation(lng, "header");
  // 👇️ link management
  const options = [{ title: t("help"), href: "/help" }];
  const signin = { title: t("signin"), href: "/api/auth/signin" };
  const signout = { title: t("signout"), href: "/api/auth/signout" };
  return (
    <>
      <Header>
        <ul>
          {options.map((option) => (
            <li key={option.title}>
              <Link href={option.href}>{option.title}</Link>
            </li>
          ))}
          {!session && (
            <>
              <li key={signin.title}>
                <Link href={signin.href}>{signin.title}</Link>
              </li>
            </>
          )}
          {session?.user && (
            <>
              <li key={signout.title}>
                <Link href={signout.href}>{signout.title}</Link>
              </li>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
            </>
          )}
        </ul>
      </Header>
    </>
  );
}
