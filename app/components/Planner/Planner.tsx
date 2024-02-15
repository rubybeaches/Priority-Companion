"use client";
import PlannerFilter from "./PlannerFilter";
import Link from "next/link";
import PlannerTasks from "./PlannerTasks";
import { Task as TaskProp } from "@prisma/client";
import { useState } from "react";
import { chronoType, prioritySquare } from "@/app/lib/definitions";

const Planner = ({
  pathname,
  tasks,
}: {
  pathname: string;
  tasks: TaskProp[];
}) => {
  const [taskList, setTaskList] = useState(tasks);

  const filterList = (
    filter: "priority" | "estTime" | "chronoType" | "link",
    filterOn: boolean
  ) => {
    if (filterOn) {
      const filterd = tasks.filter((task) => task[filter]);
      setTaskList(filterd);
    } else {
      setTaskList(tasks);
    }
  };

  return (
    <>
      <div className="sidebarContainer" id="planner">
        <Link
          className="linkButton linkRight"
          href={"/"}
          replace
          style={{ left: "400px" }}
        >
          <span className="plannerClose">&#10006;</span>
        </Link>
        <div className="taskContainer">
          <h4>Priority Planner</h4>
          <PlannerFilter filterList={filterList} />
          <PlannerTasks tasks={taskList} />
        </div>
      </div>
      <div className="sidebar"></div>
    </>
  );
};

export default Planner;
