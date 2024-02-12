"use client";

import { TaskProps, iconName } from "@/app/lib/definitions";
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
  parentID,
}: Task) => {
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<iconName>("task");
  const [selectedField, setSelectedField] = useState(description);

  const toggleState = (toggle: "edit" | "expand", state: boolean) => {
    if (toggle == "edit") {
      setEdit((expand) => state);
    } else if (toggle == "expand") {
      setExpand((expand) => state);
    }
  };

  const setSelectedState = (icon: iconName, field: string) => {
    setSelectedIcon((selectedIcon) => icon);
    setSelectedField((selectedField) => field);
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
        parentID={parentID}
        expandFunc={toggleState}
        selected={selectedIcon}
        selectedField={selectedField}
        setSelected={setSelectedState}
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
        selected={selectedIcon}
        selectedField={selectedField}
        setSelected={setSelectedState}
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
        selected={selectedIcon}
        selectedField={selectedField}
        setSelected={setSelectedState}
      />
    );
  }
};

export default Task;
