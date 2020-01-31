import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  itemsCount: number
  constructor(private cartService: CartService) {
   }

  ngOnInit() {    
    this.cartService.itemsCount.subscribe(count =>{
      this.itemsCount = count;
    });
  }

}


