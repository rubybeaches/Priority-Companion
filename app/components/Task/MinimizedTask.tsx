"use client";

import TaskIcons from "@/app/components/Icons/icons";
import {
  TaskStateProps,
  chronoType,
  iconName,
  state,
} from "@/app/lib/definitions";
import "./Task.css";
import { useRef, useState } from "react";

const MinimizedTask = ({
  title,
  description,
  priority,
  estTime,
  chronoType,
  plannedStart,
  dueBy,
  link,
  parent,
  expandFunc,
}: TaskStateProps) => {
  const [selected, setSelected] = useState("task");
  const taskWrapper = useRef<HTMLDivElement>(null);
  const revealWrapper = useRef<HTMLDivElement>(null);
  const tab = useRef<HTMLSpanElement>(null);
  const active = useRef<HTMLSpanElement>(null);

  const handleChecked = (checked: boolean) => {
    const taskDiv = taskWrapper.current;
    const reveal = revealWrapper.current;
    const tabSpan = tab.current;

    if (reveal && taskDiv && tabSpan) {
      const width = taskDiv.clientWidth;
      const height = `${taskDiv.clientHeight}px`;

      reveal.style.width = `${width}px`;
      reveal.style.height = height;

      tabSpan.style.width = `${width / 2}px`;
      tabSpan.style.height = height;
      tabSpan.style.left = `${width}px`;
    }
  };

  const toggleWrapperState = () => {
    // changed to expanded or minimized state
    expandFunc(true);
  };

  const xTransform = {
    task: 4,
    square: 36,
    clock: 68,
    chart: 100,
    calendar: 132,
    link: 164,
    expand: 4,
    save: 4,
  };

  const expandSelected = (
    icon: iconName,
    field: string | chronoType | undefined,
    expand: boolean,
    type: string
  ) => {
    const triggerSelect = () => {
      if (field) {
        setSelected((selected) => icon);
      } else {
        toggleWrapperState();
      }

      const activeSpan = active.current;
      if (activeSpan) {
        const activeXTransform = xTransform[icon];

        activeSpan.style.width = "120px";
        setTimeout(() => {
          activeSpan.style.width = "210px";
        }, 500);
        activeSpan.style.transform = `translate(${activeXTransform}px, 0px)`;
      }
    };

    const state = field ? (expand ? "selected" : "set") : "unset";

    if (!expand) {
      return (
        <TaskIcons
          icon={icon}
          state={state}
          clickFunc={() => triggerSelect()}
        />
      );
    }
    return (
      <span
        className={field ? "minimizedField animate" : "minimizedField"}
        id={icon}
      >
        <TaskIcons
          icon={icon}
          state={state}
          clickFunc={() => triggerSelect()}
        />
        <input type={type} defaultValue={field} />
      </span>
    );
  };

  return (
    <div className="taskWrapper" ref={taskWrapper}>
      <span className="tab" ref={tab}></span>
      <div className="revealWrapper" ref={revealWrapper}>
        <span className="taskBehindWrapper">
          <h4>Complete {title}</h4>
          <button>yes</button>
          <button>no</button>
        </span>
      </div>
      <label className="checkboxWrapper">
        <input
          onChange={(e) => handleChecked(e.target.checked)}
          type="checkbox"
        />
        <span className="checkcircle"></span>
      </label>
      <div className="taskHeader">
        <p className="taskTitle">{title}</p>
        <span className="taskHeaderIcons expand">
          <TaskIcons
            icon="expand"
            state="set"
            clickFunc={() => toggleWrapperState()}
          />
        </span>
      </div>
      <div className="iconFieldWrapper" style={{ position: "relative" }}>
        <span className="minimizedField minimizedFieldBack" ref={active}></span>
        {expandSelected("task", description, "task" == selected, "text")}
        {expandSelected("square", priority, "square" == selected, "text")}
        {expandSelected("clock", estTime, "clock" == selected, "number")}
        {expandSelected("chart", chronoType, "chart" == selected, "text")}
        {expandSelected(
          "calendar",
          plannedStart,
          "calendar" == selected,
          "text"
        )}
        {expandSelected("link", link, "link" == selected, "url")}
      </div>
    </div>
  );
};

export default MinimizedTask;
