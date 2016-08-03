import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'modal-body',
  encapsulation: ViewEncapsulation.None,
  template:`
  <div class="modal-body">
    <ng-content></ng-content>
  </div>
  `
})
export class ModalBodyComponent {}