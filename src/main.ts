import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

// core
import { STORE_PROVIDERS } from './core/store';

// root component
import { App } from './views/app';

// common styles
import './views/common/styles.scss';

// enable prod for faster renders
enableProdMode();

bootstrap(App, [
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  STORE_PROVIDERS
]).catch(error => console.error(error));





