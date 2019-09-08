import React from "react";
import { Modal } from "antd";

export class MatchedFaceModal extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Modal
        title="User Already Exists"
        visible
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        style={{
          width: "550px"
        }}
      >
        <img src={url} width="450px" />
      </Modal>
    );
  }
}
