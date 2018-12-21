<template>
	<baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" :scrollWheelZoom="true"></baidu-map>
</template>

<script>
export default {
	name: 'bmap'
}

</script>

<style lang="scss" scoped>
.map {
	padding: 20px;
	width: 100%;
	height: 100%;
}
</style>