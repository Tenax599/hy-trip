<template>
    <div class="city top-page">
        <div class="top">
                <!-- 1.搜索框 -->
            <van-search
            v-model="searchValue"
            placeholder="城市/区域/位置"
            shape="round"
            show-action
            @cancel="cancelClick"
            />

                <!-- 2.tab的切换  -->
            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <div class="content">
            <!-- <city-group :group-data="currentGroup"/> -->
            <template v-for="(value, key, index) in allCities" :key="index">
                <city-group v-show="tabActive === key" :group-data="value"/>
            </template>
        </div>
    </div>

</template>

<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { getCityAll } from '@/services';
import useCityStore from '@/stores/modules/city';

import CityGroup from './cpns/city-group.vue'

const router = useRouter()

// 搜索框功能
const searchValue = ref("")
const cancelClick = () => {
    router.back()
}

// tab的切换
const tabActive = ref()

// const allCity = ref({})
// // 网络请求：请求城市的数据
// getCityAll().then(res => {
//       allCity.value = res.data
// })

// 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>

.city {
    // --van-tabs-line-height: 30px;
    // top固定定位
    // .top {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    // }
    // .content {
    //     margin-top: 95px;
    // }
    //

    .top {
        position: relative;
        z-index: 9;
    }
    //布局滚动
    .content {
        height: calc(100vh - 99px);
        overflow-y: auto;
    }
}

</style>