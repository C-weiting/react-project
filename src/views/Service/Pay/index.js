import React, { useState, useEffect, useMemo } from 'react';
import CheckboxItem from '@/components/CheckboxItem';
import Empty from '@/components/Empty';
import showPayModel from '@/views/Pay';
import '../inner-route.less';
import { getOrderList } from '../../../api/service';
import { useStore } from 'react-redux';

function Pay() {
  const [dataSource, setDataSource] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const store = useStore();
  const userInfo = store.getState().userInfo;
  console.log(userInfo);
  let initData = () => {
    getOrderList({
      thirdHouseId: userInfo.thirdHouseid,
      // custId: userInfo.custId,
      data: `thirdHouseId=${userInfo.thirdHouseid}`,
    }).then((res) => {
      console.log(res);
    });
  };
  initData();

  useEffect(() => {
    setDataSource([
      {
        id: 1,
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
        money: 100,
      },
      {
        id: 2,
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
        money: 100,
      },
      {
        id: 3,
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: "McDonald's invites you",
        des: '不是所有的兼职汪都需要风吹日晒',
        money: 100,
      },
      {
        id: 4,
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: "McDonald's invites you",
        des: '不是所有的兼职汪都需要风吹日晒',
        money: 100,
      },
      {
        id: 5,
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
        money: 100,
      },
      {
        id: 5,
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
        money: 100,
      },
      {
        id: 5,
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
        money: 100,
      },
    ]);
  }, []);

  console.log(dataSource);

  const totolMoney = useMemo(
    () =>
      selectedData.length
        ? selectedData.reduce((a, b) => {
            return parseInt(a) + parseInt(b.money);
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

  function handlePay() {
    showPayModel();
  }

  return (
    <div className="pay-content">
      <div className="pay-list-content">
        {dataSource.length ? (
          <ul className="pay-list">
            {dataSource.map((item, index) => (
              <div key={index} className="pay-list-item">
                <CheckboxItem onChange={(status) => onChange(item, status)} />
                <span className="pay-type">物业管理费</span>
                <span className="payment-days">账期：2020/01-2020/12</span>
                <span>
                  应缴：<span className="money">￥20000</span>
                </span>
                <span className="arrow-btn"></span>
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
          <span>共选中{selectedData.length}个账单</span>
          <span>
            应缴总计：<span className="money">￥{totolMoney}</span>
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
