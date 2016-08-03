import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';
import { ModalInstance, ModalResult, ModalSize } from './modal-instance';

@Component({
  selector: 'modal',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'modal modal-fullscreen',
    'role': 'dialog'
  },
  template:`
  <div class="modal-dialog" [ngClass]="{'modal-sm': _isSmall(), 'modal-lg': _isLarge()}">
    <div class="modal-content">
      <ng-content></ng-content>
    </div>
  </div>
  `,
  styles:[
    require('./modal.styles.scss')
  ]
})
export class ModalComponent implements OnDestroy {

  instance: ModalInstance;
  visible: boolean = false;

  private _overrideSize: string = null;
  @Input() size: string;
  @Input() animation: boolean = true;
  @Input() backdrop: string|boolean = true;
  @Input() keyboard: boolean = true;

  @Output() onOpen: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() onDismiss: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>(false);

  @HostBinding('class.fade') get fadeClass(): boolean {
    return this.animation;
  }
  @HostBinding('attr.data-keyboard') get dataKeyboardAttr(): boolean {
    return this.keyboard;
  }
  @HostBinding('attr.data-backdrop') get dataBackdropAttr(): string|boolean {
    return this.backdrop;
  }

  constructor(private _element: ElementRef) {
    this.instance = new ModalInstance(this._element);

    this.instance.shown.subscribe(() => {
      this.onOpen.emit(null);
    });

    this.instance.hidden.subscribe(result => {
      this.visible = this.instance.visible;
      if (result === ModalResult.Dismiss) {
        this.onDismiss.emit(null);
      }
    });
  }

  ngOnDestroy(): any {
    return this.instance && this.instance.destroy();
  }

  public routerCanDeactivate(): any {
    return this.ngOnDestroy();
  }

  public open(size?: string): Promise<any> {
    if (ModalSize.validSize(size))
      this._overrideSize = size;
    return this.instance.open().then(() => {
      this.visible = this.instance.visible;
    });
  }

  public close(): Promise<any> {
    return this.instance.close().then(() => {
      this.onClose.emit(null);
    });
  }

  public dismiss(): Promise<any> {
    return this.instance.dismiss();
  }

  private _isSmall(): boolean {
    return this._overrideSize !== ModalSize.Large
      && this.size === ModalSize.Small
      || this._overrideSize === ModalSize.Small;
  }

  private _isLarge(): boolean {
    return this._overrideSize !== ModalSize.Small
      && this.size === ModalSize.Large
      || this._overrideSize === ModalSize.Large;
  }
}