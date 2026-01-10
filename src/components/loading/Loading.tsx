import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <TailSpin
        height={80}
        width={80}
        color="#4fa94d"
        ariaLabel="loading"
        visible={true}  
      />
    </div>
  );
};

export default Loading;
