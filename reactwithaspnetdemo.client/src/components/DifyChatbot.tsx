import { useEffect } from 'react';

const DifyChatbot = () => {
  useEffect(() => {
    // 配置全局变量
    window.difyChatbotConfig = {
      token: 'RTqNLBsgH7rHzFIt',
      baseUrl: 'http://172.16.7.210:84',
    };

    // 动态创建并插入脚本
    const script = document.createElement('script');
    script.src = 'http://172.16.7.210:84/embed.min.js';
    script.id = 'RTqNLBsgH7rHzFIt';
    script.defer = true;
    document.body.appendChild(script);

    // 组件销毁时清理脚本（可选，根据需求决定是否保留聊天气泡）
    return () => {
      const existingScript = document.getElementById('RTqNLBsgH7rHzFIt');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      // 清理气泡按钮元素
      const bubble = document.getElementById('dify-chatbot-bubble-button');
      if (bubble) bubble.remove();
    };
  }, []);

  return null; // 该组件不渲染实际 UI，只负责加载脚本
};

export default DifyChatbot;
