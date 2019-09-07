import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Full Name",
    dataIndex: "name"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  }
];

export class TransactionTable extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h4>Small size table</h4>
        <Table columns={columns} dataSource={data} size="small" />
      </React.Fragment>
    );
  }
}
