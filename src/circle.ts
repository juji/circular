export default class Circle {

  radiusX: number = 200
  radiusY: number = 100
  centerX: number = 0
  centerY: number = 0
  speed: number = 0.1
  direction: 1|-1 = -1
  ballRadius: number = 21
  scaleMin: number = 1
  scaleRange: number = 0
  color: string = 'rgba(255,0,0,0.5)'

  x: number = 0
  y: number = 0
  scale: number = 1
  radian: number = 0
  anim: number = 0
  speedScale: number = 1
  stopped: boolean = false

  constructor({
    initRadian,
    centerY,
    radiusX,
    radiusY,
    speed,
    direction,
    ballRadius,
    scaleMin,
    scaleRange,
    color,
  }:{
    initRadian?:number
    centerY?:number
    radiusX?: number
    radiusY?: number
    speed?: number
    direction?: 1|-1
    ballRadius?: number
    scaleMin?: number
    scaleRange?: number
    color?: string
  }){

    if(typeof initRadian !== 'undefined') this.radian = initRadian
    if(typeof centerY !== 'undefined') this.centerY = centerY
    if(typeof radiusX !== 'undefined') this.radiusX = radiusX
    if(typeof radiusY !== 'undefined') this.radiusY = radiusY
    if(typeof speed !== 'undefined') this.speed = speed
    if(typeof direction !== 'undefined') this.direction = direction
    if(typeof ballRadius !== 'undefined') this.ballRadius = ballRadius
    if(typeof scaleMin !== 'undefined') this.scaleMin = scaleMin
    if(typeof scaleRange !== 'undefined') this.scaleRange = scaleRange
    if(typeof color !== 'undefined') this.color = color

  }

  calculate(){

    // return;

    this.x = this.radiusX * Math.cos(this.radian)
    
    const y = this.radiusY * Math.sin(this.radian)
    this.y = this.centerY + y

    this.scale = this.scaleMin + (
      this.scaleRange * (
        (y+this.radiusY) / (this.radiusY*2)
      )
    )
    
    if(this.stopped) return;
    this.radian += this.speed * this.direction * this.speedScale

    // ease speedscale to 1 or -1
    if(this.speedScale !== 1 && this.speedScale !== -1){
      const target = this.speedScale / Math.abs(this.speedScale)
      this.speedScale += (target - this.speedScale) / 100
      if(Math.abs(this.speedScale - target) < 0.1){
        this.speedScale = target
      }
    }

  }

  pause(){
    this.stopped = true
  }

  play( mouseSpeed: number ){
    this.speedScale = mouseSpeed ? mouseSpeed * -7 : 0.001 // prevent zero, 7 is a magic number
    this.stopped = false
  }

  move(pixels:number){
    this.radian -= pixels * 0.002 // magic number
  }

}