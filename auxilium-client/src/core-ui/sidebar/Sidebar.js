import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { TransactionTable } from "../transactions/TransactionTable";

const { Header, Content, Footer, Sider } = Layout;

export class Sidebar extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="book" />
              <span>Borrowers</span>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon type="setting" />
              <span>Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            minWidth: "1000px",
            color: "white",
            backgroundColor: "white"
          }}
        >
          {this.props.children}
          <Footer style={{ textAlign: "center" }}>Auxilium</Footer>
        </Layout>
      </Layout>
    );
  }
}
