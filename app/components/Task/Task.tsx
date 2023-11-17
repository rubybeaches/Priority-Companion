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

  const expandSelected = (
    icon: iconName,
    field: string | chronoType | undefined,
    expand: boolean
  ) => {
    if (!selected && priority) {
      setSelected(priority);
    }
    const state = field ? (expand ? "selected" : "set") : "unset";

    if (!expand) {
      return <TaskIcons icon={icon} state={state} />;
    }
    return (
      <span className="minimizedField">
        <TaskIcons icon={icon} state={state} />
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
