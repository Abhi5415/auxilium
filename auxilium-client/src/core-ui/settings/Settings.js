import React from "react";
import styled from "styled-components";

import { Button, Typography } from "antd";

const { Title } = Typography;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export class Settings extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer>
          <Title level={2}>Settings</Title>
        </HeaderContainer>
        <p style={{ color: "black" }}>This page is under construction.</p>
      </React.Fragment>
    );
  }
}
