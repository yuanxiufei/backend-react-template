import React from 'react';
import { render as renderAmis, setDefaultTheme } from 'amis';
import amisRequest from '@/utils/amisRequest';

const AmisDemo = () => {
  const schema = {
    title: 'Amis 示例',
		type: "form",
		mode: "inline",
    body: [
			{
        type: "input-text",
        name: "name",
        label: "姓名："
      },
      {
        name: "email",
        type: "input-email",
        label: "邮箱："
      }
		],
		actions: [
			{
				type: "button",
				label: "查询"
			}
		]
  };

  return (
    <div>
      {renderAmis(schema, {
        // 配置api适配器
        fetcher: ({ url, method, data, config, headers }: any) => {
          return amisRequest({
            url,
            method,
            data,
            config,
            headers
          });
        },
        // 配置amis环境
        env: {
          // 默认开启loading
          loadingConfig: {
            showLoading: true
          }
        },
        theme: 'antd',
      })}
    </div>
  );
};

export default AmisDemo;
