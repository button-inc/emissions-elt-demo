"use client";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/i18n/client";
import Tag from "@/components/layout/Tag";
import { crumbsHome } from "@/lib/navigation/crumbs";

export default function Page({ lng, options }) {
  // 👇️ language management
  let { t } = useTranslation(lng, "home");
  // 👇️ translate titles
  options.map((item) => {
    item.button = t(item.button);
    item.content = t(item.content);
    item.title = t(item.title);
  });
  crumbsHome.map((item) => {
    item.title = t(item.title);
  });

  // 👇️ user's next-auth session info
  const { data: session } = useSession();
  const name = session && session?.user ? session?.user.name.split(" ")[0] : "";
  const tag = t("tag") + ", " + name + "!";
  return (
    <>
      <Tag tag={tag} crumbs={crumbsHome}></Tag>
      <div className="grid gap-14 lg:grid-cols-3">
        {options.map((item, key) => (
          <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={key}>
            <div className="p-4">
              <h4 className="text-xl text-purple-800">{item.title}</h4>
              <p className="mb-2 leading-normal">{item.content}</p>
              <button className="rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300">
                <a href={item.href}>{item.button}</a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
