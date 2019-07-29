import React, { PureComponent } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideImage from "./components/SlideImage";
import PriceTitle from "./components/PriceTitle";
import Description from "./components/Description";
import OpenButton from "./components/OpenButton";
import ActionTab from "./components/ActionTab";
import FeedbackCard from "./components/FeedbackCard";
import JointOrderCard from './components/JointOrderCard'
import "antd/dist/antd.css";
import _ from "lodash";
import PolicyPop from "./components/PolicyPop";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    fetch(
      "https://gcloud-test-api.lettopia.com/api/v1/group/detail/5caec11661eb027f2576f1e1"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            loading: false,
            group: result.group
          });
        },
        error => {
          this.setState({
            loading: false,
            error
          });
        }
      );
  }
  getImages = group => {
    let images = [];
    let imageSet = new Set();
    imageSet.add(_.get(group, "image"));
    _.forEach(_.get(group, "images"), image => imageSet.add(image.url));
    _.forEach(_.get(group, "products"), product =>
      _.forEach(_.get(product, "images"), image => imageSet.add(image.url))
    );

    for (let image of imageSet) {
      images.push({ url: image });
    }
    return images;
  };

  getPriceRange = group => {
    let priceRange;
    const directBuyPrice = _.get(group, "directBuyPrice").split("-");
    const shoppingPoolPrice = _.get(group, "shoppingPoolPrice").split("-");
    const range = directBuyPrice.concat(shoppingPoolPrice);
    const min = Math.min(...range);
    const max = Math.min(...range);
    if (max === min) {
      priceRange = parseFloat(max).toFixed(2);
    } else {
      priceRange = [];
      priceRange.push(min);
      priceRange.push(max);
    }
    return priceRange;
  };

  render() {
    const { loading, error, group } = this.state;

    if (loading || error) {
      return <div className="main-container" />;
    }
    const images = this.getImages(group);
    const priceRange = this.getPriceRange(group);
    console.log(group, "group");
    return (
      <div className="main-container">
        <OpenButton />
        <SlideImage images={images} />
        <PriceTitle
          title={_.get(group, "title")}
          priceRange={priceRange}
          sold={_.get(group, "sold", 0)}
        />
        <PolicyPop />
        <JointOrderCard />
        <FeedbackCard />
        <Description
          brand={_.get(group, "brand")}
          category={_.get(group, "category")}
          area={_.get(group, "area")}
          description={_.get(group, "description")}
        />
        <ActionTab
          directBuyPrice={_.get(group, "directBuyPrice").split("-")}
          shoppingPoolPrice={_.get(group, "shoppingPoolPrice").split("-")}
        />
      </div>
    );
  }
}
