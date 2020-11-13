import React, { useContext } from 'react';
import { SlideItemContext } from '../../index.jsx'
import './SlideTag.less'
function SlideItem() {
  const item = useContext(SlideItemContext)
  return (
    <div className='slideItemBox'>
      <img className='headImg' src={item.imgUrl} alt="" />
      <div className='itemTitle'>{item.title}</div>
      <div className='itemDescription'>{item.description}</div>
    </div>
  )
}
export default SlideItem