;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  const getAll = function (target) {
    return document.querySelectorAll(target)
  }

  const keys = Array.from(getAll('.key'))
  const soundsRoot = 'assets/sounds/'
  const drumSounds = [
    { key: 81, sound: 'clap.wav' },
    { key: 87, sound: 'crash.wav' },
    { key: 69, sound: 'hihat.wav' },
    { key: 65, sound: 'kick.wav' },
    { key: 83, sound: 'openhat.wav' },
    { key: 68, sound: 'ride.wav' },
    { key: 90, sound: 'shaker.wav' },
    { key: 88, sound: 'snare.wav' },
    { key: 67, sound: 'tom.wav' },
  ]

  const getAudioElement = (index) => {
    const audio = document.createElement('audio')
    audio.dataset.key = drumSounds[index].key
    audio.src = soundsRoot + drumSounds[index].sound
    return audio
  }

  const onTransitionEnd = (e) => { //플레이될때 트렌지셔 효과를 끝내기 위함 
    if (e.propertyName === 'transform') { //이벤트의 propertyname 이 transform일때 
      e.target.classList.remove('playing') //playing 이라는 클래스를 지워줌 
    }
  }

  const onMouseDown = (e) => { //마우스로 소리받는 함수 
    const keycode = e.target.getAttribute('data-key') //data-key 라는 속성 가져옴 
    playSound(keycode) //클릭으로 키코드를 받게끔 함수받음
  }

  const onKeyDown = (e) => { //키보드로 소리를 받는 함수
    const keycode = e.keyCode //키코드값을 받게끔
    playSound(keycode) //키코드값을 받는 함수
  }


  const playSound = (keycode) => { //키코드값에 맞는 사운드 재생 
    const $audio = get(`audio[data-key="${keycode}"]`)
    const $key = get(`div[data-key="${keycode}"]`) 
    if ($key && $audio) {
      $key.classList.add('playing') //소리들릴때 효과 주기위해 playing이라는 클래스를 넣어줌 
      $audio.currentTime = 0 //재생초기화
      $audio.play() //초기화 후 재생 
    }
  }

 const init = () => {
   window.addEventListener('keydown' , onKeyDown)
   keys.forEach((key, index) => {
     const audio = getAudioElement(index)
     key.appendChild(audio)
     key.addEventListener('transitionend', onTransitionEnd)
     key.addEventListener('mousedown', onMouseDown)
     key.dataset.key = drumSounds[index].key
   })
 }

 init();
})()

