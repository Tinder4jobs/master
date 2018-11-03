import { Directive, ElementRef, Renderer } from '@angular/core';

// Directive decorator
@Directive({ selector: '[myHidden]' })
// Directive class
export class HiddenDirective {
    constructor(el: ElementRef, renderer: Renderer) {
        // Use renderer to render the element with styles
        renderer.setElementStyle(el.nativeElement, 'display', 'none');
    }
}