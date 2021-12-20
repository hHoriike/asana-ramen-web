import React from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import styled from "styled-components";
import { Task } from "types/Task";
import useBooleanState from "commons/hook/useBooleanState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCheck } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import { useApiPost } from "commons/fetcher/apiMethod";
import useFetch from "commons/hook/useFetch";
import { useState } from "react";
import { ChangeEventHandler } from "react";
import { useCallback } from "react";

const Base = styled.li`
  width: 30%;
  box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%),
    -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%);
  padding: 0.7rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const ProjectName = styled.div`
  font-size: 0.9rem;
  color: #888;
`;
const TaskName = styled.div``;
const Deadline = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

const EditButton = styled.div`
  padding: 0.3rem 1rem;
  text-align: center;
  border-radius: 100rem;
  background-color: hsl(330, 100%, 70%);
  color: #fff;
  box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%),
    -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%);
  &:active {
    box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 60%) inset,
      -0.2rem -0.2rem 0.2rem hsl(330, 100%, 80%) inset;
    span {
      transform: translateY(0.05rem);
    }
  }
`;

const FormRow = styled.div`
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  height: 3rem;
`;

const Label = styled.label`
  flex-direction: row;
  gap: 0.5rem;
  overflow: hidden;
  align-items: center;
  span {
    font-size: 0.9rem;
    white-space: nowrap;
  }
`;

const Input = styled.input`
  width: 4rem;
  text-align: right;
  box-shadow: ${({ disabled }) =>
    disabled
      ? "none"
      : "0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%) inset, -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%) inset"};
  border-radius: 0.3rem;
  padding: 0.2rem 0.5rem;
`;

const ConfirmButton = styled.div`
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 100rem;
  color: hsl(330, 100%, 70%);
  box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%),
    -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%);
  &:active {
    box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%) inset,
      -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%) inset;
    span {
      transform: translateY(0.05rem);
    }
  }
`;

type Response = {
  metadata: any;
  results: [];
};

type Props = {
  date: Date;
  task: Task;
};

const TaskRow = (props: Props) => {
  const [editable, edit, confirm] = useBooleanState(false);
  const [hourText, setHourText] = useState("");
  const { task, date } = props;

  const fetcher = useApiPost<Response>("/asanacreatetask");

  const pushWorkloaderFetcher = useCallback(async () => {
    const hour = parseFloat(hourText);
    if (!isNaN(hour))
      return (
        (
          await fetcher({
            date: format(date, "yyyy-MM-dd"),
            taskid: task.gid,
            hour: hour,
          })
        ).status === 200
      );
    return false;
  }, [hourText]);

  const [success, postRequest, isProcessing] = useFetch<boolean>(
    false,
    pushWorkloaderFetcher,
    false
  );

  const handleClickConfirm = () => {
    postRequest();
  };

  const handleChangeHour: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHourText(e.target.value);
  };

  return (
    <Base>
      {/* <ProjectName> {task.project?.name} </ProjectName> */}
      <TaskName> {task.name} </TaskName>
      <Deadline>
        期日:
        {task.due_on
          ? format(new Date(task.due_on), "MMMdo", { locale: ja })
          : "なし"}
      </Deadline>
      {editable ? (
        <FormRow>
          <Label>
            <span>実績(h)</span>
            <Input
              type="text"
              value={hourText}
              onChange={handleChangeHour}
              disabled={success}
            />
          </Label>
          {isProcessing ? (
            <Loader
              type="Rings"
              color="hsl(330, 100%, 70%)"
              height={40}
              width={40}
            />
          ) : success ? (
            <ConfirmButton onClick={confirm}>
              <FontAwesomeIcon icon={faCheck} color="hsl(330, 100%, 70%)" />
            </ConfirmButton>
          ) : (
            <ConfirmButton role="button" onClick={handleClickConfirm}>
              <FontAwesomeIcon icon={faArrowUp} />
            </ConfirmButton>
          )}
        </FormRow>
      ) : (
        <EditButton role="button" onClick={edit}>
          <span>実績を入力</span>
        </EditButton>
      )}
    </Base>
  );
};
export default TaskRow;
