import React, { PureComponent } from "react";
import { Icon, Drawer } from "antd";
import { map } from "lodash";
import "./style.css";

export default class PolicyPop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  render() {
    const policyMap = [
      {
        title: "Free Shipping",
        description: "All products are free shipping"
      },
      {
        title: "48hr Ship-out",
        description: "All confirmed orders will be shipped with 48hrs"
      },
      {
        title: "14 Days Return",
        description: "Unconditional returns and exchanges within 14 days"
      }
    ];

    return (
      <div>
        <div
          className="policy-outer-container"
          onClick={() => this.setState({ visible: true })}
        >
          <div style={{ display: "flex" }}>
            {map(policyMap, policy => {
              return (
                <div className="policy-item-container">
                  <div className="policy-dot" />
                  <div style={{ marginLeft: "0.5rem" }}>{policy.title}</div>
                </div>
              );
            })}
          </div>
          <Icon type="right" />
        </div>
        <Drawer
          className="policy-drawer"
          maskClosable={true}
          placement="bottom"
          height={"70%"}
          maskStyle={{ backgroundColor: "rgba(0,0,0,0.7)", opacity: 1 }}
          onClose={() => this.setState({ visible: false })}
          footer={null}
          visible={this.state.visible}
          title={
            <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
              Service Policy
            </div>
          }
        >
          <div>
            {map(policyMap, policy => {
              return (
                <div style={{ paddingBottom: "1rem" }}>
                  <div className="policy-item-container">
                    <div className="policy-dot" />
                    <div
                      style={{
                        marginLeft: "0.5rem",
                        color: "rgba(0,0,0,0.85)",
                        fontSize: "1.3rem"
                      }}
                    >
                      {policy.title}
                    </div>
                  </div>
                  <div style={{ marginLeft: "0.85rem", fontSize: "1rem" }}>
                    {policy.description}
                  </div>
                </div>
              );
            })}
          </div>
        </Drawer>
      </div>
    );
  }
}
