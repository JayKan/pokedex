import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalComponent } from '../../components/modal';
import { StoreService, Pokemon } from '../../core/store';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html'),
  styles: [
    require('./app.scss')
  ]
})
export class AppComponent implements OnInit {

  items: Pokemon[];
  selected: Pokemon;
  displayByImage: boolean = false;

  @ViewChild('detailModal') private _modalCmp: ModalComponent;

  constructor(private _store: StoreService) {}

  ngOnInit(): void {
    this._store.getAll()
      .subscribe(data => this.items = data);
  }

  select(item: Pokemon): void {
    this.selected = item;
    this._modalCmp.open();
  }
}