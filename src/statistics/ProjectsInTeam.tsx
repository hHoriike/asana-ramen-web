import React from "react";
import { useApiGet } from "commons/fetcher/apiMethod";
import useFetch from "commons/hook/useFetch";
import { Project } from "types/Project";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { useCallback } from "react";
import Loader from "react-loader-spinner";

const Base = styled.div`
  background-color: hsl(330, 100%, 96%);
  border-radius: 0 0 1rem 1rem;
  padding: 1rem;
  box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%) inset,
    -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%) inset;
`;

const Spinner = styled(Loader)`
  align-self: center;
`;

type Response = {
  metadata: string;
  results: Project[];
};

type Props = {
  teamId: string;
};

const ProjectsInTeam = (props: Props) => {
  const { teamId } = props;
  const fetcher = useApiGet<Response>(`/asanaprojectlist?teamid=${teamId}`);
  const projectListFetcher = useCallback(async () => {
    try {
      return (await fetcher()).data.results;
    } catch (e) {
      console.log(e);
    }
    return [];
  }, [teamId]);

  const [projects, refetch, isProcessing] = useFetch<Project[]>(
    [],
    projectListFetcher
  );
  return (
    <Base>
      {isProcessing ? (
        <Spinner
          type="Rings"
          color="hsl(330, 100%, 70%)"
          height={40}
          width={40}
        />
      ) : projects.length === 0 ? (
        "プロジェクトがありません"
      ) : (
        projects.map((project) => (
          <ProjectCard key={project.gid} project={project} />
        ))
      )}
    </Base>
  );
};

export default ProjectsInTeam;
