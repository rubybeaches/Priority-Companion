"use client";

import TaskIcons from "@/app/components/Icons/icons";
import {
  TaskProps,
  chronoType,
  prioritySquare,
  iconName,
  state,
} from "@/app/lib/definitions";
import { createHabit } from "@/app/lib/actions";
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
  const [selectedField, setSelectedField] = useState("");
  const active = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const radioDiv = useRef<HTMLDivElement>(null);
  const minWrapper = useRef<HTMLDivElement>(null);
  const scrollToRef = useRef<HTMLDivElement>(null);
  const createForm = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Fields for task submission
  const [taskTitle, setTaskTitle] = useState("Task Title");
  const [newDescription, setNeDescription] = useState();
  const [newPriority, setNewPriority] = useState<prioritySquare>();
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
    setSelected(selected);
    setSelectedField(inputText);
  };

  const asyncPend = () => {
    setPending(true);
    const editDiv = scrollToRef.current;

    if (editDiv) {
      editDiv.classList.add("animate");
    }

    createForm.current?.requestSubmit();
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
    field: string | chronoType | prioritySquare | undefined,
    expand: boolean,
    type: string
  ) => {
    const triggerSelect = () => {
      if (icon == selected) {
        return;
      }
      setSelected((selected) => icon || "");
      setSelectedField((selectedField) => field || "");
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

  function getFormattedDate(date: Date) {
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return year + "-" + month + "-" + day;
  }

  const inputContainer = () => {
    if (selected == "chart" || selected == "square") {
      const radioTypes =
        selected == "chart"
          ? ["peak", "trough", "recovery"]
          : ["DO", "DECIDE", "DELEGATE", "DELETE"];
      return (
        <div
          className={selected == "square" ? "priority" : ""}
          id="inputContainer"
          ref={radioDiv}
        >
          {radioTypes.map((type) => (
            <label key={type} className={`radio ${type}`}>
              {type}
              <input
                type="radio"
                checked={selectedField == type ? true : false}
                name={type}
                onChange={(e) => {
                  updateForm(e.target.name, taskStates[selected].setter);
                }}
              />
            </label>
          ))}
        </div>
      );
    }
    if (selected == "calendar") {
      const dueDate = getFormattedDate(new Date(taskStates[selected].getter));
      return (
        <div id="inputContainer">
          <input
            type="text"
            readOnly={true}
            className="editDateHeader"
            value={taskStates[selected].getter}
            style={{ height: taskStates[selected].getter ? "" : "0px" }}
          />
          <input
            type="date"
            className="editDatePicker"
            value={dueDate}
            onChange={(e) => {
              let setDate = e.target.value.replace(/-/g, "/");
              setDate = new Date(setDate).toDateString();
              updateForm(setDate, taskStates[selected].setter);
            }}
          />
        </div>
      );
    }
    if (selected == "clock") {
      return (
        <div id="inputContainer" ref={minWrapper}>
          <div className="minBubble">
            <input
              type="number"
              value={taskStates[selected].getter}
              onChange={(e) => {
                updateForm(e.target.value, taskStates[selected].setter);
              }}
            />
            mins
          </div>
        </div>
      );
    }
    return (
      <textarea
        className={`${inter.className}`}
        onChange={(e) => {
          updateForm(e.target.value, taskStates[selected].setter);
        }}
        defaultValue={taskStates[selected].getter}
        ref={textArea}
      />
    );
  };

  return (
    <div className="taskWrapper edit" ref={scrollToRef}>
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
          <span
            className={`${
              taskTitle && newDescription && !pending ? "set" : "unset"
            }`}
          >
            <TaskIcons
              icon="save"
              state={"set"}
              clickFunc={() => (taskTitle && newDescription ? asyncPend() : "")}
            />
          </span>
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
