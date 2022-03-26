;(function () {
  'use strict'

  let timerId;
  
  const get = (target) => {
    return document.querySelector(target)
  }
  
  const $progressBar = get('.progress-bar')
  
  //성능향상에는 좋지만 시각적으로 뚝뚝 끊어져보일 수 있음 - 시간설정 잘 해주면 됨 ! 
  const throttle = (callback, time) => {
    if (timerId) return
    timerId = setTimeout(() => { 
      callback()
      timerId = undefined; // 한번 실행후 초기화 되게 
    }, time)
  }

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);

    const height = //보여지는 영역을 제외한 길이
      document.documentElement.scrollHeight - //스크롤의 총길이
      document.documentElement.clientHeight //보여지는 영역 

    const scrollWidth = (scrollTop / height) * 100; 
    console.log(scrollWidth);
    $progressBar.style.width = scrollWidth + '%' //스타일 변경
  }

  // window.addEventListener('scroll', () => onScroll()) //스크롤만 했을 때 

  window.addEventListener('scroll', () => {
    throttle(onScroll, 100) //throttle (스크롤,원하는시간)
  })
})()

