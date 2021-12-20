import { Dispatch, SetStateAction, useState } from "react";
import DateRoll from "workloads/DateRoll";

const useDateRoll = (): [
  Date,
  Dispatch<SetStateAction<Date>>,
  () => JSX.Element
] => {
  const [selected, setSelected] = useState(new Date());
  const ConcreteDateRoll = () => (
    <DateRoll selected={selected} setSelected={setSelected} />
  );
  return [selected, setSelected, ConcreteDateRoll];
};

export default useDateRoll;
