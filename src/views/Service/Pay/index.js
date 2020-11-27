import React, { useState, useEffect, useMemo } from 'react';
import Empty from '@/components/Empty';
import showPayModel from '@/views/Pay';
import '../inner-route.less';
import { getOrderList, createPayOrder } from '../../../api/service';
import { useStore } from 'react-redux';
import eventBus from '@/event/EventBus';
import * as eventActionTypes from '@/event/action-types';
import { CustomSuccess } from '@/components/CustomToast';
let payModelCallback;

function Pay() {
  const [dataSource, setDataSource] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const store = useStore();
  const userInfo = store.getState().userInfo;

  useEffect(() => {
    let initData = () => {
      console.log(userInfo);
      getOrderList({
        thirdHouseId: userInfo.thirdHouseid,
        reqSource: 1,
        data: `thirdHouseId=${userInfo.thirdHouseid}&reqSource=${1}`,
      }).then((res) => {
        if (res && res.success && res.model) {
          setDataSource(res.model);
          setSelectedData(res.model);
        }
      });
    };
    initData();

    const fn = (data) => {
      if (parseInt(JSON.parse(data.content).type) === 10092) {
        //已缴费通知
        CustomSuccess('缴费成功');
        payModelCallback(); //关闭二维码弹框
        initData();
      }
    };
    eventBus.on(eventActionTypes.GET_PUSH_MSG, fn);

    return () => {
      eventBus.off(eventActionTypes.GET_PUSH_MSG, fn);
    };
  }, [userInfo.thirdHouseid]);

  const totolMoney = useMemo(
    () =>
      selectedData.length
        ? selectedData.reduce((a, b) => {
            return parseInt(a) + parseInt(b.totalMoney);
          }, 0)
        : 0,
    [selectedData]
  );

  let orderNameList = () => {
    let arr = [];
    for (const item of selectedData) {
      arr.push(item.orderName);
    }
    return arr;
  };

  function handlePay() {
    if (selectedData.length === 0) {
      return;
    }
    const paramsObj = {
      cityId: userInfo.cityId,
      cityName: userInfo.cityName,
      blockId: userInfo.blockId,
      blockName: userInfo.blockName,
      thirdHouseId: userInfo.thirdHouseid,
      houseInfo: userInfo.houseAddress,
      moneyReceivable: totolMoney,
      startTime: selectedData[0].repYears.slice(0, 7),
      endTime: selectedData[0].repYears.slice(8, 15),
      ipItemNameList: orderNameList().toString(),
      invoice: false,
      operator: 'Y-PAD',
      custId: selectedData[0].custId,
      custName: selectedData[0].cstName,
      xcCustId: userInfo.custId,
      xcCustName: userInfo.custNickName,
      orderChannel: 10,
    };
    const params = {
      ...paramsObj,
      data: json2String(paramsObj),
    };
    createPayOrder(params).then((res) => {
      payModelCallback = showPayModel(res.model.qrCodePayUrl);
    });
  }
  function json2String(params) {
    let result = '';
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        let element = '';
        if (params[key] instanceof Array) {
          element = params[key].toString();
          key = key.slice(0, key.length - 2);
        } else {
          element = params[key];
        }
        result = `${result}${key}=${element}&`;
      }
    }
    return result.slice(0, result.length - 1);
  }

  return (
    <div className="pay-content">
      <div className="pay-list-content">
        {dataSource.length ? (
          <ul className="pay-list">
            {dataSource.map((item, index) => (
              <div key={index} className="pay-list-item">
                {/* <CheckboxItem onChange={(status) => onChange(item, status)} /> */}
                <span className="pay-type">{item.orderName}</span>
                <span className="payment-days">账期：{item.repYears}</span>
                <span>
                  应缴：<span className="money">￥{item.totalMoney / 100}</span>
                </span>
                {/* <span className="arrow-btn"></span> */}
              </div>
            ))}
          </ul>
        ) : (
          <Empty
            pic="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/pay-empty%402x.png"
            text="当前没有缴费账单"
          />
        )}
      </div>
      <div className="content-bottom">
        <div className="btn-title">
          {/* <span>共选中{selectedData.length}个账单</span> */}
          <span>
            应缴总计：<span className="money">￥{totolMoney / 100}</span>
          </span>
        </div>
        <div className="bttom-btn" onClick={handlePay}>
          确认缴费
        </div>
      </div>
    </div>
  );
}

export default Pay;
