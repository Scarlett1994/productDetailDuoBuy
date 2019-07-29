import React, { PureComponent } from "react";
import "./style.css";
import renderHTML from "react-render-html";
import {map} from 'lodash'

class VariationLine extends PureComponent {
  render() {
    const { title, value } = this.props;
    return (
      <div style = {{display:"flex"}}>
        <div style = {{flex:0.35, color:"rgba(0,0,0,0.3)"}}>{title}</div>
        <div style = {{flex:0.65,color:"rgba(0,0,0,0.85)"}}>{value}</div>
      </div>
    );
  }
}

export default class Description extends PureComponent {
  render() {
    const { description, brand, category, area } = this.props;
    const variationMap = []
    variationMap.push({title:'Brand',value:brand})
    variationMap.push({title:'Category',value:category.name})
    variationMap.push({title:'Area',value:area.name})
    return (
      <div style={{ marginTop: "0.5rem" }}>
        <div style={{ backgroundColor: "white", padding: "0.5rem" }}>
          <div style = {{color:"rgba(0,0,0,0.85)",fontSize:'1rem',fontWeight:500}}>Product Description</div>
          <div className = 'descriptionTable'>
            {map(variationMap,variation => <VariationLine key = {variation.title} title = {variation.title} value = {variation.value} />)}
          </div>
        </div>
        <div className="descriptionContainer">
          {renderHTML(description || "")}
        </div>
      </div>
    );
  }
}
