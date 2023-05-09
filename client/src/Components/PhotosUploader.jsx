/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  // ** Add photos by link
  async function addPhotosByLink(e) {
    e.preventDefault();

    const { data: filename } = await axios.post("/places/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  // ** Upload a photo
  async function uploadPhoto(e) {
    const files = e.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    const { data: filenames } = await axios.post("/places/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    onChange((prev) => {
      return [...prev, ...filenames];
    });
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link .jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl text-sm font-semibold"
          onClick={addPhotosByLink}
        >
          Add&nbsp;photo
        </button>
      </div>
      {/* --> show added pictures */}
      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={`http://localhost:4000/api/v1/uploads/${link}`}
                alt="Photo"
              />
            </div>
          ))}
        {/* --> upload from user device */}
        <label className="h-32 flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-8 text-xl text-gray-600 font-medium cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          <p>Upload</p>
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
