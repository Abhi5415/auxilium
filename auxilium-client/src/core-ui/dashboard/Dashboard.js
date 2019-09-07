import React from "react";
import styled from "styled-components";

import { Button, Typography } from "antd";
import { NetTransactionSummary } from "../transactions/NetTransactionSummary";

const { Title } = Typography;

const HeaderContainer = styled.div`
  display: flex;
`;

export class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer>
          <Title level={2}>Dashboard</Title>
        </HeaderContainer>
        <NetTransactionSummary />
      </React.Fragment>
    );
  }
}
