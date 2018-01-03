import React, { Component } from "react";

import ImageFigure from "./ImageFigure";

import imageData from "../data/imageDatas";
// 引入图片描述的JSON数据, 填充图片的src属性
let imageDatas = (imageArr => {
  for (let singleImage of imageArr) {
    // 这里使用require可以解决路径问题?为什么要有个空格呢???????
    singleImage.src = require(`../img/ ${singleImage.fileName}`);
  }
  return imageArr;
})(imageData);

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.imgFigures = [];

    this.state = { imgArrangeArr: [] };

    // 写死的舞台和照片宽高
    this.imgFigureSize = {
      width: 320,
      height: 360
    };
    this.stageSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // 设置位置取值范围常量
    this.Constant = {
      centerPos: {
        centerX: 0,
        centerY: 0
      },
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        hPosY: [0, 0]
      },
      tPosRange: {
        tPosX: [0, 0],
        tPosY: [0, 0]
      }
    };

    this.reArrange = this.reArrange.bind(this);
    this.setCenter = this.setCenter.bind(this);
    this.setInverse = this.setInverse.bind(this);

    // this.getimgFigureSize = this.getimgFigureSize.bind(this);
  }

  // ref可以正常使用，但是有明显延迟
  // getimgFigureSize(width, height) {
  //   this.imgFigureSize = {
  //     width,
  //     height
  //   };
  // }

  getRangeRandom = (low, high) =>
    Math.floor(Math.random() * (high - low) + low); //check

  // 初始化this.state
  componentWillMount() {
    let imgArrangeArr = Object.assign([], this.state.imgArrangeArr);
    imageDatas.forEach((singleImg, i) => {
      imgArrangeArr[i] = {
        pos: {
          top: 0,
          left: 0
        },
        rotate: 0,
        isCenter: false,
        isInverse: false
      };
    });

    this.setState({ imgArrangeArr: imgArrangeArr });
  } //check

  // 各种计算取值范围
  componentDidMount() {
    // 获取 stage & img 宽高
    let stageW = this.stageSize.width,
      halfstageW = Math.ceil(stageW / 2),
      stageH = this.stageSize.height,
      halfstageH = Math.ceil(stageH / 2),
      imgW = this.imgFigureSize.width,
      halfImgW = Math.ceil(imgW / 2),
      imgH = this.imgFigureSize.height,
      halfImgH = Math.ceil(imgH / 2);

    // 水平左半部分水平取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfstageW - halfImgW * 3;
    // 水平右半部分水平取值范围
    this.Constant.hPosRange.rightSecX[0] = halfstageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    // 水平左右部分垂直取值范围
    this.Constant.hPosRange.hPosY[0] = -halfImgH;
    this.Constant.hPosRange.hPosY[1] = stageH - halfImgH;
    // 上半部分水平取值范围
    this.Constant.tPosRange.tPosX[0] = halfstageW - halfImgW * 2;
    this.Constant.tPosRange.tPosX[1] = halfstageW + halfImgW * 2;
    // 上半部分垂直取值范围
    this.Constant.tPosRange.tPosY[0] = -halfImgH;
    this.Constant.tPosRange.tPosY[1] = halfstageH - halfImgH * 3;
    // 居中图片取值
    this.Constant.centerPos.centerX = halfstageW - halfImgW;
    this.Constant.centerPos.centerY = halfstageH - halfImgH;

    this.reArrange(0);
  }

  // 更新state触发重新排序
  reArrange(centerIndex) {
    // 复制一个this.state.imgArrangeArr状态数组
    let imgArrangeArr = Object.assign([], this.state.imgArrangeArr);

    // 简化取值范围变量名
    let Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      tPosRange = Constant.tPosRange,
      centerX = centerPos.centerX,
      centerY = centerPos.centerY,
      leftSecX = hPosRange.leftSecX,
      rightSecX = hPosRange.rightSecX,
      hPosY = hPosRange.hPosY,
      tPosX = tPosRange.tPosX,
      tPosY = tPosRange.tPosY;

    // 布局居中图片
    let centerImgFigureArr = imgArrangeArr.splice(centerIndex, 1);
    centerImgFigureArr[0] = {
      pos: {
        top: centerY,
        left: centerX
      },
      rotate: 0,
      isCenter: true,
      isInverse: false
    };

    // 从数组中取出0个或1个元素排列在上部分
    let topImgFigureArr = [],
      topIndex = 0,
      topImgCount = this.getRangeRandom(0, 2);
    if (topImgCount !== 0) {
      topIndex = this.getRangeRandom(1, imgArrangeArr.length - topImgCount);
      topImgFigureArr = imgArrangeArr.splice(topIndex, topImgCount);
      topImgFigureArr[0] = {
        pos: {
          top: this.getRangeRandom(tPosY[0], tPosY[1]),
          left: this.getRangeRandom(tPosX[0], tPosX[1])
        },
        rotate: this.getRangeRandom(-30, 30),
        isCenter: false,
        isInverse: false
      };
    }

    // 数组中剩下的元素对半排列在左右两边
    for (let i = 0, j = imgArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLR = i < k ? leftSecX : rightSecX;
      imgArrangeArr[i] = {
        pos: {
          top: this.getRangeRandom(hPosY[0], hPosY[1]),
          left: this.getRangeRandom(hPosRangeLR[0], hPosRangeLR[1])
        },
        rotate: this.getRangeRandom(-30, 30),
        isCenter: false,
        isInverse: false
      };
    }

    // 将取出来的数组装回数组并更新state状态，注意一定要按照先拿后放的逻辑，否则会篡位
    if (topImgCount !== 0)
      imgArrangeArr.splice(topIndex, 0, topImgFigureArr[0]);
    imgArrangeArr.splice(centerIndex, 0, centerImgFigureArr[0]);

    this.setState({ imgArrangeArr: imgArrangeArr });
  }

  // 这两个闭包我还是无法理解，只能抄着来...!!!
  setCenter(centerIndex) {
    return () => {
      this.reArrange(centerIndex);
    };
  }
  setInverse(index) {
    return () => {
      // toggle原先的isInverse
      this.setState(prevState => {
        let imgArrangeArr = Object.assign([], this.state.imgArrangeArr);
        imgArrangeArr[index].isInverse = !imgArrangeArr[index].isInverse;
        return { imgArrangeArr: imgArrangeArr };
      });
    };
  }

  render() {
    // 生成图片墙
    imageDatas.forEach((singleImage, i) => {
      this.imgFigures[i] = (
        <ImageFigure
          index={i}
          data={singleImage}
          key={String(singleImage.fileName)}
          arrange={this.state.imgArrangeArr[i]}
          // calsize={this.getimgFigureSize}
          setCenter={this.setCenter(i)}
          setInverse={this.setInverse(i)}
        />
      );
    });

    return (
      <div className="stage">
        <section className="img-sec">{this.imgFigures}</section>
      </div>
    );
  }
}

export default Gallery;
