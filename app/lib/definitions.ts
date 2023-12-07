import { Task as TaskProp } from "@prisma/client";
export interface colorSchema {
    circle: string;
    outline: string;
    shape: string;
    shapeInner: string;
  }

export type state = "set" | "selected" | "unset";
export type iconName = "task" | "chart" | "calendar" | "clock" | "square" | "link" | "expand" | "save" | "edit";
export type chronoType = "peak" | "trough" | "creative" | undefined;


export type Role = {id: number, name: string, description: string, habits: Habit[], initiatives: Initiative[]}
export type Habit = {id: number, frequency: string | null, task: TaskProp};
export type Initiative = {id: number, name: string, description: string, duration: string, durationCount: number, completed: boolean, tasks: TaskProp[]};

export interface taskIconsProp {
    icon: iconName;
    state: state;
    clickFunc: () => void;
  }

export interface TaskProps {
    title: string,
    description: string,
    priority?: string,
    estTime?: string,
    chronoType: chronoType;
    plannedStart: string,
    dueBy?: string,
    link?: string,
    parent: string,
}

export interface TaskStateProps {
  title: string,
  description: string,
  priority?: string,
  estTime?: string,
  chronoType?: chronoType;
  plannedStart: string,
  dueBy?: string,
  link?: string,
  parent: string,
  expandFunc: (toggle: "edit" | "expand", state: boolean) => void,
}