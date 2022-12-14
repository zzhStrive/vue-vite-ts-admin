import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import menu from './menu'

const MockRandom = Mock.Random

export default [
	{
		url: '/mock/user/login',
		method: 'post',
		timeout: 3000,
		response: ({ body }: any) => {
			if (body.username === 'admin' && body.password === 'admin') {
				return {
					code: 200,
					msg: '操作成功',
					data: 'VAdmin-Admin'
				}
			}
			if (body.username === 'user' && body.password === 'user') {
				return {
					code: 200,
					msg: '操作成功',
					data: 'VAdmin-User'
				}
			}
			return {
				code: 500,
				msg: '用户名或密码错误'
			}
		}
	},
	{
		url: '/mock/user/info',
		method: 'get',
		response: ({ headers }: any) => {
			if (headers.token === 'VAdmin-Admin') {
				return {
					code: 200,
					msg: '操作成功',
					data: {
						id: MockRandom.id(),
						username: 'admin',
						nickname: '超级管理员',
						birthday: MockRandom.date(),
						roles: ['admin'],
						permissions: ['sys:root:*']
					}
				}
			}
			if (headers.token === 'VAdmin-User') {
				return {
					code: 200,
					msg: '操作成功',
					data: {
						id: MockRandom.id(),
						username: 'user',
						nickname: '普通用户',
						birthday: MockRandom.date(),
						roles: ['user'],
						permissions: ['sys:user:*']
					}
				}
			}
			return {
				code: 500,
				msg: '操作失败',
				data: ''
			}
		}
	},
	{
		url: '/mock/user/asyncRouters',
		method: 'get',
		response: ({ headers }: any) => {
			if (headers.token === 'VAdmin-Admin') {
				return {
					code: 200,
					msg: '操作成功',
					data: [
						...menu,
					]
				}
			}
			if (headers.token === 'VAdmin-User') {
				return {
					code: 200,
					msg: '操作成功',
					data: [
						{
							path: '/permission',
							name: 'Permission',
							component: 'Layout',
							meta: {
								label: '前端权限测试',
								icon: 'arcticons:permissionchecker'
							},
							children: [
								{
									path: 'user',
									name: 'Permission-User',
									component: '@/views/permission/UserIndex.vue',
									meta: {
										label: '普通用户权限页面',
										permissions: ['sys:user:*']
									}
								},
								{
									path: 'common',
									name: 'Permission-Common',
									component: '@/views/permission/CommonIndex.vue',
									meta: {
										label: '均可访问权限页面'
									}
								},
								{
									path: 'button',
									name: 'Permission-Button',
									component: '@/views/permission/ButtonIndex.vue',
									meta: {
										label: '按钮级权限指令控制'
									}
								}
							]
						}
					]
				}
			}
			return {
				code: 500,
				msg: '操作失败',
				data: ''
			}
		}
	}
] as unknown as MockMethod[]
