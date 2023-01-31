import { useTranslation } from "@/i18n/client";
import { fallbackLng } from "@/i18n/settings";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  // 👇️ vars for language management
  const lng = fallbackLng;
  const { t } = useTranslation(lng, "header");
  // 👇️ link management
  const options = [{ title: t("help"), href: "/help" }];
  const signout = { title: t("signout"), href: "/api/auth/signout" };
  return (
    <>
      <header className="site-header">
        <div className="wrapper site-header__wrapper">
          <span className="logo"></span>
          <div className="brand">
            <h2>{t("title")}</h2>
          </div>
          <nav className="nav menu">
            <ul>
              {options.map((option) => (
                <li key={option.title}>
                  <a onClick={() => signOut()}>{option.title}</a>
                </li>
              ))}

              {session && session.user && (
                <>
                  <li key={signout.title}>
                    <a href={signout.href}>{signout.title}</a>
                  </li>
                  {session.user.image && (
                    <span
                      style={{
                        backgroundImage: `url('${session.user.image}')`,
                      }}
                      className="avatar"
                    />
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <style jsx>
        {`
          .site-header {
            height: 70px;
            padding: 0 1.2rem 0 0;
            background-color: #4b286d;
            font-size: 0.8rem;
            color: #fff;
          }
          .site-header__wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo {
            flex: 1;
          }
          img {
            width: 0px;
          }
          .brand {
            flex: 1;
          }
          .menu ul {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: row;
            -ms-flex-direction: row;
            flex-direction: row;
            margin: 0;
            list-style: none;
          }
          .menu ul li {
            margin-top: 1.5rem;
            font-weight: bold;
          }
          .menu ul li a {
            display: flex;
            font-size: 1em;
            font-weight: bold;
            color: #fff;
            padding: 0 15px 0 15px;
            -webkit-text-decoration: none;
            text-decoration: none;
            border-right: 1px solid #9b9b9b;
          }
          .avatar {
            border-radius: 2rem;
            float: left;
            margin-top: 1rem;
            margin-left: 0.4rem;
            height: 2rem;
            width: 2rem;
            background-color: white;
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style>
    </>
  );
}
