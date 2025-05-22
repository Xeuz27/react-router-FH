import { NavLink } from "react-router";
import { buttonVariants } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import type { Client } from "../interface/chat-interface";

interface Props {
  clients: Client[];
}

const ContactList = ({ clients }: Props) => {
  // const { data: clients, isLoading } = useQuery({
  //   queryKey: ["clients"],
  //   queryFn: () => getClients(),
  //   staleTime: 1000 * 60 * 5
  // });

  return (
    <>
      <h3 className="p-2 text-sm font-semibold">Contacts</h3>
      <ScrollArea className="grow h-[10px] pr-1">
        <div className="space-y-1 px-4 flex flex-col items-end">
          {clients.map((client) => {
            return (
              <NavLink
                key={client.id}
                className={({ isActive, isPending }) =>
                  cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start pl-0 border bg-red-100 border-border rounded-full flex items-center transition-all duration-500",
                    isActive
                      ? `[&_div]:bg-green-200 [&_div]:text-black [&_div]:border-accent-foreground/40
                         [&_span]:text-black [&_span]:font-bold w-[95%]`
                      : "[&_span]:text-gray-500"
                  )
                }
                to={`${client.id}`}
              >
                {({ isPending }) => {
                  return isPending ? (
                    <>
                      <div className="h-4 w-4 ml-4 animate-spin rounded-full border-t-4 border-blue-500"></div>
                      <span className="text-muted font-semibold">
                        Cargando...
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="h-7 w-7 rounded-full bg-muted border border-accent-foreground/20 mr-2 flex-shrink-0 flex items-center justify-center text-accent-foreground/50 text-xs">
                        {client.name.charAt(0)}
                        {client.name.split(" ")[1].charAt(0)}
                      </div>
                      <span>{client.name}</span>
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </div>
      </ScrollArea>
      <div className="pt-2 px-4 border-t">
        <h3 className=" text-sm font-semibold mb-1">Recent</h3>
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start pl-0 rounded-full transition-all duration-500",
              isActive
                ? `[&_div]:bg-green-200 [&_div]:text-black [&_div]:border-accent-foreground/40
                         [&_span]:text-black [&_span]:font-bold w-[95%]`
                : "[&_span]:text-gray-500"
            )
          }
          to={`client/c1-87635`}
        >
          <div className="h-7 w-7 rounded-full bg-muted border border-accent-foreground/20 mr-2 flex-shrink-0 flex items-center justify-center text-accent-foreground/50 text-xs">
            OO
          </div>
          <span>Otto Octavius</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start pl-0 rounded-full transition-all duration-500",
              isActive
                ? `[&_div]:bg-green-200 [&_div]:text-black [&_div]:border-accent-foreground/40
                         [&_span]:text-black [&_span]:font-bold w-[95%]`
                : "[&_span]:text-gray-500"
            )
          }
          to={`c1-70635`}
        >
          <div className="h-7 w-7 rounded-full bg-muted border border-accent-foreground/20 mr-2 flex-shrink-0 flex items-center justify-center text-accent-foreground/50 text-xs">
            FH
          </div>
          <span>Fernando Herrera</span>
        </NavLink>
      </div>
    </>
  );
};

export default ContactList;
