import './App.css';
import React, { useState } from 'react';
import { useGenerateImage } from './hooks/useGenerateImage.tsx';
import { useGenerateschedule } from './hooks/useGenerateSchedule.tsx';
import ScheduleItem from './components/ScheduleItem';

function App() {
  const [prompt, setPrompt] = useState('');
  const { image, fetchImage } = useGenerateImage();
  const { schedule, fetchSchedule } = useGenerateschedule();

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const updateSchedule = () => {
    fetchSchedule(prompt);
  };

  const generateImage = () => {
    // 画像生成のAPI呼び出しを行うロジックを実装してください
    const url = `http://127.0.0.1:5000/?prompt=${encodeURIComponent(prompt)}`;

    fetch(url)
      .then((response) => response.blob()) // レスポンスを Blob として解釈
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob); // Blob を URL に変換
        console.log(imageUrl);
        document.getElementById('generatedImage').src = imageUrl; // 画像の src を更新
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>未来日記</h1>
      <div className="form-container">
        <input
          type="text"
          className="form-input"
          id="prompt"
          placeholder="未来の予定を入力してください"
          value={prompt}
          onChange={handlePromptChange}
          required
        />
        <button className="form-button" onClick={updateSchedule}>
          更新
        </button>
      </div>
      <button className="form-button" onClick={fetchImage}>
        画像生成
      </button>
      {schedule && (
        <ul className="schedule-list" id="schedule">
          {schedule.map((item) => {
            return (
              <ScheduleItem time={item.time} do={item.value} />
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default App;
