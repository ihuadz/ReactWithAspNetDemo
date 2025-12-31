import { useEffect } from 'react';
import { useMatches } from 'react-router';

import { RouteMetadata } from '@/types/router';

export const MetadataHandler = () => {
  const matches = useMatches();

  useEffect(() => {
    // 从当前匹配的所有路由层级中寻找 handle
    // 嵌套路由下，matches 会包含 [父路由, 子路由]
    const metadata = matches
      .map((match) => match.handle as RouteMetadata)
      .filter((handle) => handle && handle.title);

    if (metadata.length > 0) {
      // 获取最深一层路由的 title
      const { title, description } = metadata[metadata.length - 1];

      // 更新浏览器标题
      document.title = `${title} - React with ASP.NET Demo`;

      // 动态更新 Meta Description
      if (description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);
      }
    }
  }, [matches]);

  return null;
};
