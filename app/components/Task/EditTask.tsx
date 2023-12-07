"use client";

import TaskIcons from "@/app/components/Icons/icons";
import {
  TaskStateProps,
  chronoType,
  iconName,
  state,
} from "@/app/lib/definitions";
import { UpdateTask } from "@/app/lib/actions";
import "./Task.css";
import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

interface EditProps extends TaskStateProps {
  id: number;
}

const EditTask = ({
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
  expandFunc,
}: EditProps) => {
  const [selected, setSelected] = useState("task");
  const active = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const createForm = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const pathname = usePathname();

  // Fields for task submission
  const [taskTitle, setTaskTitle] = useState(title);
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

  const updateForm = (inputText: string, setter: (text: string) => void) => {
    setter(inputText);
  };

  const postEdit = async () => {
    setPending((pending) => true);
    const updated = await UpdateTask({
      taskID: id,
      pathName: pathname,
      title: taskTitle,
      description: newDescription || "",
      priority: newPriority,
      estTime: newTime,
      chronoType: newChronotype,
      plannedStart: newPlannedDate || "",
      link: newLink,
      parent: "",
    });

    expandFunc("edit", false);
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
    <div className="taskWrapper">
      <form
        ref={createForm}
        action={() => postEdit()}
        onSubmit={() => setPending(true)}
      >
        <div className="taskHeader">
          <input
            type="text"
            defaultValue={taskTitle}
            className={`${inter.className} inputTitle `}
            onChange={(e) => {
              updateForm(e.target.value, setTaskTitle);
            }}
          />
          <span
            className={`taskHeaderIcons save ${
              taskTitle && newDescription && !pending ? "set" : "unset"
            }`}
          >
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
            {expandSelected(
              "square",
              newPriority,
              "square" == selected,
              "text"
            )}
            {expandSelected("clock", newTime, "clock" == selected, "number")}
            {expandSelected(
              "chart",
              newChronotype,
              "chart" == selected,
              "text"
            )}
            {expandSelected(
              "calendar",
              newPlannedDate,
              "calendar" == selected,
              "text"
            )}
            {expandSelected("link", newLink, "link" == selected, "url")}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;