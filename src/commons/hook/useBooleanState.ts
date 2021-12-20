import { Dispatch, SetStateAction, useState } from "react";

export type BooleanState = [
  boolean,
  () => void,
  () => void,
  () => void,
  Dispatch<SetStateAction<boolean>>
];

const useBooleanState: (initialValue: boolean) => BooleanState = (
  initialValue: boolean
) => {
  const [isActive, setIsActive] = useState(initialValue);
  const activate = () => {
    setIsActive(true);
  };
  const deactivate = () => {
    setIsActive(false);
  };
  const toggle = () => {
    setIsActive((current) => !current);
  };
  return [isActive, activate, deactivate, toggle, setIsActive];
};

export default useBooleanState;
