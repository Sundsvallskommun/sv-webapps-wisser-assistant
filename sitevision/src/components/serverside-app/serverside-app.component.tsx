import type { AssistantInfo } from "@sk-web-gui/ai";
import * as React from "react";

export interface ServerSideAppProps {
  assistant: AssistantInfo;
}

export const ServerSideApp: React.FC<ServerSideAppProps> = ({ assistant }) => {
  return (
    <div>
      <h4>{assistant.name}</h4>
      <small>{assistant.title}</small>
      <p>
        {typeof assistant?.description === "string"
          ? assistant?.description
          : assistant.description?.default}
      </p>
    </div>
  );
};
