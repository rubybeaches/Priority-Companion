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
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface CreateProps {
  title?: string;
  description?: string;
  priority?: string;
  estTime?: string;
  chronoType?: string;
  plannedStart?: string;
  dueBy?: string;
  link?: string;
  parent?: string;
}

const CreateTask = ({
  title,
  description,
  priority,
  estTime,
  chronoType,
  plannedStart,
  dueBy,
  link,
  parent,
}: CreateProps) => {
  const [selected, setSelected] = useState("task");
  const taskWrapper = useRef<HTMLDivElement>(null);
  const active = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const xTransform = {
    task: 25,
    square: 57,
    clock: 89,
    chart: 121,
    calendar: 153,
    link: 185,
    expand: 25,
  };

  const expandSelected = (
    icon: iconName,
    field: string | chronoType | undefined,
    expand: boolean,
    type: string
  ) => {
    const triggerSelect = () => {
      setSelected((selected) => icon || "");
      const updateText = textArea.current;
      if (updateText) {
        updateText.style.opacity = ".2";
        setTimeout(() => {
          updateText.value = field || "";
          updateText.style.opacity = "1";
        }, 500);
      }
      const activeDiv = active.current;
      if (activeDiv) {
        const activeXTransform = xTransform[icon];
        activeDiv.style.transform = `translate(${activeXTransform}px, 0px)`;
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
      <span className="animate" style={{ zIndex: "1" }}>
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
      <div className="taskHeader">
        <p className="taskTitle">{title}</p>
      </div>
      <div className="expandedWrapper">
        <div className="expandedField">
          <textarea
            className={`${inter.className}`}
            defaultValue={description}
            ref={textArea}
          />
          <div className="activeSelector" ref={active}>
            <span className="before"></span>
            <span className="after"></span>
          </div>
        </div>
        <div className="iconFieldWrapper">
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
    </div>
  );
};

export default CreateTask;
