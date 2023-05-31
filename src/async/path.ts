import { documentDir, downloadDir, join } from "@tauri-apps/api/path";
import { open, save } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api";

export async function selectFile() {
  const stringified_formats: string = await invoke(
    "get_supported_input_formats"
  );

  const formats: string[] = JSON.parse(stringified_formats).map((x: string) =>
    x.toLowerCase()
  );
  formats.push("jpg");

  let filePath = await open({
    multiple: false,
    directory: false,
    filters: [
      { name: "File with processable extensions", extensions: formats },
    ],
    defaultPath: await documentDir(),
  });

  return filePath;
}

export async function getSavePath(
  filenameWithoutExtension?: string,
  extension?: string
) {
  //retrieves the path the user want to save the file into

  const filePath = await save({
    filters: [
      {
        name: "Converted file Name",
        extensions: [extension || ""],
      },
    ],
    defaultPath: await join(
      await downloadDir(),
      `${filenameWithoutExtension || "Untitled"}.${extension}`
    ),
  });

  return filePath;
}
