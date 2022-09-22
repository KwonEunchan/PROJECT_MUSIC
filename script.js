// 음악 정보
const data = [{
    "id": 0,
    "singer": "닥터심슨",
    "music": "말이 안 나와"
  },
  {
    "id": 1,
    "singer": "먼데이키즈",
    "music": "발자국"
  },
  {
    "id": 2,
    "singer": "바닐라 어쿠스틱",
    "music": "대화가 필요해"
  },
  {
    "id": 3,
    "singer": "볼빨간사춘기",
    "music": "남이 될 수 있을까"
  },
  {
    "id": 4,
    "singer": "아이유",
    "music": "밤편지"
  },
  {
    "id": 5,
    "singer": "아이유",
    "music": "사랑이 잘"
  },
  {
    "id": 6,
    "singer": "윤종신",
    "music": "내일 할 일"
  },
  {
    "id": 7,
    "singer": "정키",
    "music": "부담이 돼"
  },
  {
    "id": 8,
    "singer": "헤이즈",
    "music": "비도 오고 그래서"
  },
]

// 전역 변수
const mainColor = '#2CE59A'
let ptr = 0
const myAudio = new Audio()

// 재생 상태
//  1. 난수를 이용해 재생 애니메이션 구현
//  2. 오디오 객체를 생성하여 currentTime, duraion을 이용한 재생 현황 구현 ( 특히 duration은 재생 이후에 정보가 넘어오는 듯함. -> setTimeout으로 시간차 두어 해결 )
//  3. flag를 이용해 반복 분기를 제어
let flag = false

let play = () => {
  const player = document.querySelector('.player')
  let shadowSize = Math.random() * 200
  player.style.boxShadow = `0px 0px ${shadowSize}px 0px ${mainColor}`;
  const cur = document.querySelector('.cur')
  setTimeout(() => {
    const playTime = document.querySelector('.playTime')
    playTime.classList.add('active')
    cur.style.width = `${(myAudio.currentTime / myAudio.duration) * 100}%`
    const curTime = document.querySelector('.curTime')
    const maxTime = document.querySelector('.maxTime')
    let curMinute = 0
    let curSecond = 0
    let maxMinute = 0
    let maxSecond = 0
    Math.round(myAudio.currentTime / 60) > 10 ? curMinute = Math.round(myAudio.currentTime / 60) : curMinute = "0" + Math.round(myAudio.currentTime / 60)
    Math.round(myAudio.currentTime % 60) > 9 ? curSecond = Math.round(myAudio.currentTime % 60) : curSecond = "0" + Math.round(myAudio.currentTime % 60)
    Math.round(myAudio.duration / 60) > 10 ? maxMinute = Math.round(myAudio.duration / 60) : maxMinute = "0" + Math.round(myAudio.duration / 60)
    Math.round(myAudio.duration % 60) > 9 ? maxSecond = Math.round(myAudio.duration % 60) : maxSecond = "0" + Math.round(myAudio.duration % 60)
    curTime.innerHTML = `${curMinute}:${curSecond}`
    maxTime.innerHTML = `${maxMinute}:${maxSecond}`
  }, 12)
}
let onPlay = setInterval(play, 100)
clearInterval(onPlay)


// 헤더 동기화
const setHeader = () => {
  const pointer = document.querySelector('.pointer')
  const info = document.querySelector('.info')
  pointer.innerHTML = `${(ptr/-300)+1} / ${data.length}`
  info.innerHTML = `${data[(ptr/-300)].singer} - ${data[(ptr/-300)].music}`
}

// 커버 동기화

const setCover = () => {
  const musicBox = document.querySelector('.musicBox')
  musicBox.innerHTML = ``
  data.forEach((dataEl) => {
    musicBox.innerHTML += `<div class="musicEl"></div>`
  })
  musicBox.style.width = `${data.length*300}px`

  const musicEls = document.querySelectorAll('.musicEl')
  musicEls.forEach((musicEl, index) => {
    musicEl.style.backgroundImage = `url(./images/${index}.jpg)`
  })
}

// 오디오 동기화
const setAudio = () => {
  myAudio.src = `./music/${data[-ptr/300].id}.mp3`
}


setHeader()
setCover()
setAudio()


//버튼 이벤트 등록
const btns = document.querySelectorAll('.btnBox>span')

const btnFirst = btns[0]
btnFirst.addEventListener('click', () => {
  const musicBox = document.querySelector('.musicBox')
  ptr = 0
  musicBox.style.left = `${ptr}px`
})

const btnBack = btns[1]
btnBack.addEventListener('click', () => {
  const musicBox = document.querySelector('.musicBox')
  ptr + 300 > 0 ? ptr : ptr += 300
  musicBox.style.left = `${ptr}px`
})

const btnPlay = btns[2]
btnPlay.addEventListener('click', () => {
  const main = document.querySelector('main')
  const player = document.querySelector('.player')
  main.classList.toggle('active')
  player.classList.toggle('active')
  if (!player.classList.contains('active')) {
    player.style.boxShadow = `0px 0px 6px 0px rgba(0,0,0,.4)`;
  }
  if (btnPlay.innerHTML === `play_arrow`) {
    flag = true
    btnPlay.innerHTML = `pause`
  } else if (btnPlay.innerHTML === `pause`) {
    flag = false
    const playTime = document.querySelector('.playTime')
    playTime.classList.remove('active')
    btnPlay.innerHTML = `play_arrow`
  }

  if (flag) {
    onPlay = setInterval(play, 100)
    setAudio()
    myAudio.play();
  } else {
    clearInterval(onPlay)
    myAudio.pause()
  }
})

const btnNext = btns[3]
btnNext.addEventListener('click', () => {
  const musicBox = document.querySelector('.musicBox')
  ptr < -(data.length - 2) * 300 ? ptr : ptr -= 300
  musicBox.style.left = `${ptr}px`
})

const btnLast = btns[4]
btnLast.addEventListener('click', () => {
  const musicBox = document.querySelector('.musicBox')
  ptr = -2400
  musicBox.style.left = `${ptr}px`
})

btns.forEach((btn, index) => {
  if (index != 2) {
    btn.addEventListener('click', () => {
      setHeader()
      const main = document.querySelector('main')
      const player = document.querySelector('.player')
      main.classList.remove('active')
      player.classList.remove('active')
      player.style.boxShadow = `0px 0px 6px 0px rgba(0,0,0,.4)`;
      flag = false
      btnPlay.innerHTML = `play_arrow`
      clearInterval(onPlay)
      myAudio.pause()
      const playTime = document.querySelector('.playTime')
      playTime.classList.remove('active')
    })
  }
})

const btnTurn = document.querySelector('.btnTurn')
btnTurn.addEventListener('click', () => {
  const container = document.querySelector('.container')
  container.classList.toggle('active')
})

// 곡 목록 관련
const musicList = document.querySelector('.musicList')
data.forEach((dataEl) => {
  musicList.innerHTML += `<div class="musicTitleCover"><div class="musicTitle"></div></div>`
})

const musicTitles = document.querySelectorAll('.musicTitle')
musicTitles.forEach((musicTitle, index) => {
  musicTitle.style.backgroundImage = `url(./images/${index}.jpg)`
  musicTitle.addEventListener('mouseover', () => {
    const musicAbout = document.querySelector('.musicAbout')
    musicAbout.innerHTML = `${data[index].singer} - ${data[index].music}`
  })
  musicTitle.addEventListener('mouseleave', () => {
    const musicAbout = document.querySelector('.musicAbout')
    musicAbout.innerHTML = ``
  })
  musicTitle.addEventListener('click', () => {
    ptr = -index * 300
    setHeader()
    const musicBox = document.querySelector('.musicBox')
    musicBox.style.left = `${ptr}px`;
    setAudio()
    const container = document.querySelector('.container')
    container.classList.toggle('active')
  })
})