let aOrders
let iCountBox
let iCountAttempt
let iCountHit
let selectBox

const texMemoryGame = document.querySelector('.tex-memory-game')
const navsButtonMenu = document.querySelectorAll(".card .card-header .nav .nav-item")
const btnReset = document.getElementById('tex-button-reset')
const btnProduto = navsButtonMenu[0]

navsButtonMenu.forEach(navButton => navButton.addEventListener('click', function () {
   activeButton(navButton)
}))

function activeButton(navButton) {
   selectBox = navButton.id
   let aRideBoxs = typeMemoryGame(selectBox)
   clearData()
   
   for (let box in aRideBoxs) {
      createCardBox(aRideBoxs[box], box)
   }

   reloadEvents()

   for(let navButtonActive in navsButtonMenu) {
      if (navsButtonMenu[navButtonActive].id == navButton.id) {
         navsButtonMenu[navButtonActive].querySelector(`#tex-${navsButtonMenu[navButtonActive].id}`).classList.add('active')
      }else{
         if (navsButtonMenu[navButtonActive].id != undefined) {
            navsButtonMenu[navButtonActive].querySelector(`#tex-${navsButtonMenu[navButtonActive].id}`).classList.remove('active')
         }
      }
   }
    
}

function typeMemoryGame(type) {
   switch (type) {
      case "produtos":
         return dadosProdutos
         break
      default:
         return dadosProdutos
   }
}

btnProduto.click()

function createCardBox(el) {
   const newDiv = document.createElement("div")
   newDiv.className = 'tex-card'
   newDiv.setAttribute("data-framework", `tex-${el}`)

   const newSpan = document.createElement("span")
   newSpan.className = 'tex-card-number'

   const newImg = document.createElement("img")
   newImg.className = 'front-face'
   newImg.setAttribute("src", `img/tex-${el}.png`)

   const newImgFix = document.createElement("img")
   newImgFix.className = 'back-face'
   newImgFix.setAttribute("src", "img/tex-logo.png")
   newDiv.appendChild(newSpan)
   newDiv.appendChild(newImg)
   newDiv.appendChild(newImgFix)
   texMemoryGame.appendChild(newDiv)
}

function clearData() {
   const div = document.querySelectorAll('.tex-card')
   aOrders = []
   iCountBox = 1
   iCountAttempt = 1
   iCountHit = 1
   document.querySelector('.alert-secondary .dado-hit').textContent = 0
   document.querySelector('.alert-secondary .dado-attempt').textContent = 0 
   for (child of div) {
      child.remove()
   }
}

function reloadEvents() {
   const cards = document.querySelectorAll('.tex-card')

   let hasFlippedCard = false
   let lockBoard = false
   let firstCard, secondCard

   function flipCard() {
      if (lockBoard) return
      if (this === firstCard) return

      this.classList.add('flip')
      
      if (!hasFlippedCard) {
         hasFlippedCard = true
         firstCard = this

         return
      }
      secondCard = this
      checkForMatch()
   }

   function checkForMatch() {
      let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

      isMatch ? disableCards() : unflipCards()
   }

   function disableCards() {
      firstCard.removeEventListener('click', flipCard)
      secondCard.removeEventListener('click', flipCard)
      firstCard.classList.add('tex-card-congratulations')
      secondCard.classList.add('tex-card-congratulations')
      document.querySelector('.alert-secondary .dado-hit').textContent = Number(iCountHit++) 
      resetBoard()
   }

   function unflipCards() {
      lockBoard = true
      document.querySelector('.alert-secondary .dado-attempt').textContent = Number(iCountAttempt++) 
      setTimeout(() => {
         firstCard.classList.remove('flip')
         secondCard.classList.remove('flip')
         resetBoard()
      }, 1500)
   }

   function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false]
      [firstCard, secondCard] = [null, null]
   }

   (function shuffle() {
      let randomPos
      cards.forEach((card, index) => {
         randomPos = randomOrder()
         let existente = findNumber(randomPos)
         while (existente) {
           randomPos = randomOrder()
           existente = findNumber(randomPos)
         } 
         aOrders.push(randomPos)
         card.style.order = randomPos
      })
   })()

   function findNumber(numero) {
      if (aOrders.includes(numero)) {
         return true
      } else {
         return false
      }
   }
    
   function randomOrder() {
     return Math.floor(Math.random() * 20)
   }

   cards.forEach(card => card.addEventListener('click', flipCard))
   sortListBox()
}

function sortListBox(){
  let iFindNumber = 0
  let iQtdMax = 0
  let iCount = 0

  while (iCount < aOrders.length) {
   let meetNumber = addNumberBox(aOrders, iCount, iFindNumber)
   iCount++
   if (meetNumber) {
      iQtdMax++
      iCount = 0
   }
    if (Number(aOrders.length) === Number(iCount)) {
      ++iFindNumber
      iCount = 0
    }
    if (Number(aOrders.length) === Number(iQtdMax)) {
      break
    }

  }

}

function addNumberBox(aOrders, aOrder, iFindNumber) {
   let cards = texMemoryGame.querySelectorAll('.tex-card .tex-card-number')
      if( aOrders[aOrder] === iFindNumber){
         cards[aOrder].textContent = iCountBox
         let index = aOrders.indexOf(aOrders[aOrder])
         if (index !== -1) {
            aOrders[index] = true
          }
         ++iCountBox
         return true
      }else{
         return false
      }
}

btnReset.addEventListener('click', function () {
   if (selectBox == 'produtos') {
      navsButtonMenu[0].click()
   } 
})