import "./Skeleton.css";

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
