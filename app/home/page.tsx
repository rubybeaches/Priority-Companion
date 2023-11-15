import { Roles } from "../lib/starter-build";
import { fetchRoleData } from "../lib/data";
import Link from "next/link";

const Home = () => {
  const { habits, initiatives } = fetchRoleData(Roles[0].id);
  return (
    <main>
      <h1>Priority Companion</h1>
      <h3>PC is an all in one stop shop, go to fucking extradoridare.</h3>
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
                <p key={habit.id}>{habit.name}</p>
              ))}
            </div>
            <button key={role.id}>
              <Link href={"/home/role/" + role.name}>Explore</Link>
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
