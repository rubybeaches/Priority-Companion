import { TaskSkeleton } from "@/app/components/Skeleton/Skeleton";
import "./page.css";

export default function Loading() {
  return (
    <main className="card">
      <h1 className="roleHeader"></h1>
      <p className="roleDesc"></p>

      <h3 className="roleHeader">Habits</h3>
      <span className="wrapper">
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
      </span>
    </main>
  );
}
