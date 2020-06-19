import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostBinding('style.opacity') public fontColor = 'none';

  @HostBinding('style.background') public background = 'none';


  constructor() {}

  @HostListener('mouseenter') public mouseEnter() {
    this.fontColor = '0.4';

  }

  @HostListener('mouseleave') public mouseLeave() {
    this.fontColor = '0.9';
  }
}
