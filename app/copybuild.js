import { copyFile } from "copy-file";

try {
  await copyFile(
    "./dist/js/assistant-wisser.js",
    "../sitevision/assets/assistant-wisser.js"
  );
} catch (e) {
  console.log(e);
}
