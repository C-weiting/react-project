import React, { useEffect, useState } from 'react';
import { getWeather } from '@/api/thirdParty';
import '../home.less';

export default function HomeLeft () {

    const [weatherInfo, setWeatherInfo] = useState({});

    // useEffect(() => {
    //     getWeather().then(res => {
    //         console.log(res)
    //         setWeatherInfo(res.showapi_res_body.f1)
    //     })
    // }, []);

    return (
        <>
            <div className="left-top-content">
                <div>
                    <div className="time">20:00</div>
                    <div className="day">10月10日周六</div>
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