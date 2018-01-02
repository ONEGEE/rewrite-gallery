import React, {Component} from 'react';





class ImageFigure extends Component {

  render(){
    return (
      <figure className = "imageFigure">
        <img className="imageFigure-img" src={this.props.src} alt ={this.props.title}/>
        <figcaption className = "imageFigure-title">{this.props.title}</figcaption>
        <div className="imageFigure-back">
          <p className="imageFigure-desc">{this.props.desc}</p>
        </div>
      </figure>
    )
  }
}

export default ImageFigure;
