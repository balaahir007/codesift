import { Id } from "@/convex/_generated/dataModel";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageActions,
  MessageAction,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import ky from "ky";
import { toast } from "sonner";
import { useState } from "react";
import { CopyIcon, HistoryIcon, LoaderIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useConversation,
  useConversations,
  useCreateConversation,
  useMessages,
} from "../hooks/use-conversation";
import { DEFAULT_CONVERSATION_TITLE } from "@/convex/constans";

export const ConversationSideBar = ({
  projectId,
}: {
  projectId: Id<"projects">;
}) => {
  const [selectedConversationId, setSelectedConversationId] =
    useState<Id<"conversations"> | null>(null);

    const [inputValue, setInputValue] = useState("");
  const createConversation = useCreateConversation();
  const conversations = useConversations(projectId);
  const activeConverstationId =
    selectedConversationId ?? conversations?.[0]?._id ?? null;

  const activeConversation = useConversation(activeConverstationId);

  const conversationMessages = useMessages(activeConverstationId);

  const isProcessing = conversationMessages?.some(
    (message) => message.status === "processing",
  );
  const handleCreateConversation = async (): Promise<Id<"conversations"> | null> => {
    try {
      const newConversationId = await createConversation({
        projectId,
        title: DEFAULT_CONVERSATION_TITLE,
      });
      setSelectedConversationId(newConversationId);
      return newConversationId;
    } catch (error) {
      toast.error("Failed to create conversation");
      return null;
    }
  };

  const handleSubmit = async (message: PromptInputMessage) => {
    if(isProcessing && !message.text.trim()) { 
      setInputValue("");
      return;
    }
    let conversationId = activeConverstationId;
    if (!conversationId) {
      conversationId = await handleCreateConversation();
      if(!conversationId) {
        return;
      }
    }

    try {
      await ky.post("/api/messages", {
        json: {
          conversationId,
          message: message.text,
        },
      });
      setInputValue("");
    } catch (error) {
      toast.error("Failed to send message");
    }
  }
  return (
    <div className="flex flex-col h-full bg-sidebar">
      <div className="h-8.75 flex items-center justify-between border-b   ">
        <div className="text-sm truncate pl-3">
          {activeConversation?.title ?? DEFAULT_CONVERSATION_TITLE}
        </div>
        <div className="flex items-center px-1 gap-1">
          <Button size="icon-xs" variant="highlight">
            <HistoryIcon className="size-3.5" />
          </Button>
          <Button
            size="icon-xs"
            variant="highlight"
            onClick={handleCreateConversation}
          >
            <PlusIcon className="size-3.5" />
          </Button>
        </div>
      </div>
      <Conversation className="flex-1">
        <ConversationContent>
          {conversationMessages?.map((message, messageIndex) => (
            <Message key={message._id} from={message.role}>
              <MessageContent>
                {message.status === "processing" ? (
                  <div className="flex items-center gap-2 text-muted-foreground  ">
                    <LoaderIcon className="animate-spin" />
                    <span>Thinking...</span>
                  </div>
                ) : (
                  <MessageResponse>{message.content}</MessageResponse>
                )}
              </MessageContent>
              {message.role === "assistant" && message.status == "completed" && messageIndex === (conversationMessages?.length ?? 0) -1 && (
                <MessageActions>
                  <MessageAction
                    onClick={() => {navigator.clipboard.writeText(message.content)}}
                    label="Copy"
                  >
                    <CopyIcon className="size-3.5" />
                  </MessageAction>
                </MessageActions>
              ) }
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="p-3">
        <PromptInput onSubmit={handleSubmit} className="mt-2 rounded-full">
          <PromptInputBody>
            <PromptInputTextarea
              placeholder="Ask CodeSift anythink... "
              onChange={(e) => {setInputValue(e.target.value)}}
              value={inputValue}
              disabled={isProcessing}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit disabled={isProcessing ? false : !inputValue.trim()} status={isProcessing ? "streaming" : undefined}/>
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};
