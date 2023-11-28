"use client";

import TaskIcons from "@/app/components/Icons/icons";
import { TaskProps, chronoType, iconName, state } from "@/app/lib/definitions";
import "./Task.css";
import { useRef, useState } from "react";
import { Space_Mono } from "next/font/google";

const ExpandedTask = ({
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
  const active = useRef<HTMLDivElement>(null);

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
    // document.getElementsByClassName(".expand")[0].classList.add(".collaspe")
  };

  const xTransform = {
    task: 31,
    square: 63,
    clock: 95,
    chart: 127,
    calendar: 159,
    link: 191,
    expand: 31,
  };

  const expandSelected = (
    icon: iconName,
    field: string | chronoType | undefined,
    expand: boolean,
    type: string
  ) => {
    if (!selected) {
      setSelected(description);
    }
    const triggerSelect = () => {
      setSelected((selected) => field || "");
    };

    const state = field ? (expand ? "selected" : "set") : "unset";
    const activeDiv = active.current;
    if (activeDiv && expand) {
      const activeXTransform = xTransform[icon];
      activeDiv.style.transform = `translate(${activeXTransform}px, 0px)`;
    }

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
      <span style={{ zIndex: "1" }}>
        <TaskIcons
          icon={icon}
          state={state}
          clickFunc={() => triggerSelect()}
        />
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
      <div className="expandedWrapper">
        <div className="expandedField">
          <div className="activeSelector" ref={active}>
            <span className="before"></span>
            <span className="after"></span>
          </div>
        </div>
        <div className="iconFieldWrapper">
          {expandSelected("task", description, description == selected, "text")}
          {expandSelected("square", priority, priority == selected, "text")}
          {expandSelected("clock", estTime, estTime == selected, "number")}
          {expandSelected("chart", chronoType, chronoType == selected, "text")}
          {expandSelected(
            "calendar",
            plannedStart,
            plannedStart == selected,
            "text"
          )}
          {expandSelected("link", link, link == selected, "url")}
        </div>
      </div>
    </div>
  );
};

export default ExpandedTask;
