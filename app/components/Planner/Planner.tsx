"use client";
import PlannerFilter from "./PlannerFilter";
import Link from "next/link";
import PlannerTasks from "./PlannerTasks";
import { Task as TaskProp } from "@prisma/client";
import { useState, useMemo } from "react";
import PlannerDates from "./PlannerDates";

const Planner = ({
  pathname,
  tasks,
}: {
  pathname: string;
  tasks: TaskProp[];
}) => {
  //const [taskList, setTaskList] = useState(tasks);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [filter, setFilter] = useState<
    "priority" | "estTime" | "chronoType" | "link" | "description"
  >("description");
  const [filterOn, setFilterOn] = useState<boolean>(false);

  const updateDate = (date: Date) => {
    setStartDate((startDate) => date);
  };

  const updateFilter = (
    filterUpdate: "priority" | "estTime" | "chronoType" | "link",
    filterBool: boolean
  ) => {
    setFilter((filter) => filterUpdate);
    setFilterOn((filterOn) => filterBool);
  };

  const filterList = useMemo(() => {
    return tasks.filter((task) => {
      return filterOn
        ? task[filter] &&
            new Date(task.plannedStart.toLocaleString()).toDateString() ==
              startDate.toDateString()
        : new Date(task.plannedStart.toLocaleString()).toDateString() ==
            startDate.toDateString();
    });
  }, [filterOn, filter, tasks, startDate]);

  return (
    <>
      <div className="sidebarContainer" id="planner">
        <Link
          className="linkButton linkRight"
          href={"/"}
          replace
          style={{ left: "500px" }}
        >
          <span className="plannerClose">&#10006;</span>
        </Link>
        <div className="taskContainer">
          <h4>Priority Planner</h4>
          <PlannerDates startDate={startDate} setDate={updateDate} />
          <PlannerFilter filterList={updateFilter} />
          <PlannerTasks tasks={filterList} />
        </div>
      </div>
      <div className="sidebar"></div>
    </>
  );
};

export default Planner;
