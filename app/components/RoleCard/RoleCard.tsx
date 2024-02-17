"use client";
import Link from "next/link";
import Task from "../Task/Task";
import InitiativeCard from "../InitiativeCard/InitiativeCard";
import { Role, Habit, Initiative } from "@/app/lib/definitions";
import HabitList from "./HabitList";

const RoleCard = ({
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
          <InitiativeCard key={init.id} {...init} />
        ))}

        <h3 className="roleHeader">
          Habits <span className="roleHeaderCount">({habitCount})</span>
        </h3>
        <HabitList Role={role} />
      </div>
      <Link className="linkButton" href={"/role/" + role.name}>
        <span className="linkPlusIcon">&#x2b;</span> Explore
      </Link>
    </>
  );
};

export default RoleCard;
