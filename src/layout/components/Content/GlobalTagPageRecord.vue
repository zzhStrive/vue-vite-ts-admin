<template>
  <div
    :style="{ height: SysStore.SysConfig.customTagHeight + 'px' }"
    class="global-tag-page-record w100 v-flex jsb aic"
  >
    <div id="Tabs" class="global-tag-page-record-tabs h100 flex-1 v-flex jss aic">
      <GlobalTagButton
        v-for="item in SysRouteMenuStore.AllHistoryMenu"
        :key="item.key"
        :icon="item.icon"
        :label="item.label"
        :routeName="item.key"
        @click="nativeToRoute(item.key)"
      ></GlobalTagButton>
    </div>

    <div class="h100 v-flex aic">
      <el-dropdown @command="clickDropDownItem">
        <IconifyCom class="cursor-pointer" name="carbon:down-to-bottom" width="20" height="20"></IconifyCom>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="reload">重新加载</el-dropdown-item>
            <el-dropdown-item command="close-current" :disabled="SysRouteMenuStore.AllHistoryMenu.length === 1"
              >关闭当前页</el-dropdown-item
            >
            <el-dropdown-item command="close-others" :disabled="SysRouteMenuStore.AllHistoryMenu.length <= 1"
              >关闭其它页</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { UseSysStore } from '@/store/modules/SysStore'
import { UseSysRouteMenuStore } from '@/store/modules/SysRouteMenu'

import IconifyCom from '@/components/IconifyCom/Index.vue'
import GlobalTagButton from './GlobalTagButton.vue'

const route = useRoute()
const router = useRouter()
const SysStore = UseSysStore()
const SysRouteMenuStore = UseSysRouteMenuStore()

const nativeToRoute = (value: string) => {
  router.push({ name: value })
}

const clickDropDownItem = (command: string) => {
  if (command === 'reload') {
    SysStore.setIsNeedReload(true)
    setTimeout(() => {
      SysStore.setIsNeedReload(false)
    }, 2500)
  }

  if (command === 'close-current') {
    SysRouteMenuStore.IsDeleteCurrentRouteMenu = true
  }

  if (command === 'close-others') {
    const CurrentHistoryMenu = SysRouteMenuStore.AllHistoryMenu.find(menu => {
      return menu.key === route.name
    })
    if (CurrentHistoryMenu) {
      SysRouteMenuStore.AllHistoryMenuRecord = [CurrentHistoryMenu.key]
    }
  }
}
</script>

<style scoped lang="less">
.global-tag-page-record {
  color: var(--el-text-color-primary);
  background-color: var(--el-bg-color);
  border-bottom-width: 1px;
  border-style: solid;
  border-color: var(--el-border-color);

  .global-tag-page-record-tabs {
    padding-top: 6px;
    padding-bottom: 6px;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
  }

  > div:nth-child(2) {
    margin-left: 15px;
    margin-right: 15px;
  }
}

/* // 滚动条宽度 */
div::-webkit-scrollbar {
  height: 5px;
}
/* // 滚动条轨道 */
/* div::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
  } */
/* // 小滑块 */
div::-webkit-scrollbar-thumb {
  background: var(--el-color-primary-light-9);
  border-radius: 10px;
}
div::-webkit-scrollbar-thumb:hover {
  background: var(--el-color-primary);
}
</style>
