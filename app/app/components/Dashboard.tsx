"use client";
export default function DashBoard({ options }) {
  return (
    <>
      <div className="content--vertical-center">
        <div className="container">
          {options.map((option) => (
            <p key={option.title}>
              <span key={option.title}>
                <a href={option.href}>{option.title}</a>
              </span>
            </p>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .content--vertical-center {
            margin-top: 100px;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
          }

          div .container {
            width: 75%;
          }
          p {
            width: 300px;
            height: 75px;
            line-height: 50px !important;
            margin-left: 100px;
            display: inline-block;
            outline: none;
            border-width: 0;
            background-color: #f4f9f2;
            padding: 0.78571429em 1.6em 0.78571429em;
            border-radius: 0.25rem;
            text-transform: none;
            text-shadow: none;
            font-weight: bold;
            font-style: normal;
            font-size: 1.2rem;
            text-align: center;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            -webkit-text-decoration: none;
            text-decoration: none;
            box-shadow: 0px 0px 0px 2px #2b8000 inset !important;
            color: #2b8000;
            cursor: pointer;
          }
          p:hover {
            background-color: #b9e2ff;
            -webkit-text-decoration: underline;
            text-decoration: underline;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
          }
        `}
      </style>
    </>
  );
}
