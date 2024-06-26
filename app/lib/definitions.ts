import { Task as TaskProp } from "@prisma/client";
export interface colorSchema {
    circle: string;
    outline: string;
    shape: string;
    shapeInner: string;
  }

export type state = "set" | "selected" | "unset" | "plannerset" | "plannerselected";
export type iconName = "task" | "chart" | "calendar" | "clock" | "square" | "link" | "expand" | "save" | "edit" | "trash";
export type chronoType = "peak" | "trough" | "recovery" | undefined;
export type prioritySquare = "DO" | "DECIDE" | "DELEGATE" | "DELETE" | undefined;


export type Role = {id: number, name: string, description: string, habits: Habit[], initiatives: Initiative[]}
export type Habit = {id: number, frequency: string | null, tasks: TaskProp[]};
export type Initiative = {id: number, name: string, description: string, duration: string, durationCount: number, completed: boolean, tasks: TaskProp[]};

export interface taskIconsProp {
    icon: iconName;
    state: state;
    clickFunc: () => void;
  }

export interface TaskProps {
    title: string,
    description: string,
    priority?: prioritySquare,
    estTime?: string,
    chronoType?: chronoType;
    plannedStart: string,
    dueBy?: string,
    link?: string,
    parent?: string,
    parentID?: number,
    planner?: boolean,
}

export interface TaskStateProps extends TaskProps {
  expandFunc: (toggle: "edit" | "expand", state: boolean) => void,
  selected: iconName,
  selectedField: string,
  setSelected: (icon: iconName, field: string) => void,
  setComplete: (pathname: string) => void,
}