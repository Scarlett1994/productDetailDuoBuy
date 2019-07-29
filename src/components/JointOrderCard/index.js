import React, { PureComponent } from "react";
import "./style.css";
import { get } from "lodash";
import { isIOS } from "react-device-detect";
import CardHeader from '../CardHeader'
import SwiperCountDown from '../SwiperCountDown';

export default class JointOrderCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    fetch(
      "https://gcloud-test-api.lettopia.com/api/v1/shoppingPool/5caec11661eb027f2576f1e1"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            loading: false,
            posts: result.posts,
            count: result.count
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
      console.log(this.state,"feedback")
    const {loading} = this.state
    if (loading) {
      return <div />
    }
    let {count,posts} = this.state
    let renderDiv = <div />
    posts = posts.filter(post => {
      const createdAt = new Date(post.createdAt)
      const cutOffTime = createdAt.setDate(createdAt.getDate() + 1) 
      return cutOffTime - Date.now() > 0 
    })
    if(count === 0 || posts.length === 0 ) {
      renderDiv = <div className = 'feedback-void-card' >
        Buy together with your friends for a cheaper price!
      </div>
    } else {
      
      renderDiv = <SwiperCountDown posts = {posts} />
    }
    return (
        <div className = 'feedback-card-container'>
            <CardHeader label = {`Waiting for Join (${posts.length})`} value = {'View All'} onClick = {this.handleOpenApp} />
            {renderDiv}
        </div>
    );
  }
}