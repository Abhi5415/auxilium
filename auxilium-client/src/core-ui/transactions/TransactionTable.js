import React from "react";
import { Table } from "antd";
import { UserDetailModal } from "../modals/UserDetailModal";

export class TransactionTable extends React.Component {
  state = {
    data: undefined
  };

  columns = [
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
        return (
          <span
            onClick={() => {
              this.setState({
                data: record
              });
            }}
          >
            <a>View</a>
          </span>
        );
      }
    }
  ];

  render() {
    return (
      <React.Fragment>
        {this.state.data && (
          <UserDetailModal
            data={this.state.data || {}}
            onOk={() => this.setState({ data: undefined })}
            onCancel={() => this.setState({ data: undefined })}
            callbackUpdate={() => this.props.callbackUpdate()}
          />
        )}
        <Table
          columns={this.columns}
          dataSource={this.props.data}
          size="small"
        />
      </React.Fragment>
    );
  }
}
