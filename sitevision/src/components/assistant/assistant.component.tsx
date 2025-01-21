import type { AssistantInfo, AssistantSettings } from "@sk-web-gui/ai";
import { setAssistantStoreName, useAssistantStore } from "@sk-web-gui/ai";
import * as React from "react";

export interface AssistantProps {
  assistant: AssistantInfo;
  settings: AssistantSettings;
  shadowdom?: boolean;
  apiBaseUrl: string;
  stream: boolean;
}

export const Assistant: React.FunctionComponent<AssistantProps> = ({
  assistant,
  settings,
  shadowdom = true,
  stream = true,
  apiBaseUrl,
}) => {
  const [oldInfo, setInfo, oldSettings, setSettings, setStream, setApiBaseUrl] =
    useAssistantStore((state) => [
      state.info,
      state.setInfo,
      state.settings,
      state.setSettings,
      state.setStream,
      state.setApiBaseUrl,
    ]);

  React.useEffect(() => {
    require("../../../assets/assistant-wisser");
    setAssistantStoreName("sk-ai-assistant-wisser");
  }, []);

  React.useEffect(() => {
    const info: AssistantInfo = {
      ...oldInfo,
      ...assistant,
    };
    setInfo(info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistant, setInfo]);

  React.useEffect(() => {
    if (settings) {
      const newSettings: AssistantSettings = {
        ...oldSettings,
        ...settings,
      };
      setSettings(newSettings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, setSettings]);

  React.useEffect(() => {
    setStream(stream);
  }, [stream, setStream]);

  React.useEffect(() => {
    setApiBaseUrl(apiBaseUrl);
  }, [apiBaseUrl, setApiBaseUrl]);

  return (
    <div>
      <div id="wisser-assistant" data-shadow={shadowdom} />
    </div>
  );
};
