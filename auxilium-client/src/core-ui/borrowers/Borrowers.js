import React from "react";
import styled from "styled-components";

import { Button, Typography } from "antd";
import { TransactionTable } from "../transactions/TransactionTable";
import { AddUserModal } from "../modals/AddUserModal";
import ImageUpload from "../../stores/ImageUpload";
import { MatchedFaceModal } from "../modals/MatchedFaceModal";

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
    matchModalUrl: undefined,
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
    this.forceUpdate();
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      values.imageURI = ImageUpload.imageName;

      try {
        const response = await (await fetch(
          "http://localhost:5000/borrowers/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
          }
        )).json();

        this.setState({
          matchingFaceURL: response.matchingFaceURL
        });
      } catch (err) {
        throw new Error(err);
      }

      this.fetchAll();

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { matchingFaceURL } = this.state;

    return (
      <React.Fragment>
        {matchingFaceURL && (
          <MatchedFaceModal
            url={matchingFaceURL}
            onOk={() => this.setState({ matchingFaceURL: undefined })}
            onCancel={() => this.setState({ matchingFaceURL: undefined })}
          />
        )}
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
