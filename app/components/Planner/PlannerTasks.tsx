import Task from "../Task/Task";
import { Task as TaskProp } from "@prisma/client";

const PlannerTasks = ({ tasks }: { tasks: TaskProp[] }) => {
  return (
    <>
      {tasks.map((task: TaskProp) => (
        <span key={task.id}>
          <Task
            id={task.id}
            title={task.name}
            description={task.description}
            priority={task.priority || undefined}
            estTime={task.estTime?.toString() || undefined}
            chronoType={task.chronoType || undefined}
            plannedStart={task.plannedStart.toDateString()}
            dueBy={task.dueBy?.toDateString() || undefined}
            link={task.link || undefined}
            planner={true}
            parentID={task.habitId || task.initiativeId || undefined}
          />
        </span>
      ))}
    </>
  );
};

export default PlannerTasks;
