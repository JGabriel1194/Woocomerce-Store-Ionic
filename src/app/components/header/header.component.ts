import { Component, OnInit, Input } from '@angular/core';
import { CartService } from "../../services/cart.service"; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() quantity: string;
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {}

  /**
   * Funcion para ir al carrito
   */
  goCart(){
    this.router.navigate(['/cart']);
  }
}
