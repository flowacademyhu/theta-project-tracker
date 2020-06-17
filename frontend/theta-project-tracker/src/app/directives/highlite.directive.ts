import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostBinding('style.boxShadow') public boxShadow = 'none';

  @HostBinding('style.background') public background = 'none';


  constructor() {}

  @HostListener('mouseenter') public mouseEnter() {
    this.boxShadow = '3px 3px 4px rgba(0, 0, 0, .5)';
    this.background = '	#00008B';

  }

  @HostListener('mouseleave') public mouseLeave() {
    this.boxShadow = 'none';
    this.background = 'none';
  }
}
