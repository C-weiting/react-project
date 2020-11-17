import React from 'react';
import { SwipeAction } from 'antd-mobile';

export default function HomeRight () {
    return (
        <>
            <div className="message-header">
                <img src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/message%402x.png" className="pic" alt=""/>
                <div className="text">
                    <h1 className="title">你有重要消息</h1>
                    <h4 className="subtitle">5个未读</h4>
                </div>
            </div>
            <ul className="message-list">
                <SwipeAction
                    autoClose
                    right={[
                        {
                            text: '移出',
                            onPress: () => console.log('delete'),
                            style: { backgroundColor: '#F2543F', color: '#ffffff', fontSize: '15px', width: '0.78125rem', borderRadius: '0.0625rem', marginLeft: '0.078125rem' },
                        },
                    ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                >
                    <li className="message-item">
                        <div className="message-item-info">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#iconshineihuti"></use>
                            </svg>
                            <div className="message-item-info-content">
                                <div className="title">
                                    <span className="message-type">水浸告警</span>
                                    <span className="message-time">1分钟前</span>
                                </div>
                                <div className="info">
                                    本月可能超出套餐能耗，注意节能哦！
                                </div>
                            </div>
                        </div>
                    </li>
                </SwipeAction>
            </ul>
        </>
    )
}