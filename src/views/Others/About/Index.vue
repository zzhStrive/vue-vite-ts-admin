<template>
  <div>
    <el-card>
      <el-card class="box-card" header="" :body-style="{ fontSize: '15px' }" shadow="hover">
        <template #header>
          <span class="title">VAdmin Plus ✨✨✨</span>
        </template>

        <div>
          VAdmin Plus 是一款基于Vue3 + TypeScript + ElementPlus
          等技术栈搭建的通用后台系统模板。结合了最新的前端技术栈，前后端权限控制、粒子化权限控制、自定义系统主题配置等多种功能。
        </div>
      </el-card>

      <el-card class="box-card" header="" :body-style="{ fontSize: '15px' }" shadow="hover">
        <template #header>
          <span class="title">生产环境依赖 🍞🍞🍞</span>
        </template>

        <el-descriptions :column="3" border size="large">
          <el-descriptions-item
            label-align="center"
            align="center"
            width="150px"
            v-for="item in DependenciesArr"
            :key="item.name"
          >
            <template #label>{{ item.name }}</template>
            {{ item.version }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card class="box-card" header="" :body-style="{ fontSize: '15px' }" shadow="hover">
        <template #header>
          <span class="title">开发环境依赖 📦︎ 📦︎ 📦︎</span>
        </template>
        <el-descriptions :column="3" border size="large">
          <el-descriptions-item
            label-align="center"
            align="center"
            width="150px"
            v-for="item in DevDependenciesArr"
            :key="item.name"
          >
            <template #label>{{ item.name }}</template>
            {{ item.version }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import ProjectConfigJson from '../../../../package.json'
import useGetGlobalProperties from '@/hooks/UseGlobal'

interface PackJson {
  name: string
  version: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  [key: string]: any
}

interface PackItem {
  name: string
  version: string
}

const { dependencies, devDependencies } = ProjectConfigJson as PackJson

const DependenciesArr: PackItem[] = []
const DevDependenciesArr: PackItem[] = []

Object.keys(dependencies).forEach(key => {
  const dependenciesObj: PackItem = { name: '', version: '' }
  dependenciesObj.name = key
  dependenciesObj.version = dependencies[key]
  DependenciesArr.push(dependenciesObj)
})

Object.keys(devDependencies).forEach(key => {
  const dependenciesObj: PackItem = { name: '', version: '' }
  dependenciesObj.name = key
  dependenciesObj.version = devDependencies[key]
  DevDependenciesArr.push(dependenciesObj)
})

// const projectName = useGetGlobalProperties().$GlobalConfig.projectName
</script>

<style scoped lang="less">
.box-card:not(:last-child) {
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 500;
}
</style>
