"use client";

import TaskIcons from "@/app/components/Icons/icons";
import { TaskProps, chronoType, iconName, state } from "@/app/lib/definitions";
import "./Task.css";
import { useRef, useState } from "react";

const Task = ({
  title,
  description,
  priority,
  estTime,
  chronoType,
  plannedStart,
  dueBy,
  link,
  parent,
}: TaskProps) => {
  const [selected, setSelected] = useState("");
  const taskWrapper = useRef<HTMLDivElement>(null);
  const revealWrapper = useRef<HTMLDivElement>(null);
  const tab = useRef<HTMLSpanElement>(null);

  const handleChecked = ({ target }: any) => {
    // console.log(target.checked);
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
    // document.getElementsByClassName(".expand")[0].classList.add(".collaspe")
  };

  const expandSelected = (
    icon: iconName,
    field: string | chronoType | undefined,
    expand: boolean
  ) => {
    if (!selected) {
      setSelected(description);
    }
    const triggerSelect = () => {
      setSelected((selected) => field || "");
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
      <span className="minimizedField" id={icon}>
        <TaskIcons
          icon={icon}
          state={state}
          clickFunc={() => triggerSelect()}
        />
        <input type="text" defaultValue={field} />
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
        <input onChange={handleChecked} type="checkbox" />
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
      <div className="iconFieldWrapper">
        {expandSelected("task", description, description == selected)}
        {expandSelected("square", priority, priority == selected)}
        {expandSelected("clock", estTime, estTime == selected)}
        {expandSelected("chart", chronoType, chronoType == selected)}
        {expandSelected("calendar", plannedStart, plannedStart == selected)}
        {expandSelected("link", link, link == selected)}
      </div>
    </div>
  );
};

export default Task;
