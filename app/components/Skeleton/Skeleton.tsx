import "./Skeleton.css";

export function RoleSkeleton() {
  return (
    <>
      <h1 className="skeletonRoleHeader"></h1>
      <p className="skeletonDesc"></p>

      <h3 className="skeletonTitle"></h3>
      <span className="wrapper">
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
      </span>

      <h3 className="skeletonTitle"></h3>
      <span className="wrapper">
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
      </span>
    </>
  );
}

export function TaskSkeleton() {
  return (
    <div className="skeletonWrapper">
      <label className="checkboxSkeletonWrapper">
        <span className="skeletoncheckcircle" />
      </label>
      <div className="skeletonHeader">
        <span className="skeletonTitle" />
        <span className="skeletonIcon" />
      </div>
      <div
        className="skeletoniconFieldWrapper"
        style={{ position: "relative" }}
      >
        <span className="skeletonminiField"></span>
        <span className="skeletonIcon" />
        <span className="skeletonIcon" />
        <span className="skeletonIcon" />
        <span className="skeletonIcon" />
        <span className="skeletonIcon" />
      </div>
    </div>
  );
}
