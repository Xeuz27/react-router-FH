import { Outlet, replace } from "react-router";
import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/authLayout";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return replace("/auth", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
}
const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
