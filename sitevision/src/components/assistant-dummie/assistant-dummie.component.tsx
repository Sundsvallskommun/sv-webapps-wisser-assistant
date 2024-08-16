import { AssistantPresentation, type AssistantInfo } from "@sk-web-gui/ai";
import React from "react";
import styles from "./assistant-dummie.styling.scss";

interface AssistantDummieProps {
  assistant: AssistantInfo;
}

export const AssistantDummie: React.FC<AssistantDummieProps> = ({
  assistant,
}) => {
  return (
    <div
      className={styles["sk-ai-module"]}
      data-fullscren={true}
      data-docked={false}
    >
      <div className="sk-ai-module-content">
        <div className="sk-ai-module-content-row">
          <div className="sk-ai-module-feed">
            <AssistantPresentation assistant={assistant} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
