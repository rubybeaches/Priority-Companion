"use client";

import TaskIcons from "@/app/components/Icons/icons";
import { TaskProps, chronoType, iconName, state } from "@/app/lib/definitions";
import "./Task.css";
import { useState, useRef } from "react";

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

  const handleClick = (field: string | chronoType | undefined) => {
    console.log(field);
    setSelected((selected) => field || "");
  };

  const expandSelected = (
    icon: iconName,
    field: string | chronoType | undefined,
    expand: boolean
  ) => {
    if (!selected) {
      setSelected(description);
    }
    const state = field ? (expand ? "selected" : "set") : "unset";

    const triggerClick = () => {
      document
        .getElementsByClassName("minimizedField")[0]
        .classList.add("collapseField");

      setTimeout(() => {
        handleClick(field);
      }, 700);
    };

    if (!expand) {
      return (
        <TaskIcons icon={icon} state={state} clickFunc={() => triggerClick()} />
      );
    }
    return (
      <span className="minimizedField">
        <TaskIcons
          icon={icon}
          state={state}
          clickFunc={() => handleClick(field)}
        />
        <span>{field}</span>
      </span>
    );
  };

  return (
    <div className="taskWrapper">
      <p className="taskTitle">{title}</p>
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
