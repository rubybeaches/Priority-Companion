import { getRoleDataByName } from "@/app/lib/data";
import { Role } from "@/app/lib/definitions";
import { Initiative, Habit } from "@/app/lib/definitions";
import InitiativeCard from "@/app/components/InitiativeCard/InitiativeCard";
import Task from "@/app/components/Task/Task";
import CreateTask from "@/app/components/Task/CreateTask";
import Link from "next/link";
import "./page.css";

export default async function Role({
  params,
  searchParams,
}: {
  params: { role: string };
  searchParams?: { modal?: string };
}) {
  const Role: Role = await getRoleDataByName(params.role);
  const query = searchParams?.modal || "";

  return (
    <>
      <main className={`card ${query == "habit" ? "darken" : ""}`}>
        <h1 className="roleHeader">{Role.name}</h1>
        <p className="roleDesc">{Role.description}</p>

        <h3 className="roleHeader">Initiatives</h3>
        <span className="wrapper">
          <Link className="linkButton linkRight" href={"/initiative/create"}>
            <span className="linkPlusIcon">&#x2b;</span> Add
          </Link>
          {Role.initiatives.map((init: Initiative) => (
            <span key={init.id}>
              <InitiativeCard {...init} />
            </span>
          ))}
        </span>

        <h3 className="roleHeader">Habits</h3>
        <span className="wrapper">
          <Link
            className="linkButton linkRight"
            href={{
              pathname: `/role/${params.role}`,
              query: { modal: "habit" },
            }}
            replace
          >
            <span className="linkPlusIcon">&#x2b;</span> Add
          </Link>
          {Role.habits.map((habit: Habit) => (
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
              />
            </span>
          ))}

          {query == "habit" && (
            <>
              <span className={"" /*"createModal"*/}>
                <CreateTask
                  parent="habit"
                  roleID={Role.id}
                  roleName={Role.name}
                />
                {/*<Link
                className="linkButton linkRight"
                href={`/role/${params.role}`}
                replace
              >
                <span className="linkPlusIcon">&#10006;</span> Close
              </Link>*/}
              </span>
            </>
          )}
        </span>
      </main>
    </>
  );
}
