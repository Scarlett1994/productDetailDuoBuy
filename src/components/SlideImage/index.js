import React, { PureComponent } from "react";
import Slider from "react-slick";
import _ from "lodash";
import "./style.css";
import { Modal } from "antd";

class CustomSlide extends PureComponent {
  render() {
    const { image, current, total,backgroundColor,} = this.props;
    return (
      <div
        style={{
          width: window.innerWidth > 640 ? 640 : window.innerWidth,
          height: window.innerWidth > 640 ? 640 : window.innerWidth,
          ...backgroundColor
        }}
        className="imageContainer"
        onClick={() => this.props.openImageModal && this.props.openImageModal()}
      >
        <img
          src={image.url}
          alt={'product'}
          style={{ maxWidth: "100%", maxHeight: "100%", display: "inline",draggable:false }}
        />
        {<div style={{ position: "absolute", bottom: 5, right: 5 }}> {current !== undefined ? `${current +
          1} / ${total}` : ""}</div>}
      </div>
    );
  }
}

export default class SlideImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      total: this.props.images ? this.props.images.length : 4,
      imageModalVisible: false
    };
  }
  openImageModal = () => {
    this.setState({ imageModalVisible: true });
  };

  handleCancel = () => {
      this.setState({imageModalVisible: false})
  }
  render() {
    const images = this.props.images || [
      {
        url:
          "https://statics.lettopia.com/wirelessbro-images/5caec11661eb027f2576f1e1_1555035740894_Red.jpg"
      },
      {
        url:
          "https://statics.lettopia.com/wirelessbro-images/5caec3c061eb029f9c76f358_1555039216084_WechatIMG366.jpeg"
      },
      {
        url:
          "https://statics.lettopia.com/wirelessbro-images/5caec3c061eb029f9c76f358_1555039223443_WechatIMG365.jpeg"
      },
      {
        url:
          "https://statics.lettopia.com/wirelessbro-images/jy0yk6ns_GBLupjzgl.jpg"
      }
    ];
    const settings = {
      className: "center",
      infinite: true,
      slidesToShow: 1,
      swipeToSlide: true,
      draggable: false,
      touchThreshold:50,
      beforeChange: (current, next) => this.setState({ activeSlide: next })
    };
    const current = this.state.activeSlide;
    const total = images.length;

    return (
      <div>
        <Slider {...settings}>
          {_.map(images, image => (
            <CustomSlide
              image={image}
              current={current}
              total={total}
              openImageModal={this.openImageModal}
              backgroundColor = {{backgroundColor:'white'}} 
            />
          ))}
        </Slider>
        <Modal
          bodyStyle = {{padding:0}}
          closable = {false}
          maskClosable
          keyboard
          visible={this.state.imageModalVisible}
          footer={null}
          onCancel = {this.handleCancel}
          maskStyle = {{backgroundColor:'black'}}
        >
          <Slider  {...settings} beforeChange = {undefined} initialSlide = {this.state.activeSlide}>
            {_.map(images, image => (
              <CustomSlide image={image} backgroundColor = {{backgroundColor:'black'}} />
            ))}
          </Slider>
        </Modal>
      </div>
    );
  }
}
