/*
THINK OF A SUPER NAME
*/

//TODO Name everything better before doing anything else Mark!

export function menuButtonsInit(svgConfigs) {
  for (let i=0; i< svgConfigs.length; i++) {
    let wrapperId = svgConfigs[i].DOMId
    let wrapperEl = document.getElementById(wrapperId)
    let svgObjectEl = document.querySelector(`#${wrapperId} > object`)

    svgObjectEl.style.pointerEvents = 'none'
    svgObjectEl.style.userSelect = 'none'

    svgObjectEl.addEventListener('load', function() {
      let buttonManager = new BurgerBasic(svgObjectEl, svgConfigs[i].onClickFunc)

      wrapperEl.addEventListener('click', function() {
        buttonManager.toggle()
      })
    })
  }
}

class BurgerBasic {
  constructor(svgObjectEl, action) {
    this.targetObject = svgObjectEl
    this.action = action
    this.svgDoc = this.targetObject.contentDocument
    this.line0 = this.svgDoc.getElementById('line0')
    this.line1 = this.svgDoc.getElementById('line1')
    this.line2 = this.svgDoc.getElementById('line2')

    this.position = 'closed'
    this.speed = 2
    this.finalCoords = [
      {//line0
        current: {x1:10, y1:20, x2:90, y2:20},
        start: {x1:10, y1:20, x2:90, y2:20},
        end: {x1:10, y1:20, x2:90, y2:80}
      },
      {//line1
        current: {x1:10, y1:50, x2:90, y2:50},
        start: {x1:10, y1:50, x2:90, y2:50},
        end: {x1:48, y1:50, x2:52, y2:50}
      },
      {//line2
        current: {x1:10, y1:80, x2:90, y2:80},
        start: {x1:10, y1:80, x2:90, y2:80},
        end: {x1:10, y1:80, x2:90, y2:20}
      }
    ]

    this.transition = this.transition.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  transition(from, to, positionOnComplete) {
    this.position = 'transit'
    let newCoordVal
    let positiveDiff
    let complete

    for (let i=0; i<this.finalCoords.length; i++) {
      for (let coord in this.finalCoords[i][from]) {

        if (this.finalCoords[i].current[coord] !== this.finalCoords[i][to][coord]) {
          positiveDiff = this.finalCoords[i][to][coord] > this.finalCoords[i][from][coord] ? true : false

          if (positiveDiff === true) {
            newCoordVal = this[`line${i}`][coord].baseVal.value + this.speed
            if ( newCoordVal > this.finalCoords[i][to][coord] ) {
              newCoordVal = this.finalCoords[i][to][coord]
            }
          }

          if (positiveDiff === false) {
            newCoordVal = this[`line${i}`][coord].baseVal.value - this.speed
            if ( newCoordVal < this.finalCoords[i][to][coord] ) {
              newCoordVal = this.finalCoords[i][to][coord]
            }
          }
          this.finalCoords[i].current[coord] = newCoordVal
          this[`line${i}`].setAttribute(coord, newCoordVal)
        }
      }
    }

    complete = this.finalCoords.every(function(line) {
      let result = true
      for (let prop in line.current) {
        if (line.current[prop] !== line[to][prop]) {
          result = false
        }
      }
      return result
    })

    if (complete) { this.position = positionOnComplete } 
    else { window.requestAnimationFrame(this.transition.bind(this, from, to, positionOnComplete)) }
  }


  toggle() {
    if (this.position === 'transit'){}
    else if (this.position === 'closed') {
      this.action()
      window.requestAnimationFrame( this.transition.bind(this, 'start', 'end', 'open') )
    } else if (this.position === 'open') {
      this.action()
      window.requestAnimationFrame( this.transition.bind(this, 'end', 'start', 'closed') )
    }
  }
}
