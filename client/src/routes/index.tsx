import {ElementType, lazy, Suspense} from 'react';
import {Navigate, useLocation, useRoutes} from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import Login from '../pages/Login'

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {pathname} = useLocation();

    return (
        <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('*')}/>}>
            <Component {...props} />
        </Suspense>
    );
};

// export const ProtectedRoute = ({children}: any) => {
//   const user = useSelector((state: RootState) => state.user)
//   const isAuthenticated = user.email !== null && user.email !== undefined && user.email !== "";
//   if (!isAuthenticated) {
//     // user is not authenticated
//     return <Navigate to="/login"/>;
//   }
//   return children;
// };

export default function Router() {
  return useRoutes([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/user',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/settings" replace />, index: true },
        { path: 'settings', element: <Settings /> },
        { element: <Navigate to="/dashboard" replace />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
      ],
    },
    {
      path: '/car',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/car/data" replace />, index: true },
        { path: 'data', element: <CarData /> },
      ],
    },
    {
      path: '/road',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/road/measurement" replace />, index: true },
        { path: 'measurement', element: <RoadMeasurement /> },
        { path: 'condition', element: <RoadCondition /> },
        { path: 'altitude', element: <RoadAltitude /> },
      ],
    },
    {
      path: '/',
      element: <Navigate to="/road/measurement" replace />,
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const RoadMeasurement = Loadable(lazy(() => import('../pages/RoadMeasurement')));
const RoadCondition = Loadable(lazy(() => import('../pages/RoadCondition')));
const RoadAltitude = Loadable(lazy(() => import('../pages/RoadAltitude')));
const CarData = Loadable(lazy(() => import('../pages/CarData')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const Signup = Loadable(lazy(() => import('../pages/Signup')));
const Settings = Loadable(lazy(() => import('../pages/Settings')));
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));