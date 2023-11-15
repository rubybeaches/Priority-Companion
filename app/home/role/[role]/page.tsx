import { fetchRoleByName } from "@/app/lib/data";

export default function Role({ params }: { params: { role: string } }) {
  const Role = fetchRoleByName(params.role);
  return (
    <>
      <div>My Role name: {Role.name}</div>
      <div>My Role description: {Role.description}</div>
    </>
  );
}
