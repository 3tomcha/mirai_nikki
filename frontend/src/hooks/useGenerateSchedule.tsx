import { useState } from "react";

export type Schedule = {
  time: string;
  value: string;
}
export function useGenerateschedule() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const fetchSchedule = async (_prompt) => {
    const prompt = `来週までに、${_prompt}です。月曜日の予定を一時間ごとに記載して24時間分になるようにしてください。なるべく具体的に書いて。例えば、ご飯だったらメニュー、出かけるんだったら場所まで。朝5時から夜の12時まで一気に返して。下記のようなjsonの配列で返して。[{"time": "00:00", "value": "睡眠"}, {"time": "01:00", "value": "睡眠"}]。`
    const url = `http://127.0.0.1:5000/chat?prompt=${encodeURIComponent(prompt)}`;

    const res = await fetch(url)
    if (res) {
      const _schedule = await res.json();
      setSchedule(_schedule);
    }
  }


  return {
    schedule,
    fetchSchedule
  }
}
