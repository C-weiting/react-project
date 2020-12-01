import React, { createContext, useState } from 'react';
import { Toast } from 'antd-mobile';
import SlideItem from './Components/SlideTag/SlideTag';
import { useHistory } from 'react-router-dom';
import useLogin from '@/hooks/useLogin';
import { showLoginModel } from '@/views/Login';
import showLightToast from '@/components/LightToast';
import './index.less';

export const SlideItemContext = createContext({});

function Community () {
  let history = useHistory();
  const isLogin = useLogin();

  const [slideList, setSlideList] = useState([
    {
      imgUrl: 'https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/fake-figure-1%402x.png',
      title: '物业服务',
      id: 'property',
    },
    {
      imgUrl: 'https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/fake-figure-2%402x.png',
      title: '生活缴费',
      id: 'life',
    },
    {
      imgUrl: 'https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/fake-figure-3%402x.png',
      title: '家政服务',
      id: 'housekeeping',
    },
    {
      imgUrl: 'https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/fake-figure-4%402x.png',
      title: '邻里社区',
      id: 'block',
    },
    {
      imgUrl: 'https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/fake-figure-5%402x.png',
      title: '更多服务',
      id: 'more',
    },
  ]);

  function handleToast () {
    showLightToast();
  }
  // 点击跳转事件
  let clickItem = (id) => {
    let actions = {
      property: () => {
        if (isLogin) {
          history.push({
            pathname: '/service'
          });
        } else {
          showLoginModel()
        }
      },
    };
    if (actions.hasOwnProperty(id)) {
      actions[id]();
    } else {
      handleToast();
    }
  };
  let SlideListElement = slideList.map((item, index) => (
    <SlideItemContext.Provider value={item} key={index}>
      <SlideItem clickItem={clickItem}></SlideItem>
    </SlideItemContext.Provider>
  ));

  return (
    <div className="community">
      <section className="titleLine flex-row-end">
        <div className="title">社区生活</div>
        <div className="tag">橙主社区</div>
      </section>
      <section className="slideLine">
        {SlideListElement}
      </section>
      <section className="bottomLine">
        <img
          className="bottomImg"
          src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/fake-figure-6%402x.png"
          onClick={handleToast}
          alt=""
        />
        <img
          className="bottomImg"
          src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/fake-figure-7%402x.png"
          onClick={handleToast}
          alt=""
        />
      </section>
    </div>
  );
}
export default Community;
