import { LogOut, X } from "lucide-react";
import { Link, Outlet } from "react-router";

import ContactDetails from "~/chat/components/contact-details/ContactDetails";
import ContactList from "~/chat/components/ContactList";

import { Button } from "~/components/ui/button";
import { getClients } from "~/fake-backend/fake-data";
import type { Route } from "./+types/chatLayout";

export async function loader() {
  const clients = await getClients();

  return { clients };
}

export default function ChatLayout({ loaderData }: Route.ComponentProps) {
  const { clients } = loaderData;
  return (
    <div className="flex h-screen  bg-background ">
      {/* Sidebar */}
      <div className="w-64 border-r flex flex-col justify-between">
        <div className="p-4 h-14 border-b ">
          <Link to="/chat">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary" />
              <span className="font-semibold">
                {/* { user?.name ?? "..."}{" "} */}
                ...
              </span>
            </div>
          </Link>
        </div>

        <ContactList clients={clients} />

        <div className="p-5 border-y ">
          <Button variant="default" className="w-full text-center">
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
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
        <div className="w-80 border-l">
          <div className="h-14 border-b px-4 flex items-center">
            <h2 className="font-medium">Contact details</h2>
          </div>
          <ContactDetails />
        </div>
      </div>
    </div>
  );
}
