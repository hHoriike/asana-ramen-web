import React, { SetStateAction } from "react";
import { addDays, format, isSameDay } from "date-fns";
import { useMemo } from "react";
import styled from "styled-components";
import { ja } from "date-fns/locale";
import { Dispatch } from "react";

const Base = styled.div`
  flex-direction: row;
  padding: 0.5rem 0;
  gap: 1rem;
  width: 100%;
  overflow-x: scroll;
`;

const DateCell = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) =>
    selected ? "hsl(50, 100%, 96%)" : "inherit"};
  box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%),
    -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%);
  padding: 0.2rem 0.5rem;
  line-height: 1.2rem;
  border-radius: 0.3rem;
  &:active {
    box-shadow: 0.2rem 0.2rem 0.2rem hsl(330, 100%, 92%) inset,
      -0.2rem -0.2rem 0.2rem hsl(330, 100%, 99%) inset;
    span {
      transform: translateY(0.1rem);
    }
  }
`;

const SmallText = styled.span`
  text-align: center;
  font-size: 0.9rem;
  color: #888;
`;

const NormalText = styled.span`
  text-align: center;
  font-size: 1rem;
`;

type Props = {
  selected?: Date;
  setSelected: Dispatch<SetStateAction<Date>>;
};

const DateRoll = (props: Props) => {
  const { selected, setSelected } = props;
  const today = useMemo(() => new Date(), []);
  const dateList = useMemo(
    () => [...Array(15)].map((_, i) => addDays(today, i - 7)),
    [today]
  );
  const handleClick = (date: Date) => () => {
    setSelected(date);
  };

  return (
    <Base>
      {dateList.map((date) => (
        <DateCell
          role="button"
          key={date.valueOf()}
          selected={selected ? isSameDay(date, selected) : false}
          onClick={handleClick(date)}
        >
          <SmallText>{format(date, "MM")} </SmallText>
          <NormalText>{format(date, "dd")}</NormalText>
          <SmallText>{format(date, "(EEE)", { locale: ja })}</SmallText>
        </DateCell>
      ))}
    </Base>
  );
};

export default DateRoll;
