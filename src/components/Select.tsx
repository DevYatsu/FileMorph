import { Select as AntSelect } from "antd";
import { extensionsChoices } from "../types/types";

type OnChange = (value: string) => any;

type Select = {
  data: extensionsChoices;
  OnChange: OnChange;
  className?: string;
  defaultValue?: string;
};

export default function Select({
  data,
  OnChange,
  className,
  defaultValue,
}: Select) {
  return (
    <AntSelect
      defaultValue={defaultValue || null}
      onChange={OnChange}
      options={data || [{ value: "Error", label: "Error" }]}
      className={className}
    ></AntSelect>
  );
}
