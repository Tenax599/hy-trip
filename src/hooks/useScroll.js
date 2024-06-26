import { onDeactivated, onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore';

export default function useScroll(elRef) {

  let el = window

  const isReachBottom = ref(false)
  
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 防抖/节流
  const scrollListenerHandler = throttle(() => {
    console.log("正在进行滚动~")
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
    }else{
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight
      // console.log(clientHeight.value, scrollTop.value, scrollHeight.value)
    }
    if(clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      console.log("滚动到底部了")
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener("scroll",scrollListenerHandler)
  })
      
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  onDeactivated(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}