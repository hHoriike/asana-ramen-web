import React, { ReactNode } from "react";
import { useState } from "react";
import styled from "styled-components";

const Base = styled.div`
  flex: 1;
  overflow-y: hidden;
  padding: 1rem;
  overflow: hidden;
`;

const Tab = styled.div`
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.div<{ disabled: boolean }>`
  padding: 0.3rem 1rem;
  text-align: center;
  border-radius: 100rem;
  background-color: ${({ disabled }) =>
    disabled ? "hsl(330, 100%, 70%)" : "hsl(330, 100%, 80%)"};
  color: #fff;
  box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%),
    -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%);
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  &:active {
    box-shadow: ${({ disabled }) =>
      disabled
        ? "0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%), -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%)"
        : "0.2rem 0.2rem 0.2rem hsl(330, 100%, 70%) inset, -0.2rem -0.2rem 0.2rem hsl(330, 100%, 90%) inset"};
    span {
      transform: translateY(0.05rem);
    }
  }
  color: #fff;
  font-size: 1.3rem;
`;

const ChildWrap = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 1rem;
`;

type Props = {
  children: ReactNode[];
};

const Nav = (props: Props) => {
  const { children } = props;
  const [idx, setIdx] = useState(0);
  const hancleClickWorkloads = () => {
    if (idx !== 0) setIdx(0);
  };
  const hancleClickStatistics = () => {
    if (idx !== 1) setIdx(1);
  };
  return (
    <Base>
      <Tab>
        <Button
          role="button"
          onClick={hancleClickWorkloads}
          disabled={idx === 0}
        >
          実績入力
        </Button>
        <Button
          role="button"
          onClick={hancleClickStatistics}
          disabled={idx === 1}
        >
          進捗確認
        </Button>
      </Tab>
      <ChildWrap>{children[idx]}</ChildWrap>
    </Base>
  );
};

export default Nav;
