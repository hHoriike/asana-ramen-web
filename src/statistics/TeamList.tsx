import React from "react";
import { useApiPost } from "commons/fetcher/apiMethod";
import useFetch from "commons/hook/useFetch";
import styled from "styled-components";
import { useCallback } from "react";
import { Team } from "types/Team";
import TeamCard from "./TeamCard";
import Loader from "react-loader-spinner";

const Base = styled.div`
  flex: 1;
  width: 95vw;
  max-width: 800px;
  overflow: hidden;
`;

const TitleBar = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
`;

const List = styled.ul`
  flex: 1;
  gap: 1rem;
  padding: 1rem;
  overflow-y: scroll;
`;

const Spinner = styled(Loader)`
  align-self: center;
`;

type Response = {
  metadata: any;
  results: Team[];
};

type Props = {};

const TeamList = (props: Props) => {
  const fetcher = useApiPost<Response>("/asanateamlist");
  const teamFetcher = useCallback(async () => {
    try {
      return (await fetcher()).data.results;
    } catch (e) {
      console.log(e);
    }
    return [];
  }, []);

  const [teams, , isProcessing] = useFetch<any>([], teamFetcher);
  return (
    <Base>
      <TitleBar>チーム・プロジェクト一蘭</TitleBar>
      {isProcessing ? (
        <Spinner
          type="Rings"
          color="hsl(330, 100%, 70%)"
          height={100}
          width={100}
        />
      ) : (
        <List>
          {teams.map((team: Team) => (
            <TeamCard key={team.gid} team={team} />
          ))}
        </List>
      )}
    </Base>
  );
};

export default TeamList;
