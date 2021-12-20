import React from "react";
import useBooleanState from "commons/hook/useBooleanState";
import styled from "styled-components";
import { Team } from "types/Team";
import ProjectsInTeam from "./ProjectsInTeam";

const Base = styled.li`
  padding: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 1rem;
  box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%),
    -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%);
`;

const TeamName = styled.h2`
  padding: 0.7rem;
  font-size: 1.2rem;
  font-weight: normal;
`;

type Props = { team: Team };

const TeamCard = (props: Props) => {
  const { team } = props;
  const [visible, , , toggle] = useBooleanState(false);
  return (
    <Base role="button" onClick={toggle}>
      <TeamName>{team.name}</TeamName>
      {visible ? <ProjectsInTeam teamId={team.gid} /> : null}
    </Base>
  );
};

export default TeamCard;
