"use client";
import { useTranslation } from "@/i18n/client";
import Tag from "@/components/layout/Tag";
import { crumbsDatasetAdd } from "@/lib/navigation/crumbs";

export default function Page({ lng, endpoint }) {
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
  /*Using GCP Cloud Storage signed URL allows you to upload the file to the specified location in Google Cloud Storage without the need for authentication or authorization.*/
  const handleChangeInputFile = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file) {
        // 👇️ post form data to api
        const body = new FormData();
        body.append("file", file);
        await fetch(endpoint, {
          method: "POST",
          body,
        })
          .then((response) => {
            // handle the response
            return response.json();
          })
          .then((data) => {
            //TO DO...create record of successful file upload
            console.log(data);
          })
          .catch((error) => {
            // handle the error
            console.log(error);
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
              alt={t("add.request")}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJ1BMVEX///8AAABZWVn4+Pi/v7+zs7OioqLp6emZmZlra2tdXV2oqKgeHh5SHkywAAABeUlEQVR4nO3dS66CQBRFURGUn/Mf78uLkZa2rEpxyrUGYO6OAcrGxcsFAAAAAAAAAPhR47RPY+sharoN/26tx6jnPjzdWw9Syzy8zK1HqWQ5CpfWo1SyHoVr61EquR6F19ajVKIwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvP1X7gdhVvrUd6Yl/X6pe1xFD62bz9sXQrvEt+H8ym6EX5rXfNWwb3+sXXLB+XezjC1TvlgKla4t075YC9W2P932P912P+99Aeehz9wpini3OfSEvr/baEwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvP1X9j/f6svR+HSepRK5qPwjDu8Rbw2wgtvYZ/Jc6+/6B792YzTPhV8EwIAAAAAAAAAkOUPN2oQMjDsn+EAAAAASUVORK5CYII="
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
              src="data:image/png;base64,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"
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
              src="data:image/png;base64,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"
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
