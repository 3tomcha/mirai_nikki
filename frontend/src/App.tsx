import './App.css';
import React, { useEffect, useState } from 'react';
import { useGenerateImage } from './hooks/useGenerateImage';
import { useGenerateschedule } from './hooks/useGenerateSchedule';
import ScheduleItem from './components/ScheduleItem';
import useContract from './hooks/useContract';

function App() {
  const [prompt, setPrompt] = useState('');
  const [randomIndex, setRandomIndex] = useState(-1);
  const { image, fetchImage } = useGenerateImage();
  const { schedule, fetchSchedule, setSchedule } = useGenerateschedule();
  const { init, connectMetamask, success, participate } = useContract();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    connectMetamask();
  }, [success]);


  const handlePromptChange = (event: any) => {
    setPrompt(event.target.value);
  };

  const updateSchedule = () => {
    fetchSchedule(prompt);
  };

  const updateImage = async () => {
    const itemsWithoutImage = schedule.filter(item => !item.image)
    const _randomIndex = Math.floor(Math.random() * itemsWithoutImage.length)
    console.log(_randomIndex)
    setRandomIndex(_randomIndex);
    const randomItem = itemsWithoutImage[_randomIndex];
    console.log(randomItem)
    await fetchImage(randomItem.value)
  }

  useEffect(() => {
    console.log(image)
    console.log(randomIndex)
    const newSchedule = schedule.map((item, index) => {
      if (index - 1 === randomIndex) {
        item.image = image
      }
      return item
    })
    console.log(newSchedule)
    setSchedule(newSchedule)
  }, [image])


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
        <button className="form-button" onClick={participate}>
          更新
        </button>
      </div>
      <button className="form-button" onClick={updateImage}>
        画像生成
      </button>
      {schedule && (
        <ul className="schedule-list" id="schedule">
          {schedule.map((item) => {
            return (
              <ScheduleItem {...item} key={item.time} />
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default App;
