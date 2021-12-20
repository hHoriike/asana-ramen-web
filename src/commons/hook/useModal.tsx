import React, { ReactNode } from "react";
import Modal from "commons/components/Modal";
import useBooleanState from "./useBooleanState";

const useModal = (): [
  boolean,
  () => void,
  () => void,
  (param: { children: ReactNode }) => JSX.Element
] => {
  const [visible, open, close] = useBooleanState(false);

  const ConcreteModal = ({ children }: { children: ReactNode }) => (
    <Modal visibility={visible} close={close}>
      {children}
    </Modal>
  );

  return [visible, open, close, ConcreteModal];
};

export default useModal;
