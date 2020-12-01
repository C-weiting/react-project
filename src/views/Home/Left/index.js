import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Toast } from 'antd-mobile';
import { getWeather } from '@/api/thirdParty';
import * as eventActionTypes from '@/event/action-types';
import * as actionTypes from '@/store/action-types';
import eventBus from '@/event/EventBus';
import showLightToast from '@/components/LightToast';
import '../home.less';

const weekDayMap = {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日',
}

export default function HomeLeft () {
    const dispatch = useDispatch();
    const { weatherInfo } = useSelector(state => state.third);
    const [timeData, setTimeData] = useState({
        time: moment().format('HH:mm'),
        day: moment().format('MM月DD日'),
        weekday: weekDayMap[moment().get('weekday')]
    });

    useEffect(() => {
        const fn = () => {
            getWeather().then(res => {
                if (res && res.showapi_res_body && res.showapi_res_body.f1) {
                    dispatch({ type: actionTypes.SET_WEATHER_INFO, payload: res.showapi_res_body.f1 })
                }
            })
        }

        fn();

        eventBus.on(eventActionTypes.GET_NETWORK_STATUS, fn);

        return () => {
            eventBus.off(eventActionTypes.GET_NETWORK_STATUS, fn);
        }
    }, [dispatch]);

    useEffect(() => {
        let timer = setInterval(getTime, 60 * 1000)

        return () => {
            clearInterval(timer);
            timer = null
        }
    }, []);

    function getTime () {
        const newTimeData = {
            time: moment().format('HH:mm'),
            day: moment().format('MM月DD日'),
            weekday: weekDayMap[moment().get('weekday')]
        }
        setTimeData(newTimeData);
    }

    function handleToast () {
        showLightToast();
    }

    return (
        <>
            <div className="left-top-content">
                <div>
                    <div className="time">{timeData.time}</div>
                    <div className="day">{timeData.day}{timeData.weekday}</div>
                </div>
                <div className="weather-info">
                    <span className="temperature">{weatherInfo.day_air_temperature}</span>
                    <span className="weather">
                        <span className="cricle"></span>
                        {weatherInfo.day_weather}
                    </span>
                </div>
                <div className="weather-pic-content">
                    <img className="weather-pic" src={weatherInfo.day_weather_pic} alt="" />
                </div>
            </div>
            <div className="left-bottom-content" onClick={handleToast}>
                <div className="music-left">
                    <span className="music-title">音乐视听</span>
                    <img src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/music%402x.png" alt="" />
                </div>
                <div className="music-pic">
                    <img src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/machine%402x.png" alt="" />
                </div>
            </div>
        </>
    )
}