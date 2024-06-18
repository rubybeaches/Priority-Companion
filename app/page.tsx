import { Dancing_Script } from "next/font/google";
import { getRoles } from "./lib/data";
import { getTasks } from "@/app/lib/data";
import RoleCard from "./components/RoleCard/RoleCard";
import Planner from "./components/Planner/Planner";
import Image from "next/image";
import Link from "next/link";
const dancer = Dancing_Script({ subsets: ["latin"], weight: ["700"] });
import "./page.css";
import "./components/InitiativeCard/InitiativeCard.css";
import "./components/Task/Task.css";
import "./components/RoleCard/RoleCard.css";
import "./components/Icons/icons.css";
import "./components/Breadcrumbs/Breadcrumbs.css";
import "./components/Planner/Planner.css";

const Page = async ({
  searchParams,
}: {
  searchParams?: { modal?: string };
}) => {
  const roles = await getRoles();
  const tasks = await getTasks();
  const query = searchParams?.modal || "";
  return (
    <>
      <main className="card">
        <div className="linkRight">
          <Link className="linkButton" href={"/role/create"}>
            <span className="linkPlusIcon">&#x2b;</span> Role
          </Link>
          <Link
            className="linkButton plannerButton"
            href={{
              pathname: `/`,
              query: { modal: "planner" },
            }}
            replace
          >
            Planner
          </Link>
        </div>
        <div className="pcHeader">
          <h1 className={`${dancer.className} antialiased`}>
            Priority Companion
          </h1>
          <p>
            A user first system to effecitvely apply your unqiue gifts, skills, and talents in your daily roles. Partner habits
            and initiatives to facilitate actions that provide personal
            fufillment and rewards consistent with your values, goals, and
            lifestyle.
          </p>
        </div>
        {/*<Image
        src="/colors.png"
        width={534}
        height={259}
        priority={false}
        alt="Screenshots of the dashboard project showing desktop and mobile versions"
  /> */}
        <div className="columnWrapper">
          <div className="roleWrapper">
            {roles.map((role, index) => (
              <span key={index}>
                {index % 2 == 0 && (
                  <div className="card role-bg1">
                    <RoleCard
                      role={role}
                      habits={role.habits}
                      initiatives={role.initiatives}
                    />
                  </div>
                )}
              </span>
            ))}
          </div>
          <div className="roleWrapper">
            {roles.map((role, index) => (
              <span key={index}>
                {index % 2 != 0 && (
                  <div className="card role-bg2">
                    <RoleCard
                      role={role}
                      habits={role.habits}
                      initiatives={role.initiatives}
                    />
                  </div>
                )}
              </span>
            ))}
          </div>
        </div>
      </main>
      {query == "planner" && (
        <>
          <div className="overlay">
            <Planner pathname={"/"} tasks={tasks} />
          </div>
        </>
      )}
    </>
  );
};

export default Page;
