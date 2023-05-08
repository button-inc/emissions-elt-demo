"use client";
import { Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";

import { useTranslation } from "@/i18n/client";
import { usePathname } from "next/navigation";
export default function Header() {
  // 👇️ session based UX management
  const { data: session } = useSession();

  const lng = usePathname().split("/")[1];
  // 👇️ language management, client side
  const { t } = useTranslation(lng, "header");

  return (
    <>
      <nav className="flex py-4 px-6 border-b border-gray-200">
        <img
          src="https://uploads-ssl.webflow.com/63c84d3cdae940284f6ec702/63dddcdc6bf1b1d128596b54_ClimateTrax.png"
          loading="lazy"
          alt="logo that says climatetrax in purple and green"
          className="logoImg"
        />
        <div className="ml-auto z-2000">
          <div className="flex items-center justify-center">
            <div className="relative inline-block text-left">
              <Menu>
                {({ open }) => (
                  <>
                    <span className="rounded-md shadow-sm">
                      <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-purple-800 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                        <div id="menuToggle">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <svg
                          className="w-5 h-5 ml-2 -mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Menu.Button>
                    </span>

                    <Transition
                      show={open}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                      >
                        {session?.user && (
                          <div className="px-4 py-3">
                            <p className="text-sm leading-5"> {t("signin")} </p>
                            <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                              {session.user.email} - {session.user.role}
                            </p>
                          </div>
                        )}
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                Home
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/analyst/dataset/available"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                Available datasets
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/analyst/imported"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                Anonymize a dataset
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/analyst/anonymized"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                Anonymized datasets
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/analyst/insight"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                Data Insights
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/analyst/analytic"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                Data Analytics
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                        {session?.user && (
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/api/auth/signout"
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  {t("signout")}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        )}
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </nav>
      <style jsx>
        {`
          .logoImg {
            max-width: 20%;
          }
          #menuToggle span {
            display: block;
            width: 33px;
            height: 4px;
            margin-bottom: 5px;
            position: relative;
            background: #cdcdcd;
            border-radius: 3px;
            z-index: 1;
            transform-origin: 4px 0px;
            transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
              background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
              opacity 0.55s ease;
          }
        `}
      </style>
    </>
  );
}
