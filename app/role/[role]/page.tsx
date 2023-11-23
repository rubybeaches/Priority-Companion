import { getRoleDataByName } from "@/app/lib/data";

export default async function Role({ params }: { params: { role: string } }) {
  const Role = await getRoleDataByName(params.role);
  return (
    <>
      <div>My Role name: {Role.name}</div>
      <div>My Role description: {Role.description}</div>
    </>
  );
}
