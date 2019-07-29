import React, { PureComponent } from "react";
import "./style.css";
import { isIOS } from "react-device-detect";
import {Icon} from 'antd' ;
import {get} from 'lodash'


export default class ActionTab extends PureComponent {
  isIphoneX = () => {
    return window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && isIOS
  }
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
    const {directBuyPrice, shoppingPoolPrice} = this.props
    return (
      <div className = 'action-tab-container' onClick = {this.handleOpenApp} >
          <div className = 'action-icon' ><Icon type="share-alt" /></div>
          <div className = 'action-icon' ><Icon type="heart" /></div>
          <button className = 'action-button' style = {{backgroundColor:"#f3aba7"}} >
            <div className = 'price-large'>{`$ ${parseFloat(directBuyPrice[0]).toFixed(2)}`}</div>
            <div>Buy Alone</div>
            </button>
          <button className = 'action-button' >
          <div className = 'price-large'>{`$ ${parseFloat(shoppingPoolPrice[0]).toFixed(2)}`}</div>
            <div>Duo Buy</div>
          </button>
      </div>
    );
  }
}