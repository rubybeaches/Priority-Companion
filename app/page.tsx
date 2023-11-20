import { Roles } from "./lib/starter-build";
import { fetchRoleData } from "./lib/data";
import Link from "next/link";
import Task from "./components/Task/Task";
import TaskIcons from "./components/Icons/icons";
import Image from "next/image";

const Page = () => {
  const { habits, initiatives } = fetchRoleData(Roles[0].id);
  return (
    <main>
      <h1>Priority Companion</h1>
      <h3>PC is an all in one stop shop, go to fucking extradoridare.</h3>
      <Image
        src="/colors.png"
        width={534}
        height={259}
        priority={false}
        alt="Screenshots of the dashboard project showing desktop and mobile versions"
      />
      <div
        className="container"
        style={{ border: "1px blue solid", padding: "12px" }}
      >
        {Roles.map((role, index) => (
          <div key={role.id}>
            <h2>{role.name}</h2>
            <p>{role.description}</p>
            <div>
              <h3>Initiatives</h3>
              {initiatives.map((init) => (
                <p key={init.id}>{init.name}</p>
              ))}
              <h3>Habits</h3>
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
    </main>
  );
};

export default Page;
