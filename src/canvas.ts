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
    this.canvas.height = height
    this.canvas.width = width
    this.onResize()
  }

  onResize(){

  }

}