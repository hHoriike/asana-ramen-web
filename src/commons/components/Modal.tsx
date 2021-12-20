import React, { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

const Base = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: hsla(330, 100%, 96%, 0.8);
  z-index: 10000 !important;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90vw;
  max-width: 800px;
  max-height: 90vh;
  background-color: hsl(330, 100%, 96%);
  box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%),
    -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%);
  border-radius: 1rem;
  padding: 1rem;
`;

type Props = {
  children: ReactNode;
  visibility: boolean;
  close: () => void;
};

const Modal = (props: Props) => {
  const { children, visibility, close } = props;
  const handleClickContainer: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };
  const handleClickBackground: MouseEventHandler<HTMLDivElement> = (e) => {
    close();
    e.stopPropagation();
  };
  return visibility ? (
    <Base onClick={handleClickBackground}>
      <Container onClick={handleClickContainer}>{children}</Container>
    </Base>
  ) : null;
};

export default Modal;
