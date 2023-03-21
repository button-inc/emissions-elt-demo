"use client";
import { useTranslation } from "@/i18n/client";
import Tag from "@/components/layout/Tag";
import { crumbsDatasetAdd } from "@/lib/navigation/crumbs";

export default function Page({ lng }) {
  // 👇️ language management
  const { t } = useTranslation(lng, "dataset");
  crumbsDatasetAdd.map((item) => {
    item.title = t(item.title);
  });

  // 👇️ handler for click: request a new connection
  const handleClickRequest = () => {
    const emailTo = t("add.emailTo");
    const emailSubject = t("add.emailSubject");
    const emailBody = t("add.emailBody");
    window.open(
      "mailto:" + emailTo + "?subject=" + emailSubject + "&body=" + emailBody,
      "_blank"
    );
  };
  // 👇️ handler for click Add dataset tiles...
  const handleClickInputFile = () => {
    // 👇️ display select file prompt
    const inputFile = document.getElementById("inputfile");
    if (inputFile) {
      inputFile.click();
    }
  };
  // 👇️ handler for file input change
  const handleChangeInputFile = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file) {
        // 👇️ post form data with image to api
        const body = new FormData();
        body.append("file", file);
        await fetch("/api/analyst/upload", {
          method: "POST",
          body,
        })
          .then((response) => {
            // handle the response
            return response.json();
          })
          .then((data) => {
            //TO DO...create record of successful file upload
            // console.log(data);
          })
          .catch((error) => {
            // handle the error
            //  console.log(error);
          });
      }
    }
  };
  return (
    <>
      <Tag tag={t("add.tag")} crumbs={crumbsDatasetAdd}></Tag>
      <div className="cards">
        <div className="card" onClick={handleClickRequest}>
          <div className="top1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2997/2997933.png"
              alt="material ui"
            />
          </div>
          <div className="bottom">
            <p>{t("add.request")}</p>
          </div>
        </div>

        <div className="card" onClick={() => handleClickInputFile()}>
          <div className="top">
            <img
              alt={t("add.csv")}
              src="https://cdn-icons-png.flaticon.com/512/6133/6133884.png"
            />
          </div>
          <div className="bottom">
            <p>{t("add.csv")}</p>
          </div>
        </div>
        <div className="card" onClick={() => handleClickInputFile()}>
          <div className="top">
            <img
              alt={t("add.google")}
              src="https://lh3.ggpht.com/e3oZddUHSC6EcnxC80rl_6HbY94sM63dn6KrEXJ-C4GIUN-t1XM0uYA_WUwyhbIHmVMH=w300"
            />
          </div>
          <div className="bottom">
            <p>{t("add.google")}</p>
          </div>
        </div>

        <div className="card" onClick={() => handleClickInputFile()}>
          <div className="top">
            <img
              alt={t("add.json")}
              src="data:image/png;base64,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"
            />
          </div>
          <div className="bottom">
            <p>{t("add.json")}</p>
          </div>
        </div>
      </div>
      <input
        type="file"
        id="inputfile"
        style={{ display: "none" }}
        onChange={handleChangeInputFile}
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
        `}
      </style>
    </>
  );
}
