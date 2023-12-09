import { createRole } from "@/app/lib/actions";
import { Inter } from "next/font/google";
import "./page.css";
import TaskIcons from "@/app/components/Icons/icons";

const inter = Inter({ subsets: ["latin"] });

const Page = () => {
  return (
    <form action={createRole}>
      <label className="roleLabel" htmlFor="role">
        {/* proper title with suffix er/or */}
      </label>
      <input
        id="role"
        name="role"
        type="text"
        defaultValue="Role Title"
        className="inputBox roleTitle"
        required
      ></input>

      <label className="roleLabel" htmlFor="description"></label>
      <textarea
        id="description"
        name="description"
        defaultValue="a description of your role and responsibilities"
        className={`${inter.className} inputBox fullWidth`}
        required
      ></textarea>
      <button className="linkButton saveButton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 160 160"
          className="saveIcon linkSaveIcon"
        >
          <g
            fill="#427BDE"
            id="save"
            data-name="Group 1820"
            transform="translate(-6819.99 -2362.564)"
          >
            <path
              id="Path_809"
              data-name="Path 809"
              d="M28.235,120h-.01l-18.231-.01A10.014,10.014,0,0,1,0,109.979V9.995A10.005,10.005,0,0,1,9.994,0h100a10.01,10.01,0,0,1,10,9.994v99.985a10.018,10.018,0,0,1-10,10.011H91.765V91.751H28.235V120ZM14.115,14.12V63.53H105.87V14.12Z"
              transform="translate(6820 2362.563)"
            />
            <path
              id="Path_808"
              data-name="Path 808"
              d="M0,0H30V30H0Z"
              transform="translate(6877.856 2452.547)"
            />
          </g>
        </svg>
        Save
      </button>
    </form>
  );
};

export default Page;
