export interface colorSchema {
    circle: string;
    outline: string;
    shape: string;
    shapeInner: string;
  }
  
export interface taskIconsProp {
    icon: "task" | "chart" | "calendar" | "clock" | "square" | "link";
    state: "set" | "selected" | "unset";
  }