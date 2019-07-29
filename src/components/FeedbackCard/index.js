import React, { PureComponent } from "react";
import "./style.css";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { isIOS } from "react-device-detect";
import CardHeader from "../CardHeader";
import { Avatar } from "antd";
import StarRatings from "react-star-ratings";

class FeedbackList extends PureComponent {
  render() {
    const { feedback } = this.props;
    return (
      <div className="feedback-list-container">
        <div className="feedback-list-first-line">
          <div className="feedback-list-left">
            <Avatar
              shape="circle"
              src={get(
                feedback,
                "profile.portrait",
                "https://statics.lettopia.com/duobuy.png?_ga=2.118506761.-1809586911.1555106597"
              )}
            />
            <span
              style={{
                marginLeft: "0.5rem",
                color: "rgba(0,0,0,0.85)",
                fontWeight: "400",
                fontSize: "0.8rem"
              }}
            >
              {get(feedback, "profile.nickname", "Anonymous").length > 10
                ? get(feedback, "profile.nickname", "Anonymous").substring(
                    0,
                    10
                  ) + "..."
                : get(feedback, "profile.nickname", "Anonymous")}
            </span>
          </div>
          <StarRatings
            starRatedColor="#fadb14"
            numberOfStars={5}
            name="rating"
            rating={feedback.rate}
            starDimension={"1rem"}
            starEmptyColor="#e8e8e8"
            starSpacing={"0px"}
          />
        </div>
        <div className="feedback-list-description">
          {get(feedback, "content")}
        </div>
        {!isEmpty(get(feedback, "images")) && (
          <div className="feedback-list-images-container" >
            {get(feedback,"images").map(image => <img className = 'feedback-list-image' src = {image} alt = {'reviews'}  />)}
          </div>
        )}
        <div className="feedback-list-date">
          {new Date(get(feedback, "createdAt")).toLocaleDateString("en-US")}
        </div>
      </div>
    );
  }
}

export default class FeedbackCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    fetch(
      "https://gcloud-test-api.lettopia.com/api/v1/group/5caec11661eb027f2576f1e1/feedback"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            loading: false,
            feedbacks: result.feedbacks
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
  handleOpenApp = () => {
    // let urlParam = window.location.hash;
    // urlParam = decodeParams(urlParam.substring(urlParam.indexOf("?") + 1));
    // const jointOrder = urlParam.jointOrder;
    const groupId = get(
      this,
      "props.match.params.name",
      "5caec11661eb027f2576f1e1"
    );
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
  };
  render() {
    console.log(this.state, "feedback");
    const { loading } = this.state;
    if (loading) {
      return <div />;
    }
    let renderDiv = <div />;
    let { feedbacks } = this.state;
    if (feedbacks.length === 0) {
      renderDiv = <div className="feedback-void-card">No reviews ...yet</div>;
    } else {
      feedbacks = feedbacks.slice(0,2)
      renderDiv = (
        <div>
          {feedbacks.map((feedback, index) => (
            <FeedbackList key={index} feedback={feedback} />
          ))}
        </div>
      );
    }

    return (
      <div className="feedback-card-container">
        <CardHeader
          label={`Customer Reviews (${feedbacks.length})`}
          value={"View All"}
          onClick={this.handleOpenApp}
        />
        {renderDiv}
      </div>
    );
  }
}
