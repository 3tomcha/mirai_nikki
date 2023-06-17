import './App.css';
import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [schedule, setSchedule] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const updateSchedule = () => {
    // 入力されたプロンプトに基づいてスケジュールを更新するロジックを実装してください
    const generatedSchedule = generateSchedule(prompt);
    setSchedule(generatedSchedule);
  };

  const generateSchedule = (prompt) => {
    // 入力されたプロンプトに基づいてスケジュールを生成するロジックを実装してください

    // 以下は例として、入力されたプロンプトを表示するだけのスケジュールを返すコードです
    const generatedSchedule = `
      <li class="schedule-item"><span class="time">5:00</span>: 朝食（ごはん・卵・バナナ）</li>
      <li class="schedule-item"><span class="time">6:00</span>: ジョギング（30分）</li>
      <li class="schedule-item"><span class="time">7:00</span>: 筋トレ（30分）</li>
      <li class="schedule-item"><span class="time">8:00</span>: 朝食（ごはん・焼き肉・野菜）</li>
      <li class="schedule-item"><span class="time">9:00</span>: 腹筋（30分）</li>
      <li class="schedule-item"><span class="time">10:00</span>: 昼食（ごはん・チキンカツ・サラダ）</li>
      <li class="schedule-item"><span class="time">11:00</span>: ウォーキング（60分）</li>
      <li class="schedule-item"><span class="time">12:00</span>: 昼食（ごはん・ほうれん草・ハム）</li>
      <li class="schedule-item"><span class="time">13:00</span>: ストレッチ（30分）</li>
      <li class="schedule-item"><span class="time">14:00</span>: タンパク質ドリンク（1杯）</li>
      <li class="schedule-item"><span class="time">15:00</span>: プールへ行く（60分）</li>
      <li class="schedule-item"><span class="time">16:00</span>: スイミング（60分）</li>
      <li class="schedule-item"><span class="time">17:00</span>: タンパク質ドリンク（1杯）</li>
      <li class="schedule-item"><span class="time">18:00</span>: 夕食（ごはん・魚・サラダ）</li>
      <li class="schedule-item"><span class="time">19:00</span>: 歩く（60分）</li>
      <li class="schedule-item"><span class="time">20:00</span>: 夕食（ごはん・鶏肉・野菜）</li>
    `;

    return generatedSchedule;
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
      <button className="form-button" onClick={generateImage}>
        画像生成
      </button>
      <ul className="schedule-list" id="schedule">
        {schedule}
        <li className="schedule-item">
          <span className="time">5:00</span>: 朝食（ごはん・卵・バナナ）
        </li>
        <img id="generatedImage" src="" alt="" />
        <li className="schedule-item">
          <span className="time">6:00</span>: ジョギング（30分）
        </li>
        <li className="schedule-item">
          <span className="time">7:00</span>: 筋トレ（30分）
        </li>
        <li className="schedule-item">
          <span className="time">8:00</span>: 朝食（ごはん・焼き肉・野菜）
        </li>
        <li className="schedule-item">
          <span className="time">9:00</span>: 腹筋（30分）
        </li>
        <li className="schedule-item">
          <span className="time">10:00</span>: 昼食（ごはん・チキンカツ・サラダ）
        </li>
        <li className="schedule-item">
          <span className="time">11:00</span>: ウォーキング（60分）
        </li>
        <li className="schedule-item">
          <span className="time">12:00</span>: 昼食（ごはん・ほうれん草・ハム）
        </li>
        <li className="schedule-item">
          <span className="time">13:00</span>: ストレッチ（30分）
        </li>
        <li className="schedule-item">
          <span className="time">14:00</span>: タンパク質ドリンク（1杯）
        </li>
        <li className="schedule-item">
          <span className="time">15:00</span>: プールへ行く（60分）
        </li>
        <li className="schedule-item">
          <span className="time">16:00</span>: スイミング（60分）
        </li>
        <li className="schedule-item">
          <span className="time">17:00</span>: タンパク質ドリンク（1杯）
        </li>
        <li className="schedule-item">
          <span className="time">18:00</span>: 夕食（ごはん・魚・サラダ）
        </li>
        <li className="schedule-item">
          <span className="time">19:00</span>: 歩く（60分）
        </li>
        <li className="schedule-item">
          <span className="time">20:00</span>: 夕食（ごはん・鶏肉・野菜）
        </li>
      </ul>
    </div>
  )
}

export default App;
