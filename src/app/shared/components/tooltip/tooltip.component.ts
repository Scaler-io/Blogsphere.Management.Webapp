import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';

export type TooltipPosition = 'above' | 'below' | 'left' | 'right' | 'bottom';

@Component({
    selector: 'blogsphere-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    standalone: false
})
export class TooltipComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('panel') panelRef: ElementRef<HTMLElement> | null = null;

  @Input() trigger: ElementRef<HTMLElement> | HTMLElement | null = null;
  @Input() position: TooltipPosition = 'below';
  @Input() showDelay = 0;
  @Input() hideDelay = 150;

  visible = false;
  panelTop = 0;
  panelLeft = 0;

  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private triggerElement: HTMLElement | null = null;
  private boundOnTriggerEnter = () => this.onTriggerEnter();
  private boundOnTriggerLeave = () => this.onTriggerLeave();
  private constrainRetries = 0;
  private readonly maxConstrainRetries = 3;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Defer so the trigger ref from parent template is definitely available
    setTimeout(() => this.attachToTrigger(), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trigger']) {
      this.detachFromTrigger();
      setTimeout(() => this.attachToTrigger(), 0);
    }
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.detachFromTrigger();
  }

  onPanelEnter(): void {
    this.clearTimers();
    this.visible = true;
    this.cdr.markForCheck();
  }

  onPanelLeave(): void {
    this.scheduleHide();
  }

  private attachToTrigger(): void {
    this.detachFromTrigger();
    const el = this.resolveTriggerElement();
    if (!el) return;
    this.triggerElement = el;
    el.addEventListener('mouseenter', this.boundOnTriggerEnter);
    el.addEventListener('mouseleave', this.boundOnTriggerLeave);
  }

  private detachFromTrigger(): void {
    if (!this.triggerElement) return;
    this.triggerElement.removeEventListener('mouseenter', this.boundOnTriggerEnter);
    this.triggerElement.removeEventListener('mouseleave', this.boundOnTriggerLeave);
    this.triggerElement = null;
  }

  private resolveTriggerElement(): HTMLElement | null {
    const t = this.trigger;
    if (!t) return null;
    // Template ref on a plain DOM element can be HTMLElement or ElementRef depending on Angular version
    if (t instanceof HTMLElement) return t;
    const withNative = t as { nativeElement?: HTMLElement };
    if (withNative?.nativeElement instanceof HTMLElement) return withNative.nativeElement;
    return null;
  }

  private onTriggerEnter(): void {
    this.clearTimers();
    if (this.showDelay > 0) {
      this.showTimer = setTimeout(() => this.show(), this.showDelay);
    } else {
      this.show();
    }
  }

  private onTriggerLeave(): void {
    this.scheduleHide();
  }

  private show(): void {
    this.clearTimers();
    const el = this.resolveTriggerElement();
    if (!el) return;
    this.updatePosition(el);
    this.visible = true;
    this.constrainRetries = 0;
    this.cdr.detectChanges();
    // Run after layout so panel position/size are applied; RAF ensures we measure after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.constrainToViewport());
    });
  }

  private scheduleHide(): void {
    this.clearTimers();
    this.hideTimer = setTimeout(() => {
      this.visible = false;
      this.cdr.markForCheck();
      this.hideTimer = null;
    }, this.hideDelay);
  }

  private clearTimers(): void {
    if (this.showTimer != null) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    if (this.hideTimer != null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  private updatePosition(triggerEl: HTMLElement): void {
    const rect = triggerEl.getBoundingClientRect();
    const offset = 8;
    const pos = this.normalizePosition(this.position);

    switch (pos) {
      case 'below':
        this.panelTop = rect.bottom + offset;
        this.panelLeft = rect.left;
        break;
      case 'above':
        this.panelTop = rect.top;
        this.panelLeft = rect.left;
        break;
      case 'right':
        this.panelTop = rect.top;
        this.panelLeft = rect.right + offset;
        break;
      case 'left':
        this.panelTop = rect.top;
        this.panelLeft = rect.left;
        break;
      default:
        this.panelTop = rect.bottom + offset;
        this.panelLeft = rect.left;
    }
    this.cdr.markForCheck();
  }

  private normalizePosition(pos: TooltipPosition): 'above' | 'below' | 'left' | 'right' {
    return pos === 'bottom' ? 'below' : pos;
  }

  private constrainToViewport(): void {
    if (!this.visible) return;
    const panel = this.panelRef?.nativeElement;
    if (!panel) {
      if (this.constrainRetries < this.maxConstrainRetries) {
        this.constrainRetries++;
        requestAnimationFrame(() => this.constrainToViewport());
      }
      return;
    }
    const rect = panel.getBoundingClientRect();
    const margin = 50;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let deltaLeft = 0;
    let deltaTop = 0;
    // Keep panel inside viewport with margin
    if (rect.right > vw - margin) deltaLeft -= rect.right - (vw - margin);
    if (rect.left < margin) deltaLeft += margin - rect.left;
    if (rect.bottom > vh - margin) deltaTop -= rect.bottom - (vh - margin);
    if (rect.top < margin) deltaTop += margin - rect.top;

    if (deltaLeft !== 0 || deltaTop !== 0) {
      this.panelLeft += deltaLeft;
      this.panelTop += deltaTop;
      this.cdr.markForCheck();
    }
  }
}
