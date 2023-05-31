import { ReactEventHandler, useEffect, useState } from "react";

import Loader from "./Loader/File";
import Select from "./Select";
import { getFileInfos } from "../async/fs";
import { getSavePath, selectFile } from "../async/path";
import { invoke } from "@tauri-apps/api";
import SuccessAlert from "./Success/Alert";
import ErrorAlert from "./Error/Alert";
import WarningAlert from "./Warning/Alert";
import RefreshButton from "./Buttons/Refresh";
import useFormat from "../hooks/useFormat";
import BackButton from "./Buttons/Back";
import AppLoader from "./Loader/App";
import useFile from "../hooks/useFile";
import { once } from "@tauri-apps/api/event";
import { FileDropEvent } from "@tauri-apps/api/window";
import DownloadButton from "./Buttons/Download";

function FileInput({ onClick }: { onClick: ReactEventHandler }) {
  return (
    <label
      htmlFor="dropzone-file"
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          className="w-10 h-10 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          PNG, JPEG, PDF, etc.
        </p>
      </div>
      <input id="dropzone-file" type="file" className="hidden" />
    </label>
  );
}

function InputSection() {
  const [isFileLoading, setisFileLoading] = useState<boolean>(false);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(false);

  const {
    setFilePath: setInputFilePath,
    formattedFileName: formattedInputFileName,
    isFileSelected: isInputFileSelected,
    setIsFileSelected: setIsInputFileSelected,
    fileName: inputFileName,
    filePath: inputFilePath,
  } = useFile();

  const {
    setFilePath: setOutputFilePath,
    setIsFileSelected: setOutputFileConverted,
    isFileSelected: isOutputFileConverted,
  } = useFile();

  const {
    outputFormat,
    setOutputFormat,
    convertionChoices,
    setConvertionChoices,
  } = useFormat();

  const [info, setInfo] = useState<{
    title: string | null;
    description: string | null;
  }>({
    title: null,
    description: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const manageFileInput = async (filepath: string) => {
    setError(null);
    setOutputFormat(null);

    try {
      const { name, extension, displayName } = getFileInfos(filepath);
      setInfo({
        title: `File '${displayName}' submitted`,
        description: "Please Choose the output file type",
      });

      if (extension) {
        const res: boolean = await invoke("is_file_format_valid", {
          inputFormat: extension.toLowerCase(),
        });

        if (res) {
          const stringifiedOutputFormats: string = await invoke(
            "get_output_formats",
            {
              inputFormat: extension.toLowerCase(),
            }
          );

          const outputFormats: string[] = JSON.parse(stringifiedOutputFormats);

          setConvertionChoices(
            outputFormats.filter((x) =>
              x.toLowerCase() === "jpeg"
                ? extension.toLowerCase() !== "jpeg" &&
                  extension.toLowerCase() !== "jpg"
                : x.toLowerCase() === "gif"
                ? false
                : x.toLowerCase() !== extension.toLowerCase()
            )
          );
        } else {
          setError("our system does not support this file extension");
        }
      } else {
        if (!name) {
          setError("Select a valid file");
          return;
        } else {
          setError("The file must have a valid extension");
          return;
        }
      }
    } catch (error) {
      return error;
    } finally {
      setIsAppLoading(false);
    }
  };

  useEffect(() => {
    const handleFileDrop = async () => {
      const unlisten = await once<FileDropEvent>(
        "tauri://file-drop",
        async ({ payload }) => {
          if (Array.isArray(payload)) {
            const fileP: string = payload[0];
            if (fileP && !isInputFileSelected) {
              setInputFilePath(fileP);
              await manageFileInput(fileP);
            }
          }
        }
      );

      return () => {
        unlisten();
      };
    };

    handleFileDrop();
  }, [isInputFileSelected]);

  const handleClick = async function () {
    try {
      setIsAppLoading(true);
      setError(null);

      const filepath = await selectFile();

      if (!filepath || typeof filepath == "object") {
        return;
      }

      setInputFilePath(filepath);

      manageFileInput(filepath);
    } catch (e) {
      return e;
    } finally {
      setIsAppLoading(false);
    }
  };

  const handleSelectChange = function (v: string) {
    if (!v) return;
    setWarning(null);
    setError(null);
    setOutputFormat(v);
    setInfo({
      title: `Convert '${formattedInputFileName}' to ${v}`,
      description: "Click Below to convert",
    });
  };

  const handleConvertButtonClick = async function () {
    if (!outputFormat) {
      return;
    }
    setWarning(null);
    setisFileLoading(true);

    try {
      if (inputFileName && outputFormat) {
        const path = await getSavePath(
          inputFileName,
          outputFormat.toLowerCase()
        );

        if (path) {
          const { extension: outputExtension } = getFileInfos(path);

          setOutputFilePath(path);

          console.log({
            path: inputFilePath,
            outputFormat: outputFormat,
            output_path: path,
          });

          const convertion = await invoke("convert_file", {
            path: inputFilePath,
            outputFormat: outputFormat,
            outputPath: path,
          });

          if (convertion) {
            setInfo({
              title: `'${formattedInputFileName}' has been converted ${
                outputExtension
                  ? `to ${
                      outputExtension.charAt(0).toUpperCase() +
                      outputExtension.slice(1)
                    }`
                  : ""
              }`,
              description: "Thanks for using our services",
            });
            setOutputFileConverted(true);
          } else {
            setError("Error during convertion");
          }
        } else {
          setInfo({ title: null, description: null });
          setWarning("No file path selected. Please select one.");
        }
      }
    } catch (e) {
      return e;
    } finally {
      setisFileLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full rounded-md sm:rounded-lg">
      {isAppLoading ? (
        <AppLoader />
      ) : (
        <>
          {isInputFileSelected ? (
            <div className="w-full min-h-full pb-4 rounded-lg md:justify-center md:pt-5 bg-slate-800 md:flex md:items-center ">
              {error !== null ? (
                <div className="flex flex-col items-center ">
                  <ErrorAlert title={error} desc="Please try again" />
                  <RefreshButton
                    setFalse={setIsInputFileSelected}
                    setNull={setError}
                    className="py-4"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center h-full">
                  <BackButton
                    setFalse={(f: false) => {
                      setOutputFileConverted(f);
                      setIsInputFileSelected(f);
                    }}
                    setTrueThenFalse={setIsAppLoading}
                    setNull={setOutputFormat}
                    actionDone={isOutputFileConverted}
                    className="self-center px-5 pb-4"
                  />
                  {warning !== null && (
                    <WarningAlert title={warning} desc={"Try again"} />
                  )}
                  {info.title !== null && info.description !== null && (
                    <SuccessAlert title={info.title} desc={info.description} />
                  )}
                  {isOutputFileConverted ? (
                    <>
                      <RefreshButton
                        setFalse={(f: false) => {
                          setIsInputFileSelected(f);
                          setOutputFileConverted(f);
                        }}
                        setNull={setError}
                        className="py-4"
                      />
                    </>
                  ) : (
                    <>
                      <Select
                        data={
                          convertionChoices.map((x: string) => {
                            return { value: x, label: x };
                          }) || []
                        }
                        defaultValue={"Select Format"}
                        OnChange={handleSelectChange}
                        className="w-1/2 max-w-lg py-10 lg:py-16"
                      />
                      {outputFormat !== null && (
                        <div className="pb-12">
                          {isFileLoading ? (
                            <Loader />
                          ) : (
                            <DownloadButton
                              onClick={handleConvertButtonClick}
                              text={`${
                                outputFormat
                                  ? outputFormat.charAt(0).toUpperCase() +
                                    outputFormat.slice(1)
                                  : null
                              }`}
                            />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <FileInput onClick={handleClick} />
          )}
        </>
      )}
    </div>
  );
}

export default InputSection;
