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
            <div key={role.id}></div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
