import "./App.css";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { type ReactElement } from "react";
import Layout from "./component/layout/layout";
import Dashboard from "./component/pages/Dashboard";
import LoginPage from "./component/auth/loginPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./style/theme";
import AppLayout from "./component/layout/AppLayout";
import Register from "./component/auth/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingScreen from "./component/pages/LoadingScreen";
import Chat from "./component/pages/Chat";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export const ProtectedRoute = (): ReactElement => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <LoadingScreen />;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

// PublicRoute: For Login (Redirects if already logged in)
export const PublicRoute = (): ReactElement => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (user) {
    return <Navigate to="/chat-room" replace />;
  }
  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route hydrateFallbackElement={<LoadingScreen />}>
        <Route element={<PublicRoute />}>
          <Route element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat-room" element={<Chat />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </>,
  ),
);

function App(): ReactElement {
  const queryClient = new QueryClient();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Toaster position="bottom-right" reverseOrder={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
