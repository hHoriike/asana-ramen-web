import React, { ChangeEventHandler } from "react";
import useModal from "commons/hook/useModal";
import styled from "styled-components";

const Base = styled.header`
  height: fit-content;
`;

const Title = styled.h1``;

const Ramen = styled.span`
  font-weight: normal;
`;

const Label = styled.label`
  font-size: 1.1rem;
`;

const Input = styled.input`
  flex: 1;
  box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%) inset,
    -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%) inset;
  padding: 0.2rem 0.7rem;
  border-radius: 0.3rem;
`;

type Props = {
  apiKeyState: [string, React.Dispatch<React.SetStateAction<string>>];
};

const Header = (props: Props) => {
  const [apiKey, setApiKey] = props.apiKeyState;
  const [, open, , Modal] = useModal();
  const handleChangeText: ChangeEventHandler<HTMLInputElement> = (e) => {
    setApiKey(e.target.value);
  };
  return (
    <Base>
      <Title>
        Asana Ramen
        <Ramen role="button" onClick={open}>
          🍜
        </Ramen>
      </Title>
      <Modal>
        <Label>
          <span>PAT</span>
          <Input type="text" value={apiKey} onChange={handleChangeText} />
        </Label>
      </Modal>
    </Base>
  );
};

export default Header;
