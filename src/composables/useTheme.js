import Vue from 'vue'
import Config from '@/config'

function useTheme() {
  const colorMappings = {
    successColor: '--success',
    primaryColor: '--primary',
    destructiveColor: '--destructive',
    warningColor: '--warning'
  }

  const updateThemeColor = () => {
    // 统一处理颜色变量的更新
    Object.entries(colorMappings).forEach(([sourceVar, targetVar]) => {
      const colorValue = Config.themeConfig[sourceVar]
      if (colorValue) {
        document.documentElement.style.setProperty(targetVar, colorValue)
      }
    })
  }

  return {
    updateThemeColor
  }
}

export { useTheme }
