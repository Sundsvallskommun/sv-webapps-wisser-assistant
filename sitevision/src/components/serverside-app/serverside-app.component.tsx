import type { AssistantInfo } from "@sk-web-gui/ai";
import * as React from "react";
import { AssistantDummie } from "../assistant-dummie/assistant-dummie.component";

export interface ServerSideAppProps {
  assistant: AssistantInfo;
}

export const ServerSideApp: React.FC<ServerSideAppProps> = ({ assistant }) => {
  return (
    <div>
      <AssistantDummie assistant={assistant} />
    </div>
  );
};
