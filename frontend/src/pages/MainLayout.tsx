import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import SmallScreenNav from "../components/SmallScreenNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen text-white ">
      <nav className="">
        <div className="sm:hidden md:block flex ">
          <TopNav />
          <BottomNav />
        </div>
        <div className="md:hidden">
          <SmallScreenNav />
        </div>
      </nav>

      <main className="p-8 flex flex-col justify-between sidebar">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
