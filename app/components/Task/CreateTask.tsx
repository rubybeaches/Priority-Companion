"use client";

import TaskIcons from "@/app/components/Icons/icons";
import { TaskProps, chronoType, iconName, state } from "@/app/lib/definitions";
import { createHabit } from "@/app/lib/actions";
import "./Task.css";
import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";
import path from "path";

const inter = Inter({ subsets: ["latin"] });

interface CreateProps {
  roleID: number;
  roleName: string;
  parentType?: string;
}

const CreateTask = ({ roleID, roleName, parentType }: CreateProps) => {
  const [selected, setSelected] = useState("task");
  const active = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const scrollToRef = useRef<HTMLDivElement>(null);
  const createForm = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Fields for task submission
  const [taskTitle, setTaskTitle] = useState("");
  const [newDescription, setNeDescription] = useState();
  const [newPriority, setNewPriority] = useState();
  const [newTime, setNewTime] = useState();
  const [newChronotype, setNewChronotype] = useState<chronoType>();
  const [newPlannedDate, setNewPlannedDate] = useState();
  const [newLink, setNewLink] = useState();

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
    edit: 25,
    trash: 25,
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
            parent: parentType || "",
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
            icon="trash"
            state={"set"}
            clickFunc={() => router.push(pathname)}
          />
          <span className={`${taskTitle && newDescription ? "set" : "unset"}`}>
            <TaskIcons
              icon="save"
              state={"set"}
              clickFunc={() =>
                taskTitle && newDescription
                  ? createForm.current?.requestSubmit()
                  : ""
              }
            />
          </span>
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
