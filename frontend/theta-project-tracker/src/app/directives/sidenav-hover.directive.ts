import { Directive, HostListener, ViewChild, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSidenavHover]'
})
export class SidenavHoverDirective {

  @ViewChild('sidenav', {static: true}) public menuContent: ElementRef;

  onMouseEnter(start: any) {
    start.toggle();
  }

  @HostListener('mouseenter') public mouseEnter() {
    this.onMouseEnter(this.menuContent);
  }



  constructor() { }

}
