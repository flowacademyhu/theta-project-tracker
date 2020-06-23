import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLiteDirective {
  @HostBinding('style.opacity') public fontOpacity = 0;

  constructor() { }

  @HostListener('mouseenter') public mouseEnter() {
    this.fontOpacity = 0.4;
  }

  @HostListener('mouseleave') public mouseLeave() {
    this.fontOpacity = 0.9;
  }


}
