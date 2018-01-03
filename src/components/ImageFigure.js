import React, { Component } from "react";

class ImageFigure extends Component {
  constructor(props) {
    super(props);

    this.styleObj = {};
    this.imgFigureDOM = {};
    this.handlerClick = this.handlerClick.bind(this);
  }

  componentDidMount() {
    // 导致第一次渲染有明显延迟
    // this.props.calsize(this.imgFigureDOM.clientWidth, this.imgFigureDOM.clientHeight)
  }

  // 根据isCenter状态触发居中或翻转
  handlerClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.setInverse();
    } else {
      this.props.setCenter();
    }
    // 记得这里要加括号!!
    e.preventDefault();
    e.stopPropagation();
  }

  // 根据isCenter isInverse改变自身css渲染
  render() {
    this.styleObj = Object.assign({}, this.props.arrange.pos);

    // js中写css是需要手动解决浏览器兼容问题的
    if (!this.props.arrange.isCenter) {
      ["MozTransform", "msTransform", "WebkitTransform", "transform"].forEach(
        (val, i) => {
          this.styleObj[val] = `rotate(${this.props.arrange.rotate}deg)`;
        }
      );
    }

    // 根据某个状态切换className的技巧
    let imgFigureClassName = "img-Figure";
    imgFigureClassName += this.props.arrange.isInverse ? " inverse" : "";

    return (
      <figure
        className={imgFigureClassName}
        // ref可以正常引用，但是这样会导致第一次渲染有明显延迟
        // ref={ImageFigureDOM => this.imgFigureDOM = ImageFigureDOM}
        style={this.styleObj}
        onClick={this.handlerClick}
      >
        <img src={this.props.data.src} alt={this.props.data.title} />
        <figcaption>
          <p className="img-title">{this.props.data.title}</p>
          <div className="img-back">
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

export default ImageFigure;
