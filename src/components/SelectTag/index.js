import React, { useEffect, useState } from 'react';
import './selectTag.less';
import store from '@/store';
import action from '../../store/action/userInfo';

export default function SelectTag(props) {
  const [tagList, setTagList] = useState(props.tagList);
  const [tagElement, setTagElement] = useState(<div></div>);
  const [currentTag, setCurrentTag] = useState(props.default);
  useEffect(() => {
    setTagElement(
      tagList.map((item, index) =>
        item.value === currentTag ? (
          <div className="currentItem" key={index}>
            {item.value}
          </div>
        ) : (
          <div
            className="tagItem"
            key={index}
            onClick={() => {
              setCurrentTag(item.value);
              let userInfo = store.getState().userInfo;
              userInfo.currentTag = item.value;
              store.dispatch(action.addUserInfo(userInfo));
            }}
          >
            {item.value}
          </div>
        )
      )
    );
  }, [currentTag]);

  return <div className="tagBox flex-row">{tagElement}</div>;
}
