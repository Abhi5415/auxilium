import React from "react";
import { Modal, Typography } from "antd";

const { Title } = Typography;

export class UserDetailModal extends React.Component {
  render() {
    return (
      <Modal
        title="Borrower Information"
        visible
        onOk={() => console.log("ok")}
        onCancel={() => console.log("cancelling")}
      >
        <div style={{ display: "flex" }}>
          <img
            src="https://res.cloudinary.com/dmvxreauf/image/upload/v1556513572/smaller_icap8f.jpg"
            width="200px"
          />
          <div>
            <Title level={4}>Shehryar Assad</Title>
          </div>
        </div>
      </Modal>
    );
  }
}
