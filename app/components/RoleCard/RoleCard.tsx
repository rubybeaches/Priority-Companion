import Link from "next/link";
import Task from "../Task/Task";
import InitiativeCard from "../InitiativeCard/InitiativeCard";
import { Role, Habit, Initiative } from "@/app/lib/definitions";
import "./RoleCard.css";

const Role = ({
  role,
  habits,
  initiatives,
}: {
  role: Role;
  habits: Habit[];
  initiatives: Initiative[];
}) => {
  return (
    <>
      <h2 className="roleHeader">{role.name}</h2>
      <p style={{ fontSize: ".9em", paddingBottom: "8px" }}>
        {role.description}
      </p>
      <div>
        <h3 className="roleHeader">
          Habits <span className="roleHeaderCount">({habits.length})</span>
        </h3>
        {habits.map((habit: Habit) => (
          <span key={habit.id}>
            <Task
              id={habit.task.id}
              title={habit.task.name}
              description={habit.task.description}
              priority={habit.task.priority || undefined}
              estTime={habit.task.estTime?.toString() || undefined}
              chronoType={habit.task.chronoType || undefined}
              plannedStart={habit.task.plannedStart.toDateString()}
              dueBy={habit.task.dueBy?.toDateString() || undefined}
              link={habit.task.link || undefined}
              parent={"habit"}
              parentID={habit.id}
            />
          </span>
        ))}

        <h3 className="roleHeader">
          Initiatives{" "}
          <span className="roleHeaderCount">({initiatives.length})</span>
        </h3>
        {initiatives.map((init: Initiative) => (
          <span key={init.id}>
            <InitiativeCard {...init} />
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
