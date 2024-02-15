"use client";
import { useRef } from "react";
import TaskIcons from "../Icons/icons";

const PlannerFilter = ({
  filterList,
}: {
  filterList: (
    filter: "priority" | "estTime" | "chronoType" | "link",
    filterOn: boolean
  ) => void;
}) => {
  const square = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const chart = useRef<HTMLSpanElement>(null);
  const link = useRef<HTMLSpanElement>(null);

  const toggleActive = (
    filter: "priority" | "estTime" | "chronoType" | "link"
  ) => {
    const active: any = {
      priority: square.current,
      estTime: clock.current,
      chronoType: chart.current,
      link: link.current,
    };

    for (const ref in active) {
      ref != filter
        ? active[ref].classList.remove("f-active")
        : active[ref].classList.toggle("f-active");
    }
    const hasFilter = active[filter].classList.contains("f-active");
    filterList(filter, hasFilter);
  };

  return (
    <div className="filterContainer">
      <span className="filter f-active" ref={square}>
        <TaskIcons
          icon="square"
          state={"plannerset"}
          clickFunc={() => toggleActive("priority")}
        />
        <p>Priority</p>
      </span>
      <span className="filter" ref={clock}>
        <TaskIcons
          icon="clock"
          state={"plannerset"}
          clickFunc={() => toggleActive("estTime")}
        />
        <p>Time Commitment</p>
      </span>
      <span className="filter" ref={chart}>
        <TaskIcons
          icon="chart"
          state={"plannerset"}
          clickFunc={() => toggleActive("chronoType")}
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
