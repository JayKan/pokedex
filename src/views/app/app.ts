import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { ModalComponent, MODAL_DIRECTIVES } from '../../components/modal';
import { StoreService, Pokemon } from '../../core/store';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  directives: [MODAL_DIRECTIVES, FORM_DIRECTIVES],
  template: `
  
  <div class="center margin-top-10 margin-bottom-15">
    <img src="/assets/logo.png" alt="Pokemon logo" width="150">
    <h1>Pokédex</h1>
  </div>
  
  <div class="center margin-bottom-15">
    <label class="check-box-label">
      <input type="checkbox" #showAll (change)="displayByImage = showAll.checked">Show Pokémon
    </label>
    <span>Click over for Pokémon details</span>
  </div>
  
  <div class="container">   
    <template ngFor [ngForOf]="items" let-item="$implicit">
      <span *ngIf="!displayByImage" class="inner" (click)="select(item);">
        {{ item.id }}  
      </span>
      
      <span *ngIf="displayByImage" class="inner" (click)="select(item);">       
        <img src="{{ item.img }}">
      </span>
      
    </template>
  </div>
  
  <modal #detailModal>
    <modal-header>     
      <img src="{{ selected?.img }}">
    </modal-header>
    
    <modal-body>
      <h4 class="name">
        <small>{{ selected?.id }}</small>
        {{ selected?.name }}
      </h4>
      
      <section class="characteristic">
        <div>
          <span class="label">
            {{ selected?.type }}
          </span>        
        </div>
                
        <div class="margin-top-5">
           Weight: <span class="label label-default">
            {{ selected?.weight }}
          </span>         
        </div>
        
        <div>
           Height: <span class="label label-default">
            {{ selected?.height }}
          </span>         
        </div>
      </section>
      
          
      <section>
        <div class="special">
          <img src="/assets/candy.png" alt="number of candies required">
          {{ selected?.candyAmt }} <br>
          {{ selected?.candyDes }}
        </div>
        <div class="special">
          <img src="/assets/egg.png" alt="number of eggs required">
          {{ selected?.egg }}
        </div>
      </section>
        
    </modal-body>
    
    <modal-footer>
      <button type="button" class="close" data-dismiss="modal" (click)="detailModal.close()">×</button>
    </modal-footer>
    
  </modal>
  `,
  styles: [
    require('./app.scss')
  ]
})
export class App implements OnInit {

  items: Pokemon[];
  selected: Pokemon;
  displayByImage: boolean = false;

  @ViewChild(ModalComponent) private _modalCmp: ModalComponent;

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