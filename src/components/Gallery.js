import React, {Component} from 'react';

import ImageFigure from './ImageFigure';


// 引入图片描述的JSON数据
import imageFigures from '../data/imageDatas';

// 填充图片的src属性
let imageDatas = ((imageArr)=>{
  for( let singleImage of imageArr){
    // 这里使用require可以解决路径问题?为什么要有个空格呢???????
    singleImage.src =  require(`../img/ ${singleImage.fileName}`);
  }
  return imageArr;
})(imageFigures);


class Gallery extends Component{


  render(){

  // 生成图片墙
  let imageArr = imageDatas.map((singleImage, i) => {
    return <ImageFigure title={singleImage.title} desc={singleImage.desc} src={singleImage.src} key={String(singleImage.fileName)}/>
  })

    return (
      <div className="stage">
        {imageArr}
      </div>
    )
  }
}

export default Gallery;
