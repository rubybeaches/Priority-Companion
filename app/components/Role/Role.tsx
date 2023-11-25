import { Roles } from "@prisma/client";

const Role = ({ role }) => {
  return (
    <>
      <h2 className="roleHeader">{role.name}</h2>
      <p>{role.description}</p>
      <div>
        <h3 className="roleHeader">
          Habits <span className="roleHeaderCount">({habitCount})</span>
        </h3>
        {role.habits.map((habit) => (
          <span key={habit.id}>
            <Task
              title={habit.tasks[0].name}
              description={habit.tasks[0].description}
              priority={habit.tasks[0].priority || undefined}
              estTime={habit.tasks[0].estTime?.toString() || undefined}
              chronoType={
                habit.tasks[0].chronoType == "peak"
                  ? habit.tasks[0].chronoType
                  : undefined
              }
              plannedStart={habit.tasks[0].plannedStart.toDateString()}
              dueBy={habit.tasks[0].dueBy?.toDateString() || undefined}
              link={habit.tasks[0].link || undefined}
              parent={"habit"}
            />
          </span>
        ))}

        <h3 className="roleHeader">Initiatives</h3>
        {role.initiatives.map((init) => (
          <p key={init.id}>{init.name}</p>
        ))}
      </div>
      <button
        key={role.id}
        style={{
          border: "none",
          backgroundColor: "#B1CEFF",
          padding: "10px 10px",
          borderRadius: "10px",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "#427BDE",
            backgroundColor: "#B1CEFF",
          }}
          href={"/role/" + role.name}
        >
          Explore
        </Link>
      </button>
    </>
  );
};
