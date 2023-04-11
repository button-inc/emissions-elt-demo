"use client";
import { useState } from "react";
import { useTranslation } from "@/i18n/client";
import Tag from "@/components/layout/Tag";
import { crumbsInsight } from "@/lib/navigation/crumbs";

export default function Page({ lng }) {
  // 👇️ language management
  const { t } = useTranslation(lng, "insight");
  crumbsInsight.map((item) => {
    item.title = t(item.title);
  });

  // 👇️ show\hide state for modal message
  const [toggle, setToggle] = useState(false);

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
  // 👇️ handler for click copy connection string for BI Tool...
  const handleClickCopy = async (param) => {
    let text = "";
    switch (param) {
      case "?TODO-BASED-ON-PARAM?":
        break;
      default:
        text = `
        \nDatabase Type: postgres
        \nDisplay name: eed GCP PG
        \nHost: http://34.125.92.26
        \nPort:5432
        \nDatabase name:eed
        \nUsername: analyst@climatetrax.com
        \nPassword: OIw0dKXAJ0xKCl`;
        break;
    }
    try {
      await navigator.clipboard.writeText(text);
      setToggle(!toggle);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const handleClickClose = function () {
    setToggle(!toggle);
  };

  return (
    <>
      <Tag tag={t("label")} crumbs={crumbsInsight}></Tag>
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

        <div className="card" onClick={() => handleClickCopy("metabase")}>
          <div className="top">
            <img
              alt={t("metabase")}
              src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAACjCAMAAAA3vsLfAAAAb1BMVEX////b6fpKkOJCjOH8/f/4+/7d6vpIj+Lj7vvr8/xBi+Hw9v30+P3g7Pvn8Pvq8vyYv+7D2vVOk+OpyfF5rOm30vNTluN3q+nQ4vdqo+ewzvJin+a91vSSu+1xp+jP4feEs+uhxfCDsutcm+WqyvBNBtDsAAAKZElEQVR4nO1dWZOySgwFutkXAREXEFD8/7/xgmydQM/nTF1nyq6ch3mAEeRUuklykqhpBAKBQCAQCAQC4ffBOf/rr/Bx4L7rOJFv/vX3+Chw39GfsCIi7mVwV58RBn/9bT4Gvi4gJHt7DYEl0qZH9GZ4CRFgTbdomb4CM4S06e5ff6OPQIBY0x1apS/AJ9p+AqLtR0AvUnqVvgZOr4QfYQdZI3/3NSAPhIztRfji7kY728vwQ2LtJzCjweBCn1j7Fkzfdf2ASCMQCAQCgUAgENRFFy6F/tYJbpqbsYD0ODc3i0P4LlQuFIsOTVWcs9sJPRf3IycMnd0qigrc/ni04sH0ozAMIxfn4NzDtb9BXCuUnONJZbMn8huwOHOSRFGtB3en1JEDRFI+p0aQ5dZHY7xBrEx6jpe5ZwywWSM8ViDkI8UcLhcEZkvkR6gN0XeCISY5m2+QOW9/oN9BPT9UB+862w93JPoUyIoLtTNQ01r4PLWecINmcwv9OPhH4aEMI02mEy5gYUl+I8Vv5tOEkpY12WfQiDewjcNvPt3bcDAAvPtoDYgF3RrpgUYoLFNEs74bjycdVQLYUYXtjTcM0Mba03BiJSNPdGLBb6QH06mHA888BtZs2Gn9B4/5f2NXQdrmVYqNZ6JHpsqv9NNxlZp3dANbhVXqnG34VEY5nIgwPdFwXEYbXtRTBZd/RLSxvQJeb4SszTZk1vZt2gZrCzJM20UB2vAasvN/7G2yGpDVIh1dPX5Fe5uRbH2PT8Pehi+6arQqTM/kUKy2/ulNioocJuvUDnAXYIUSDq9TiOZm25fxOI+2WcCrd44fMM+TH4y2ASW2tg4X0dy8bPaq4GY1e6+aCcxNiK6guc00a6XouLFKCWPrNrF44Y0VunDC2mQHem7uYjtg+QrBmHmz2XIDFby2J/xbzpjdgdmZDk7M/MCMxmJvliuuOB7NRIPakOAx3KD7UynDWkdDfS1yI22PDxT3mDunI8JycP6M+45l6VYY4eJ6P+qZDh2ciKuv5/4G1T7SVIIZ1kly2ggWeeBvlnpwMwiCjZxjd9wPNvK+ww126w8QCAQCgaAGujfjdtDz7ZZ42f+r11tvhpfmfr/VK3XEt5LHI9nofez8DNdfOxp8dzrsL/W6ENrXy/0lUauHwYnbXsT00iwBz8uTpu1d+7apIQ/m7hk/WNitdR9V2l0oPSO3NiizvLuQ0V5Pb3qEP8Cp8oaY0fZyMYVo7vPnie6B871ocIGkwF7PuvjsGXmyoxilubHxPN5dqChVWaqWkNixjYU3fltCfNsQ0j2i7CzyFgoX8gprPu5f2XwhLy9/6bHeDPMqpsNm4UrTklTI99iLfoqkqzlgCoAG5t0n++QXJiaOCpAt+FjUOczuxuO27Wcgmc2O03aO0pRzIi5JDfCByaxgHnS5wWfjinTSyRpqqAob9pjykfXKmw3UDFg2agkPfIPwD57y/wbW4yb1lz8gC6l3Gz4gk2CiAtE8agZYv54VxY+Gc8aC3/BUJhKcDK8ZPiAT/MIc0TZKYGvB76HAy/R/o81Kt2lby8sq0OZnkkV6w7TF4wcktDktulA7bJJqFjNoMd6xR4erxLSNW5LslYCtip2HUG1dOqNEpHDCDsi4hJD1sHYKWGXDei6Qtsk6tRNcveyuRF0gLDZgi3cPX6XsMR2XjYaCuyRrp7AU7pKC3/zZcIRySpYu3gHwdz3BRoC/KyQ1knThjdnLhcLzciGbxaqMkrIyNoXy7UF4yzmZNy4v27sLKQ0uyO9g7N1hrp32UjEncDpPF2L2VYkl+oT7KAzGPJY3sDFh1+vO/Yn2BrTAuZAeF97X2VBIb1QwAxVeU+95oriow1pfhlDe4vhywuvH1PdNll0fOg4jub9znGjd5uEm8f14j0usuJqnW3PMrhfl5iHx7YGwvG8S+s6zdv+/2VX07QsRCAQCgfBBCE7l4ZBsFJ/1BVlbb0Yenmp9ywfj3f9vZb19va7Vkkk1M8nSzoFPkVfboS//sywH82Mm9zZN8/MN1+GaUdh/YDVqPLqd8zRts0Qh4tx4kDdt2zuDpM6i7MF2W6cZPsC6YEzkYWnPBe2kGi/bLnJ4VrneVRASnvAF7cRrhdpaMdUh1jOE1fwBZu8X3sRYVdRP+cWYY3zvrIbep/E9kDereYODBfbLvuTfhcyImDKBSuBScCpmRgzvqEb5rtXCLOJ+PC5r5+AX1DUz7W8oDzfbJ+zztZWQEjTthpuHRhpWbbiT7IwllUkakDUPlah5qFLB3LAeZ+fj7iZrVUNJdION3fXyVjUsjanQmhCtBL8xaY2NZ9qsSmhrBhvbjV5ujLRVaIzEbbiTTrqmbVxbqGGvW3Qy2mRtuCpsbi5uw01l1jbShq3N+5e1rXRSFaxtPWJgdKxe3du867iHrfa2sT0X721KjBjQSihjzuNNXnyT2rPIjrvE5zcpXtRKtBDBagY7n2XM3TYLaHNb/DY8PmX220Ch3NLn++E4ifK7ULQHqxYkUYKdy6KEJStQi1ECy5QwNu05uWnSQ9lViD1Ftz+EMelkcEys6QVxBYhJZ95spkpM2uGUGd5TDy0eILETzO22OAPS/X/fVcuKA8h0zBkQ1J5bFqzvw2We0ViaOgiSa3Wu7nucPuO+E1rWuqvWTJoiT9tqnW/bhWH3/6v2XGdftXleNKVC+bYe3N+5W8UZvey5ld01HUsPt2Y8yXRSP9QtR5XyDwKBQCAQELgfhc72q1Ty09RfHd860f8Kimo/ghLus6Jtq+tKxgzcyHGiNZ+mHz3r2/DxZ93bxhjjoO7r25qLrhBxZnnunXjmeXkM8vx8N3r9IXD6pdWUS1iBBGnrmnped32VqilByChOExZHZzniuGJZ7a4wSwqMMQa1uyrMQe0BEm7shXHFskpx8GtrQoEIqBS3r2qECjArbi9yMUrvzjTI+hJQejecjgeoL0GFBj809U6Ye4ebhCYasOy8pCPh8TnhVqP2XCW6YHAnGfvXSE9Zz9VqZuU0jxf3XOUq9FzhccX2T8cVr+hUe1xxgZ7q/eOKVdBJV9YmVeVpXLGA9d4mqwEZ97DV78rLxhWPtPFGyXHFD2QLRxk907hiTI+kz1QfHWeO+kzVmMywqp2ZNmz8ZpzDB+m4Ygmdas4B0Q7iwA/vPgc/iIbZuYfjihc9FDl0S3Sr5NQZzbwJpbWVIMgBsxJ8VNmMI8CnGHQJM46YKjOOuse9tOM0YaMR9x2+BJkgMhd5AxXhAm9i6K/5cTpN2lJnolbHjx4/2wbuJYp7gmFs82osseluz2/rxxg/P4COm0k/v802ililhFv/vKekdjb26udPU2+NJZb8ZDUPto8Hp8t+XyrXhUsgEAgEAuE30TkmO+Xk4nfDHH+9RLmfBX4rfMm4YsJXAHooOf4vAmktqqjs7wZOU6qhsr8bq6Q4mdsrkI0rJnwJmeBH+BJE249Ai/RHkJXOEL6GrFCL8CVwWeBff59PgawIlfAlhMFZOjXtfQP+qCOHO7K174AHbhRFWwIq4WtImocIBAKBQCAQCATCe/Efu/yGELZvffoAAAAASUVORK5CYII="
            />
          </div>
          <div className="bottom">
            <p>{t("metabase")}</p>
          </div>
        </div>
        <div className="card" onClick={() => handleClickCopy("powerbi")}>
          <div className="top">
            <img
              alt={t("powerbi")}
              src="data:img/png;base64,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"
            />
          </div>
          <div className="bottom">
            <p>{t("powerbi")}</p>
          </div>
        </div>

        <div className="card" onClick={() => handleClickCopy("tableau")}>
          <div className="top">
            <img
              alt={t("tableau")}
              src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ8AAAC6CAMAAACHgTh+AAAA4VBMVEX////pdi3skS1Zh5scRH7JIDVaZZFNgJVwmaZlkqDocB7zuZz0v6QZQn3sjyZdip7obA/pciTriAnGAB8ANHbvpl/99OvO2uD75dvvnnPxzdEAL3QAOHj++fPIBCfCytjr8PL88vOjrsTlpKn53MRNWopncZnh6eyaoLnX2eN2f6O4vM2BiKmWsrx5oKzqfjrrhEbsj1n418frur7qggA/eI+uw8vytn/FABDaeoODk7HGACP65NGOrrjvolTG1dr31bbxrIg/TYPwp4DYb3nCAAAAEGkAJG/eho6wtMfrt7zZPH7QAAADwElEQVR4nO3bfVvSUACGcUlBsMyEapWEyxLMNzTKSivStLfv/4E6G07OMzmTdA7Z7t9f7LBzXdt9AePlMDMDAAAAAAAAAAAAAAAAAABwJ9Wqtc6kj+EuoYeih6KHooeih6KHooeihzI9/EkfQ7a+vDFiY52vO+eq1Wp0+6unO/leILPjzMq3er3+/qmOdWrVy2p93cn7MG9kd6AZefLw3r16rIdXiwQdIvEe87Ozs0vZHWhGRvUYPBUC5vWj3zm/7etOBeoxlHB9oYeih6KHooeih6KHoocqZo8aPWwHBwe+464893h5jYm56RF+wr/wzfR4+F2GnDP7nuUg7GGPeNP51dHHus3kMEHskffOmeEn/AuzAXvgw06GZ5Gej2ECt7pz5iCB0zw9ctHj8vOlXuTny0vb+fVWx1x8Wz98PZUhP7uTuDXJ7z8S5OZ6q+ih6KHooZJ63C91u93Sg9F3FrHHQqlUWqBHhB6KHooeih6KHuq/emxtGOkf362r7u761mZqPTbWK+vttA4yQ7GfEEath4kk94ithzE9KjnokSSxRxw9FD0UPRQ9FD1UHns8U8fLpsfycWzUMXeKe/iu+7qPRJDDBNHBPZ3yNnJYMT0utm75JG7MM29LB6rV4c3YEtuZvdKVlvd1ynqkEog2Tu76T7neOEuwr9OjMtK6n9WJXdNYS7BT7HHXHx/hEuxOIFiC7XcG4nt1F5ZtUQLbQqzHdqQddIg2Nv2Mzuvmkl5PfzwXg4fLvg4eO+ZO8fVl3Afzg6K//4gp/PuxGHooeih6qCL2aLRarU8vRu+a2GN1pdlsLg63p7XHki7BbpXL5ca1ejyem1ucG25Paw+vI3+aTa/HiflMl9ZBTk5qPWbysaAuvR75QA9FD0UPRQ+V2CP8Avn+6DsL2OPZu4DjB4YC9khED0UPlZser0TQ46gnQ86Z8l+XrWbYY/r//3J61rCUA0f2yJlrov9zxWJymCD2yK/DLE8jNZ9b5UQN10R/ZS5Rkx556HEafCV2IUxgD7Tcz5dfTcvioIFlZTp79F7bwhy/Zcg5c812GAaRodUMz+K2cL1ViT2CNcebjvsK2qNCj6GNCj1s9FD0UPRQ9FD0UPRQ9Ait/Tm3GazBjjbWdKcC9XCswfZlp5z2+NQ4OjqL9xhnDfaq+fT/uJndgWbkb6/X+xv7ynSsx0dny8jDJ/yrbUXC149o48+kD2vykq4vRUQPRQ9FD0UPRQ9FD0UPlfT9ehFttNvt7UkfBAAAAAAAAAAAAAAAAAAAwEj/AJlZwBdmBxcTAAAAAElFTkSuQmCC"
            />
          </div>
          <div className="bottom">
            <p>{t("tableau")}</p>
          </div>
        </div>
        <div className="card" onClick={() => handleClickCopy("looker")}>
          <div className="top">
            <img
              alt={t("looker")}
              src="data:img/png;base64,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"
            />
          </div>
          <div className="bottom">
            <p>{t("looker")}</p>
          </div>
        </div>
      </div>

      {toggle && (
        <>
          <div className="modal">
            <button className="closemodal" onClick={handleClickClose}>
              &times;
            </button>
            <h2>📋 {t("copied")} </h2>
            <p> {t("text")}</p>
          </div>
          <div className="overlay"></div>
        </>
      )}
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
