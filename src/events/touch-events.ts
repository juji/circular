

export default class TouchEvents {

  elm: HTMLElement
  onTouchUp: null | ((e:TouchEvent) => void) = null
  onTouchDown: null | ((e:TouchEvent) => void) = null
  onTouchMove: null | ((e:TouchEvent) => void) = null
  clear: null | (() => void) = null

  constructor(elm: HTMLElement, {
    onTouchUp,
    onTouchDown,
    onTouchMove
  }:{
    onTouchUp: (e:TouchEvent) => void
    onTouchDown: (e:TouchEvent) => void
    onTouchMove: (e:TouchEvent) => void
  }){

    this.elm = elm
    this.onTouchUp = onTouchUp??null
    this.onTouchDown = onTouchDown??null
    this.onTouchMove = onTouchMove??null

    let t = this
    let mouseMoveListener = (e:TouchEvent) => {
      if(e.currentTarget !== e.target) return;
      if(e.currentTarget !== elm) return;
      e.preventDefault()
      t.onTouchMove && t.onTouchMove(e)
      return false
    }

    let mouseDownListener = (e:TouchEvent) => {
      if(e.currentTarget !== e.target) return;
      if(e.currentTarget !== elm) return;
      e.preventDefault()
      t.onTouchDown && t.onTouchDown(e)
      if(t.onTouchMove) elm.addEventListener('touchmove', mouseMoveListener)
      return false
    }

    let mouseUpListener = (e: TouchEvent) => {
      if(e.currentTarget !== e.target) return;
      if(e.currentTarget !== elm) return;
      e.preventDefault()
      t.onTouchUp && t.onTouchUp(e)
      if(t.onTouchMove) elm.removeEventListener('touchmove', mouseMoveListener)
      return false
    }

    t.onTouchDown && elm.addEventListener('touchstart', mouseDownListener)
    t.onTouchUp && elm.addEventListener('touchend', mouseUpListener)
    t.onTouchUp && elm.addEventListener('touchcancel', mouseUpListener)

    this.clear = () => {
      t.onTouchDown && elm.removeEventListener('touchstart', mouseDownListener)
      t.onTouchMove && elm.removeEventListener('touchmove', mouseMoveListener)
      t.onTouchUp && elm.removeEventListener('touchend', mouseUpListener)
      t.onTouchUp && elm.removeEventListener('touchcancel', mouseUpListener)
    }

  }

}