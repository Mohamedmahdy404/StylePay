import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverScale]',
  standalone: true
})
export class HoverScaleDirective {
  private scaleAmount = 1.05;
  private transitionDuration = '0.3s';
  private transitionTiming = 'ease-in-out';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setupBaseStyles();
  }

  private setupBaseStyles(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transition', `transform ${this.transitionDuration} ${this.transitionTiming}`);
    this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${this.scaleAmount})`);
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '10');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 10px 20px rgba(0,0,0,0.2)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '');
  }
}