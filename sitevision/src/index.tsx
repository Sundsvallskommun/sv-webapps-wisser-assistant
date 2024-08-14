import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import imageRenderer from "@sitevision/api/server/ImageRenderer";
import type { AssistantSettings } from "@sk-web-gui/ai";
import * as React from "react";
import { renderToString } from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { ServerSideApp } from "./components/serverside-app/serverside-app.component";
import { getHash } from "./utils/hash.service";
import portletContextUtil from "@sitevision/api/server/PortletContextUtil";
import properties from "@sitevision/api/server/Properties";

router.get("/", (req, res) => {
  const avatar = appData.getNode("assistant_avatar");
  const salt = appData.get("salt") as string;
  imageRenderer.setImage(avatar);

  const assistant = {
    name: appData.get("assistant_name") as string,
    description: appData.get("assistant_description") as string,
    shortName: appData.get("assistant_shortName") as string,
    avatar: avatar ? ReactHtmlParser(imageRenderer.render())[0] : undefined,
  };

  const shadowdom = appData.get("shadowdom") as boolean;

  const useUser = appData.get("use_user") as boolean;
  const currentUser = portletContextUtil.getCurrentUser();

  const user = useUser
    ? (properties.get(currentUser, "name") as string) || ""
    : "";

  const assistantId = appData.get("assistantId") as string;
  const app = appData.get("app") as string;
  const stream = appData.get("stream") as boolean;
  const hash = getHash(user, assistantId, app, salt);

  const settings: AssistantSettings = {
    apiBaseUrl: appData.get("server_url") as string,
    user,
    assistantId,
    app,
    stream,
    hash,
  };

  res.agnosticRender(renderToString(<ServerSideApp assistant={assistant} />), {
    assistant,
    settings,
    shadowdom,
  });
});
