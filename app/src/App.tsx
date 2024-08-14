import {
  AssistantInfo,
  AssistantSettings,
  setAssistantStoreName,
  useAssistantStore,
  useSessions,
} from "@sk-web-gui/ai";
import { ColorSchemeMode, GuiProvider } from "@sk-web-gui/react";
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
  const [setSettings, setInfo] = useAssistantStore((state) => [
    state.setSettings,
    state.setInfo,
  ]);
  const newSession = useSessions((state) => state.newSession);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setAssistantStoreName("sk-ai-assistant-wisser");

    if (import.meta.env.DEV) {
      const settings: AssistantSettings = {
        user: user || "",
        assistantId: assistantId || "",
        stream: import.meta.env.VITE_STREAM_DEFAULT,
        hash: hash || "",
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
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

      setSettings(settings);
      setInfo(info);
    }

    newSession();
    setLoaded(true);
  }, [user, hash, assistantId, setSettings, setInfo, newSession]);

  return (
    <GuiProvider
      colorScheme={ColorSchemeMode.Light}
      htmlFontSize={fontBase ? parseFloat(fontBase) : 16}
    >
      <Suspense fallback="loading">{loaded && <Assistant />}</Suspense>
    </GuiProvider>
  );
}

export default App;
