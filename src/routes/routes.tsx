import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";
import Message from "@/pages/Dashboard/Message/Message";
import { createBrowserRouter } from "react-router-dom";
import Reservations from "@/pages/Dashboard/Reservations/Reservations";
import Tenants from "@/pages/Dashboard/Tenants/Tenants";
import Maintenance from "@/pages/Dashboard/Maintenance/Maintenance";
import Renters from "@/pages/Dashboard/Renters/Renters";
import Reports from "@/pages/Dashboard/Reports/Reports";
import Payments from "@/pages/Dashboard/Payments/Payments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/renters",
        element: <Renters></Renters>,
      },
      {
        path: "/tenants",
        element: <Tenants></Tenants>,
      },
      {
        path: "/reservations",
        element: <Reservations></Reservations>,
      },
      {
        path: "/maintenance",
        element: <Maintenance></Maintenance>,
      },
      {
        path: "/reports",
        element: <Reports></Reports>,
      },
      {
        path: "/payments",
        element: <Payments></Payments>,
      },
      {
        path: "/message",
        element: <Message></Message>,
      },
    ],
  },
]);

export default router;
