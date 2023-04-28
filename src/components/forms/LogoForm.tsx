import React, { useRef, useState } from "react";
import uploadSVG from "../../svg/upload.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { getFirm } from "../../store/user-info/firm";

function LogoForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropBoxRef = useRef<HTMLDivElement>(null);
  const firm = useSelector(getFirm);

  let file: any;

  const handleInputClick = () => {
    console.log(inputRef.current);
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current?.files) {
      file = inputRef.current.files[0];
      readFile();
    }
  };

  const readFile = () => {
    if (file) {
      let fileType = file.type;

      const validExtensions = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/jpg",
      ];

      if (validExtensions.includes(fileType)) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const fileUrl = fileReader.result;

          if (dropBoxRef.current) {
            dropBoxRef.current.innerHTML =
              '<img style="object-fit: cover; width: 100%; height: 100%;" src="' +
              fileUrl +
              '" width="100px" height="100px" />';
          }
        };

        fileReader.readAsDataURL(file);
      } else {
        toast.error("Invalid file extension!");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(!file);
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/firms/" + firm.id + "/logo/",
      formData
    );

    window.location.href = "/";
  };

  return (
    <section className="page">
      <div className="logo-form-page">
        <div>
          <form
            id="logo-form"
            onSubmit={handleSubmit}
            className="logo-form-container"
            encType="multipart/form-data"
          >
            <input
              onChange={(e) => handleChange(e)}
              type="file"
              ref={inputRef}
              hidden={true}
              name="logo"
            />
            <div ref={dropBoxRef} className="logo-form-container drop-box">
              <h3>Upload your logo</h3>
              <div className="upload-image">
                <img src={uploadSVG} />
              </div>
            </div>
            <button
              type="button"
              onClick={handleInputClick}
              className="btn btn-primary"
            >
              Select File
            </button>
          </form>
        </div>
      </div>

      <footer className="page-footer">
        <h4>Upload Logo</h4>
        <button form="logo-form" type="submit" className="btn btn-accent">
          Continue
        </button>
      </footer>
    </section>
  );
}

export default LogoForm;
