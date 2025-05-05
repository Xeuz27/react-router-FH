import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Download,
  MessageSquare,
  Send,
  ThumbsDown,
  ThumbsUp
} from "lucide-react";

import { getClient, getClientMessages } from "@/fake-backend/fake-data";
import { sendMessage } from "./../../fake-backend/fake-data";
import { Message } from "./../interface/chat-interface";

export default function ChatPage() {
  const queryClient = useQueryClient();
  const { clientId } = useParams();
  const [input, setInput] = useState("");

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", clientId],
    queryFn: () => getClientMessages(clientId!),
    enabled: !!clientId
  });
  const { data: client } = useQuery({
    queryKey: [`clientId-${clientId}`],
    queryFn: () => getClient(clientId!),
    enabled: !!clientId
  });

  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      queryClient.setQueryData(
        ["messages", clientId],
        (oldMessages: Message[]) => [...oldMessages, newMessage]
      );
    }
  });

  const handleSendMessage = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    sendMessageMutation({
      clientId: clientId ?? "",
      content: input,
      createdAt: new Date(),
      sender: "agent"
    });
    setInput("");
  };
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
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
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex h-8 items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
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
                    <span className="text-xs h-7 w-7 text-white flex-shrink-0 flex items-center justify-center bg-green-500 rounded-full font-bold mr-2">
                      {client && client.name.charAt(0)}
                      {client && client.name.split(" ")[1].charAt(0)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {message.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="bg-black/50 text-white p-3 rounded-lg max-w-[80%]">
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
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
          />
          <Button
            onClick={handleSendMessage}
            className="h-[44px] px-4 flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
