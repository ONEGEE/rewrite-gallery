import React, { Component } from "react";

class ImageFigure extends Component {
  constructor(props) {
    super(props);

    this.styleObj = {};
    this.handlerClick = this.handlerClick.bind(this);
  }

  componentDidMount() {}

  handlerClick(e){
    console.log('click')
    if(this.props.arrange.isCenter){
      this.props.setInverse()
    }else{
      this.props.setCenter();
    }
    // 记得这里要加括号!!
    e.preventDefault();
    e.stopPropagation();
  }

  render() {

    this.styleObj = Object.assign({}, this.props.arrange.pos);

    // js中写css是需要手动解决浏览器兼容问题的
    if(!this.props.arrange.isCenter){
      ["MozTransform", "msTransform", "WebkitTransform", "transform"].forEach((val, i) => {
        this.styleObj[val] = `rotate(${this.props.arrange.rotate}deg)`;
      })
    }

    // 根据某个状态切换className的技巧
    let imgFigureClassName = 'img-Figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' inverse' : '';

    return (
      <figure
        className={imgFigureClassName}
        // 这样的DOM引用简直是个大坑...
        // ref={figureDOM =>
        //   this.props.calsize(figureDOM.clientWidth, figureDOM.clientHeight)
        // }
        style={this.styleObj}
        onClick={this.handlerClick}
      >
        <img
          src={this.props.data.src}
          alt={this.props.data.title}
        />
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
