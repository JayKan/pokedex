import { ModalComponent } from './modal';
import { ModalHeaderComponent } from './modal-header';
import { ModalBodyComponent } from './modal-body';
import { ModalFooterComponent } from './modal-footer';
import { AutofocusDirective } from './autofocus.directive';

export * from './modal';
export * from './modal-header';
export * from './modal-body';
export * from './modal-footer';
export * from './autofocus.directive';

export const MODAL_DIRECTIVES = [
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  AutofocusDirective
];

