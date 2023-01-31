"use client";
export default function BoxLabel({ text }) {
  return (
    <>
      <div className="div--box-label">
        <h2>{text}</h2>
      </div>
      <style jsx>
        {`
          .div--box-label {
            padding: 16px;
            background-color: #f7f7f8;
            height: 75x;
          }
        `}
      </style>
    </>
  );
}
