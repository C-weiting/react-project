import React, { useEffect, useState } from 'react';
import eventBus from '@/event/EventBus';
import { useSelector } from 'react-redux';
import { showTime } from '@/utils';
import * as eventActionTypes from '@/event/action-types';
import './call-record.less';

function CallRecord () {
    const userInfo = useSelector(state => state.userInfo);
    const [recordList, setRecordList] = useState([]);

    useEffect(() => {
        const fn = (payload) => {
            setRecordList(payload);
        }

        eventBus.on(eventActionTypes.GET_CALL_RECORDS, fn);

        if (window.android != null && typeof window.android != 'undefined') {
            const data = {
                method: eventActionTypes.GET_CALL_RECORDS,
                custId: userInfo.custId
            };
            window.android.callAndroid(JSON.stringify(data));
        }

        return () => {
            eventBus.off(eventActionTypes.GET_CALL_RECORDS, fn);
        }
    }, [userInfo.custId]);

    return (
        <div className="call-record">
            <h1 className="title">最近通话</h1>
            <ul className="record-list">
                {
                    recordList.map(record => {
                        return (
                            <li key={record.id} className={`record-item ${record.isAnswer ? '' : 'no-answer'} `}>
                                <span className="record-name">{record.callName}</span>
                                <span className="record-time">{showTime(parseInt(record.callTime))}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CallRecord;
