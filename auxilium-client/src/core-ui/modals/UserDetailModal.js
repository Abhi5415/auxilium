import React from "react";
import moment from "moment";
import { Modal, Typography, Tag, Table, InputNumber } from "antd";

const { Title } = Typography;

export class UserDetailModal extends React.Component {
  state = {
    transactions: [],
    balance: 0
  };

  columns = [
    {
      title: "ATM ID",
      dataIndex: "atmId"
    },
    {
      title: "Transaction",
      dataIndex: "amount",
      render: amount => {
        let color = amount < 0 ? "volcano" : "green";
        return <Tag color={color}>{amount}</Tag>;
      }
    },
    {
      title: "Date",
      dataIndex: "date",
      render: date => <span>{moment(date).format("MMMM DD, YYYY HH:MM")}</span>
    }
  ];

  async componentDidMount() {
    const transactions = await (await fetch(
      "http://localhost:5000/borrowers/getTransactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.props.data._id
        })
      }
    )).json();
    let balance = transactions.reduce((prev, curr) => prev + curr.amount, 0);
    this.setState({
      transactions,
      balance
    });
  }

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              Maximum available credit:
              <InputNumber
                style={{ marginLeft: 5 }}
                defaultValue={maxAvailableCredit}
                onChange={async num => {
                  await fetch(
                    "http://localhost:5000/borrowers/changeMaximumValue",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        stellarId: this.props.data.stellarId,
                        maximumValue: num
                      })
                    }
                  );
                  this.props.callbackUpdate();
                }}
              />
            </div>
            <div>
              <Tag color={this.state.balance < 0 ? "volcano" : "green"}>
                {this.state.balance}
              </Tag>
            </div>
          </div>
        </div>
        <Table
          style={{ marginTop: 10 }}
          columns={this.columns}
          dataSource={this.state.transactions}
          size="small"
          pagination={false}
        />
      </Modal>
    );
  }
}
