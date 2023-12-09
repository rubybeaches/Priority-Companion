import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Priority Companion", href: "/" },
          /* {
            label: "Roles",
            href: `/role/${Role.name}`,
            active: true,
          },
          */
        ]}
      />
      <main className={`card`}>{children}</main>
    </>
  );
}
