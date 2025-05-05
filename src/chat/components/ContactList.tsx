import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getClients } from "@/fake-backend/fake-data";

const ContactList = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
    staleTime: 1000 * 60 * 5
  });

  return (
    <ScrollArea className="h-[calc(100vh-120px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>
          <div className="space-y-1">
            {isLoading && (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                <div className="animate-pulse">Loading contacts...</div>
              </div>
            )}
            {clients?.map((client) => {
              return (
                <NavLink
                  key={client.id}
                  to={`/chat/${client.id}`}
                  className={({ isActive }) =>
                    `w-full flex items-center mt-3 transition-all duration-300 ${
                      isActive &&
                      "[&_span]:text-black bg-primary/10 pl-2 rounded-lg [&_span]:font-semibold [&_div]:bg-green-500 [&_div]:text-white [&_div]:font-bold"
                    }`
                  }
                >
                  <div className="h-7 w-7 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center font-semibold justify-center text-gray-500 text-xs">
                    {client.name.charAt(0)}
                    {client.name.split(" ")[1].charAt(0)}
                  </div>
                  <span className="text-gray-500">{client.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ContactList;
