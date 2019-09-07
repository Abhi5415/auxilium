import React from "react";
import styled from "styled-components";

import { Button, Typography } from "antd";
import { TransactionTable } from "../transactions/TransactionTable";
import { AddUserModal } from "../modals/AddUserModal";

const { Title } = Typography;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled(Button)`
  margin-top: 5px;
`;

export class Borrowers extends React.Component {
  state = {
    visible: false,
    data: []
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll = async () => {
    const data = await (await fetch("http://localhost:5000/borrowers/all", {
      method: "GET"
    })).json();
    this.setState({
      data
    });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      await fetch("http://localhost:5000/borrowers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      this.fetchAll();

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <React.Fragment>
        <HeaderContainer>
          <Title level={2}>Borrowers</Title>
          <ButtonContainer
            type="primary"
            shape="circle"
            icon="plus"
            onClick={this.showModal}
          />
        </HeaderContainer>
        <AddUserModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <TransactionTable
          callbackUpdate={() => this.fetchAll()}
          data={this.state.data}
        />
      </React.Fragment>
    );
  }
}
