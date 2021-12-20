import React from "react";
import Header from "commons/components/Header";
import styled from "styled-components";
import Nav from "commons/components/Nav";
import "./global.css";
import TeamList from "statistics/TeamList";
import WorkloadForm from "workloads/WorkloadForm";
import { useState } from "react";
import { createContext } from "react";

const initialPat = "";

export const PatContext = createContext(initialPat);

const Base = styled.div<{ empty: boolean }>`
  width: 100vw;
  height: 100vh;
  justify-content: ${({ empty }) => (empty ? "center" : "flex-start")};
  align-items: center;
  overflow: hidden;
`;

const Welcome = styled.h1`
  margin: 2rem;
`;

function App() {
  const apiKeyState = useState(initialPat);
  return (
    <PatContext.Provider value={apiKeyState[0]}>
      <Base empty={(apiKeyState[0]?.length ?? 0) === 0}>
        <Header apiKeyState={apiKeyState} />
        {apiKeyState[0].length > 0 ? (
          <Nav>
            {[<WorkloadForm key="workload" />, <TeamList key="statistics" />]}
          </Nav>
        ) : (
          <Welcome>アサナラーメンへようこそ</Welcome>
        )}
      </Base>
    </PatContext.Provider>
  );
}

export default App;
