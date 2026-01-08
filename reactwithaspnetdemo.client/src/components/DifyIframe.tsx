import React from 'react';

interface DifyIframeProps {
  token?: string;
  baseUrl?: string;
  className?: string;
  minHeight?: string | number;
}

const DifyIframe: React.FC<DifyIframeProps> = ({
  token = 'RTqNLBsgH7rHzFIt',
  baseUrl = 'http://172.16.7.210:84',
  className = '',
  minHeight = '700px',
}) => {
  // 拼接完整 URL
  const iframeUrl = `${baseUrl}/chatbot/${token}`;

  return (
    <div
      className={`dify-iframe-container ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          minHeight:
            typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        }}
        allow='microphone'
        title='Dify Chatbot'
      />
    </div>
  );
};

export default DifyIframe;
