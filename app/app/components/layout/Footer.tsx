"use client";
import { useTranslation } from "@/i18n/client";
import { fallbackLng } from "@/i18n/settings";

export default function Footer() {
  // 👇️ vars for language management
  const lng = fallbackLng;
  const { t } = useTranslation(lng, "footer");
  // 👇️ link management
  const options = [
    { title: t("home"), href: "/" },
    {
      title: t("disclaimer"),
      href: "#",
    },
    {
      title: t("privacy"),
      href: "#",
    },
    {
      title: t("accessibility"),
      href: "#",
    },
    {
      title: t("copyright"),
      href: "#",
    },
  ];
  return (
    <>
      <footer>
        <nav className="pg-menu-container">
          <div className="pg-menu-item menu">
            <ul>
              {options.map((option) => (
                <li key={option.title}>
                  <a href={option.href}>{option.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </footer>
      <style jsx>
        {`
          nav {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            height: 50px;
            padding: 0 1.2rem 0 0;
            background-color: #4b286d;
            font-size: 0.8rem;
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
            color: #000;
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
        `}
      </style>
    </>
  );
}
