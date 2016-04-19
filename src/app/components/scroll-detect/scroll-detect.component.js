import { Component, Output, EventEmitter } from 'angular2/core';

@Component({
  selector: 'scroll-detect',
  template: '<div id="scroll-detect"></div>'
})
export class ScrollDetectComponent {
  @Output() onScrollTo = new EventEmitter();

  constructor() {
    this.beIn = false;
  }

  ngOnInit() {
    window.onscroll = () => {
      if (this.isScrolledIntoView('#scroll-detect')) {
        if (!this.beIn) {
          this.beIn = true;
          this.onScrollTo.emit();
        }
      } else {
        this.beIn = false;
      }
    };
  }

  isScrolledIntoView(elem) {
    const $elem = $(elem);
    const $window = $(window);

    const docViewTop = $window.scrollTop();
    const docViewBottom = docViewTop + $window.height();

    const elemTop = $elem.offset() ? $elem.offset().top : 0;
    const elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
}
