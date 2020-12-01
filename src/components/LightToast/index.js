import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './light-toast.less';

let divList = [];

function LightToast (props) {
    function onClose () {
        divList.forEach((div) => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        });
        divList = [];
    }

    useEffect(() => {
        setTimeout(() => {
            onClose();
        }, props.delay || 2000)
    }, [props.delay]);

    return (
        <div className="light-toast">
            {props.text || '正在建设中，敬请期待'}
        </div>
    )
}

function showLightToast (text, delay) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    divList.push(div);
    ReactDOM.render(<LightToast text={text} delay={delay} />, div);

    return () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    };
}

export default showLightToast;