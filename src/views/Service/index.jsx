import React, { useEffect, useState } from 'react';
import {
  useHistory,
  useLocation,
  useRouteMatch,
  Route,
  Switch,
} from 'react-router-dom';
import Message from '@/views/Message';

import './index.less';
function Service() {
  const history = useHistory();
  const path = useRouteMatch().path;

  const [indexTree, setIndexTree] = useState([
    {
      label: '物业服务',
      id: 'property',
      children: [
        {
          label: '报事报修',
          id: 'reportFix',
        },
        {
          label: '投诉举报',
          id: 'complaints',
        },
        {
          label: '物业缴费',
          id: 'payment',
        },
      ],
    },
    {
      label: '物业服务',
      id: 'property2',
      children: [
        {
          label: '报事报修2',
          id: 'reportFix2',
        },
        {
          label: '投诉举报2',
          id: 'complaints2',
        },
        {
          label: '物业缴费2',
          id: 'payment2',
        },
      ],
    },
  ]);
  // 初始化选中
  let location = useLocation();
  const [currentIndex, setCurrentIndex] = useState([
    location.query ? location.query.currentIndex[0] : 0,
    location.query ? location.query.currentIndex[1] : 0,
  ]);
  // 选择一级菜单
  let chooseFirstIndex = (index) => {
    setCurrentIndex([index, 0]);
  };
  // 选择二级菜单
  let chooseSecondIndex = (index) => {
    let firstIndex = currentIndex[0];
    setCurrentIndex([firstIndex, index]);
    history.push(`${path}/message`);
  };
  // 第一行目录
  let firstListElement = indexTree.map((item, index) => (
    <div
      className="firstListItem"
      key={index}
      onClick={chooseFirstIndex.bind(this, index)}
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
        onClick={chooseSecondIndex.bind(this, index)}
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
  return (
    <div className="service">
      <section className="addressLine flex-row-center">
        <div className="addressIcon"></div>
        <div className="address">当前房屋:常州帝景002单位001栋101室</div>
      </section>
      <section className="contentBox flex-row">
        <div className="firstList">{firstListElement}</div>
        <div className="secondList">{secondListElement}</div>
        <div className="routeBox">
          <Switch>
            <Route path={`${path}/message`} component={Message}></Route>
          </Switch>
        </div>
      </section>
    </div>
  );
}
export default Service;
