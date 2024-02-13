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
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
  expandFunc,
  selected,
  selectedField,
  setSelected,
}: TaskStateProps) => {
  const taskWrapper = useRef<HTMLDivElement>(null);
  const revealWrapper = useRef<HTMLDivElement>(null);
  const tab = useRef<HTMLSpanElement>(null);
  const active = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const radioDiv = useRef<HTMLDivElement>(null);

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
    const areaDiv = textArea.current || radioDiv.current;
    const parent = areaDiv ? areaDiv.parentElement : null;
    if (parent) {
      parent.style.height = "10px";
    }

    setTimeout(() => {
      expandFunc("expand", false);
    }, 500);
  };

  const xTransform = {
    task: 25,
    square: 57,
    clock: 89,
    chart: 121,
    calendar: 153,
    link: 185,
    expand: 25,
    save: 25,
    edit: 25,
    trash: 25,
  };

  useEffect(() => {
    const activeDiv = active.current;
    const updateText = textArea.current;
    const radios = radioDiv.current;

    if (activeDiv) {
      const activeXTransform = xTransform[selected];
      activeDiv.style.transform = `translate(${activeXTransform}px, 0px)`;
    }
    if (updateText) {
      updateText.style.opacity = ".2";
      setTimeout(() => {
        updateText.style.opacity = "1";
        updateText.value = selectedField;
      }, 400);
    }
    if (radios) {
      radios.style.opacity = ".2";
      setTimeout(() => {
        radios.style.opacity = "1";
      }, 500);
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
      setSelected(icon, field || "");
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
      <span className={field ? "animate" : ""} style={{ zIndex: "1" }}>
        <TaskIcons
          icon={icon}
          state={state}
          clickFunc={() => triggerSelect()}
        />
      </span>
    );
  };

  const inputContainer = () => {
    if (selected == "chart" || selected == "square") {
      const radioTypes =
        selected == "chart"
          ? ["peak", "trough", "recovery"]
          : ["DO", "DECIDE", "DELEGATE", "DELETE"];
      return (
        <div
          className={selected == "square" ? "priority" : ""}
          id="radioContainer"
          ref={radioDiv}
        >
          {radioTypes.map((type) => (
            <label key={type} className={`radio ${type}`}>
              {type}
              <input
                type="radio"
                checked={selectedField == type ? true : false}
                name={type}
                readOnly={true}
              />
            </label>
          ))}
        </div>
      );
    }
    return (
      <textarea
        className={`${inter.className}`}
        readOnly={true}
        ref={textArea}
      />
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
        <span className="taskHeaderIcons collapse">
          <TaskIcons
            icon="edit"
            state="set"
            clickFunc={() => expandFunc("edit", true)}
          />
          <TaskIcons
            icon="expand"
            state="set"
            clickFunc={() => toggleWrapperState()}
          />
        </span>
      </div>
      <div className="expandedWrapper">
        <div className="expandedField">
          {inputContainer()}
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

export default ExpandedTask;
