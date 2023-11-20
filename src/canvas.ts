export class Canvas2d {

  context: CanvasRenderingContext2D
  canvas: HTMLCanvasElement

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
  ){

    this.canvas = canvas
    this.canvas.width = width
    this.canvas.height = height
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D
  }

  resize(width: number, height: number){
    this.canvas.width = width
    this.canvas.height = height
    this.onResize()
  }

  clean(){
    this.context.save()
    this.context.setTransform(1,0,0,1,0,0)
    this.context.clearRect(
      0, 0, this.canvas.width, this.canvas.height
    )
    this.context.restore()
  }

  onResize(){

  }

}