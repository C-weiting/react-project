import React, { useState, useEffect, useMemo } from 'react';
import { ListView } from 'antd-mobile';
import CheckboxItem from '@/components/CheckboxItem'
import '../inner-route.less';

function Pay () {
    const [dataSource, setDataSource] = useState(new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
    }));
    const [selectedData, setSelectedData] = useState([])

    useEffect(() => {
        setDataSource(dataSource.cloneWithRows([
            {
                id: 1,
                img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                title: 'Meet hotel',
                des: '不是所有的兼职汪都需要风吹日晒',
                money: 100
            },
            {
                id: 2,
                img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                title: 'Meet hotel',
                des: '不是所有的兼职汪都需要风吹日晒',
                money: 100
            },
            {
                id: 3,
                img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                title: 'McDonald\'s invites you',
                des: '不是所有的兼职汪都需要风吹日晒',
                money: 100
            },
            {
                id: 4,
                img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                title: 'McDonald\'s invites you',
                des: '不是所有的兼职汪都需要风吹日晒',
                money: 100
            },
            {
                id: 5,
                img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                title: 'Eat the week',
                des: '不是所有的兼职汪都需要风吹日晒',
                money: 100
            },
        ]))
    }, []);

    const totolMoney = useMemo(() => (
        selectedData.length ? selectedData.reduce((a, b) => {
            return parseInt(a) + parseInt(b.money)
        }, 0) : 0
    ), [selectedData]);

    function onChange (data, status) {
        const index = selectedData.findIndex(item => item.id === data.id);

        if (index > -1) {
            let newSelectedData = selectedData.filter(item => item.id !== data.id)
            setSelectedData(newSelectedData)
        } else {
            setSelectedData([...selectedData, data])
        }
    }

    const row = (rowData, sectionID, rowID) => {
        return (
            <div key={rowID} className="pay-list-item">
                <CheckboxItem onChange={(status) => onChange(rowData, status)} />
                <span className="pay-type">物业管理费</span>
                <span className="payment-days">账期：2020/01-2020/12</span>
                <span>应缴：<span className="money">￥20000</span></span>
                <span className="arrow-btn"></span>
            </div>
        )
    }

    return (
        <div className="pay-content">
            <div className="pay-list">
                <ListView
                    dataSource={dataSource}
                    renderRow={row}
                    style={{ height: '100%', overflow: 'auto' }}
                />
            </div>
            <div className="content-bottom">
                <div className="btn-title">
                    <span>共选中{selectedData.length}个账单</span>
                    <span>应缴总计：<span className="money">￥{totolMoney}</span></span>
                </div>
                <div className="bttom-btn">提交申请</div>
            </div>
        </div>
    )
}

export default Pay;