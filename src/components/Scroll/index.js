import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle, useMemo } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import debounce from "@/utils/debounce";
import './index.less';
 
const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState();
 
  const scrollContaninerRef = useRef();
 
  const { direction, click, refresh, bounceTop, bounceBottom } = props;
 
  const { pullUp, pullDown, onScroll } = props;
 
  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 500)
  }, [pullUp]);
 
  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 500)
  }, [pullDown]);
 
  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);
 
  useEffect(() => {
    if(!bScroll || !onScroll) return;
    bScroll.on('scroll', onScroll)
    return () => {
      bScroll.off('scroll', onScroll);
    }
  }, [onScroll, bScroll]);
 
  useEffect(() => {
    if(!bScroll || !pullUp) return;
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUpDebounce();
      }
    };
    bScroll.on('scrollEnd', handlePullUp);
    return () => {
      bScroll.off('scrollEnd', handlePullUp);
    }
  }, [pullUp, pullUpDebounce, bScroll]);
 
  useEffect(() => {
    if(!bScroll || !pullDown) return;
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if(pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on('touchEnd', handlePullDown);
    return () => {
      bScroll.off('touchEnd', handlePullDown);
    }
  }, [pullDown, pullDownDebounce, bScroll]);
 
 
  useEffect(() => {
    if(refresh && bScroll){
      bScroll.refresh();
    }
  });
 
  useImperativeHandle(ref, () => ({
    refresh() {
      if(bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if(bScroll) {
        return bScroll;
      }
    }
  }));
 
  return (
    <div className="scroll_container" ref={scrollContaninerRef}>
      {props.children}
    </div>
  );
})
 
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};
 
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向下吸顶
};
 
export default Scroll;