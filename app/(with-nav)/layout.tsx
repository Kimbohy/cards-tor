import ThemTrigger from "@/components/Them-trigger";
import Nav from "../../components/Nav";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="[&>*:first-child]:pt-24">{children}</main>
      <ThemTrigger />
    </>
  );
}

export default Layout;
