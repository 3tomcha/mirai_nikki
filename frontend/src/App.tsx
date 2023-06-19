import './App.css';
import React, { useEffect, useState } from 'react';
import { useGenerateImage } from './hooks/useGenerateImage';
import { Schedule, useGenerateschedule } from './hooks/useGenerateSchedule';
import ScheduleItem from './components/ScheduleItem';
import useContract from './hooks/useContract';

type WalletAddressFormProps = {
  handleSubmit: (walletAddress: string) => void;
}
function WalletAddressForm({ handleSubmit }: WalletAddressFormProps) {
  const [walletAddress, setWalletAddress] = useState('');

  const handleChange = (e) => {
    setWalletAddress(e.target.value);
  };
  const _handleSubmit = () => {
    handleSubmit(walletAddress);
  }

  return (
    <>
      <label>
        証人のWallet Address:
        <input type="text" value={walletAddress} onChange={handleChange} />
      </label>
      <button onClick={_handleSubmit}>Submit</button>
    </>
  );
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [randomIndex, setRandomIndex] = useState(-1);
  const { image, fetchImage } = useGenerateImage();
  const { schedule, fetchSchedule, setSchedule } = useGenerateschedule();
  const { init, connectMetamask, success, participate, setIsParticipated, accounts, isParticipated, addVerifier, verifier, fetchVerifier, hasVerified, fetchHasVerified } = useContract();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    connectMetamask();
  }, []);


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
    if (schedule && schedule.length > 0 && randomIndex !== -1) {
      const cp = { ...schedule } as Schedule[]
      const newSchedule = cp.map((item, index) => {
        if (index - 1 === randomIndex) {
          item.image = image
        }
        return item
      })
      console.log(newSchedule)
      setSchedule(newSchedule)
    }
  }, [image])

  useEffect(() => {
    let intervalId;
    if (accounts && accounts.length > 0 && !isParticipated) {
      intervalId = setInterval(() => {
        setIsParticipated();
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [accounts, isParticipated]);

  useEffect(() => {
    let intervalId;
    if (!verifier) {
      intervalId = setInterval(fetchVerifier, 5000);
    }
    return () => {
      clearInterval(intervalId);
    }
  }, [accounts, verifier])


  return (
    <div className="container">
      <h1>未来日記</h1>
      <div className="form-container">
        <input
          type="text"
          className="form-input"
          id="prompt"
          placeholder="あなたのなりたい姿を具体的に書いてね"
          value={prompt}
          onChange={handlePromptChange}
          required
        />
        <button className="form-button" onClick={updateSchedule}>
          生成
        </button>
      </div>
      {
        schedule && schedule.length > 0 && (
          <>
            <button className="form-button2" onClick={updateImage} style={{ marginRight: '2em' }}>
              画像生成
            </button>
            {isParticipated ? (
              <p>約束ずみです</p>
            ) : <button className="form-button3" onClick={participate} style={{ marginBottom: '1em' }}>
              約束する！(10GOAL)
            </button>}
            {verifier ? (
              <p>証人は{verifier}です</p>
            ) : < WalletAddressForm handleSubmit={addVerifier} />
            }

            <ul className="schedule-list" id="schedule">
              {schedule.map((item) => {
                return (
                  <ScheduleItem {...item} key={item.time} />
                )
              })}
            </ul>
          </>
        )
      }
    </div>
  )
}

export default App;
