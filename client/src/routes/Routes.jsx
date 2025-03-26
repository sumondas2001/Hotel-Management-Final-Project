import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayOut from '../layouts/DashboardLayOut'
import Statistics from '../pages/Dashboard/Common/Statistics'
import AddRoom from '../pages/Dashboard/Host/AddRoom'
import MyListings from '../pages/Dashboard/Host/MyListings'
import Profile from '../pages/Dashboard/Common/Profile/Profile'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import HostRoute from './HostRoute'
import AdminRoute from './AdminRoute'
import MyBookings from '../pages/Dashboard/Guest/MyBookings'
import ManageBookings from '../pages/Dashboard/Host/ManageBookings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails /></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },


  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayOut /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute> <Statistics /></PrivateRoute>
      },
      {
        path: 'add-room',
        element: <PrivateRoute>
          <HostRoute>

            <AddRoom />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: 'my-listings',
        element: <PrivateRoute>
          <HostRoute>
            <MyListings />
          </HostRoute>
        </PrivateRoute>
      },

      {
        path: 'profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: 'manage-users',
        element: <PrivateRoute><AdminRoute><ManageUsers /></AdminRoute> </PrivateRoute>
      },
      {
        path: 'my-bookings',
        element: <PrivateRoute><MyBookings /> </PrivateRoute>
      },
      {
        path: 'manage-bookings',
        element: <PrivateRoute>
          <HostRoute>
            <ManageBookings />
          </HostRoute>
        </PrivateRoute>
      }
    ]
  }
])
