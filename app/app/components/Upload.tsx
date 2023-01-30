"use client";
import axios from "axios";
import { useState } from "react";
const URL_ENDPOINT =
  "https://storage.googleapis.com/upload/storage/v1/b/eed_upload_file_storage/o?uploadType=multipart";
function Form() {
  // 👇 These are wrapped around the file data to form the request body.
  const bodyStart =
    "--my-boundary\n" +
    "Content-Type: application/json; charset=UTF-8\n\n" +
    '{"name": "myObject.csv"}\n\n' +
    "--my-boundary\n\n";
  const bodyEnd = "\n\n--my-boundary--";

  function combineBody(middle): any {
    return bodyStart + middle + bodyEnd;
  }
  // 👇 This token expires and must be refreshed through the Google OAuth Playground
  const authToken =
    "ya29.a0AVvZVsrEr5MdZiR-ofg2QI7G3P_4_PExxWVfbchd3KOZK6Ltmv8HX2e2iXTtGa_IoQylKNaryv4DLFs6wrVzp3jF_D1QCdsB5WXW63r5FzTiezSe8VkMBdcxDqeTYYO3GurNIAMnCWauV3lGpgF-th0OfKvzaCgYKAWASARMSFQGbdwaI880Qbn7nrzDo8SGyg3TasA0163";

  let binaryData;

  const [formStatus, setFormStatus] = useState(false);
  const [query, setQuery] = useState({
    dataConnector: "",
    file: "",
  });
  const handleFileChange = () => (e) => {
    setQuery((prevState) => ({
      ...prevState,
      files: e.target.files[0],
    }));
  };
  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let file = document.getElementById("file").files[0];
    let reader = new FileReader();
    reader.onload = function () {
      binaryData = reader.result;
      let stringData = new TextDecoder().decode(binaryData);

      axios
        .post(URL_ENDPOINT, combineBody(stringData), {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "multipart/related; boundary=my-boundary",
          },
        })
        .then(function (response) {
          setFormStatus(true);
          setQuery({
            dataConnector: "",
            file: "",
          });
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    reader.readAsArrayBuffer(file);

    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
  };
  return (
    <div className="container-md">
      <h2>Choose a data connector</h2>
      <form
        acceptCharset="UTF-8"
        method="POST"
        encType="multipart/form-data"
        id="ajaxForm"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">
            Select a data connector:{" "}
          </label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            required
            name="dataConnector"
            value={query.dataConnector}
            onChange={handleChange()}
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <hr />
        <div className="form-group mt-3">
          <label className="mr-2">Select a file to upload: </label>
          <input
            name="file"
            type="file"
            id="file"
            onChange={handleFileChange()}
          />
        </div>
        <hr />
        {formStatus ? (
          <div className="text-success mb-2">Your message has been sent.</div>
        ) : (
          ""
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Form;
