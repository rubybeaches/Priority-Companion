export interface colorSchema {
    circle: string;
    outline: string;
    shape: string;
    shapeInner: string;
  }

export type state = "set" | "selected" | "unset";
export type iconName = "task" | "chart" | "calendar" | "clock" | "square" | "link" | "expand";
export type chronoType = "peak" | "trough" | "creative" | undefined;
  
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