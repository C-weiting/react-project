import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getWeather } from '@/api/thirdParty';
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
    const [weatherInfo, setWeatherInfo] = useState({});
    const [timeData, setTimeData] = useState({
        time: moment().format('HH:mm'),
        day: moment().format('MM月DD日'),
        weekday: weekDayMap[moment().get('weekday')]
    });

    useEffect(() => {
        getWeather().then(res => {
            console.log(res)
            setWeatherInfo(res.showapi_res_body.f1)
        })
    }, []);

    useEffect(() => {
        const timer= setInterval(getTime, 60 * 1000)

        return () => {
            clearInterval(timer);
        }
    }, []);

    function getTime() {
        const newTimeData = {
            time: moment().format('HH:mm'),
            day: moment().format('MM月DD日'),
            weekday: weekDayMap[moment().get('weekday')]
        }
        setTimeData(newTimeData);
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
            <div className="left-bottom-content">
                <div className="music-left">
                    <span className="music-title">音乐视听</span>
                    <img src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/music%402x.png" alt=""/>
                </div>
                <div className="music-pic">
                    <img src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/machine%402x.png" alt=""/>
                </div>
            </div>
        </>
    )
}