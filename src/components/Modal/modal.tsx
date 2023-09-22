// src/Modal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUploader from "../FileUploader";
import { Port } from "../../../envData";
import { notify } from "../toast/toast";

function CustomModal({ isOpen, onClose }: any) {
  const [pdfFile, setPdfFile] = useState(null);
  const [text, setText] = useState("");

  const handlePDFChange = (event: any) => {
    setPdfFile(event.target.files[0]);
  };

  const submitPDF = async (event: any) => {
    event.preventDefault();
    console.log(pdfFile);
    notify("info", "Wait, While we upload your PDF!");
    const formData = new FormData();
    console.log("formData",formData)
    formData.append("file", pdfFile as any);
    formData.append("filename", "pdf1");

    try {
      const response = await axios.post(
        `${Port}/upload`,
        formData
      );
      console.log(response);
      notify("success", "Successfully Uploaded PDF!");
      onClose();
      // window.location.reload()
    } catch (err) {
      notify("error", "Error Uploading PDF!");
      console.log(err);
    }

    // await fetch("http://127.0.0.1:8095/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => {
    //     console.log("PDF file sent successfully");
    //     console.log("upload response",response)
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setText(data);
    //     console.log(data.text);
    //   });
  };


  useEffect(() => {
    const hasModalBeenDisplayed = localStorage.getItem("modalDisplayed");
    if (!hasModalBeenDisplayed) {
      localStorage.setItem("modalDisplayed", "true");
      onClose(); // Automatically close the modal after the first display
    }
  }, [onClose]);
  const url = "/api/upload";

  if (!isOpen) return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay backdrop-blur-" onClick={onClose}></div>
      <div
        style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
        className="modal-container gap-y-[1rem]  bg-zinc-800 backdrop-blur-lg w-[95%] md:w-[28rem] lg:w-[30rem] flex flex-col rounded-lg py-10 px-4 "
      >
        <h3 className="text-xl">Upload New Documentation</h3>
        {/* <button onClick={FetchPdf}>Fetch PDF</button> */}
        {/* <FileUploader
          url={url}
          acceptedFileTypes={[
            ".pdf",
            // "image/jpeg",
          ]}
          maxFileSize={1000}
          label="Max File Size: 10MB"
          labelAlt="Accepted File Types: Pdf, Txt"
        /> */}
        <p className="text-xs text-gray-500">
          Please Upload .pdf, .txt, .rst, .md, .zip limited to 10mb
        </p>
        {/* <button className="w-fit px-3 py-1 rounded-lg border border-[black]">
          Choose File
        </button> */}
        <form
          action="/text_extraction"
          encType="multipart/form-data"
          onSubmit={submitPDF}
        >
          <input
            className=""
            type="file"
            name="selected_pdf"
            accept=".pdf"
            onChange={handlePDFChange}
          />
        </form>
        {/* <p>Uploaded File</p>
        <p className="text-gray-700">{text}</p> */}
        <div className="flex gap-x-4 justify-end">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submitPDF}
            style={{ transition: "0.3s" }}
            className="bg-black border border-[black] text-white px-5 py-1 rounded-md hover:bg-white hover:text-black"
          >
            Train
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
