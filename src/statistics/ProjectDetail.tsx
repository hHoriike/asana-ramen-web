import React, { useCallback } from "react";
import { Project } from "types/Project";
import styled from "styled-components";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isAfter, isSameDay } from "date-fns";
import { isFirstDayOfMonth } from "date-fns/esm";
import { useApiGet } from "commons/fetcher/apiMethod";
import { Task } from "types/Task";
import useFetch from "commons/hook/useFetch";
import Loader from "react-loader-spinner";

const Base = styled.div``;

const Title = styled.div``;

const ChartArea = styled.div`
  justify-content: center;
`;

const Spinner = styled(Loader)`
  align-self: center;
`;

type Response = {
  metadata: string;
  results: {
    mitsumori: Task[];
    jisseki: Task[];
  };
};

type Props = {
  project: Project;
};

const ProjectDetail = (props: Props) => {
  const { project } = props;
  const fetcher = useApiGet<Response>(`/jissekitasks?projectid=${project.gid}`);
  const projectFetcher = useCallback(async () => {
    try {
      return (await fetcher()).data.results;
    } catch (e) {
      console.log(e);
    }
    return {
      mitsumori: [],
      jisseki: [],
    };
  }, [project.gid]);

  const [res, , isProcessing] = useFetch<{
    mitsumori: Task[];
    jisseki: Task[];
  }>(
    {
      mitsumori: [],
      jisseki: [],
    },
    projectFetcher
  );

  const mitsumoriList = res.mitsumori
    .filter((m) => m?.due_on != null)
    .map((m) => ({
      name: m.name,
      due_on: new Date(m.due_on!),
      hours: m.hours,
    }));
  const sortedMitsumoriList = mitsumoriList.sort((a, b) =>
    isAfter(a.due_on, b.due_on) ? 1 : -1
  );
  const dateList =
    sortedMitsumoriList.length === 0
      ? []
      : eachDayOfInterval({
          start: sortedMitsumoriList[0].due_on,
          end: sortedMitsumoriList[sortedMitsumoriList.length - 1].due_on,
        });
  const mitsumoriObj = mitsumoriList.reduce((acc, cur) => {
    console.log("cur", cur);
    return { ...acc, [cur.name]: cur.hours };
  }, {});
  const data = dateList.reduce(
    (
      acc: {
        jisseki: number;
        [key: string]: number | string;
      }[],
      date
    ) => {
      const jissekiSum =
        res.jisseki
          .filter(
            (j) => j.due_on != null && isSameDay(date, new Date(j.due_on))
          )
          .reduce((acc, cur) => acc + cur.hours, 0) +
        (acc[acc.length - 1]?.jisseki ?? 0);
      return [
        ...acc,
        {
          ...mitsumoriObj,
          date: isFirstDayOfMonth(date)
            ? format(date, "MM/dd")
            : format(date, "dd"),
          jisseki: jissekiSum,
        },
      ];
    },
    []
  );

  return (
    <Base>
      <Title>{project.name}</Title>
      <hr />
      {isProcessing ? (
        <Spinner
          type="Rings"
          color="hsl(330, 100%, 70%)"
          height={100}
          width={100}
        />
      ) : (
        <ChartArea>
          <LineChart
            style={{ alignSelf: "center" }}
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 5,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Line type="monotone" dataKey="jisseki" stroke="#8884d8" />
            {mitsumoriList.map((m) => (
              <Line
                key={m.name}
                type="monotone"
                dataKey={m.name}
                stroke="#82ca9d"
              />
            ))}
          </LineChart>
        </ChartArea>
      )}
    </Base>
  );
};

export default ProjectDetail;
