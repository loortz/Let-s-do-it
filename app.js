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
 
  arrows = mainSlide.querySelector('.MainSlide-arrows')
  prev = arrows.children[0]
  next = arrows.children[1]
  slideWidth = mainSlide[0].offsetWidth
  slideIndex = 0
  posInit = 0
  posY1 = 0
  posY2 = 0
  posFinal = 0
  posThreshold = slideWidth * .35
  trfRegExp = /[-0-9.]+(?=px)/
  slide = function() {
    sidebar.style.transition = 'transform .5s'
     sidebar.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`
     mainSlide.style.transition = 'transform .5s'
     mainSlide.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`
  
    prev.slidesCount.toggle('disabled', slideIndex === 0)
    next.slidesCount.toggle('disabled', slideIndex === --slides.length)
      } 
      getEvent = function() {
         return event.type.search('touch') !== -1 ? event.touches[0] : event
        
       }
       swipeStart = function() {
         let evt = getEvent()
       
         posInit = posY1 = evt.clientY
       
        
         container.style.transition = ''
       
         document.addEventListener('touchmove', swipeAction)
         document.addEventListener('touchend', swipeEnd)
         document.addEventListener('mousemove', swipeAction)
         document.addEventListener('mouseup', swipeEnd)
       }
       swipeAction = function() {
         let evt = getEvent()
           
           style = container.style.transform
           
           transform = +style.match(trfRegExp)[0]
       
         posX2 = posY1 - evt.clientY
         posX1 = evt.clientY
       
         container.style.transform = `translate3d(${transform - posY2}px, 0px, 0px)`
         
      }
   
      swipeEnd = function() {
         
         posFinal = posInit - posY1
       
         document.removeEventListener('touchmove', swipeAction)
         document.removeEventListener('mousemove', swipeAction)
         document.removeEventListener('touchend', swipeEnd)
         document.removeEventListener('mouseup', swipeEnd)
       
         
         if (Math.abs(posFinal) > posThreshold) {
           
           if (posInit < posY1) {
             slideIndex--
           
           } else if (posInit > posY1) {
             slideIndex++
           }
         }
       
         
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
    
    container.style.transform = 'translate3d(0px, 0px, 0px)'
    
    slider.addEventListener('touchstart', swipeStart)
    slider.addEventListener('mousedown', swipeStart)
}
