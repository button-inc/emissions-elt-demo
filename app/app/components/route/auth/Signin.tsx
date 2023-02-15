"use client";
import { signIn } from "next-auth/react";
import { useTranslation } from "@/i18n/client";
import Tag from "@/components/layout/Tag";
import styles from "./signin.module.css";

export default function Signin({ lng, providers }) {
  // 👇️ language management, client side
  const { t } = useTranslation(lng, "signin");
  let content = null;
  if (providers) {
    // 👇️ build provider links with onclick and callback

    /* eslint-disable @typescript-eslint/dot-notation */
    content = Object.values(providers).map((provider) => (
      <div key={provider["id"]} className={styles.provider}>
        <button
          className={styles.button}
          onClick={() =>
            signIn(provider["id"], {
              callbackUrl: window.location.host,
            })
          }
        >
          <img
            alt={provider["name"]}
            src={"https://authjs.dev/img/providers/" + provider["id"] + ".svg"}
          />
          <span>
            {t("signin")} {provider["name"]}
          </span>
        </button>
      </div>
    ));
    /* eslint-enable @typescript-eslint/dot-notation */
  }
  return (
    <>
      <Tag tag={t("label")} crumbs={[{}]}></Tag>
      <div className={styles.page}>
        <div className={styles.signin}>
          <div className={styles.card}>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </>
  );
}
