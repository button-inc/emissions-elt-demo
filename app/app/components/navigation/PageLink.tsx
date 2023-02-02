"use client";
export default function PageLink({ options }) {
  return (
    <>
      <div className="content--vertical-center">
        {options.map((option) => (
          <p key={option.title}>
            <span key={option.title}>
              <a href={option.href}>{option.title}</a>
            </span>
          </p>
        ))}
      </div>
      <style jsx>
        {`
          .content--vertical-center {
            align-items: center;
            justify-content: center;
            display: inline-flex;
            flex-wrap: wrap;
          }

          div .container {
            width: 75%;
          }
          p {
            width: 130px;
            height: 50px;
            line-height: 25x !important;
            margin-left: 50px;
            display: inline-flex;
            outline: none;
            border-width: 0;
            background-color: #4b286d;
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
            box-shadow: 0px 0px 0px 2px #4b286d inset !important;
            color: #ffffff;
            cursor: pointer;
          }
          p:hover {
            background-color: #4b286d;
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
