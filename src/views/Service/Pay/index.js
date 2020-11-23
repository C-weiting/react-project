import React, { useState, useEffect, useMemo } from 'react';
import CheckboxItem from '@/components/CheckboxItem';
import Empty from '@/components/Empty';
import showPayModel from '@/views/Pay';
import '../inner-route.less';
import { getOrderList, createPayOrder } from '../../../api/service';
import { useStore } from 'react-redux';

function Pay() {
  const [dataSource, setDataSource] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [payInfo, setPayInfo] = useState({});
  const store = useStore();
  const userInfo = store.getState().userInfo;
  let initData = () => {
    getOrderList({
      thirdHouseId: userInfo.thirdHouseid,
      reqSource: 1,
      data: `thirdHouseId=${userInfo.thirdHouseid}&reqSource=${1}`,
    }).then((res) => {
      setDataSource(res.model);
      setSelectedData(res.model);
    });
  };
  useEffect(() => {
    initData();
  }, []);

  const totolMoney = useMemo(
    () =>
      selectedData.length
        ? selectedData.reduce((a, b) => {
            return parseInt(a) + parseInt(b.totalMoney);
          }, 0)
        : 0,
    [selectedData]
  );

  function onChange(data, status) {
    const index = selectedData.findIndex((item) => item.id === data.id);

    if (index > -1) {
      let newSelectedData = selectedData.filter((item) => item.id !== data.id);
      setSelectedData(newSelectedData);
    } else {
      setSelectedData([...selectedData, data]);
    }
  }
  let orderNameList = () => {
    let arr = [];
    for (const item of selectedData) {
      arr.push(item.orderName);
    }
    return arr;
  };

  function handlePay() {
    console.log(userInfo);
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
      showPayModel();
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
