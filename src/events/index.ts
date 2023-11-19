
import MouseEvents from './mouse-events'
import TouchEvents from './touch-events'
import Circles from '../circles'

export function registerEvents( 
  circles: Circles,
  elm: HTMLElement 
){

  let initMouse = 0
  let initMouseDown = 0;
  let currentMouse = 0

  if(window.matchMedia("(any-hover: none)").matches) {
    
    const touch = new TouchEvents(elm, {
      onTouchDown: (e:TouchEvent) => {
        initMouse = currentMouse = e.touches[0].pageX
        initMouseDown = new Date().valueOf()
        circles.pause()
      },
      onTouchMove: (e:TouchEvent) => {
        circles.move(e.touches[0].pageX - currentMouse)
        currentMouse = e.touches[0].pageX
      },
      onTouchUp: () => {
        circles.play(
          (currentMouse - initMouse) / 
          (new Date().valueOf() - initMouseDown)
        )
      },
    })

    return () => touch.clear && touch.clear()

  }else{

    const mouse = new MouseEvents(elm, {
      onMouseDown: (e:MouseEvent) => {
        initMouse = currentMouse = e.pageX 
        initMouseDown = new Date().valueOf()
        circles.pause()
      },
      onMouseMove: (e:MouseEvent) => {
        circles.move(e.pageX - currentMouse)
        currentMouse = e.pageX
      },
      onMouseUp: (e:MouseEvent) => {

        circles.play(
          (e.pageX - initMouse) / 
          (new Date().valueOf() - initMouseDown)
        )

      },
    })

    return () => mouse.clear && mouse.clear()

  }


}