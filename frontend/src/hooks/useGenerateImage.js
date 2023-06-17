import { useState } from "react";

export function useGenerateImage() {
  const [image, setImage] = useState("");

  const fetchImage = () => {
    const url = `http://127.0.0.1:5000/image?prompt=${encodeURIComponent(prompt)}`;

    fetch(url)
      .then((response) => response.blob()) // レスポンスを Blob として解釈
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob); // Blob を URL に変換
        console.log(imageUrl);
        setImage(imageUrl)
      })
      .catch((error) => console.error(error));
  }

  return {
    image,
    fetchImage
  }
}
