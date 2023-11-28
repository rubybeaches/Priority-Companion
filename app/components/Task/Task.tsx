"use client";

import { TaskProps } from "@/app/lib/definitions";
import "./Task.css";
import ExpandedTask from "./ExpandedTask";
import MinimizedTask from "./MinimizedTask";
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
  const [expand, setExpand] = useState(false);

  const toggleExpand = (state: boolean) => {
    setExpand((expand) => state);
  };

  if (expand) {
    return (
      <ExpandedTask
        title={title}
        description={description}
        priority={priority}
        estTime={estTime}
        chronoType={chronoType}
        plannedStart={plannedStart}
        dueBy={dueBy}
        link={link}
        parent={parent}
        expandFunc={toggleExpand}
      />
    );
  } else {
    return (
      <MinimizedTask
        title={title}
        description={description}
        priority={priority}
        estTime={estTime}
        chronoType={chronoType}
        plannedStart={plannedStart}
        dueBy={dueBy}
        link={link}
        parent={parent}
        expandFunc={toggleExpand}
      />
    );
  }
};

export default Task;
