;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  let currentPage = 1 // 처음 로드했을때 가져오는 첫번째 페이지 
  const limit = 10
  let total = 10 //여태까지 불러온 데이터의 갯수 
  const end = 100 // 데이터의 총 갯수

  const $posts = get('.posts')
  const $loader = get('.loader')

  const hideLoader = () => {
    $loader.classList.remove('show') ////classname show 가 remove되면 opacity : 0 
  }

  const showLoader = () => {
    $loader.classList.add('show') //classname show 가 붙으면 opacity : 1
  }

//포스트를 하나하나 처리해줄 함수 
  const showPosts = (posts) => {
    posts.forEach((post) => {
      const $post = document.createElement('div') //div를 만들고
      $post.classList.add('post') //post로 클래스네임 지정
      $post.innerHTML = `
          <div class="header">
            <div class="id">${post.id}.</div> 
            <div class="title">${post.title}</div>
          </div>
          <div class="body">${post.body}</div>
      `
      //api 에 id, title, body 있었어서 저렇게 해준것 
      $posts.appendChild($post) //위에 코드 작성 후 이걸 안적어주면 말짱도로묵 
    })
  }

  const getPosts = async (page, limit) => { // async로 받음 
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    const response = await fetch(API_URL) //await 으로 받으면 변수에 받을 수 있음 
    if (!response.ok) { 
      throw new Error('에러가 발생했습니다.')
    }
    return await response.json(); //에러가 아닌 경우 response return
  }

  //return 할 response
  const loadPosts = async (page, limit) => {
    showLoader()
    //비동기처리 
    try {
      const response = await getPosts(page, limit)
      showPosts(response) //로딩노출
    } catch (error) {
      console.error(error.message) //에러처리 
    } finally {
      hideLoader() //마지막에 실행될 아이 - 로딩 사라지게
    }
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    if (total === end) { //10개에서 100개가 되면 실행되지 않게 그냥 아예 100개가 되었을 때 removeEventLister 해줌 
      window.removeEventListener('scroll', handleScroll)
      return
    }
//scrollTop : 스크롤위치 / clientHeight : 보여지는 영역에 대한 값// 둘을 더한 값 = 전체 컨텐츠 길이 
// 전체 컨텐츠 길이보다 크거나 같으면 데이터를 불러오는 것 
// 5를 빼는 이유는 간격을 주기 위함. 겹치면 안되기 때문에 5px인 격
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      currentPage++
      total += 10
      loadPosts(currentPage, limit)
      return
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    loadPosts(currentPage, limit)
    window.addEventListener('scroll', handleScroll)
  })
})()
