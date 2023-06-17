import { useState } from "react";

export function useGenerateschedule() {
  const [schedule, setSchedule] = useState("");

  const fetchSchedule = (_prompt) => {
    const prompt = `来週までに、${_prompt}です。月曜日の予定を一時間ごとに記載して24時間分になるようにしてください。なるべく具体的に書いて。例えば、ご飯だったらメニュー、出かけるんだったら場所まで。24時間分一気に返して。json形式で返して`
    const url = `http://127.0.0.1:5000/chat?prompt=${encodeURIComponent(prompt)}`;

    fetch(url)
      .then((response) => setSchedule(response)) // レスポンスを Blob として解釈
      .catch((error) => console.error(error));
  }


  return {
    schedule,
    fetchSchedule
  }
}
