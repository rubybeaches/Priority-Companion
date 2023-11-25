import { createRole } from "@/app/lib/actions";

const Page = () => {
  return (
    <form action={createRole}>
      <label htmlFor="role">Role Name: </label>
      <input
        id="role"
        name="role"
        type="text"
        placeholder="proper title with suffix er/or"
        required
      ></input>

      <label htmlFor="description">Description: </label>
      <input
        id="description"
        name="description"
        type="textarea"
        placeholder="a description of your role and responsibilities"
        required
      ></input>
      <button>submit</button>
    </form>
  );
};

export default Page;
