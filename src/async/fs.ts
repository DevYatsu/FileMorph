export function getFileExtension(fileName: string) {
  return fileName.match(/\.([^.]+)$/)?.[1] || null;
}
export function getFileName(filePath: string) {
  const arr = filePath.split(/[\\/]/);
  return arr[arr.length - 1];
}
export function getFileNameWithoutExtension(fileName: string) {
  return fileName.replace(/\.[^/.]+$/, "") || null;
}
export function formatNameForDisplay(filename: string, maxLength?: number) {
  maxLength = maxLength || 25;
  const fileArr = filename.split(".");
  const extension = fileArr.pop()?.toLowerCase();
  const fileNameWithoutExtension = fileArr.join(".");

  if (!extension) {
    return filename;
  }

  if (fileNameWithoutExtension.length > maxLength) {
    return `${fileNameWithoutExtension.slice(0, maxLength)}(...).${extension}`;
  }

  return `${fileNameWithoutExtension}.${extension}`;
}

export function getFileInfos(filePath: string) {
  const fileName = getFileName(filePath);

  return {
    name: fileName,
    nameWithoutExtension: getFileNameWithoutExtension(fileName),
    extension: getFileExtension(fileName),
    displayName: formatNameForDisplay(fileName),
  };
}
