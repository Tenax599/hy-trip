<template>
    <div class="home" ref="homeRef">
      <home-nav-bar/>
      <div class="banner">
        <img src="@/assets/img/home/banner.webp" alt="">
      </div>
      <home-search-box/>
      <home-categories/>

      <div class="search-bar" v-if="isShowSearchBar">
        <search-bar :start-date="8.25" :end-date="8.26"/>
      </div>

      <home-content/>
      <!-- <button @click="moreBtnClick">加载更多</button> -->
    </div>
  </template>
  
  <script>
  export default { name: "home" }
  </script>

  <script setup>
  import { computed, onActivated, ref, watch } from 'vue';
  import useHomeStore from '@/stores/modules/home';
  import HomeNavBar from './cpns/home-nav-bar.vue'
  import HomeSearchBox from './cpns/home-search-box.vue';
  import HomeCategories from './cpns/home-categories.vue';
  import HomeContent from './cpns/home-content.vue'
  import useScroll from '@/hooks/useScroll';
  import searchBar from '@/components/search-bar/search-bar.vue';

  // import hyRequest from "@/services/request/index"

  // const hotSuggests = ref([])
  // 发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestData()
  homeStore.fetchCategoriesData()
  // let currentPage = 1
  homeStore.fetchHouselistData()
  // 1.热门建议
  // hyRequest.get({
  //   url: "/home/hotSuggests"
  // }).then(res => {
  //   console.log(res)
  //   hotSuggests.value = res.data
  // })

  // 模拟加载更多
  // const moreBtnClick = () => {
  // currentPage++
  // homeStore.fetchHouselistData()
  // }

  //监听Window创建的滚动
  //1.当我们离开页面时，我们移除监听
  //2.如果别的页面也进行类似的监听，会编写重复代码
  // const scrollListenerHandler = () => {
  //     const clientHeight = document.documentElement.clientHeight;
  //     const scrollTop = document.documentElement.scrollTop;
  //     const scrollHeight = document.documentElement.scrollHeight;
  //     console.log(clientHeight, scrollTop, scrollHeight)
  //       if(clientHeight + scrollTop >= scrollHeight - 1) {
  //       homeStore.fetchHouselistData()
  //   }
  // }

  // onMounted(() => {
  //   window.addEventListener("scroll",scrollListenerHandler)
  // })

  // onUnmounted(() => {
  //   window.removeEventListener("scroll", scrollListenerHandler)
  // })

  // useScroll(() => {
  //   homeStore.fetchHouselistData()]
  // })
  const homeRef = ref()
  const { isReachBottom, scrollTop } = useScroll(homeRef)
  watch(isReachBottom, (newValue) => {
    if(newValue) {
      homeStore.fetchHouselistData().then(() => {
        isReachBottom.value = false
      })
    }
  })

  // 搜索框显示的控制
  // const isShowSearchBar = ref(false)
  // watch(scrollTop, (newTop) => {
  //   isShowSearchBar.value = newTop > 100
  // })

     const isShowSearchBar = computed(() => {
      return scrollTop.value >= 450
     })

  // 跳回home时，保留原来位置
  onActivated(() => {
    homeRef.value?.scrollTo({
      top:scrollTop.value
    })
  })

  </script>

  <style lang="less" scoped>
  .home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
  }
  
  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
  </style>
  