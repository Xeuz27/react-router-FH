import { LogOut, X } from "lucide-react";
import { Form, Link, Outlet, replace } from "react-router";

import ContactDetails from "~/chat/components/contact-details/ContactDetails";
import ContactList from "~/chat/components/ContactList";

import { Button, buttonVariants } from "~/components/ui/button";
import { getClient, getClients } from "~/fake-backend/fake-data";
import { cn } from "~/lib/utils";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/chatLayout";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { contactId } = params;
  const clients = await getClients();
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("name");
  if (!!session.get("userId") == false) {
    return replace("/auth");
  }

  if (contactId) {
    let client = await getClient(contactId);
    return { client, clients, username };
  }

  return { clients, username };
}

export default function ChatLayout({ loaderData }: Route.ComponentProps) {
  const { clients, username } = loaderData;
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r flex flex-col justify-between">
        <div className="p-4 h-14 border-b ">
          <Link to="/chat">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/60 flex justify-center items-center text-xs font-medium text-white">
                {username!.charAt(0)}
                {username!.split(" ")[1].charAt(0)}
              </div>
              <span className="font-semibold">{username ?? "..."}</span>
            </div>
          </Link>
        </div>

        <ContactList clients={clients} />

        <div className="p-5 border-y">
          <Form method="post" action="/auth">
            <button
              type="submit"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full text-center"
              )}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </button>
          </Form>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen flex-1 flex">
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="h-14 border-b px-4 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Save conversation
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <Outlet />
        </div>

        {/* Right Panel - Contact Details */}
        <div className="w-80 max-w-80 border-l">
          <div className="h-14 border-b px-4 flex items-center">
            <h2 className="font-medium">Contact details</h2>
          </div>
          <ContactDetails />
        </div>
      </div>
    </div>
  );
}
