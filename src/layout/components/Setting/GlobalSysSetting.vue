<template>
  <el-drawer
    custom-class="global-sys-setting"
    size="400px"
    direction="rtl"
    v-model="SysStore.SysConfig.isShowSysDrawer"
    :before-close="handleClose"
    :show-close="false"
  >
    <template #header>
      <div class="text-center header-title">
        <span>系统设置</span>
      </div>
    </template>

    <GlobalSettingItem label="主题模式">
      <el-switch
        v-model="SwitchThemeModeValue"
        class="theme"
        size="large"
        inline-prompt
        :width="50"
        :active-icon="DarkModeIcon"
        :inactive-icon="LightModeIcon"
        @change="changeThemeMode"
      />
    </GlobalSettingItem>

    <GlobalSettingItem label="布局模式">
      <div class="v-flex aic jsa layout">
        <el-tooltip
          effect="dark"
          placement="bottom"
          v-for="item in LayoutModeData"
          :key="item.code"
          :content="item.label"
        >
          <div
            class="layout-item"
            :class="item.code == SysStore.SysConfig.layoutMode ? 'active-layout' : ''"
            @click="changeLayoutMode(item.code)"
          >
            <div :class="item.menuClass"></div>
            <div :class="item.mainClass"></div>
          </div>
        </el-tooltip>
      </div>
    </GlobalSettingItem>

    <GlobalSettingItem label="主题色模式">
      <div class="color">
        <span
          v-for="(item, index) in SysStore.themeColorArray"
          :key="index"
          :style="{ backgroundColor: item }"
          :class="[SysStore.themeColor === item as string ? 'active-item-box' : '' ]"
          @click="changePrimaryColor(item)"
        ></span>
      </div>

      <div style="margin-top: 1rem">
        <el-color-picker v-model="SysStore.themeColor" @activeChange="changePrimaryColor" />
      </div>
    </GlobalSettingItem>

    <GlobalSettingItem label="界面功能" class="interface">
      <div class="v-flex jsb aic">
        <label>头部高度</label>
        <el-input-number
          class="w120"
          v-model="CustomHeaderHeight"
          :min="MixHeaderHeight"
          :max="MaxHeaderHeight"
          @change="handleHeaderHeightChange"
        />
      </div>
      <div class="v-flex jsb aic">
        <label>标签页高度</label>
        <el-input-number
          class="w120"
          v-model="CustomTagHeight"
          :min="MixTagHeight"
          :max="MaxTagHeight"
          @change="handleTagHeightChange"
        />
      </div>
      <div class="v-flex jsb aic">
        <label>页面切换动画</label>
        <el-select v-model="SysStore.SysConfig.pageTransition" class="w160" placeholder="Select">
          <el-option
            v-for="item in MainPageTransitionAnimation"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </GlobalSettingItem>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { UseSysStore } from '@/store/modules/SysStore'
import { render } from '@/utils/common/IconifyRenderComponent'

import { useThemeMode } from '@/hooks/UseThemeMode'

import GlobalSettingItem from './GlobalSettingItem.vue'

const SysStore = UseSysStore()

// 第一部分：主题模式相关
const LightModeIcon = render({ name: 'emojione-v1:sun' })
const DarkModeIcon = render({ name: 'fxemoji:lastquartermoonface' })
const SwitchThemeModeValue = computed(() => {
  if (SysStore.SysConfig.themeMode === 'light') {
    return false
  }
  return true
})
const { toggleThemeMode } = useThemeMode()
const changeThemeMode = () => {
  // 切换主题模式
  toggleThemeMode()
}

// 第二部分：布局模式相关
interface LayoutModeProps {
  label: string
  code: SysBasicConfig.SysLayoutMode
  menuClass: string
  mainClass: string
}
const LayoutModeData: LayoutModeProps[] = [
  { label: '左侧菜单', code: 'LEFT_MENU_MODE', menuClass: 'w-1-3 h100', mainClass: 'w-2-3 h-3-4 right-0 bottom-0' },
  { label: '顶部菜单', code: 'TOP_MENU_MODE', menuClass: 'w100 h-1-3', mainClass: 'w100 h-2-3 bottom-0' },
  {
    label: '顶部混合菜单',
    code: 'TOP_MIX_MENU_MODE',
    menuClass: 'w100 h-1-3',
    mainClass: 'w-2-3 h-2-3 right-0 bottom-0'
  }
]
const changeLayoutMode = (code: SysBasicConfig.SysLayoutMode) => {
  if (code === 'TOP_MENU_MODE') {
    SysStore.SysConfig.leftMenuIsCollapsed = false
  }
  SysStore.setLayoutMode(code)
}

// 第三部分：主题色模式相关
const changePrimaryColor = (color: string) => {
  SysStore.SysConfig.themeColor = color
}

// 第四部分：界面功能
const CustomHeaderHeight = ref(SysStore.SysConfig.customHeaderHeight)
const MixHeaderHeight = ref(50)
const MaxHeaderHeight = ref(70)
const handleHeaderHeightChange = (value: number | undefined) => {
  if (value) {
    SysStore.SysConfig.customHeaderHeight = value
  }
}
const CustomTagHeight = ref(SysStore.SysConfig.customTagHeight)
const MixTagHeight = ref(40)
const MaxTagHeight = ref(60)
const handleTagHeightChange = (value: number | undefined) => {
  if (value) {
    SysStore.SysConfig.customTagHeight = value
  }
}
// 系统内置页面切换动画
const MainPageTransitionAnimation = reactive([
  {
    value: 'fade',
    label: '消退'
  },
  {
    value: 'fade-slide',
    label: '向右滑动消退'
  },
  {
    value: 'fade-bottom',
    label: '向下滑动消退'
  },
  {
    value: 'fade-top',
    label: '向上滑动消退'
  },
  {
    value: 'fade-scale',
    label: '缩放消退'
  },
  {
    value: 'zoom-fade',
    label: '放大消退'
  },
  {
    value: 'zoom-out',
    label: '缩小放大'
  }
])

// 最后部分：关闭系统抽屉
const handleClose = () => {
  SysStore.SysConfig.isShowSysDrawer = false
}

// 系统相关内容初始化
// onMounted(() => {
//   // 主题色初始化
//   SysStore.setThemeColor(SysStore.SysConfig.themeColor)
// })
</script>

<style lang="less" scoped>
.global-sys-setting {
  .header-title {
    color: var(--el-text-color-primary);
  }

  .theme {
    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z))
      rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z))
      skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
      scaleZ(var(--tw-scale-z));
    left: 50%;
    --tw-translate-x: -50%;
    --tw-translate-y: 0;
    --tw-translate-z: 0;
    --tw-rotate: 0;
    --tw-rotate-x: 0;
    --tw-rotate-y: 0;
    --tw-rotate-z: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-scale-z: 1;
  }

  .layout {
    .dark {
      background: red;
    }

    .layout-item {
      width: 60px;
      height: 60px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px rgb(0 0 0 / 18%);
      background: var(--el-bg-color-page);

      > div:nth-child(1) {
        position: absolute;
        --tw-bg-opacity: 1;
        background-color: rgba(39, 51, 82, var(--tw-bg-opacity));
      }

      > div:nth-child(2) {
        position: absolute;
        --tw-bg-opacity: 1;
        background-color: rgba(240, 242, 245, var(--tw-bg-opacity));
      }
    }

    .active-layout {
      border: 2px solid var(--el-color-primary-light-3);
    }
  }

  .color {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    justify-items: center;
    align-content: center;
    grid-row-gap: 10px;
    color: #fff;

    > span {
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      background-color: red;
      text-align: center;
      cursor: pointer;

      &.active-item-box::after {
        content: '\2714';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
      }
    }
  }

  .interface {
    label {
      font-size: 14px;
      line-height: 1;
    }

    .w120 {
      width: 120px;
    }

    .w160 {
      width: 160px;
    }

    > div:not(:last-of-type) {
      margin-bottom: 20px;
    }
  }

  .w-1-3 {
    width: 33.333333%;
  }

  .w-2-3 {
    width: 66.666667%;
  }

  .h-1-3 {
    height: 33.333333%;
  }

  .h-2-3 {
    height: 66.666667%;
  }

  .h-3-4 {
    height: 75%;
  }

  .right-0 {
    right: 0px;
  }

  .bottom-0 {
    bottom: 0px;
  }
}

:deep(.el-color-picker) {
  width: 100% !important;
}

:deep(.el-color-picker__trigger) {
  width: 100% !important;
}

.checkbox-shadow {
  box-shadow: 0 1px 2.5px rgba(0, 0, 0, 0.18);
}
</style>
