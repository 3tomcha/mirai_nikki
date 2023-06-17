export default function ScheduleItem(props) {
    return (
        <li className="schedule-item">
            <span className="time">{props.time}</span>: {props.do}
        </li>
    )
}