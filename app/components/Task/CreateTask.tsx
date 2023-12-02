"use client";

import TaskIcons from "@/app/components/Icons/icons";
import {
  TaskStateProps,
  chronoType,
  iconName,
  state,
} from "@/app/lib/definitions";
import { createHabit } from "@/app/lib/actions";
import "./Task.css";
import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface CreateProps {
  title?: string;
  description?: string;
  priority?: string;
  estTime?: string;
  chronoType?: chronoType;
  plannedStart?: string;
  dueBy?: string;
  link?: string;
  parent?: string;
  roleID: number;
  roleName: string;
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
  roleID,
  roleName,
}: CreateProps) => {
  const [selected, setSelected] = useState("task");
  const active = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const scrollToRef = useRef<HTMLDivElement>(null);
  const createForm = useRef<HTMLFormElement>(null);

  // Fields for task submission
  const [taskTitle, setTaskTitle] = useState("");
  const [newDescription, setNeDescription] = useState(description);
  const [newPriority, setNewPriority] = useState(priority);
  const [newTime, setNewTime] = useState(estTime);
  const [newChronotype, setNewChronotype] = useState<chronoType>(chronoType);
  const [newPlannedDate, setNewPlannedDate] = useState(plannedStart);
  const [newLink, setNewLink] = useState(link);

  const taskStates: any = {
    task: { getter: newDescription, setter: setNeDescription },
    square: { getter: newPriority, setter: setNewPriority },
    clock: { getter: newTime, setter: setNewTime },
    chart: { getter: newChronotype, setter: setNewChronotype },
    calendar: { getter: newPlannedDate, setter: setNewPlannedDate },
    link: { getter: newLink, setter: setNewLink },
  };

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ block: "end" });
    }
  }, []);

  const updateForm = (inputText: string, setter: (text: string) => void) => {
    setter(inputText);
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
  };

  const expandSelected = (
    icon: iconName,
    field: string | chronoType | undefined,
    expand: boolean,
    type: string
  ) => {
    const triggerSelect = () => {
      if (icon == selected) {
        return;
      }
      setSelected((selected) => icon || "");
      const updateText = textArea.current;
      if (updateText) {
        updateText.style.opacity = ".2";
        setTimeout(() => {
          updateText.value = field || "";
          updateText.style.opacity = "1";
        }, 400);
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
      <span className={field ? "animate" : ""} style={{ zIndex: "1" }}>
        <TaskIcons
          icon={icon}
          state={state}
          clickFunc={() => triggerSelect()}
        />
      </span>
    );
  };

  return (
    <div className="taskWrapper" ref={scrollToRef}>
      <form
        ref={createForm}
        action={() =>
          createHabit({
            roleID,
            roleName,
            title: taskTitle,
            description: newDescription || "",
            priority: newPriority,
            estTime: newTime,
            chronoType: newChronotype,
            plannedStart: newPlannedDate || "",
            link: newLink,
            parent: parent || "",
          })
        }
      />
      <div className="taskHeader">
        <input
          type="text"
          defaultValue={taskTitle}
          className={`${inter.className} inputTitle `}
          onChange={(e) => {
            updateForm(e.target.value, setTaskTitle);
          }}
        />
        <span className="taskHeaderIcons save">
          <TaskIcons
            icon="save"
            state="set"
            clickFunc={() => createForm.current?.requestSubmit()}
          />
        </span>
      </div>
      <div className="expandedWrapper">
        <div className="expandedField">
          <textarea
            className={`${inter.className}`}
            onChange={(e) => {
              updateForm(e.target.value, taskStates[selected].setter);
            }}
            defaultValue={taskStates[selected].getter}
            ref={textArea}
          />
          <div className="activeSelector" ref={active}>
            <span className="before"></span>
            <span className="after"></span>
          </div>
        </div>
        <div className="iconFieldWrapper">
          {expandSelected("task", newDescription, "task" == selected, "text")}
          {expandSelected("square", newPriority, "square" == selected, "text")}
          {expandSelected("clock", newTime, "clock" == selected, "number")}
          {expandSelected("chart", newChronotype, "chart" == selected, "text")}
          {expandSelected(
            "calendar",
            newPlannedDate,
            "calendar" == selected,
            "text"
          )}
          {expandSelected("link", newLink, "link" == selected, "url")}
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
