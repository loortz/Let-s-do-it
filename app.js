const upBtn = document.querySelector('.up-button')
const downBtn = document.querySelector('.down-button')
const sidebar = document.querySelector('.sidebar')
const mainSlide = document.querySelector('.main-slide')
const container = document.querySelector('.container')
const slidesCount = mainSlide.querySelectorAll('div').length
let activeSlideIndex = 0
sidebar.style.top = `-${(slidesCount - 1) * 100}vh`

upBtn.addEventListener('click', () => {
   changeSlide('up')

})

downBtn.addEventListener('click', () => {
   changeSlide('down') 
   
})

document.addEventListener('keydown', event => {
   console.log(event.key)
   if (event.key === 'ArrowUp') {
      changeSlide('up')
   } else if (event.key === 'ArrowDown') {  
      changeSlide('down')
   }
}) 


function changeSlide(direction) {
   if (direction === 'up') {
      activeSlideIndex++
      if (activeSlideIndex === slidesCount)
      {
         activeSlideIndex=0
         }
   } else if (direction === 'down') {
      activeSlideIndex--
      if (activeSlideIndex < 0) {
         activeSlideIndex = slidesCount - 1
      }      
   }
         
   const height = container.clientHeight

   mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
   
   sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
   
   //
   // 
   let slider = document.querySelector('.sidebar')
  sliderList = slider.querySelector('.slider-list')
  sliderTrack = slider.querySelector('.slider-track')
  slides = slider.querySelectorAll('.slide')
  arrows = slider.querySelector('.slider-arrows')
  prev = arrows.children[0]
  next = arrows.children[1]
  slideWidth = slides[0].offsetWidth
  slideIndex = 0
  posInit = 0
  posY1 = 0
  posY2 = 0
  posFinal = 0
  posThreshold = slideWidth * .35
  trfRegExp = /[-0-9.]+(?=px)/
  slide = function() {
    sliderTrack.style.transition = 'transform .5s'
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`
    // делаем стрелку prev недоступной на первом слайде
    // и доступной в остальных случаях
    // делаем стрелку next недоступной на последнем слайде
    // и доступной в остальных случаях
    prev.classList.toggle('disabled', slideIndex === 0)
    next.classList.toggle('disabled', slideIndex === --slides.length)
      } 
      getEvent = function() {
         return event.type.search('touch') !== -1 ? event.touches[0] : event
         // p.s. event - аргумент по умолчанию в функции
       },
       // или es6
       getEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event
       
       swipeStart = function() {
         let evt = getEvent()
       
         // берем начальную позицию курсора по оси Х
         posInit = posY1 = evt.clientY
       
         // убираем плавный переход, чтобы track двигался за курсором без задержки
         // т.к. он будет включается в функции slide()
         sliderTrack.style.transition = '';
       
         // и сразу начинаем отслеживать другие события на документе
         document.addEventListener('touchmove', swipeAction)
         document.addEventListener('touchend', swipeEnd)
         document.addEventListener('mousemove', swipeAction)
         document.addEventListener('mouseup', swipeEnd)
       },
       swipeAction = function() {
         let evt = getEvent()
           // для более красивой записи возьмем в переменную текущее свойство transform
           style = sliderTrack.style.transform
           // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
           transform = +style.match(trfRegExp)[0]
       
         posX2 = posY1 - evt.clientY
         posX1 = evt.clientY
       
         sliderTrack.style.transform = `translate3d(${transform - posY2}px, 0px, 0px)`
         // можно было бы использовать метод строк .replace():
         // sliderTrack.style.transform = style.replace(trfRegExp, match => match - posX2)
         // но в дальнейшем нам нужна будет текущая трансформация в переменной
      }
   
      swipeEnd = function() {
         // финальная позиция курсора
         posFinal = posInit - posY1
       
         document.removeEventListener('touchmove', swipeAction)
         document.removeEventListener('mousemove', swipeAction)
         document.removeEventListener('touchend', swipeEnd)
         document.removeEventListener('mouseup', swipeEnd)
       
         // убираем знак минус и сравниваем с порогом сдвига слайда
         if (Math.abs(posFinal) > posThreshold) {
           // если мы тянули вправо, то уменьшаем номер текущего слайда
           if (posInit < posY1) {
             slideIndex--
           // если мы тянули влево, то увеличиваем номер текущего слайда
           } else if (posInit > posY1) {
             slideIndex++
           }
         }
       
         // если курсор двигался, то запускаем функцию переключения слайдов
         if (posInit !== posY1) {
           slide()
         }
       
   };
   
   arrows.addEventListener('click', function() {
      let target = event.target
    
      if (target === next) {
        slideIndex++
      } else if (target === prev) {
        slideIndex--
      } else {
        return
      }
    
      slide()
    })
    
    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)'
    
    slider.addEventListener('touchstart', swipeStart)
    slider.addEventListener('mousedown', swipeStart)
}
