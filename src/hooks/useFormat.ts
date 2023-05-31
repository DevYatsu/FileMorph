import { useEffect, useState } from "react";

export default function useFormat(
  initialFormat?: string,
  finalFormat?: string
) {
  const [inputFormat, setInputFormat] = useState<null | string>(
    initialFormat || null
  );
  const [outputFormat, setOutputFormat] = useState<null | string>(
    finalFormat || null
  );
  const [formatError, setFormatError] = useState<null | string>(null);
  const [convertionChoices, setConvertionChoices] = useState<string[]>([]);

  return {
    inputFormat,
    setInputFormat,
    outputFormat,
    setOutputFormat,
    formatError,
    setFormatError,
    convertionChoices,
    setConvertionChoices,
  };
}
