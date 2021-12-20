import React from "react";
import styled from "styled-components";
import { Task } from "types/Task";
import TaskRow from "./TaskRow";

const Base = styled.div`
  padding: 1rem;
  gap: 1rem;
  flex-direction: row;
  flex-wrap: wrap;
`;

type Props = {
  date: Date;
  taskList: Task[];
};

const TaskList = (props: Props) => {
  const { taskList, date } = props;
  return (
    <Base>
      {taskList.map((task) => (
        <TaskRow key={task.gid} task={task} date={date} />
      ))}
    </Base>
  );
};

export default TaskList;
