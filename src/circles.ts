import Circle from "./circle"
import { Canvas2d } from "./canvas"

function randomColor(){
  return 'rgba(' + 
    (70 + Math.round(Math.random()*185)) + ',' +
    (70 + Math.round(Math.random()*185)) + ',' +
    (70 + Math.round(Math.random()*185)) + ',' +
    1+
  ')'
}

export default class Circles extends Canvas2d {

  circles: Circle[]
  anim: number = 0

  currentScale: number = 1
  targetScale: number = 1
  scale: number = 0

  maxScale: number = 4
  minScale: number = 1
  deltaScale: number = 1
  speedScale: number = 1

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
  ){

    super(canvas, width, height)

    this.circles = [...new Array(1000)].map(() => {
      
      const radiusX = Math.random() * Math.max(this.canvas.width/2,1000)
      
      return new Circle({
        initRadian: Math.random() * 9,
        centerY: (
          (Math.random() * this.canvas.height/4) * 
          (Math.random()<0.5?-1:1)
        ),
        radiusX,
        radiusY: radiusX / 3,
        speed: 0.001 + Math.random() * 0.002,
        direction: 1,
        ballRadius: 1 + Math.random() * 2,
        scaleMin: 0.3 + Math.random() * 0.2,
        scaleRange: 0.3,
        color: randomColor()
      })

    })

    this.init()

  }

  init(){
    this.context.translate(
      this.canvas.width/2,
      this.canvas.height/2
    )
    this.start()
  }

  onResize(): void {
    this.context.translate(
      this.canvas.width/2,
      this.canvas.height/2
    )
  }

  start(){

    this.calculate()
    this.draw()
    this.anim = requestAnimationFrame(() => {
      this.start()
    })

  }

  zoomInit(){
    return {
      plus: true,
      minus: false
    }
  }

  zoomIn(){
    this.targetScale = Math.min(this.targetScale + this.deltaScale, this.maxScale)
    return {
      plus: this.targetScale < this.maxScale,
      minus: this.targetScale > this.minScale
    }
  }

  zoomOut(){
    this.targetScale = Math.max(this.targetScale - this.deltaScale, this.minScale)
    return {
      plus: this.targetScale < this.maxScale,
      minus: this.targetScale > this.minScale
    }
  }

  pause(){
    let num = 0
    while(num<this.circles.length){
      this.circles[num].pause()
      num++
    }
  }

  play( mouseSpeed: number ){
    
    // 7 is a magic number
    this.speedScale = mouseSpeed ? mouseSpeed * -7 : 0.001 // prevent zero
    
    let num = 0
    while(num<this.circles.length){
      this.circles[num].speedScale = this.speedScale
      this.circles[num].play()
      num++
    }
  }

  move( pixels: number ){
    let num = 0
    while(num<this.circles.length){
      this.circles[num].move(pixels)
      num++
    }
  }

  calculate(){
    
    // calculate speedScale
    if(this.speedScale !== 1 && this.speedScale !== -1){
      const target = this.speedScale / Math.abs(this.speedScale)
      this.speedScale += (target - this.speedScale) / 100
      if(Math.abs(this.speedScale - target) < 0.01){
        this.speedScale = target
      }
    }

    //
    let num = 0
    while(num<this.circles.length){
      if(this.circles[num].speedScale !== this.speedScale)
        this.circles[num].speedScale = this.speedScale
      this.circles[num].calculate()
      num++
    }


    // calculate current scale
    if(this.targetScale !== this.currentScale){

      let scale = (this.targetScale - this.currentScale) / 10
      this.currentScale += scale
      
      // this one, 
      // makes it possible to go beyond on scale change
      // it's a compunded scale (if that's a thing)
      // the more you scale up and down, you actually go further
      this.scale = 1 + scale 

      
      if(Math.abs(this.targetScale - this.currentScale) < 0.01){
        this.currentScale = this.targetScale
      }

    }else{ 
      this.scale = 0 
    }
    
  }

  draw(){

    this.clean()
    const ctx = this.context

    if(this.scale)
      ctx.scale(this.scale, this.scale)

    let num = 0
    while(num<this.circles.length){
      let circ = this.circles[num]
      ctx.beginPath();
      ctx.arc(
        circ.x, circ.y, 
        circ.ballRadius * circ.scale, 0, 2*Math.PI
      )
      ctx.fillStyle = circ.color
      ctx.fill()
      num++
    }

  }

}