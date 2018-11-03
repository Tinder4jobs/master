import { Directive, ElementRef, Renderer, HostBinding } from '@angular/core';

@Directive({ selector: 'grid-item'})

export class WindowScrollDirective {

  ngOnInit() {
     window.addEventListener('scroll', this.scroll, true); //third parameter
   }

   ngOnDestroy() {
     window.removeEventListener('scroll', this.scroll, true);
   }

   private scrollTop: number;
   private initialClass: string;
   constructor(private _el: ElementRef, private _renderer: Renderer){
      this.initialClass = 'grid__item';
   }

   @HostBinding('class.moveUp') visible: boolean = false;

   i:number = 1;// Set the variable i to 1 in typescript

   scroll = (): void => { //ON Scroll

   if (this.i > 2) { //if i is larger than 2 (we have two projects)
     return; //stop the scroll function
   } else { //otherwise run the scroll function
     var y = document.body.scrollTop; //y is equal to the current location of the scrollbar
     var x = this._el.nativeElement.getBoundingClientRect().top; //x is the position of the visible project

     if (y > x) { //if the current scroll location is larger than the cordinates of $this location
       this.visible = true; //Add class 'moveUp' to the relevant element

       // this.i = this.i+1 //Add 1 to i
     } //Close y>x
   } //Close if i>2
 };
}
