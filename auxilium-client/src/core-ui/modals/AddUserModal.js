import React from "react";
import styled from "styled-components";
import { Modal, Form, Input, Upload, Icon, message } from "antd";

const { Dragger } = Upload;

const PinContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddUserModal = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Register borrower"
          okText="Register"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="First Name">
              {getFieldDecorator("firstName", {
                rules: [
                  {
                    required: true,
                    message: "Please input the first name!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator("lastName", {
                rules: [
                  {
                    required: true,
                    message: "Please input the last name!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator("phoneNumber", {
                rules: [
                  {
                    required: true,
                    message: "Please input the phone number!"
                  }
                ]
              })(<Input maxLength={12} minLength={12} />)}
            </Form.Item>
            <PinContainer>
              <Form.Item label="PIN">
                {getFieldDecorator("pin", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the pin!"
                    }
                  ]
                })(<Input.Password maxLength={4} />)}
              </Form.Item>
              <Form.Item label="Emergency PIN">
                {getFieldDecorator("emergencyPin", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the pin!"
                    }
                  ]
                })(<Input.Password maxLength={4} />)}
              </Form.Item>
            </PinContainer>
            <Form.Item label="Headshot">
              {getFieldDecorator("imageURI")(
                <Dragger
                  name="file"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onChange={info => {
                    const { status } = info.file;
                    if (status !== "uploading") {
                      console.log(info.file, info.fileList);
                    }
                    if (status === "done") {
                      message.success(
                        `${info.file.name} file uploaded successfully.`
                      );
                    } else if (status === "error") {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Click to upload your headshot manually or drop it here
                  </p>
                </Dragger>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);
