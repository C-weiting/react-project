import { useEffect } from 'react';
import eventBus from '@/event/EventBus';
import { useDispatch, useSelector } from 'react-redux';
import { bindingUserClientid } from '@/api/bindingUserClientid';
import * as eventActionTypes from '@/event/action-types';
import * as actionTypes from '@/store/action-types';

function useClientBind () {
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        const fn = (clientId) => {
            dispatch({ type: actionTypes.SET_PUSH_CLIENTID, payload: clientId });

            let params = {
                custId: userInfo.custId,
                blockId: userInfo.blockId,
                clientId: clientId,
                bindType: 'Y-PAD'
            }
            bindingUserClientid(params).then(res => {
                
            })
        }

        eventBus.on(eventActionTypes.SET_PUSH_CLIENTID, fn);

        return () => {
            eventBus.off(eventActionTypes.SET_PUSH_CLIENTID, fn);
        }
    }, [dispatch, userInfo.blockId, userInfo.custId]);
}

export default useClientBind;