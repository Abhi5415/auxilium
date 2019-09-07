import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName"
  },
  {
    title: "Last Name",
    dataIndex: "lastName"
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber"
  },
  {
    title: "Maximum available credit",
    dataIndex: "maxAvailableCredit"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => {
      console.log(text, record);
      return (
        <span>
          <a>View</a>
        </span>
      );
    }
  }
];
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    phoneNumber: "+16479634142",
    maxAvailableCredit: "5"
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    phoneNumber: "+18310837291",
    maxAvailableCredit: "2"
  },
  {
    key: "3",
    firstName: "George",
    lastName: "Black",
    phoneNumber: "+12490839283",
    maxAvailableCredit: "3"
  }
];

export class TransactionTable extends React.Component {
  render() {
    return <Table columns={columns} dataSource={data} size="small" />;
  }
}
