import { Dancing_Script } from "next/font/google";
import { getRoles } from "./lib/data";
import RoleCard from "./components/RoleCard/RoleCard";
import Image from "next/image";
import Link from "next/link";
import "./page.css";

const dancer = Dancing_Script({ subsets: ["latin"] });

const Page = async () => {
  const roles = await getRoles();

  return (
    <main className="card">
      <Link className="linkButton linkRight" href={"/role/create"}>
        <span className="linkIcon">&#x2b;</span> Role
      </Link>
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
      <Image
        src="/colors.png"
        width={534}
        height={259}
        priority={false}
        alt="Screenshots of the dashboard project showing desktop and mobile versions"
      />
      <div className="roleWrapper">
        {roles.map((role) => (
          <div key={role.id} className="card">
            <RoleCard
              role={role}
              habits={role.habits}
              initiatives={role.initiatives}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
