import { defineStore } from 'pinia'
import type { SysRouterMenu } from 'types/SysRouterMenu'
import { RouteRecordRaw } from 'vue-router'
import { getLocalKey, setLocalKey } from '@/utils/common/HandleLocalStorageUtil'
import BasicRoutes from '@/router/modules/BasicRoutes'
import createSysMenuRecord from '@/utils/Router/CreateSysMenu'



interface ISysRouteMenuStoreState {
	IsAddAsyncRouter: boolean // 是否挂载了异步路由
	IsMounted404Router: boolean // 是否挂载了404路由
	IsDeleteCurrentRouteMenu: boolean // 是否是删除当前路由菜单
	ConstantVAdminRouters: SysRouterMenu.VAdminRoute[] // 所有常量路由
	AsyncVAdminRouters: SysRouterMenu.VAdminRoute[] // 所有异步路由
	MountedAsyncVAdminRouters: SysRouterMenu.VAdminRoute[] // 所有挂载成功的异步路由
	AllRouterRecord: RouteRecordRaw[] // 所有VueRouter路由
	AllConstantRouterRecord: RouteRecordRaw[] // 所有VueRouter常量路由
	AllAsyncRouterRecord: RouteRecordRaw[] // 所有VueRouter异步路由
	AllMenuRecord: SysRouterMenu.MenuRecord[] // 所有菜单
	AllRouteCollect: RouteRecordRaw[] // 所有路由集合
	AllHistoryMenuRecord: string[] // 所有历史菜单集合
}

export const UseSysRouteMenuStore = defineStore('SysRouteMenuStore', {
	state(): ISysRouteMenuStoreState {
		const SysRouteMenuStore: ISysRouteMenuStoreState = {
			IsAddAsyncRouter: false,
			IsMounted404Router: false,
			IsDeleteCurrentRouteMenu: false,
			ConstantVAdminRouters: [],
			AsyncVAdminRouters: [],
			MountedAsyncVAdminRouters: [],
			AllRouterRecord: [],
			AllConstantRouterRecord: [],
			AllAsyncRouterRecord: [],
			AllMenuRecord: createSysMenuRecord(BasicRoutes),
			AllRouteCollect: [],
			// AllHistoryMenuRecord: getLocalKey('historyMenu')?.split(',') || [] //走localStorage
			AllHistoryMenuRecord: [] //走pinia
		}
		return SysRouteMenuStore
	},
	getters: {
		AllHistoryMenu() {
			const AllHistoryMenu: SysRouterMenu.MenuRecord[] = []
			const recursionAllMenu = (allMenu: SysRouterMenu.MenuRecord[], key: string) => {
				allMenu.forEach(menu => {
					if (menu.children && menu.children.length !== 0) {
						recursionAllMenu(menu.children, key)
					}
					if (menu.key === key) {
						AllHistoryMenu.push(menu)
					}
				})
			}
			this.AllHistoryMenuRecord.forEach(routeName => {
				recursionAllMenu(this.AllMenuRecord, routeName)
			})
			setLocalKey('historyMenu', this.AllHistoryMenuRecord.toString())
			return AllHistoryMenu
		}
	},
	actions: {
		/**
		 * 添加历史菜单Tab
		 * @param value
		 */
		addHistoryMenu(value: string) {
			if (!this.AllHistoryMenuRecord.includes(value)) {
				this.AllHistoryMenuRecord.push(value)
				setLocalKey('historyMenu', this.AllHistoryMenuRecord.toString())
			}
		},
		/**
		 * 删除一个历史菜单Tab
		 * @param value
		 * @returns: number: 返回删除的那个菜单的下标
		 */
		deleteHistoryMenu(value: string): number {
			let CurrentMenuIndex = -1
			if (this.AllHistoryMenuRecord.includes(value)) {
				CurrentMenuIndex = this.AllHistoryMenuRecord.findIndex((key: string) => {
					return key === value
				})
				this.AllHistoryMenuRecord.splice(CurrentMenuIndex, 1)
				setLocalKey('historyMenu', this.AllHistoryMenuRecord.toString())
			}
			return CurrentMenuIndex
		}
	}
})
