import { Dancing_Script } from "next/font/google";
import { getRoles, getRoleData, getHabitByRoleCount } from "./lib/data";
import Link from "next/link";
import Task from "./components/Task/Task";
import TaskIcons from "./components/Icons/icons";
import Image from "next/image";
import "./page.css";

const dancer = Dancing_Script({ subsets: ["latin"] });

const Page = async () => {
  const roles = await getRoles();
  const habitCount = await getHabitByRoleCount(1);

  return (
    <main className="card">
      <div className="pcHeader">
        <h1 className={`${dancer.className} antialiased`}>
          Priority Companion
        </h1>
        <p>
          A useful system to apply your unqiue gifts, skills, and talents
          effecitvely as you participate in your daily roles. Partner habits and
          initiatives to facilitate outcomes that provide personal fufillment
          and rewards consistent with your values, goals, and lifestyle.
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
          {roles.map((role, index) => (
            <div key={role.id}>
              <h2 className="roleHeader">{role.name}</h2>
              <p>{role.description}</p>
              <div>
                <h3 className="roleHeader">
                  Habits <span className="roleHeaderCount">({habitCount})</span>
                </h3>
                {role.habits.map((habit) => (
                  <span key={habit.id}>
                    <Task
                      title={habit.tasks[0].name}
                      description={habit.tasks[0].description}
                      priority={habit.tasks[0].priority || undefined}
                      estTime={habit.tasks[0].estTime?.toString() || undefined}
                      chronoType={
                        habit.tasks[0].chronoType == "peak"
                          ? habit.tasks[0].chronoType
                          : undefined
                      }
                      plannedStart={habit.tasks[0].plannedStart.toDateString()}
                      dueBy={habit.tasks[0].dueBy?.toDateString() || undefined}
                      link={habit.tasks[0].link || undefined}
                      parent={"habit"}
                    />
                  </span>
                ))}

                <h3 className="roleHeader">Initiatives</h3>
                {role.initiatives.map((init) => (
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
