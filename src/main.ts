// create something awesome!!

import './index.css'
import './button.css'

// import Ball from './ball'
// import Circular from './circular'
import Circles from './circles'
import { registerEvents } from './events'
import { ui } from './ui'


const canvas = document.querySelector('canvas')

if(canvas) {
  
  
  const footer = document.querySelector('footer') as HTMLElement
  const footerDim = footer.getBoundingClientRect()
  
  let circles = new Circles(
    canvas,
    window.innerWidth,
    window.innerHeight - footerDim.height
  )
    
  ui({ 
    zoomIn: () => circles.zoomIn(), 
    zoomOut: () => circles.zoomOut(),
    zoomInit: circles.zoomInit()
  })

  // const clear = 
  registerEvents(
    circles,
    canvas
  )

  window.addEventListener('resize', () => {
    circles.resize(
      window.innerWidth,
      window.innerHeight - footerDim.height
    )
  })

}