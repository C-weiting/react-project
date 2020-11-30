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
      tagList.map((item,index) =>
        item.value === currentTag ? (
          <div className="currentItem" key={index}>
            {item.value}
          </div>
        ) : (
          <div
            className="tagItem"
            onClick={() => {
              setCurrentTag(item.value);
              store.dispatch(
                action.addUserInfo({
                  ...store.getState().userInfo,
                  currentTag: currentTag,
                })
              );
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
