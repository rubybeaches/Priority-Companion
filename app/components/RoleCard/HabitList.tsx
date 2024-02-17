"use client";
import { useState } from "react";
import { Role } from "@/app/lib/definitions";
import { Task as TaskProp } from "@prisma/client";
import Task from "../Task/Task";

const HabitList = ({ Role }: { Role: Role }) => {
  const [tasks, setTasks] = useState(() =>
    Role.habits.map((habit) => {
      if (habit.tasks.length > 0 && habit.tasks[0].completed == false) {
        return habit.tasks[0];
      }
    })
  );

  return (
    <>
      {tasks.map(
        (task) =>
          task && (
            <Task
              key={task.id}
              id={task.id}
              title={task.name}
              description={task.description}
              priority={task.priority || undefined}
              estTime={task.estTime?.toString() || undefined}
              chronoType={task.chronoType || undefined}
              plannedStart={new Date(
                task.plannedStart.toLocaleString()
              ).toDateString()}
              dueBy={task.dueBy?.toDateString() || undefined}
              link={task.link || undefined}
              parent={"habit"}
              parentID={task.habitId || undefined}
            />
          )
      )}
    </>
  );
};

export default HabitList;
