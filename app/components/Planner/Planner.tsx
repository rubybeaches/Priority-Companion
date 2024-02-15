import { getTasks } from "@/app/lib/data";
import Task from "../Task/Task";
import Link from "next/link";

const Planner = async ({ pathname }: { pathname: string }) => {
  const tasks = await getTasks();
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
          {tasks.map((task) => (
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
        </div>
      </div>
      <div className="sidebar"></div>
    </>
  );
};

export default Planner;
