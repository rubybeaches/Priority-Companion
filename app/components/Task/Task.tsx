"use client";

import TaskIcons from "@/app/components/Icons/icons";
import { TaskProps, chronoType, iconName, state } from "@/app/lib/definitions";
import "./Task.css";
import { useState } from "react";

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

  const handleChecked = ({ target }: any) => {
    // console.log(target.checked);
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
    <div className="taskWrapper">
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
