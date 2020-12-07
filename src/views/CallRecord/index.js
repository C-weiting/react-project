import React from 'react';
import { showTime } from '@/utils';
import './call-record.less';

function CallRecord() {
    const recordList = [{
        name: '023688-0101',
        time: new Date().getTime()
    },{
        name: '023688-0102',
        time: new Date().getTime()
    },{
        name: '单元门门禁机',
        time: new Date().getTime()
    },{
        name: '023688-0104',
        time: new Date().getTime()
    },{
        name: '023688-0102',
        time: new Date().getTime()
    },{
        name: '单元门门禁机',
        time: new Date().getTime()
    },{
        name: '023688-0104',
        time: new Date().getTime()
    },{
        name: '023688-0102',
        time: new Date().getTime()
    },{
        name: '单元门门禁机',
        time: new Date().getTime()
    },{
        name: '023688-0104',
        time: new Date().getTime()
    }]
    return (
        <div className="call-record">
            <h1 className="title">最近通话</h1>
            <ul className="record-list">
                {
                    recordList.map((record, index) => {
                        return (
                            <li key={index} className="record-item">
                                <span className="record-name">{record.name}</span>
                                <span className="record-time">{showTime(record.time)}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CallRecord;
