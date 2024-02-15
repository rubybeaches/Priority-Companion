"use client";
import { useRef } from "react";
import TaskIcons from "../Icons/icons";

const PlannerFilter = () => {
  const square = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const chart = useRef<HTMLSpanElement>(null);
  const link = useRef<HTMLSpanElement>(null);

  const toggleActive = (icon: string) => {
    const active: any = {
      square: square.current,
      clock: clock.current,
      chart: chart.current,
      link: link.current,
    };

    for (const ref in active) {
      active[ref].classList.remove("f-active");
    }
    active[icon].classList.toggle("f-active");
  };

  return (
    <div className="filterContainer">
      <span className="filter f-active" ref={square}>
        <TaskIcons
          icon="square"
          state={"plannerset"}
          clickFunc={() => toggleActive("square")}
        />
        <p>Priority</p>
      </span>
      <span className="filter" ref={clock}>
        <TaskIcons
          icon="clock"
          state={"plannerset"}
          clickFunc={() => toggleActive("clock")}
        />
        <p>Time Commitment</p>
      </span>
      <span className="filter" ref={chart}>
        <TaskIcons
          icon="chart"
          state={"plannerset"}
          clickFunc={() => toggleActive("chart")}
        />
        <p>Energy Period</p>
      </span>
      <span className="filter" ref={link}>
        <TaskIcons
          icon="link"
          state={"plannerset"}
          clickFunc={() => toggleActive("link")}
        />
        <p>Links</p>
      </span>
    </div>
  );
};

export default PlannerFilter;
