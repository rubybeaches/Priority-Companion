"use client";
import PlannerFilter from "./PlannerFilter";
import Link from "next/link";
import PlannerTasks from "./PlannerTasks";
import { Task as TaskProp } from "@prisma/client";
import { useState, useEffect } from "react";
import PlannerDates from "./PlannerDates";

const Planner = ({
  pathname,
  tasks,
}: {
  pathname: string;
  tasks: TaskProp[];
}) => {
  const [taskList, setTaskList] = useState(tasks);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [filter, setFilter] = useState<
    "priority" | "estTime" | "chronoType" | "link" | "description"
  >("description");
  const [filterOn, setFilterOn] = useState<boolean>(false);

  useEffect(() => {
    filterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, filter, filterOn]);

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

  const filterList = () => {
    if (filterOn) {
      const filterd = tasks.filter(
        (task) =>
          task[filter] &&
          task.plannedStart.toDateString() == startDate.toDateString()
      );
      setTaskList((taskList) => filterd);
    } else {
      const filterd = tasks.filter(
        (task) => task.plannedStart.toDateString() == startDate.toDateString()
      );
      setTaskList((taskList) => filterd);
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
          <PlannerDates startDate={startDate} setDate={updateDate} />
          <PlannerFilter filterList={updateFilter} />
          <PlannerTasks tasks={taskList} />
        </div>
      </div>
      <div className="sidebar"></div>
    </>
  );
};

export default Planner;
