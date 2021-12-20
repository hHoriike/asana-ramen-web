import React from "react";
import styled from "styled-components";

const Base = styled.div`
  flex-direction: row;
  font-size: 1.2rem;
  gap: 0.5rem;
`;

const Node = styled.span<{ active: boolean }>`
  text-decoration: ${({ active }) => (active ? "none" : "underline")};
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

type Props = {
  path: string[];
  onClick?: (nodeName: string) => void;
};

const Breadcrumb = (props: Props) => {
  const { path, onClick } = props;
  const handleClick = (nodeName: string) => () => {
    onClick?.(nodeName);
  };
  return (
    <Base>
      {path.map((node, idx) => (
        <>
          <Node
            role="link"
            active={idx === path.length - 1}
            onClick={idx === path.length - 1 ? undefined : handleClick(node)}
          >
            {node}
          </Node>
          {idx === path.length - 1 ? null : <span>/</span>}
        </>
      ))}
    </Base>
  );
};

export default Breadcrumb;
