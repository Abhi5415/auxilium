import React from "react";
import { TransactionTable } from "./core-ui/transactions/TransactionTable";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px;
`;

export function App() {
  return (
    <Container>
      Hello
      <TransactionTable />
    </Container>
  );
}
