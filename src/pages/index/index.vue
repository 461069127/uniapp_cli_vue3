<template>
	<button @click="getList">点击请求数据</button>
</template>

<script setup>
	const { apiDemoGet } = useRequest().demo;

	const list = ref([]);
	const getList = () => {
		apiDemoGet().then((res) => {
			console.log(res);
		});
	};
</script>

<style scoped></style>
