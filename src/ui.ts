

export function ui({ zoomIn, zoomOut, zoomInit }:{
  zoomIn: () => {
    plus: boolean,
    minus: boolean
  },
  zoomOut: () => {
    plus: boolean,
    minus: boolean
  },
  zoomInit: {
    plus: boolean,
    minus: boolean
  }
}){

  const info = document.querySelector('button.info-button')
  const content = document.querySelector('.info-content')
  const plus = document.querySelector('button.zoom-in')
  const minus = document.querySelector('button.zoom-out')

  let to: ReturnType<typeof setTimeout>
  info?.addEventListener('click', () => { 

    info.classList.toggle('on')
    
    content?.classList.toggle('on')
    to && clearTimeout(to)
    
    if(content?.classList.contains('on')) {
      to = setTimeout(() => {
        content?.classList.remove('on')
        info.classList.remove('on')
      }, 10000)
    }
  })

  function setZoomButton(plusEnabled:boolean, minusEnabled:boolean){
    if(plusEnabled) plus?.removeAttribute('disabled')
    else plus?.setAttribute('disabled','')
    if(minusEnabled) minus?.removeAttribute('disabled')
    else minus?.setAttribute('disabled','')
  }

  let wheelListener = true
  window.addEventListener('wheel', (e: WheelEvent) => {
    if(!wheelListener) return;
    wheelListener = false

    if(e.deltaY > 0){
      const {
        plus: plusEnabled,
        minus: minusEnabled
      } = zoomIn()
      setZoomButton(plusEnabled, minusEnabled)
    }

    if(e.deltaY < 0){
      const {
        plus: plusEnabled,
        minus: minusEnabled
      } = zoomOut()
      setZoomButton(plusEnabled, minusEnabled)
    }

    setTimeout(() => {
      wheelListener = true
    },300)
  })

  plus?.addEventListener('click', () => {
    const {
      plus: plusEnabled,
      minus: minusEnabled
    } = zoomIn()
    setZoomButton(plusEnabled, minusEnabled)
  })

  minus?.addEventListener('click', () => {
    const {
      plus: plusEnabled,
      minus: minusEnabled
    } = zoomOut()
    setZoomButton(plusEnabled, minusEnabled)
  })

  if(!zoomInit.plus) plus?.setAttribute('disabled','')
  if(!zoomInit.minus) minus?.setAttribute('disabled','')

}