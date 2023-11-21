import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart, Product, CartItem } from '../models/product.model';
import { AlertController } from '@ionic/angular';
import { Buy } from '../models/buy.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public cart: Cart;
  public buyszaza:Buy[]=[];

  constructor(private cartService: CartService, private alertController: AlertController) {
    this.cart = this.cartService.getCart();
    this.buyszaza = this.cartService.getBuys();
    console.log(this.buyszaza);
  }

  async promptRemoveItem(item: CartItem) {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: `¿Cuántos ${item.product.name} deseas eliminar?`,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          max: item.quantity,
          value: '1', // Valor predeterminado
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: (data) => {
            const quantityToRemove = parseInt(data.quantity, 10);
            if (quantityToRemove > 0) {
              this.cartService.removeItemFromCart(item, quantityToRemove);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  isCartEmpty(): boolean {
    return this.cartService.isEmpty();
  }

  clearCart() {
    this.presentAlert();
    this.cart = this.cartService.clearCart();
  }
//fass es nicht an, ihr verdammten Juden, ihr Wichser
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: 'Usted ha comprado los productos exitosamente',
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
