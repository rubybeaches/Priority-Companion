import { Roles } from "./lib/starter-build";
import { fetchRoleData } from "./lib/data";
import Link from "next/link";
import TaskIcons from "@/app/lib/icons";

const Home = () => {
  const { habits, initiatives } = fetchRoleData(Roles[0].id);
  return (
    <main>
      <h1>Priority Companion</h1>
      <h3>PC is an all in one stop shop, go to fucking extradoridare.</h3>
      <div
        style={{
          height: "40px",
          backgroundColor: "#f8f8f8",
          padding: "10px",
          display: "flex",
          gap: ".8em",
        }}
      >
        <TaskIcons icon={"chart"} state={"set"} />
        <TaskIcons icon={"task"} state={"unset"} />
        <TaskIcons icon={"clock"} state={"set"} />
        <TaskIcons icon={"calendar"} state={"set"} />
      </div>
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
                <div
                  key={habit.parent_id}
                  className="habit"
                  style={{
                    border: "2px solid #427BDE",
                    borderRadius: "10px",
                    padding: "10px",
                    marginBlock: "10px",
                  }}
                >
                  {habit.name}
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      lineHeight: "36px",
                      justifyItems: "center",
                      gap: ".5em",
                    }}
                  >
                    <TaskIcons
                      icon="task"
                      state={habit.description ? "set" : "unset"}
                    />
                    {habit.description}
                    <TaskIcons
                      icon="clock"
                      state={habit.est_time_seconds ? "set" : "unset"}
                    />
                    <TaskIcons
                      icon="calendar"
                      state={habit.planned_start ? "set" : "unset"}
                    />
                  </div>
                </div>
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

export default Home;
