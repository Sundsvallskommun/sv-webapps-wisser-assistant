import {
  AssistantInfo,
  AssistantSettings,
  setAssistantStoreName,
  useAssistantStore,
  useSessions,
} from "@sk-web-gui/ai";
import { GuiProvider } from "@sk-web-gui/react";
import { Suspense, useEffect, useState } from "react";
import { Assistant } from "./components/Assistant";

function App({
  user,
  hash,
  assistantId,
  fontBase,
}: {
  user?: string | null;
  hash?: string | null;
  assistantId?: string | null;
  fontBase?: string;
}) {
  const [
    setSettings,
    setInfo,
    setStream,
    setApiBaseUrl,
    setConversationVersion,
  ] = useAssistantStore((state) => [
    state.setSettings,
    state.setInfo,
    state.setStream,
    state.setApiBaseUrl,
    state.setConversationVersion,
  ]);
  const newSession = useSessions((state) => state.newSession);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setAssistantStoreName("sk-ai-assistant-wisser");
    setConversationVersion(2);

    if (import.meta.env.DEV) {
      const settings: AssistantSettings = {
        user: user || "",
        assistantId: assistantId || "",

        hash: hash || "",

        app: import.meta.env.VITE_APPLICATION,
      };

      const info: AssistantInfo = {
        name: import.meta.env.VITE_ASSISTANT_NAME || "Wisser Assistant",
        shortName: "AI",
        title: "Kontakt Sundsvalls AI-assistent.",
        description: {
          default:
            "Fråga assistenten Wisser om sådant du behöver veta som medarbetare på Sundsvalls kommun.",
          en: "The AI assistant can answer your questions in multiple languages.",
        },
        avatar: `${import.meta.env.VITE_BASE_PATH}assets/assistanticon.png`,
      };
      setStream(import.meta.env.VITE_STREAM_DEFAULT === "true");
      setApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
      setSettings(settings);
      setInfo(info);
    }

    newSession();
    setLoaded(true);
  }, [
    user,
    hash,
    assistantId,
    setSettings,
    setInfo,
    newSession,
    setStream,
    setApiBaseUrl,
  ]);

  return (
    <GuiProvider htmlFontSize={fontBase ? parseFloat(fontBase) : 16}>
      <Suspense fallback="loading">{loaded && <Assistant />}</Suspense>
    </GuiProvider>
  );
}

export default App;
