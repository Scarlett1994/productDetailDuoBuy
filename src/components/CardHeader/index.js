import React, { PureComponent } from "react";
import {Icon} from 'antd'
import "./style.css";

export default class CardHeader extends PureComponent {
  render() {
    const { label, value, onClick} = this.props;
    return (
      <div className = 'card-header-container' >
        <div >{label}</div>
        <div className = 'card-header-right-side' onClick = {onClick} >
          <div>{value}</div>
          <Icon type="right" style = {{fontSize:'0.8rem',marginLeft:'0.5rem'}} />
        </div>
      </div>
    );
  }
}
