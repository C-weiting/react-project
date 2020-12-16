import React, { useState, useEffect } from 'react';
import './home.less';
import Left from './Left';
import Center from './Center';
import Right from './Right';
import eventBus from '@/event/EventBus';
import * as eventActionTypes from '@/event/action-types';
import * as actionTypes from '@/store/action-types';
import { useDispatch } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    let addDeviceId = (payload) => {
      //   setDeviceId(payload);
      dispatch({ type: actionTypes.SET_DEVICE_ID, payload });
    };
    eventBus.on(eventActionTypes.GET_DEVICE_ID, addDeviceId);
    if (window.android != null && typeof window.android != 'undefined') {
      const data = {
        method: eventActionTypes.GET_DEVICE_ID,
      };
      window.android.callAndroid(JSON.stringify(data));
    }
    return () => {
      eventBus.off(eventActionTypes.GET_DEVICE_ID, addDeviceId);
    };
  }, []);

  return (
    <div className="home-content">
      <div className="left-content">
        <Left />
      </div>
      <div className="center-content">
        <Center />
      </div>
      <div className="right-content">
        <Right />
      </div>
    </div>
  );
}

export default Home;
