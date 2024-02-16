import Link from "next/link";
import Task from "../Task/Task";
import InitiativeCard from "../InitiativeCard/InitiativeCard";
import { Role, Habit, Initiative } from "@/app/lib/definitions";

const Role = ({
  role,
  habits,
  initiatives,
}: {
  role: Role;
  habits: Habit[];
  initiatives: Initiative[];
}) => {
  const habitCount = habits.filter((habit) => habit.tasks.length > 0).length;
  return (
    <>
      <h2 className="roleHeader">{role.name}</h2>
      <p style={{ fontSize: ".9em", paddingBottom: "8px" }}>
        {role.description}
      </p>
      <div>
        <h3 className="roleHeader">
          Initiatives{" "}
          <span className="roleHeaderCount">({initiatives.length})</span>
        </h3>
        {initiatives.map((init: Initiative) => (
          <span key={init.id}>
            <InitiativeCard {...init} />
          </span>
        ))}

        <h3 className="roleHeader">
          Habits <span className="roleHeaderCount">({habitCount})</span>
        </h3>
        {habits.map((habit: Habit) => (
          <span key={habit.id}>
            {habit.tasks.map((task) => (
              <span key={task.id}>
                <Task
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
                  parentID={habit.id}
                />
              </span>
            ))}
          </span>
        ))}
      </div>
      <Link className="linkButton" href={"/role/" + role.name}>
        <span className="linkPlusIcon">&#x2b;</span> Explore
      </Link>
    </>
  );
};

export default Role;
