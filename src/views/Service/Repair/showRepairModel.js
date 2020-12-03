import React, { createRef, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import './model.less';
import store from '@/store';
import action from '@/store/action/userInfo';
import { addWorkOrder } from '../../../api/service';
import SelectTag from '@/components/SelectTag';
import { CustomSuccess, CustomFail } from '../../../components/CustomToast';

let divList = [];
const defaultTag = '房修问题';

function LoginInfo(props) {
  const [modal, setModal] = useState(true);
  const [tagList, setTagLit] = useState([
    { value: '房修问题' },
    { value: '电梯故障' },
    { value: '管道堵塞' },
    { value: '渗水漏水' },
    { value: '电力故障' },
    { value: '其它' },
  ]);
  function onClose() {
    setModal(false);

    divList.forEach((div) => document.body.removeChild(div));
    divList = [];
  }

  const userInfo = store.getState().userInfo;
  // const address = store.getState().userInfo.houseAddress;
  // console.log(userInfo);

  function onCommit() {
    let params = {
      appUser: userInfo.custNickName,
      houseId: userInfo.houseId,
      phone: userInfo.custPhone,
      deviceNumber: userInfo.deviceId,
      appUserId: userInfo.custId,
      address: userInfo.houseAddress,
      thirdHouseId: userInfo.thirdHouseid,
      community: userInfo.blockId,
      orderType: 1,
      subOrderType: 1,
      orderDesc: userInfo.currentTag || defaultTag,
    };
    console.log(params);
    addWorkOrder(params).then((res) => {
      setDefaultTag();
      if (res.success === true) {
        CustomSuccess('提交成功');
        onClose();
      } else {
        // CustomFail('操作失败');
        CustomFail('您的操作太频繁，请稍后再试一下');
        onClose();
      }
    });
  }
  function setDefaultTag() {
    let userInfo = store.getState().userInfo;
    userInfo.currentTag = null;
    store.dispatch(action.addUserInfo(userInfo));
  }
  return (
    <Modal
      visible={modal}
      transparent
      onClose={onClose}
      className="model-repair-info"
      footer={[
        {
          text: '取消',
          onPress: () => {
            onClose();
          },
        },
        {
          text: '确认提交',
          onPress: () => {
            onCommit();
          },
        },
      ]}
    >
      <div className="repair-info-content">
        <div className="title">报事报修确认</div>
        <ul className="info-list">
          <li>房屋地址： {userInfo.cityName + userInfo.blockName + userInfo.houseAddress}</li>
          <li>联系电话： {userInfo.custPhone}</li>
        </ul>
        <div className="tagName">分类选择：</div>
        <SelectTag tagList={tagList} default={defaultTag}></SelectTag>
      </div>
    </Modal>
  );
}

function showLoginInfoModel(...args) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  divList.push(div);
  ReactDOM.render(<LoginInfo {...args} />, div);

  return () => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  };
}

export default showLoginInfoModel;
