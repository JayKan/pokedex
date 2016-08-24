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
  avatars = [
    {
      name: 'Helen',
      image: 'http://semantic-ui.com/images/avatar/large/helen.jpg',
      visible: true,
      content: 'Helen: . Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
    },
    {
      name: 'Elliot',
      image: 'http://semantic-ui.com/images/avatar/large/elliot.jpg',
      visible: false,
      content: 'Elliot: Lorem ipsum dolor sit amet, consectetur 3adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      name: 'Joe',
      image: 'http://semantic-ui.com/images/avatar/large/joe.jpg',
      visible: false,
      content: 'Joe: Lorem ipsum dolor sit amet cing elit, sed do eiusmod tempor olore magna aliqua.'
    },
    {
      name: 'Laura',
      image: 'http://semantic-ui.com/images/avatar/large/laura.jpg',
      visible: false,
      content: 'Laura: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false,
      content: 'Chris: Lorem ipsum dolor sit amet, consectetur 3adipiscing elit, sed do eiusmod tempor incididunt.'
    },
    {
      name: 'Jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      content: 'Jenny: Lorem ipsum dolor sit amet, consectetur 3adipiscing cididunt ut labore et dolore magna aliqua.'
    },
    {
      name: 'Matt',
      image: 'http://semantic-ui.com/images/avatar/large/matt.jpg',
      visible: false,
      content: 'Matt: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];

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