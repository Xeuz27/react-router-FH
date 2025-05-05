import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { sleep } from "./lib/utils";

import { useQuery } from "@tanstack/react-query";
import PrivateRoute from "./auth/components/PrivateRoute";
import { AuthLayout } from "./auth/layouts/AuthLayout";
import { LogInPage } from "./auth/pages/LogInPage";
import { SignUpPage } from "./auth/pages/SignUpPage";
import { checkAuth } from "./fake-backend/fake-data";

const ChatLayout = lazy(async () => {
  await sleep(1500);
  return import("./chat/layout/ChatLayout");
});
const ChatPage = lazy(async () => import("./chat/pages/ChatPage"));
const NoChatSelectedPage = lazy(
  async () => import("./chat/pages/NoChatSelectedPage")
);

const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);
const AppRouter = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = localStorage.getItem("user-token");
      if (!token) {
        throw new Error("No token found");
      }
      return checkAuth(token);
    },
    retry: 0
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LogInPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
        </Route>

        <Route
          path="/chat"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute isAuthenticated={!!user}>
                <ChatLayout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <NoChatSelectedPage />
              </Suspense>
            }
          />
          <Route path="/chat/:clientId" element={<ChatPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
