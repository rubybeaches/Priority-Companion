import Link from "next/link";
import Task from "../Task/Task";
import { Role, Habit, Initiative } from "@/app/lib/definitions";
import { getHabitByRoleCount } from "@/app/lib/data";
import "./Role.css";

const Role = async ({
  role,
  habits,
  initiatives,
}: {
  role: Role;
  habits: Habit[];
  initiatives: Initiative[];
}) => {
  const habitCount = await getHabitByRoleCount(role.id);

  return (
    <>
      <h2 className="roleHeader">{role.name}</h2>
      <p>{role.description}</p>
      <div>
        <h3 className="roleHeader">
          Habits <span className="roleHeaderCount">({habitCount})</span>
        </h3>
        {habits.map((habit: Habit) => (
          <span key={habit.id}>
            <Task
              title={habit.task.name}
              description={habit.task.description}
              priority={habit.task.priority || undefined}
              estTime={habit.task.estTime?.toString() || undefined}
              chronoType={habit.task.chronoType || undefined}
              plannedStart={habit.task.plannedStart.toDateString()}
              dueBy={habit.task.dueBy?.toDateString() || undefined}
              link={habit.task.link || undefined}
              parent={"habit"}
            />
          </span>
        ))}

        <h3 className="roleHeader">Initiatives</h3>
        {initiatives.map((init: Initiative) => (
          <p key={init.id}>{init.name}</p>
        ))}
      </div>
      <button
        key={role.id}
        style={{
          border: "none",
          backgroundColor: "#B1CEFF",
          padding: "10px 10px",
          borderRadius: "10px",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "#427BDE",
            backgroundColor: "#B1CEFF",
          }}
          href={"/role/" + role.name}
        >
          Explore
        </Link>
      </button>
    </>
  );
};

export default Role;
