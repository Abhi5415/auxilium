import React from "react";
import styled from "styled-components";
import { Sidebar } from "./core-ui/sidebar/Sidebar";
import { Borrowers } from "./core-ui/borrowers/Borrowers";
import { Dashboard } from "./core-ui/dashboard/Dashboard";

const Container = styled.div`
  margin: 10px;
`;

export function App() {
  return (
    <Sidebar>
      <Container>
        <Borrowers />
        {/* <Dashboard /> */}
      </Container>
    </Sidebar>
  );
}
