import ThemTrigger from "@/components/Them-trigger";
import Nav from "../../components/hero/Nav";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <ThemTrigger />
    </>
  );
}

export default Layout;
