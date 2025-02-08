import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import SmallScreenNav from "../components/SmallScreenNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen ">
      <nav className="">
        <div className="sm:hidden md:block flex ">
          <TopNav />
          <BottomNav />
        </div>
        <div className="md:hidden">
          <SmallScreenNav />
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
