import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore(
	'user',
	() => {
		const token = ref(''); // token
		const userInfo = ref(''); // 用户信息

		/** 储存userInfo */
		const saveUserInfo = async (userInfoData) => {
			return new Promise((resolve) => {
				userInfo.value = userInfoData.data;
				token.value = userInfoData.data.token;
				resolve();
			});
		};
		/** 更新userInfo */
		const updataUserInfo = async (userInfoData) => {
			return new Promise((resolve) => {
				userInfo.value = userInfoData;
				resolve();
			});
		};
		const num = ref(0);
		/** 重置所有数据 */
		const resetAll = () => {
			this.$reset();
		};

		return {
			num,
			token,
			userInfo,
			saveUserInfo,
			updataUserInfo,
			resetAll
		};
	},
	{
		persist: true
	}
);

/** 在 setup 外使用 */
export function useUserStoreHook() {
	return useUserStore(store);
}
