import React, { useState } from 'react';
import './index.less';
function Service() {
  const [indexTree, setIndexTree] = useState([
    {
      label: '物业服务',
    },
  ]);
  return (
    <div className="service">
      <section className="addressLine flex-row-center"></section>
    </div>
  );
}
export default Service;
