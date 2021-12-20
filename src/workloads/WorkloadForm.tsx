import React from "react";
import styled from "styled-components";
import useDateRoll from "commons/hook/useDateRoll";
import TaskList from "./TaskList";
import { useApiPost } from "commons/fetcher/apiMethod";
import { Task } from "types/Task";
import useFetch from "commons/hook/useFetch";
import Loader from "react-loader-spinner";
import { useCallback } from "react";
import { useContext } from "react";
import { PatContext } from "App";

const Base = styled.div`
  width: 95vw;
  max-width: 800px;
`;

const Spinner = styled(Loader)`
  align-self: center;
`;

const TitleBar = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
`;

const Separator = styled.hr`
  margin: 1rem;
`;

type Response = {
  metadata: any;
  results: Task[];
};

type Props = {};

const WorkloadForm = (props: Props) => {
  const [selected, , DateRoll] = useDateRoll();
  const pat = useContext(PatContext);
  const fetcher = useApiPost<Response>("/tasksinsection");
  const myTaskFetcher = useCallback(async () => {
    try {
      return (await fetcher()).data.results;
    } catch (e) {
      console.log(e);
    }
    return [];
  }, [pat]);
  const [taskList, , isProcessing] = useFetch([], myTaskFetcher);
  return (
    <Base>
      <DateRoll />
      <Separator />
      <TitleBar>マイタスク一蘭</TitleBar>

      {isProcessing ? (
        <Spinner
          type="Rings"
          color="hsl(330, 100%, 70%)"
          height={100}
          width={100}
        />
      ) : (
        <TaskList date={selected} taskList={taskList} />
      )}
    </Base>
  );
};

export default WorkloadForm;
