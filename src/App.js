import "./App.scss";
import { useState } from "react";

function App() {
  const [responseObj, setResponseObj] = useState([]);
  const [file, setFile] = useState([]);
  async function getFileData() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    console.log(formData);
    const response = await fetch("http://localhost:8080/read-resume", {
      method: "POST",
      body: formData,
    });
    const test = await response.json();
    setResponseObj(test?.fileData);
  }

  function onFileChange(event) {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  }

  return (
    <>
      <div className="container">
        <input type="file" name="resume-file" onChange={onFileChange}></input>

        <button type="button" onClick={() => getFileData()}>
          Upload
        </button>
      </div>
      {!responseObj ? null : <div className="file-content">{responseObj}</div>}
    </>
  );
}

export default App;
