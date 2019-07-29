import React, { PureComponent } from "react";
import "./style.css";

export default class PriceTitle extends PureComponent {
  render() {
    const priceRange = this.props.priceRange || ['4.99','8.99']
    const {title} = this.props
    const {sold} = this.props
    let displayPrice = priceRange
    if (typeof priceRange !== 'string' ){
        displayPrice = `${priceRange[0]} - ${priceRange[1]}`
    } 
    return (
      <div style = {{padding:'0.5rem', backgroundColor:"white"}}>
       <div style = {{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           <div style = {{color: "#FD2246",fontSize:'1.5rem',fontWeight:700}}>{`$ ${displayPrice}`}</div>
           <div>{`Sold ${sold} piece(s)`}</div>
       </div>
       <div style = {{fontWeight:700,fontSize:"1.2rem",color:"rgba(0,0,0,0.9)"}}>{title}</div>
      </div>
    );
  }
}
