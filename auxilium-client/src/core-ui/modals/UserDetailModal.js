import React from "react";
import { Modal, Typography, InputNumber } from "antd";

const { Title } = Typography;

export class UserDetailModal extends React.Component {
  render() {
    const {
      data: { firstName, lastName, phoneNumber, maxAvailableCredit },
      onOk,
      onCancel
    } = this.props;

    return (
      <Modal
        title="Borrower Information"
        visible
        onOk={onOk}
        onCancel={onCancel}
      >
        <div>
          <Title level={4}>
            {firstName} {lastName}
          </Title>
          <p>{phoneNumber}</p>
          <div>
            Maximum available credit:
            <InputNumber
              style={{ marginLeft: 5 }}
              defaultValue={maxAvailableCredit}
              onChange={num => {
                fetch("http://localhost:5000/borrowers/changeMaximumValue", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    id: this.props.data._id,
                    maximumValue: num
                  })
                });
                this.props.callbackUpdate();
              }}
            />
          </div>
        </div>
      </Modal>
    );
  }
}
