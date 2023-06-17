import { Schedule } from "../hooks/useGenerateSchedule";
import React from "react";

export default function ScheduleItem({ time, value, image }: Schedule) {
    return (
        <>
            <li className="schedule-item">
                <span className="time">{time}</span>: {value}
            </li>
            {image && <img src={image} alt="aa" />}
        </>
    )
}