import React from "react";
import { Table, Tag } from "antd";
import moment from "moment";
import DeepLink from "../../stores/DeepLink";

export class NetTransactionSummary extends React.Component {
  state = {
    transactions: []
  };

  componentDidMount() {
    this.fetchData();

    setInterval(() => {
      this.fetchData();
    }, 10000);
  }

  async fetchData() {
    const transactions = await (await fetch(
      "http://localhost:5000/transactions/all",
      {
        method: "get"
      }
    )).json();

    this.setState({
      transactions
    });
  }

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
      title: "User",
      dataIndex: "user",
      render: user => {
        return (
          <span
            onClick={() => {
              DeepLink.idChosen = user;
            }}
          >
            <a>{user}</a>
          </span>
        );
      }
    },
    {
      title: "Blockchain Receipt",
      dataIndex: "blockChainUrl",
      render: blockChainUrl => {
        return (
          <span>
            <a href={blockChainUrl}>Stellar Transaction Receipt</a>
          </span>
        );
      }
    },
    {
      title: "Date",
      dataIndex: "date",
      render: date => <span>{moment(date).format("MMMM DD, YYYY HH:MM")}</span>
    }
  ];

  render() {
    return (
      <Table
        style={{ marginTop: 10 }}
        columns={this.columns}
        dataSource={this.state.transactions}
        size="small"
        pagination={false}
      />
    );
  }
}
