"use client";

import { TaskProps } from "@/app/lib/definitions";
import "./Task.css";
import ExpandedTask from "./ExpandedTask";
import MinimizedTask from "./MinimizedTask";
import EditTask from "./EditTask";
import { useState } from "react";

interface Task extends TaskProps {
  id: number;
}

const Task = ({
  id,
  title,
  description,
  priority,
  estTime,
  chronoType,
  plannedStart,
  dueBy,
  link,
  parent,
}: Task) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);

  const toggleState = (toggle: "edit" | "expand", state: boolean) => {
    if (toggle == "edit") {
      setEdit((expand) => state);
    } else if (toggle == "expand") {
      setExpand((expand) => state);
    }
  };

  if (edit) {
    return (
      <EditTask
        id={id}
        title={title}
        description={description}
        priority={priority}
        estTime={estTime}
        chronoType={chronoType}
        plannedStart={plannedStart}
        dueBy={dueBy}
        link={link}
        parent={parent}
      />
    );
  }

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
        expandFunc={toggleState}
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
        expandFunc={toggleState}
      />
    );
  }
};

export default Task;
