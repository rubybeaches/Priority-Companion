import { Initiative } from "@/app/lib/definitions";

const InitiativeCard = ({
  id,
  name,
  description,
  duration,
  durationCount,
  completed,
  tasks,
}: Initiative) => {
  return (
    <div className="initWrapper">
      <p className="initTitle">{name}</p>
      <p className="initDesc">{description}</p>
      <span style={{ fontSize: ".75em" }}>
        Expected Completion: {durationCount} {duration}s
      </span>
      <span
        style={{
          fontSize: ".75em",
          position: "absolute",
          right: "10px",
          bottom: "5px",
        }}
      >
        {tasks.length} task(s)
      </span>
    </div>
  );
};

export default InitiativeCard;
