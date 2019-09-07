import React from "react";
import styled from "styled-components";

import { Button, Typography } from "antd";

const { Title } = Typography;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer>
          <Title level={2}>Dashboard</Title>
        </HeaderContainer>
      </React.Fragment>
    );
  }
}
