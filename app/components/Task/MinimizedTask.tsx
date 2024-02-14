"use client";

import TaskIcons from "@/app/components/Icons/icons";
import {
  TaskStateProps,
  chronoType,
  prioritySquare,
  iconName,
  state,
} from "@/app/lib/definitions";
import "./Task.css";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  selected,
  selectedField,
  setSelected,
  setComplete,
}: TaskStateProps) => {
  const taskWrapper = useRef<HTMLDivElement>(null);
  const revealWrapper = useRef<HTMLDivElement>(null);
  const tab = useRef<HTMLSpanElement>(null);
  const active = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  const handleChecked = (checked: boolean) => {
    const taskDiv = taskWrapper.current;
    const reveal = revealWrapper.current;
    const tabSpan = tab.current;

    if (reveal && taskDiv && tabSpan) {
      const width = taskDiv.clientWidth;
      const height = taskDiv.clientHeight;

      reveal.style.width = `${checked ? width : 0}px`;
      reveal.style.height = `${height}px`;

      tabSpan.style.width = `${checked ? width / 2 : 0}px`;
      tabSpan.style.height = `${height}px`;
      tabSpan.style.left = `${checked ? width : 0}px`;
    }
  };

  const toggleWrapperState = () => {
    // changed to expanded or minimized state
    expandFunc("expand", true);
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
    edit: 4,
    trash: 4,
  };

  useEffect(() => {
    const activeSpan = active.current;
    if (activeSpan) {
      const activeXTransform = xTransform[selected];

      activeSpan.style.width = "120px";
      setTimeout(() => {
        activeSpan.style.width = "210px";
      }, 500);
      activeSpan.style.transform = `translate(${activeXTransform}px, 0px)`;
    }
  });

  const expandSelected = (
    icon: iconName,
    field: string | chronoType | prioritySquare | undefined,
    expand: boolean,
    type: string
  ) => {
    const triggerSelect = () => {
      if (icon == selected) {
        return;
      }
      if (field) {
        setSelected(icon, icon == "clock" ? estTime || "" : field);
      } else {
        setSelected(icon, "");
        toggleWrapperState();
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
        <input
          readOnly={true}
          type={type}
          className={icon == "chart" || icon == "square" ? field : icon}
          value={field}
        />
      </span>
    );
  };

  return (
    <div className="taskWrapper" ref={taskWrapper}>
      <span className="tab" ref={tab}></span>
      <div className="revealWrapper" ref={revealWrapper}>
        <span className="taskBehindWrapper">
          <form action={() => setComplete(pathname)}>
            {/* <h4>Complete {title}</h4> */}
            <label>Enter minutes taken to complete:</label>
            <input type="number" name="timer" />
            <button>Mark Complete</button>
          </form>
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
        {expandSelected(
          "square",
          priority,
          "square" == selected,
          priority ? "submit" : "text"
        )}
        {expandSelected(
          "clock",
          estTime ? estTime + " mins" : "",
          "clock" == selected,
          estTime ? "submit" : "number"
        )}
        {expandSelected(
          "chart",
          chronoType,
          "chart" == selected,
          chronoType ? "submit" : "text"
        )}
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
