import { Roles } from "./lib/starter-build";
import { Dancing_Script } from "next/font/google";
import { fetchRoleData, getHabitByRoleCount } from "./lib/data";
import Link from "next/link";
import Task from "./components/Task/Task";
import TaskIcons from "./components/Icons/icons";
import Image from "next/image";
import "./page.css";

import { getRoleData, getRoleDataByName, getRoles } from "./lib/data";

const dancer = Dancing_Script({ subsets: ["latin"] });

const Page = async () => {
  const { habits, initiatives } = fetchRoleData(Roles[0].id);

  /* const habitCount = await getHabitByRoleCount(1);*/

  return (
    <main className="card">
      <div className="pcHeader">
        <h1 className={`${dancer.className} antialiased`}>
          Priority Companion
        </h1>
        <p>
          A tool used to apply your unqiue gifts, skills, and talents
          effecitvely as you participate in your daily work. Partner habits and
          initiatives to facilitate goals that provide personal fufillment and
          rewards consistent with your values, goals, and lifestyle.
        </p>
      </div>
      {/*
      <Image
        src="/colors.png"
        width={534}
        height={259}
        priority={false}
        alt="Screenshots of the dashboard project showing desktop and mobile versions"
      />
  */}
      <div className="roleWrapper">
        <div className="card">
          {Roles.map((role, index) => (
            <div key={role.id}>
              <h2 className="roleHeader">{role.name}</h2>
              <p>{role.description}</p>
              <div>
                <h3 className="roleHeader">
                  Habits{" "}
                  {/* <span className="roleHeaderCount">({habitCount})</span>*/}
                </h3>
                {habits.map((habit) => (
                  <span key={habit.id}>
                    <Task
                      title={habit.name}
                      description={habit.description}
                      priority={habit.priority}
                      estTime={habit.est_time_seconds}
                      chronoType={habit.type}
                      plannedStart={habit.planned_start}
                      dueBy={habit.due_date}
                      link={habit.link}
                      parent={"habit"}
                    />
                  </span>
                ))}

                <h3 className="roleHeader">Initiatives</h3>
                {initiatives.map((init) => (
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
            </div>
          ))}
        </div>

        <div className="card">
          {Roles.map((role, index) => (
            <div key={role.id}>
              <h2 className="roleHeader">{role.name}</h2>
              <p>{role.description}</p>
              <div>
                <h3 className="roleHeader">Habits</h3>
                {habits.map((habit) => (
                  <span key={habit.id}>
                    <Task
                      title={habit.name}
                      description={habit.description}
                      priority={habit.priority}
                      estTime={habit.est_time_seconds}
                      chronoType={habit.type}
                      plannedStart={habit.planned_start}
                      dueBy={habit.due_date}
                      link={habit.link}
                      parent={"habit"}
                    />
                  </span>
                ))}

                <h3 className="roleHeader">Initiatives</h3>
                {initiatives.map((init) => (
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
            </div>
          ))}
        </div>

        <div className="card">
          {Roles.map((role, index) => (
            <div key={role.id}>
              <h2 className="roleHeader">{role.name}</h2>
              <p>{role.description}</p>
              <div>
                <h3 className="roleHeader">Habits</h3>
                {habits.map((habit) => (
                  <span key={habit.id}>
                    <Task
                      title={habit.name}
                      description={habit.description}
                      priority={habit.priority}
                      estTime={habit.est_time_seconds}
                      chronoType={habit.type}
                      plannedStart={habit.planned_start}
                      dueBy={habit.due_date}
                      link={habit.link}
                      parent={"habit"}
                    />
                  </span>
                ))}

                <h3 className="roleHeader">Initiatives</h3>
                {initiatives.map((init) => (
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
            </div>
          ))}
        </div>

        <div className="card">
          {Roles.map((role, index) => (
            <div key={role.id}>
              <h2 className="roleHeader">{role.name}</h2>
              <p>{role.description}</p>
              <div>
                <h3 className="roleHeader">Habits</h3>
                {habits.map((habit) => (
                  <span key={habit.id}>
                    <Task
                      title={habit.name}
                      description={habit.description}
                      priority={habit.priority}
                      estTime={habit.est_time_seconds}
                      chronoType={habit.type}
                      plannedStart={habit.planned_start}
                      dueBy={habit.due_date}
                      link={habit.link}
                      parent={"habit"}
                    />
                  </span>
                ))}

                <h3 className="roleHeader">Initiatives</h3>
                {initiatives.map((init) => (
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
