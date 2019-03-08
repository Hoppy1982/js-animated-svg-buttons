import { menuButtonsInit } from '/modules/mh-svg-menu-animations.js'


const menuButtons = [
  {
    DOMId: 'nav-button-wrapper',
    animationClass: 'BurgerBasic',//Not yet used, bin?
    onClickFunc: mainMenuOnClick
  },
  {
    DOMId: 'nav-button-wrapper2',
    animationClass: 'BurgerBasic',
    onClickFunc: mainMenuOnClick2
  }
]


document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded..')
  menuButtonsInit(menuButtons)
})


function mainMenuOnClick() {
  console.log('onClickFunc activated..')
}

function mainMenuOnClick2() {
  console.log('onClickFunc TWO activated..')
}