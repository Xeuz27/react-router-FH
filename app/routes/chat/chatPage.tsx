import {
  Copy,
  Download,
  MessageSquare,
  Send,
  ThumbsDown,
  ThumbsUp
} from "lucide-react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import {
  getClient,
  getClientMessages,
  sendMessage
} from "~/fake-backend/fake-data";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/chatPage";

export async function loader({ params, request }: Route.LoaderArgs) {
  const { contactId } = params;
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("name");

  let client = await getClient(contactId);
  let messages = await getClientMessages(contactId);
  return { messages, client, username };
}
export async function action({ request, params }: Route.ActionArgs) {
  const form = await request.formData();
  const data = `${form.get("message")}`;
  await sendMessage({
    sender: "agent",
    clientId: params.contactId,
    content: data,
    createdAt: new Date()
  });
}

// export async function clientAction() {
//   let messageInput = document.getElementById("message-input");
//   console.log(messageInput, "asd");
//   // messageInput.value = "";
// }

export default function ChatPage({ loaderData }: Route.ComponentProps) {
  const { messages, client, username } = loaderData;

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="grow h-[10px] p-4">
        {messages.length === 0 && (
          <div className="mt-10 flex-1 flex flex-col items-center justify-center gap-4">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No hay mensajes</p>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === "agent" ? (
                // Agent message - right aligned
                <div className="flex gap-2 ml-auto max-w-[80%]">
                  <div className="h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-medium bg-primary/60 flex-shrink-0">
                    {username!.charAt(0)}
                    {username!.split(" ")[1].charAt(0)!}
                  </div>
                  <div className="space-y-2">
                    <div className="flex h-8 items-center gap-2">
                      <span className="text-sm font-medium">{username}</span>
                      <span className="text-sm text-muted-foreground">
                        {message.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-semibold whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - left aligned
                <div className="flex items-start flex-col">
                  <div className="flex items-center mb-1">
                    <span className="text-xs h-7 w-7 text-black font-medium flex-shrink-0 flex items-center justify-center bg-green-200 border border-accent-foreground/40 rounded-full mr-2">
                      {client && client.name.charAt(0)}
                      {client && client.name.split(" ")[1].charAt(0)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {message.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="bg-green-950/85 text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm font-semibold whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Form method="post" className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            name="message"
            className="min-h-[44px] h-[44px] resize-none py-3"
          />
          <Button className="h-[44px] px-4 flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </Form>
      </div>
    </div>
  );
}
