import React, { useEffect, useState } from "react";
import { storage } from "../firebase/configFirebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import ReactPlayer from "react-player";

export default function UploadSingleFile() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  console.log(imageUrls);

  // tao 1 tham chieu den thu muc chua kho anh tren firebase
  const imageListRef = ref(storage, "images/");

  // ham upload duoc file len firebase
  const uploadFiles = (files) => {
    //   phai xu ly duoc tac vu them nhieu file => bat dong bo => su dung promise
    Promise.all(
      files.map((file) => {
        // tao 1 tham chieu => tao floder tren firebase
        const imageRef = ref(storage, `images/${file.name}`); // Corrected typo here
        return uploadBytes(imageRef, file).then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        });
      })
    ).then((urls) => {
      // tra ve danh sach cac urls
      setImageUrls((prev) => [...prev, ...urls]); // Corrected this line to spread the new URLs
    });
  };
  const handleSelectFiles = (e) => {
    // lay tat ca cac gia tri trong o input co type la file
    const files = Array.from(e.target.files);
    setImageUpload(files);
  };

  // khi cleclk vao
  const handleUpload = (e) => {
    if (!imageUpload) {
      return;
    } else {
      uploadFiles(imageUpload);
    }
  };

  // lay url tren firebase
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      // respone tra ve la 1 mang danh sach cac url
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          // danh sach url
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <>
      <h1>Danh sach hinh anh</h1>
      <div style={{ display: "flex", gap: 10 }}>
        {imageUrls.map((url) => (
          //   <img src={url} alt="anh" key={url} height={300} width={300} />
          <ReactPlayer url={url} key={url} controls={true} />
        ))}
      </div>
      <input type="file" onChange={handleSelectFiles} multiple />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}
