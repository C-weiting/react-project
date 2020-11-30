import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function useMessageList () {
    const { cacheMessageList, pushMessageList } = useSelector(state => state.message);
    const messageList = useMemo(
        () =>
            [...cacheMessageList, ...pushMessageList],
        [cacheMessageList, pushMessageList]
    );

    return messageList;
}

export default useMessageList;