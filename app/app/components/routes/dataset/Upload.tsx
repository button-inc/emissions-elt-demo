"use client";
import { useTranslation } from "@/i18n/client";
import Tag from "@/components/layout/Tag";
import { crumbsDatasetAdd } from "@/lib/navigation/crumbs";

export default function Page({ lng }) {
  // 👇️ language management
  const { t } = useTranslation(lng, "upload");
  crumbsDatasetAdd.map((item) => {
    item.title = t(item.title);
  });

  // 👇️ handler for click: request a new connection
  const handleClickRequest = () => {
    const emailTo = t("emailTo");
    const emailSubject = t("emailSubject");
    const emailBody = t("emailBody");
    window.open(
      "mailto:" + emailTo + "?subject=" + emailSubject + "&body=" + emailBody,
      "_blank"
    );
  };
  // 👇️ handler for click file input
  const handleClickFileInput = async (param) => {
    let text = "";
    switch (param) {
      case "?TODO-BASED-ON-PARAM?":
        break;
      default:
        document.getElementById("fileInput").click();
        break;
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
    }
  };
  // 👇️ handler for file upload
  const handleFileUpload = async (param) => {
    console.error("to upload, and beyond" + param);
  };

  return (
    <>
      <Tag tag={t("tag")} crumbs={crumbsDatasetAdd}></Tag>
      <div className="cards">
        <div className="card" onClick={handleClickRequest}>
          <div className="top1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2997/2997933.png"
              alt="material ui"
            />
          </div>
          <div className="bottom">
            <p>{t("request")}</p>
          </div>
        </div>

        <div className="card" onClick={() => handleClickFileInput("csv")}>
          <div className="top">
            <img
              alt={t("csv")}
              src="https://cdn-icons-png.flaticon.com/512/6133/6133884.png"
            />
          </div>
          <div className="bottom">
            <p>{t("csv")}</p>
          </div>
        </div>
        <div className="card" onClick={() => handleClickFileInput("tableau")}>
          <div className="top">
            <img
              alt={t("google")}
              src="https://lh3.ggpht.com/e3oZddUHSC6EcnxC80rl_6HbY94sM63dn6KrEXJ-C4GIUN-t1XM0uYA_WUwyhbIHmVMH=w300"
            />
          </div>
          <div className="bottom">
            <p>{t("google")}</p>
          </div>
        </div>
        <div className="card" onClick={() => handleClickFileInput("powerbi")}>
          <div className="top">
            <img
              alt={t("json")}
              src="https://www.drupal.org/files/project-images/Logo_2.png"
            />
          </div>
          <div className="bottom">
            <p>{t("json")}</p>
          </div>
        </div>
      </div>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <style jsx>
        {`
          .cards {
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          .card {
            background: #fff;
            border-radius: 3px;
            display: inline-block;
            height: 300px;
            margin: 1rem;
            position: relative;
            width: 290px;
            overflow: hidden;
          }

          .card .top,
          .card .top1 {
            display: inline-flex;
            width: 100%;
            height: 220px;
            overflow: hidden;
            justify-content: center;
          }

          .card .top img {
            height: 220px;
          }
          .card .top1 img {
            margin-top: 60px;
          }

          .card .bottom {
            min-height: 80px;
            width: 100%;
          }

          .card .bottom p {
            text-align: center;
            height: 80px;
            width: 100%;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            padding-left: 20px;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #444;
            font-size: 18px;
            font-weight: 900;
          }

          .card {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
              0 1px 2px rgba(0, 0, 0, 0.24);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          .card:hover {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
              0 10px 10px rgba(0, 0, 0, 0.22);
            cursor: pointer;
          }

          .modal {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30%;

            background-color: white;
            padding: 6rem;
            border-radius: 5px;
            box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
            z-index: 10;
          }

          .closemodal {
            position: absolute;
            top: 1.2rem;
            right: 2rem;
            font-size: 5rem;
            color: #333;
            cursor: pointer;
            border: none;
            background: none;
          }
        `}
      </style>
    </>
  );
}
