import React, { PureComponent } from "react";
import "./style.css";
import { isIOS } from "react-device-detect";
import { get } from "lodash";
import Slider from "react-slick";
import { Avatar, Icon } from "antd";
import Countdown from "react-countdown-now";

export default class SwiperCountDown extends PureComponent {
  isIphoneX = () => {
    return (
      window.devicePixelRatio &&
      window.devicePixelRatio === 3 &&
      window.screen.width === 375 &&
      isIOS
    );
  };
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
    let { posts } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 2,
      vertical: true,
      verticalSwiping: false,
      slidesToScroll: 2,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 5000
    };
    const rendererCountDown = ({ hours, minutes, seconds, completed }) => {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#FD2246" }}>
            <Icon type="team" /> 1 more to go
          </div>
          <span style={{ display: "flex",alignItems:"center" }}>
            <Icon type="clock-circle" style={{ marginRight: "0.5rem" }} />
            {!completed ? <span
              style={{
                fontSize: '0.8rem',
                display: "flex",
                alignItems:"center"
              }}
            >
              <div style={{ marginLeft: '0.1rem' , marginRight: '0.1rem' }} >{hours}</div>:
              <div style={{ marginLeft: '0.1rem' , marginRight: '0.1rem' }}>{minutes} </div>:
              <div style={{ marginLeft: '0.1rem' , marginRight: '0.1rem'}}>{seconds}</div>
            </span> : 'Ended'}
          </span>
        </div>
      );
    };

    return (
      <div style={{ height: "6rem" }}>
        <Slider {...settings}>
          {posts.map((post, index) => {
            const createdAt = new Date(post.createdAt);
            const cutOffTime = createdAt.setDate(createdAt.getDate() + 1);

            return (
              <div key={index} className="swiper-list-container">
                <div className="swiper-list-left-side">
                  <Avatar
                    shape="circle"
                    src={get(
                      post,
                      "participants[0].userId.profile.portrait",
                      "https://statics.lettopia.com/duobuy.png?_ga=2.118506761.-1809586911.1555106597"
                    )}
                  />
                  <span style={{ marginLeft: "0.5rem" }}>
                    {get(
                      post,
                      "participants[0].userId.profile.nickname",
                      "Anonymous"
                    ).length > 10
                      ? get(
                          post,
                          "participants[0].userId.profile.nickname",
                          "Anonymous"
                        ).substring(0, 10) + "..."
                      : get(
                          post,
                          "participants[0].userId.profile.nickname",
                          "Anonymous"
                        )}
                  </span>
                </div>
                <div className="swiper-list-right-side">
                  <div style={{ marginRight: "0.5rem" }}>
                    <Countdown
                      renderer={rendererCountDown}
                      date={cutOffTime}
                      onComplete={() => window.location.reload()}
                    />
                  </div>
                  <button onClick={this.handleOpenApp} className="join-button">
                    Join
                  </button>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
