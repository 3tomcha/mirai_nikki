import { useState } from "react";

export function useGenerateImage() {
  const [image, setImage] = useState("");

  const fetchImage = async (_prompt: string) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const url = `${API_URL}/image?prompt=${encodeURIComponent(_prompt)}`;

    await fetch(url)
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
