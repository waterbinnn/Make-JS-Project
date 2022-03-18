;(function () {
  'use strict'
  
  const get = (target) => {
    return document.querySelector(target)
  }


const showPosts = (posts) => {
  posts.forEach((post) => {
    const $post = document.createElement('div')
    $post.classList.add('post')
    $post.innerHTML = `
    <div class = "header">
    <div class = "id">${post.id}</div>
    <div class = "title">${post.title}</div>ß
    </div>
    <div class = "body">${post.body}</div>
    `
    $posts.appendChild($post);
  })
}

const getPosts = async (page, limit) => {
  const API_URL = `https://jsonplaceholder.typicode.com/posts`;
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error ('Error');
  }
  return await response.json();
} 

const loadPosts = async (page, limit) => {
  showLoader()
  try {
    const 
  }
}



window.addEventListener('DOMContentLoaded', () => {
  loadPosts(currentPage,limit)
  window.addEventListener('scroll', handleScroll);
})

})()
