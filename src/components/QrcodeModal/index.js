import React from 'react';
import QRCode from 'qrcode-react';

export default function QrcodeModal (props) {
    return (
        <div>
            <QRCode
                size={150}
                value={`https://www.baidu.com`}
                logo={`https://www.baidu.com/img/baidu_jgylogo3.gif`}
                logoWidth={50}
                logoHeight={50}
            />
        </div>
    )
}