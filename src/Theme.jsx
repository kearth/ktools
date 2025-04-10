
import { theme as antdTheme } from 'antd';

const darkTheme = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: '#1677ff',
    colorBgContainer: '#2a2a2f',
    colorText: '#b0b0b0',
    colorText: '#ffffff',
    colorTextHover: '#ffffff',
  },
  components: {
    Menu: {
      // itemColor: '#b0b0b0',
      // itemHoverColor: '#ffffff',
      // itemSelectedColor: '#ffffff',
      // subMenuItemColor: '#b0b0b0',
      darkItemBg: 'rgba(247, 237, 237, 0.99)',
      darkItemColor: '#ffffff',
      darkItemHoverBg: 'rgb(255, 255, 255)',
      darkItemHoverColor: 'rgb(255, 255, 255)',
      darkItemSelectedBg: '#3a3a3f',
      darkItemSelectedColor: '#ffffff',
      darkSubMenuItemBg: 'rgba(247, 237, 237, 0.99)',
    },
    // 添加Button组件配置
    Button: {
      colorPrimary: '#1677ff',
      colorPrimaryHover: '#4096ff',
      colorPrimaryActive: '#0958d9',
      colorBgContainer: '#2a2a2f',  // 按钮背景色
      colorText: '#b0b0b0',        // 按钮文字颜色
      colorBorder: '#3a3a3f'       // 按钮边框颜色
    }
  }
};

const lightTheme = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#1677ff',
    colorBgContainer: '#ffffff',
    colorText: 'rgba(0, 0, 0, 0.88)', // 从CSS迁移的文字颜色
    colorTextHover: 'rgba(0, 0, 0, 0.88)' // 从CSS迁移的hover文字颜色
  },
  components: {
    Menu: {
      // itemColor: 'rgba(0, 0, 0, 0.88)', // 菜单项文字颜色
      // itemHoverColor: 'rgba(0, 0, 0, 0.88)', // hover文字颜色
      // itemSelectedColor: 'rgba(0, 0, 0, 0.88)', // 选中文字颜色
      // subMenuItemColor: 'rgba(0, 0, 0, 0.88)', // 子菜单文字颜色
      lightItemBg: '#ffffff',
      lightItemColor: '#666666',
      lightItemHoverBg: '#f0f0f0',
      lightItemHoverColor: '#1677ff',
      lightItemSelectedColor: '#1677ff',
      lightSubMenuItemBg: '#ffffff',
    },
    // 添加Button组件配置
    Button: {
      colorPrimary: '#1677ff',
      colorPrimaryHover: '#4096ff',
      colorPrimaryActive: '#0958d9',
      colorBgContainer: '#2a2a2f',  // 按钮背景色
      colorText: '#b0b0b0',        // 按钮文字颜色
      colorBorder: '#3a3a3f'       // 按钮边框颜色
    }
  }
};

export { darkTheme, lightTheme };
