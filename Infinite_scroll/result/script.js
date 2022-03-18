;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  let currentPage = 1
  let total = 10
  const limit = 10
  const end = 100

  const $posts = get('.posts')
  const $loader = get('.loader')

  const hideLoader = () => {
    $loader.classList.remove('show')
  }

  const showLoader = () => {
    $loader.classList.add('show')
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
      $posts.appendChild($post)
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
    try {
      const response = await getPosts(page, limit)
      showPosts(response)
    } catch (error) {
      console.error(error.message)
    } finally {
      hideLoader()
    }
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    if (total === end) {
      window.removeEventListener('scroll', handleScroll)
      return
    }

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
