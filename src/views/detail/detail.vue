<template>
    <div class="detail top-page" ref="detailRef">
        <tab-control
         v-if="showTabControl"
         class="tabs"
         :titles="names"
         @tabItemClick="tabClick"
         ref="tabControlRef"
        />
        <van-nav-bar
        title="房屋详情"
        left-text="旅途"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="main" v-if="mainPart">
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
            <detail-infos :ref="getSectionRef" name="描述" :top-infos="mainPart.topModule"/>
            <detail-facility :ref="getSectionRef" name="设施" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
            <detail-landlord :ref="getSectionRef" name="房东" :landlord="mainPart.dynamicModule.landlordModule"/>
            <detail-comment :ref="getSectionRef" name="评论" :comment="mainPart.dynamicModule.commentModule"/>
            <detail-notice :ref="getSectionRef" name="须知" :orderRules="mainPart.dynamicModule.rulesModule.orderRules"/>
            <detail-map :ref="getSectionRef" name="地图" :position="mainPart.dynamicModule.positionModule"/>
            <detail-intro :priceIntro="mainPart.introductionModule"/>
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">弘源旅途，永无止境！</div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services";
import TabControl from "@/components/tab-control/tab-control.vue";
import DetailSwipe from "./cpns/detail_01-swipe.vue";
import DetailInfos from "./cpns/detail_02-infos.vue";
import DetailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
import DetailMap from "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"
import useScroll from "@/hooks/useScroll";
import tabControl from "@/components/tab-control/tab-control.vue";

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

//发送网络请求获取数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value?.mainPart)
getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
})

//监听返回按钮的事件
const onClickLeft = () => {
    router.back()
}

// tabControl相关的操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
    // console.log(scrollTop.value)
    return scrollTop.value >= 300
})

const sectionEls = ref({})
const names = computed(() => {
    return Object.keys(sectionEls.value)
})

const getSectionRef = (value) => {
    if(!value) return
    const name = value.$el.getAttribute("name")
    sectionEls.value[name] = value.$el
}


const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let distance = el.offsetTop
    if(index !== 0) {
        distance = distance - 44
    }

    detailRef.value.scrollTo({
        top: distance,
        behavior: "smooth"
    })
}

//页面滚动，滚动时匹配对应的tabControll的index
const tabControlRef = ref()
const values = ref([])
let prevIndex = -1

watch(scrollTop, (newValue) => {
    //1.获取所有的区域的offsetTops
    const els = Object.values(sectionEls.value)
    values.value = els.map(el => el.offsetTop)

    //2.根据newValue去匹配想要索引
    let index = values.value.length - 1
    for(let i = 0; i < values.value.length; i++) {
        if(values.value[i] > newValue + 60) {
            index = i - 1
            break
        }
    }

    // 3. 检查索引是否已更改
    if (index !== prevIndex) {
        prevIndex = index
        console.log(index)
        tabControlRef.value?.setCurrentIndex(index)
    }
})


</script>

<style lang="less" scoped>

.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}

</style>