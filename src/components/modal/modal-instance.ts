import { ElementRef, Injectable } from '@angular/core';
import { booleanOrValue, toPromise } from './modal.utils';
import { Observable } from 'rxjs/Observable';
declare var jQuery: any;

export enum ModalResult {
  None,
  Close,
  Dismiss
}

export class ModalSize {
  static Small = 'sm';
  static Large = 'lg';

  static validSize(size: string): boolean {
    return size && (size === ModalSize.Small || size === ModalSize.Large);
  }
}

export class ModalInstance {

  private _suffix: string = '.ng2-bs3-modal';
  private _shownEventName: string = 'shown.bs.modal' + this._suffix;
  private _hiddenEventName: string = 'hidden.bs.modal' + this._suffix;
  private _$modal: any;

  shown: Observable<any>;
  hidden: Observable<ModalResult>;
  result: ModalResult;

  visible: boolean = false;

  constructor(private _element: ElementRef) {
    this._init();
  }

  open(): Promise<any> {
    return this._show();
  }

  close(): Promise<any> {
    this.result = ModalResult.Close;
    return this._hide();
  }

  dismiss(): Promise<any> {
    this.result = ModalResult.Dismiss;
    return this._hide();
  }

  destroy(): Promise<any> {
    return this._hide().then(() => {
      if (this._$modal) {
        this._$modal.data('bs.modal', null);
        this._$modal.remove();
      }
    })
  }

  private _init(): void {
    this._$modal = jQuery(this._element.nativeElement);
    this._$modal.appendTo('body');

    this.shown = Observable.fromEvent(this._$modal, this._shownEventName)
      .map(() => {
        this.visible = true;
      });

    this.hidden = Observable.fromEvent(this._$modal, this._hiddenEventName)
      .map(() => {
        let result = (!this.result || this.result === ModalResult.None) ?
          ModalResult.Dismiss : this.result;

        // reset current result to `None`
        this.result = ModalResult.None;
        this.visible = false;

        return result;
      });
  }

  private _show(): Promise<any> {
    let promise: Promise<any> = toPromise(this.shown);
    this._resetData();
    this._$modal.modal();
    return promise;
  }

  private _hide(): Promise<any> {
    if (this._$modal && this.visible) {
      let promise = toPromise(this.hidden);
      this._$modal.modal('hide');
      return promise;
    }
    return Promise.resolve(this.result);
  }

  private _resetData() {
    // remove all $modal data, backdrop and keyboard value
    this._$modal.removeData();
    this._$modal.data('backdrop', booleanOrValue(this._$modal.attr('data-backdrop')));
    this._$modal.data('keyboard', booleanOrValue(this._$modal.attr('data-keyboard')));
  }
}