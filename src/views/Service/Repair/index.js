import React from 'react';
import CardList from '@/components/CardList';
import '../inner-route.less';

const listData = [
    {
        title: '第一步',
        pic: 'https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/first-step%402x.png',
        desc: '确认房屋信息，提交报事报修申请'
    },
    {
        title: '第二步',
        pic: 'https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/second-step%402x.png',
        desc: '等待服务中心与您联系，了解情况'
    },
    {
        title: '第三步',
        pic: 'https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/third-step%402x.png',
        desc: '服务完毕，进入新橙社APP评价服务'
    }
]

function Repair() {
    return (
        <div className="repair-content">
            <CardList listData={listData} />
            <div className="content-bottom">
                <div className="btn-title">
                    提交后请保持手机畅通，工作人员会尽快与您联系
                </div>
                <div className="bttom-btn">提交申请</div>
            </div>
        </div>
    )
}

export default Repair;