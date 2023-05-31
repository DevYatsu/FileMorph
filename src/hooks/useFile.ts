import { useEffect, useState } from "react";
import { getFileInfos } from "../async/fs";

function sanitizePathExtension(filepath: string | null): string {
  if (!filepath) return "";

  const lastDotIndex = filepath.lastIndexOf(".");

  if (lastDotIndex !== -1) {
    const filename = filepath.substring(0, lastDotIndex);
    const extension = filepath.substring(lastDotIndex);
    const lowercaseExtension = extension.toLowerCase();
    return filename + lowercaseExtension;
  }

  return filepath;
}

export default function useFile(path?: string) {
  const [fileInfo, setFileInfo] = useState<{
    filePath: string | null;
    fileName: string | null;
    fullFileName: string | null;
    fileExtension: string | null;
    formattedFileName: string | null;
    isFileSelected: boolean;
  }>({
    filePath: path || null,
    fileName: null,
    fullFileName: null,
    fileExtension: null,
    formattedFileName: null,
    isFileSelected: path ? true : false,
  });

  useEffect(() => {
    if (fileInfo.filePath) {
      const {
        name: fullFileName,
        nameWithoutExtension: fileName,
        extension: fileExtension,
        displayName: formattedFileName,
      } = getFileInfos(fileInfo.filePath);

      setFileInfo((prevFileInfo) => ({
        ...prevFileInfo,
        fullFileName,
        fileExtension,
        formattedFileName,
        fileName,
      }));
    }
  }, [fileInfo.filePath, fileInfo.fileName]);

  const setIsFileSelected = (boolean: boolean) => {
    setFileInfo((prevFileInfo) => ({
      ...prevFileInfo,
      isFileSelected: boolean,
    }));
  };

  const setFilePath = (newPath: string | null) => {
    setFileInfo((prevFileInfo) => ({
      ...prevFileInfo,
      filePath: sanitizePathExtension(newPath),
    }));
    setIsFileSelected(true);
  };

  return { ...fileInfo, setFilePath, setIsFileSelected };
}
