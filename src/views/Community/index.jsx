import React, { createContext, useRef, useState } from 'react';
import './index.less'

import SlideItem from './Components/SlideTag/SlideTag'
import { useHistory } from 'react-router-dom';
export const SlideItemContext = createContext({})

function Community() {

  let history = useHistory()


  const [slideList, setSlideList] = useState([
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '物业服务',
      description: '报事报修｜投诉｜缴费',
      id: 'property'
    },
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '生活缴费',
      description: '报事报修｜投诉｜缴费',
      id: 'life'
    },
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '家政服务',
      description: '报事报修｜投诉｜缴费',
      id: 'housekeeping'
    },
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '邻里社区',
      description: '报事报修｜投诉｜缴费',
      id: 'block'
    },
    {
      imgUrl: 'https://reactjs.org/logo-og.png',
      title: '更多服务',
      description: '报事报修｜投诉｜缴费',
      id: 'more'
    }
  ])
  // 点击跳转事件
  let clickItem = (id) => {
    let actions = {
      property: () => {
        history.push({
          pathname: '/service',
          query: {
            aIndex: 0,
            bIndex: 0
          },
        })
      }
    }
    if (actions.hasOwnProperty(id)) {
      actions[id]()
    }
  }
  let SlideListElement = slideList.map((item, index) =>
    <SlideItemContext.Provider value={item} key={index}>
      <SlideItem clickItem={clickItem}></SlideItem>
    </SlideItemContext.Provider>
  )


  return (
    <div className="community">
      <section className='titleLine flex-row-end'>
        <div className='title'>社区生活</div>
        <div className='tag'>橙主社区</div>
      </section>
      <section className='slideLine flex-row-center'>
        <div className='shadow'></div>
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
