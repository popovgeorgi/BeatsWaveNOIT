import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appLineTabs]'
})
export class LineTabsDirective implements AfterViewInit, OnDestroy {

    private navLink$: any;
    private linkClick: any;
    private indicatorLine: any;

    constructor(private el: ElementRef,
                private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        // Add a line indicator in tabs
        this.indicatorLine = this.renderer.createElement('span');
        this.renderer.addClass(this.indicatorLine, 'tabs-link-line');
        this.renderer.appendChild(this.el.nativeElement, this.indicatorLine);

        // Set styles on line indicator
        this.setLineStyles(this.el.nativeElement.querySelector('.nav-link'));

        // Bind click event on multiple tab links
        this.navLink$ = this.el.nativeElement.querySelectorAll('.nav-link');
        this.linkClick = this.navLink$.forEach(link => {
            link.addEventListener('click', this.navLinkClick.bind(this));
        });
    }

    navLinkClick(event) {
        this.setLineStyles(event);
    }

    setLineStyles(e) {
        let element = e;
        if (e.currentTarget) {
            element = e.currentTarget;
        }
        this.renderer.setStyle(this.indicatorLine, 'width', element.offsetWidth + 'px');
        this.renderer.setStyle(this.indicatorLine, 'left', element.offsetLeft + 'px');
    }

    ngOnDestroy() {
        if (this.linkClick) {
            this.linkClick();
        }
    }
}
