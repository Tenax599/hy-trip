<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
            <template v-for="(item, index) in tabbarData" :key="item">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>


        <!-- <template v-for="(item, index) in tabbarData" :key="item">
            <div
                class="tab-bar-item"
                :class="{ active: currentIndex === index }"
                @click="itemClick(index, item)"
                >
                <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt=""> 
                <span class="text">{{ item.text }}</span>
            </div>
        </template> -->
    </div>
</template>

<script setup>

import tabbarData from '@/assets/data/tabbar';
import { getAssetURL } from '@/utils/load_assets';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const currentIndex = ref(0)
watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    if(index === -1) return
    currentIndex.value = index
})

</script>

<style lang="less" scoped>

.tab-bar {
  // 局部定义一个变量: 只针对.tab-bar子元素才生效
  // --van-tabbar-item-icon-size: 30px !important;

  // 找到类, 对类中的CSS属性重写
  // :deep(.class)找到子组件的类, 让子组件的类也可以生效
  :deep(.van-tabbar-item__icon) {
    font-size: 50px;
  }

  img {
    height: 26px;
  }
}


// .tab-bar {
//     position: fixed;
//     display: flex;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 50px;
//     border-top: 1px solid #f3f3f3;
// }

// .tab-bar-item {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// }

// &.active {
//     color: var(--primary-color);
// }

// img {
//     height: 26px;
//     width: 36px;
// }

// .text {
//     font-size: 12px;
//     margin-top: 2px;
// }

</style> 