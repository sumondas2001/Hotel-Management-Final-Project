import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayOut = () => {
     return (
          <div className="relative min-h-screen md:flex">
               {/* side bar */}
               <div>
                    <Sidebar />
               </div>

               {/* Outlet */}

               <div className="flex-1 md:ml-64">
                    <div className="p-5">
                         <Outlet />
                    </div>
               </div>
          </div>
     );
};

export default DashboardLayOut;