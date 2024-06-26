import { getRoleDataByName } from "@/app/lib/data";
import { Role } from "@/app/lib/definitions";
import { Initiative, Habit } from "@/app/lib/definitions";
import InitiativeCard from "@/app/components/InitiativeCard/InitiativeCard";
import Task from "@/app/components/Task/Task";
import CreateTask from "@/app/components/Task/CreateTask";
import Link from "next/link";
import "./page.css";
import "../../components/InitiativeCard/InitiativeCard.css";
import "../../components/Task/Task.css";
import "../../components/RoleCard/RoleCard.css";
import "../../components/Icons/icons.css";
import "../../components/Breadcrumbs/Breadcrumbs.css";
import HabitList from "@/app/components/RoleCard/HabitList";

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
      <h1 className="roleHeader">{Role.name}</h1>
      <p className="roleDesc">{Role.description}</p>

      <h3 className="roleHeader">Initiatives</h3>
      <span className="wrapper">
        <Link className="linkButton linkRight" href={"/initiative/create"}>
          <span className="linkPlusIcon">&#x2b;</span> Add
        </Link>
        {Role.initiatives.map((init: Initiative) => (
          <InitiativeCard key={init.id} {...init} />
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
        <HabitList Role={Role} />

        {query == "habit" && (
          <>
            <span className={"" /*"createModal"*/}>
              <CreateTask
                parentType="habit"
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
    </>
  );
}
