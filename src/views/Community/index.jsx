import React, { createContext, useState } from 'react';
import './index.less'

import SlideItem from './Components/SlideTag/SlideTag'
export const SlideItemContext = createContext({})

function Community() {
  const [slideList, setSlideList] = useState([
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '物业服务',
      description: '报事报修｜投诉｜缴费'
    },
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '物业服务',
      description: '报事报修｜投诉｜缴费'
    },
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '物业服务',
      description: '报事报修｜投诉｜缴费'
    },
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '物业服务',
      description: '报事报修｜投诉｜缴费'
    },
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '物业服务',
      description: '报事报修｜投诉｜缴费'
    }
  ])
  let SlideListElement = slideList.map((item, index) =>
    <SlideItemContext.Provider value={item} key={index}>
      <SlideItem></SlideItem>
    </SlideItemContext.Provider>

  )

  return (
    <div className="community">
      <section className='titleLine flex-row-end'>
        <div className='title'>社区生活</div>
        <div className='tag'>橙主社区</div>
      </section>
      <section className='slideLine flex-row-center'>
        {SlideListElement}
      </section>
      <section className="bottomLine flex-row-center">
        <img className='bottomImg' src="https://reactjs.org/logo-og.png" alt="" />
        <img className='bottomImg' src="https://reactjs.org/logo-og.png" alt="" />
      </section>
    </div >
  )
}
export default Community;
