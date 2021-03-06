import React, { useEffect, useState } from 'react';
import {
  useHistory,
  useRouteMatch,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useStore } from 'react-redux';
import Complaints from '@/views/Service/Complaints';
import Pay from '@/views/Service/Pay';
import Repair from '@/views/Service/Repair';
import Navigation from '@/components/Navigation';
import indexTree from './menu.json';
import showLightToast from '@/components/LightToast';
import './service.less';

function Service() {
  const history = useHistory();
  const { path } = useRouteMatch();

  const [currentIndex, setCurrentIndex] = useState([0, 0]);
  // 跳转获取默认tag
  useEffect(() => {
    let pathArr = history.location.pathname.split('/');
    let currentFirst = {};
    let currentFirstIndex = 0;
    indexTree.map((item, index) => {
      if (item.value === pathArr[1]) {
        currentFirst = item;
        currentFirstIndex = index;
      }
    });
    currentFirst.children.map((item, index) => {
      if (item.path === pathArr[2]) {
        setCurrentIndex([currentFirstIndex, index]);
      }
    });
  }, []);

  // 选择一级菜单
  let chooseFirstIndex = (index) => {
    if (index === 0) {
      setCurrentIndex([index, 0]);
    } else {
      showLightToast();
    }
  };

  // 选择二级菜单
  let chooseSecondIndex = (index) => {
    let firstIndex = currentIndex[0];
    setCurrentIndex([firstIndex, index]);
    let _path = indexTree[firstIndex].children[index].path;
    history.replace(`${path}/${_path}`);
  };

  // 第一行目录
  let firstListElement = indexTree.map((item, index) => (
    <div
      className="firstListItem"
      key={index}
      onClick={() => chooseFirstIndex(index)}
      style={{
        color: index === currentIndex[0] ? '#ff8c00' : '#ffffff',
        backgroundColor:
          index === currentIndex[0] ? '#3b3b3c' : 'rgba(43, 43, 45, 1)',
      }}
    >
      {item.label}
    </div>
  ));

  // 第二行目录
  let secondListElement = indexTree[currentIndex[0]].children.map(
    (item, index) => (
      <div
        className="secondListItem"
        key={index}
        onClick={() => chooseSecondIndex(index)}
        style={{
          color: index === currentIndex[1] ? '#ff8c00' : '#ffffff',
          backgroundColor:
            index === currentIndex[1] ? 'rgba(76, 76, 76, 1)' : '#3b3b3c',
        }}
      >
        {item.label}
      </div>
    )
  );

  const store = useStore();
  let houseName = store.getState().userInfo.houseAddress;
  return (
    <div className="service">
      <Navigation title="物业服务" />
      <div className="service-content">
        <section className="addressLine flex-row-center">
          <div className="addressIcon"></div>
          <div className="address">
            当前房屋：
            {store.getState().userInfo.cityName +
              store.getState().userInfo.blockName +
              store.getState().userInfo.houseAddress}
          </div>
        </section>
        <section className="contentBox flex-row">
          <div className="firstList">{firstListElement}</div>
          <div className="secondList">{secondListElement}</div>
          <div className="routeBox">
            <Switch>
              <Route path={`${path}/repair`} component={Repair} />
              <Route path={`${path}/complaints`} component={Complaints} />
              <Route path={`${path}/pay`} component={Pay} />
              <Redirect to={`${path}/repair`} />
            </Switch>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Service;
