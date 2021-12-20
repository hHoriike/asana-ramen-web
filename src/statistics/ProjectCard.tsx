import React, { MouseEventHandler, useCallback } from "react";
import useModal from "commons/hook/useModal";
import { Project } from "types/Project";
import styled from "styled-components";
import ProjectDetail from "./ProjectDetail";

const Base = styled.div`
  cursor: default;
`;

type Props = {
  project: Project;
};

const ProjectCard = (props: Props) => {
  const { project } = props;
  const [visible, open, , Modal] = useModal();
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!visible) {
      open();
      e.stopPropagation();
    }
  };

  return (
    <Base onClick={handleClick}>
      {project.name}
      <Modal>{visible ? <ProjectDetail project={project} /> : null}</Modal>
    </Base>
  );
};

export default ProjectCard;
