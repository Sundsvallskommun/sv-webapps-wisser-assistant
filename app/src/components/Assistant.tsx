import {
  AIFeed,
  AssistantPresentation,
  InputSection,
  useAssistantStore,
  useChat,
} from "@sk-web-gui/ai";
import { Avatar, Button, Icon, useSnackbar } from "@sk-web-gui/react";
import { useThemeQueries } from "@sk-web-gui/theme";
import { useEffect, useRef, useState } from "react";

export const Assistant: React.FC = () => {
  const { isMaxLargeDevice } = useThemeQueries();
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const assistant = useAssistantStore((state) => state.info);
  const { session, history, sendQuery, newSession } = useChat({ sessionId });
  const snackbar = useSnackbar();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.id) {
      setSessionId(session?.id);
    }
  }, [session?.id]);

  const handleAutoScroll = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 10);
  };

  const handleSendQuery = (query: string) => {
    if (query) {
      sendQuery(query);
    } else {
      snackbar({ message: "Det verkar som att du inte skrivit någon fråga." });
    }
  };

  useEffect(() => {
    handleAutoScroll();
  }, [history]);

  const assistantAvatar = (
    <Avatar
      imageElement={
        typeof assistant.avatar !== "string" ? assistant.avatar : undefined
      }
      imageUrl={
        typeof assistant.avatar === "string" ? assistant.avatar : undefined
      }
      initials={assistant.shortName}
      size="md"
    />
  );
  const userAvatar = <Avatar initials="DU" color="bjornstigen" size="md" />;

  return (
    <>
      <div
        className="sk-ai-corner-module"
        data-fullscreen={true}
        data-docked={false}
        data-mobile={isMaxLargeDevice}
      >
        <div className="sk-ai-corner-module-content justify-center overflow-x-hidden">
          <div className="sk-ai-corner-module-content-row sk-ai-corner-module-content-main w-full">
            <div
              className="sk-ai-corner-module-header justify-center"
              data-docked={false}
              data-fullscreen={true}
              data-mobile={isMaxLargeDevice}
            >
              {session?.name && (
                <div className="sk-ai-corner-module-header-title">
                  <Icon name="message-circle" />
                  <span className="sk-ai-corner-module-header-heading-name">
                    {session.name}
                  </span>
                </div>
              )}
            </div>

            <>
              <div className="sk-ai-corner-module-feed" ref={scrollRef}>
                {!history || history.length < 1 ? (
                  <AssistantPresentation
                    size={isMaxLargeDevice ? "sm" : "lg"}
                    assistant={assistant}
                  />
                ) : (
                  <>
                    <AIFeed
                      history={history}
                      showFeedback={true}
                      onGiveFeedback={handleAutoScroll}
                      size="lg"
                      avatars={{
                        user: userAvatar,
                        assistant: assistantAvatar,
                        system: assistantAvatar,
                      }}
                      titles={{
                        user: { title: "Du" },
                        assistant: { title: "Wisser assistant" },
                        system: { title: "Felmeddelande" },
                      }}
                      sessionId={session?.id}
                    />
                  </>
                )}
              </div>
              {history.length > 0 && (
                <div className="text-base max-w-[15.25em] grow-0 flex flex-col py-16 gap-8">
                  <Button
                    className="grow-0"
                    variant="tertiary"
                    size="sm"
                    leftIcon={<Icon name="refresh-ccw" />}
                    onClick={() => newSession()}
                    aria-describedby="sk-new-session-info"
                  >
                    Ny fråga
                  </Button>
                  {history.length > 5 && (
                    <div
                      id="sk-new-session-info"
                      className="text-small text-dark-secondary text-center grow-0 max-w-[15.25em]"
                    >
                      💡 För att få relevanta svar på frågor som rör andra ämnen
                      behöver du starta en ny session.
                    </div>
                  )}
                </div>
              )}
              <InputSection
                isMobile={isMaxLargeDevice}
                shadow={false}
                sessionId={session?.id}
                onSendQuery={handleSendQuery}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
};
