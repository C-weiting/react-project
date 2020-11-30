import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function useLogin () {
    const userInfo = useSelector(state => state.userInfo);
    const isLogin = useMemo(
        () => Object.keys(userInfo).length !== 0,
        [userInfo]
    );

    return isLogin;
}

export default useLogin;