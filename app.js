const board = document.querySelector('#board')
const colors = ['#abccf5','#7aa8f0','#ffd500','#89a2ab','#ac0564','#FF5656','#1715f1','#3ec76d','#e5fd3d','red','orange']
const SQUARES_NUMBER = 200

for (let i = 0; i < SQUARES_NUMBER; i++) {
   const square = document.createElement('div')
   square.classList.add('square')

   square.addEventListener('mouseover', () => setColor(square)
   )

   square.addEventListener('mouseleave', () => removeColor(square)
   )

   board.append(square)

}

function setColor(element) {
   const color = getRandonColor()
   element.style.backgroundColor = color
   element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
   element.style.backgroundColor = '#1d1d1d'
   element.style.boxShadow = `0 0 2px #000`
}

function getRandonColor() {
  const index = Math.floor(Math.random() * colors.length)
   return colors[index]
}

