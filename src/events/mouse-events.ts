

export default class MouseEvents {

  elm: HTMLElement
  onMouseUp: null | ((e:MouseEvent) => void) = null
  onMouseDown: null | ((e:MouseEvent) => void) = null
  onMouseMove: null | ((e:MouseEvent) => void) = null
  clear: null | (() => void) = null

  constructor(elm: HTMLElement, {
    onMouseUp,
    onMouseDown,
    onMouseMove
  }:{
    onMouseUp?: (e:MouseEvent) => void
    onMouseDown?: (e:MouseEvent) => void
    onMouseMove?: (e:MouseEvent) => void
  }){

    this.elm = elm
    this.onMouseUp = onMouseUp??null
    this.onMouseDown = onMouseDown??null
    this.onMouseMove = onMouseMove??null

    let t = this
    let mouseMoveListener = (e:MouseEvent) => {
      if(e.currentTarget !== e.target) return;
      if(e.currentTarget !== elm) return;
      e.preventDefault()
      t.onMouseMove && t.onMouseMove(e)
      return false
    }

    let mouseDownListener = (e:MouseEvent) => {
      if(e.currentTarget !== e.target) return;
      if(e.currentTarget !== elm) return;
      e.preventDefault()
      t.onMouseDown && t.onMouseDown(e)
      if(t.onMouseMove) elm.addEventListener('mousemove', mouseMoveListener)
      return false
    }

    let mouseUpListener = (e: MouseEvent) => {
      if(e.currentTarget !== e.target) return;
      if(e.currentTarget !== elm) return;
      e.preventDefault()
      t.onMouseUp && t.onMouseUp(e)
      if(t.onMouseMove) elm.removeEventListener('mousemove', mouseMoveListener)
      return false
    }

    t.onMouseDown && elm.addEventListener('mousedown', mouseDownListener)
    t.onMouseUp && elm.addEventListener('mouseup', mouseUpListener)

    this.clear = () => {
      t.onMouseDown && elm.removeEventListener('mousedown', mouseDownListener)
      t.onMouseUp && elm.removeEventListener('mouseup', mouseUpListener)
      t.onMouseMove && elm.removeEventListener('mousemove', mouseMoveListener)
    }

  }

}