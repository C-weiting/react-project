import React, { useContext } from 'react';
import { SlideItemContext } from '../../index.jsx'
import './SlideTag.less'
function SlideItem(props) {
  const item = useContext(SlideItemContext)
  let { clickItem } = props
  let clickSlideItem = () => {
    clickItem(item.id)
  }
  return (
    <div className='slideItemBox' onClick={clickSlideItem}>
      <img className='headImg' src={item.imgUrl} alt="" />
      <div className='itemTitle'>{item.title}</div>
      <div className='itemDescription'>{item.description}</div>
    </div>
  )
}
export default SlideItem