import { useRef } from "react";

const PlannerDates = ({
  startDate,
  setDate,
}: {
  startDate: Date;
  setDate: (date: Date) => void;
}) => {
  const startDateInput = useRef<HTMLInputElement>(null);

  function getFormattedDate(date: Date) {
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return year + "-" + month + "-" + day;
  }

  return (
    <span style={{ display: "flex", alignItems: "center", gap: ".5em" }}>
      <div className="dateContainer">
        <span className="date date-active">Day</span>
        <span className="date">Week</span>
        <span className="date">Month</span>
      </div>
      <div
        className="datebar"
        onClick={() => startDateInput.current?.showPicker()}
      >
        <p className="datePicker">&#8249;</p>
        <input
          type="date"
          value={getFormattedDate(startDate)}
          ref={startDateInput}
          onChange={(e) => {
            let pick = e.target.value
              ? new Date(e.target.value.replace(/-/g, "/"))
              : new Date();
            setDate(pick);
          }}
        />
        <p>{startDate.toDateString()}</p>
      </div>
    </span>
  );
};

export default PlannerDates;
