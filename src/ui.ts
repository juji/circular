

export function ui({ zoomIn, zoomOut }:{
  zoomIn: () => {
    plus: boolean,
    minus: boolean
  },
  zoomOut: () => {
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
    
    content?.classList.toggle('on')
    to && clearTimeout(to)
    
    if(content?.classList.contains('on')) {
      to = setTimeout(() => {
        content?.classList.remove('on')
      }, 5000)
    }
  })

  plus?.addEventListener('click', () => {
    const {
      plus: plusEnabled,
      minus: minusEnabled
    } = zoomIn()

    if(plusEnabled) plus.removeAttribute('disabled')
    else plus.setAttribute('disabled','')
    if(minusEnabled) minus?.removeAttribute('disabled')
    else minus?.setAttribute('disabled','')
  })

  minus?.addEventListener('click', () => {
    const {
      plus: plusEnabled,
      minus: minusEnabled
    } = zoomOut()

    if(plusEnabled) plus?.removeAttribute('disabled')
    else plus?.setAttribute('disabled','')
    if(minusEnabled) minus?.removeAttribute('disabled')
    else minus?.setAttribute('disabled','')
  })

}