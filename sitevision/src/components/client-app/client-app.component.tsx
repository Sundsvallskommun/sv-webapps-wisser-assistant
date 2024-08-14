import type { AssistantInfo, AssistantSettings } from "@sk-web-gui/ai";
import { setAssistantStoreName, useAssistantStore } from "@sk-web-gui/ai";
import * as React from "react";

export interface ClientAppProperties {
  assistant: AssistantInfo;
  settings: AssistantSettings;
  shadowdom?: boolean;
}

export const ClientApp: React.FunctionComponent<ClientAppProperties> = ({
  assistant,
  settings,
  shadowdom = true,
}) => {
  const [oldInfo, setInfo, oldSettings, setSettings] = useAssistantStore(
    (state) => [state.info, state.setInfo, state.settings, state.setSettings]
  );

  React.useEffect(() => {
    if (window && document) {
      require("../../../assets/assistant-wisser");
      setAssistantStoreName("sk-ai-assistant-wisser");
    }
  }, []);

  React.useEffect(() => {
    const info: AssistantInfo = {
      ...oldInfo,
      ...assistant,
    };
    setInfo(info);
  }, [assistant, setInfo, oldInfo]);

  React.useEffect(() => {
    if (settings) {
      const newSettings: AssistantSettings = {
        ...oldSettings,
        ...settings,
      };
      setSettings(newSettings);
    }
  }, [settings, setSettings, oldSettings]);

  return (
    <div>
      <div id="wisser-assistant" data-shadow={shadowdom} />
    </div>
  );
};
