import useRole from "../../../hooks/useRole";
import AdminStatistics from "../Admin/AdminStatistics";
import GuestStatistics from "../Guest/GuestStatistics";
import HostStatistics from "../Host/HostStatistics";

const Statistics = () => {
     const [role, isLoading] = useRole();
     return (
          <>
               <h1>Welcome To Dashboard: statistics role: {role}</h1>



               {role === 'admin' && < AdminStatistics />}
               {role === 'host' && < HostStatistics />}
               {role === 'guest' && < GuestStatistics />}
          </>
     );
};

export default Statistics;