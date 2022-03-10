;(()=> {
  'use strict'

  const get = (target) => document.querySelector(target);

  const init = () => {
    get('form').addEventListener('submit', (event) => {
      playGame(event)
    })
    setPassword()
  }

//게임의 옵션 정의
  const baseball = {
    limit: 10,
    digit: 4,
    trial: 0,
    end : false,
    $question: get('.ball_question'),
    $answer: get('.ball_answer'),
    $input: get('.ball_input'),
  }

//각 객체의 값 미리 선언 - 키값으로 바로 사용이 가능하게 함 
  const { limit, digit, $question, $answer, $input } = baseball;
  let { trial, end } = baseball; //바뀌는 값이라 let 으로 선언 

  const setPassword = () => {
    //패스워드 지정 
    const gameLimit = Array(limit).fill(false); //limit값 만큼의 false 값으로 array생성
    let password ='';
    while (password.length < digit){
      const random = parseInt(Math.random() * 10,10); //렌덤값 지정 - 기본값을 10진수로 갖게끔 설정 

      if(gameLimit[random]){
        continue; //true 가 되면 위 반복문 건너띔 
      }
      password += random
      gameLimit[random] = true
    }
    baseball.password = password;
  }

  const onPlayed = (number, hint) => {
    //시도를 했을 때 - number:내가 입력한 숫자, hint: 현재 어떤 상황?
    return `<em>${trial}차 시도</em>: ${number},<br> ${hint}` 
  }

  const isCorrect = (number,answer) => {
    //번호가 같은지 확인하는 함수
    return number === answer;
  }

  const isDuplicate = (number) => {
    //중복 번호가 있는지 
    return [...new Set(number.split(''))].length !== digit;
  }

  const getStrikes = (number,answer) => {
    //스트라이크 카운트는 몇개 인지 
    let strike = 0;
    const nums = number.split('');
//digit 의 값과 answer 의 인덱스값과 완벽하게 일치하는지 
    nums.map((digit, index) => {
      if (digit === answer[index]) {
        strike++;
      }
    })
    return strike;
  }

  const getBalls = (number,answer) => {
    //ball 카운트는 몇개 인지 
    let ball = 0;
    const nums = number.split('');
    const gameLimit = Array(limit).fill(false);

    answer.split('').map((num) => {
      gameLimit[num] = true
    })

  nums.map((num,index) => {
    if (answer[index] !== num && !!gameLimit[num]) {
      ball++; //true 로 일치할때 ball카운트 ++
    }
  })
    return ball
  }

  const getResult = (number,answer) => {
    //시도에 따른 결과는?

    if (isCorrect(number,answer)) {
      end = true;
      $answer.innerHTML == baseball.password;
      return 'HOMERUN!';
    }

    const strikes = getStrikes(number,answer);
    const balls = getBalls(number,answer);

    return 'STRIKE: ' + strikes + ', BALL: ' + balls
  }

  const playGame = (event) => {
    //게임 플레이
    event.preventDefault()

    if(!!end) {
      return
    }

    const inputNumber = $input.value
    const { password } = baseball

    if (inputNumber.length !== digit) {
      alert(`${digit}자리 숫자를 입력해주세요.`)
    } else if (isDuplicate(inputNumber)) {
      alert("중복 숫자가 있습니다.")
    } else {
      trial++;
      const result = onPlayed(inputNumber, getResult(inputNumber,password))
      $question.innerHTML += `<span>${result}</span>`

      if (limit <= trial && !isCorrect(inputNumber, password)) {
        alert("쓰리아웃!");
        end = true;
        $answer.innerHTML = password
      }
    }
    $input.value = '';
    $input.focus()
  }

  init()

})()

