import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favoriteItems: Product[];

  constructor(private cartService: CartService, public toastController: ToastController) {
    this.favoriteItems=this.cartService.getFavoriteItems();
    console.log('Productos favoritos:', this.favoriteItems); 
  }

  removeFromFavorites(product: Product) {
    this.cartService.removeFromFavorites(product);
  }

  addToCart(product: Product) {
    // Llama a la función del servicio para agregar el producto al carrito
    this.cartService.addToCart(product);
    this.presentToast("Se agrego exitosamente al carrito");
  }

  // Define una función para mostrar un "toast"
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración en milisegundos
      position: 'bottom', // Posición del toast (puedes cambiarla)
    });
    toast.present();
  }

}
