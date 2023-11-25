import { getRoleDataByName } from "@/app/lib/data";
import { Role } from "@/app/lib/definitions";

export default async function Role({ params }: { params: { role: string } }) {
  const Role: Role = await getRoleDataByName(params.role);
  return (
    <>
      <div>My Role name: {Role.name}</div>
      <div>My Role description: {Role.description}</div>
    </>
  );
}
