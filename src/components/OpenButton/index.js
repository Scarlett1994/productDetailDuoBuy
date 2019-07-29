import React, { PureComponent } from "react";
// import "./style.css";
import { get } from "lodash";
import { isIOS } from "react-device-detect";
import {Button,Icon} from 'antd'

export default class OpenButton extends PureComponent {
    handleOpenApp = () => {
        // let urlParam = window.location.hash;
        // urlParam = decodeParams(urlParam.substring(urlParam.indexOf("?") + 1));
        // const jointOrder = urlParam.jointOrder;
        const groupId = get(this, "props.match.params.name","5caec11661eb027f2576f1e1");
        let baseUrl = `duobuy://detail?`;
        window.location = `${baseUrl}_id=${groupId}`;
        // window.location = `${baseUrl}_id=${groupId}&jointOrder=${jointOrder}`;
        let clickedAt = +new Date();
        setTimeout(function() {
          !window.document.webkitHidden &&
            setTimeout(function() {
              if (+new Date() - clickedAt < 2000) {
                if (isIOS) {
                  window.location =
                    "https://apps.apple.com/us/app/duobuy-better-buy-together/id1472812544?ign-mpt=uo%3D45";
                } else {
                  window.location =
                    "https://play.google.com/store/apps/details?id=com.lettopia.shoppingapp&hl=en_US";
                }
              }
            }, 500);
        }, 500);
      }
  render() {
    
    return (
        <div
        onClick={this.handleOpenApp}
        style={{ position: "fixed", top: "5%", right: -2, zIndex: 10 }}
      >
       
        <Button type="primary">
          Open In App
          <Icon type="right" />
        </Button>
      </div>
    );
  }
}