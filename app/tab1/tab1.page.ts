import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public products: Product[] = [];
  public productsFounds: Product[] = [];
  public filter = [
    "Abarrotes",
    "Frutas y Verduras",
    "Limpieza",
    "Farmacia",
  ];

  public colors = [
    {
      type: "Abarrotes",
      color: "primary"
    },
    {
      type: "Frutas y Verduras",
      color: "secondary"
    },
    {
      type: "Limpieza",
      color: "warning"
    },
    {
      type: "Farmacia",
      color: "danger"
    }
  ];

  constructor(private cartService: CartService, private router: Router, private productService: ProductService,
    private authService: AuthService, private toastController: ToastController) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.productsFounds = this.products;
    });

  }

  public getColor(type: string): string {
    const itemFound = this.colors.find((element) => {
      return element.type === type;
    });
    let color = itemFound && itemFound.color ? itemFound.color : "";
    return color;
  }

  public filterProducts(): void {
    console.log(this.filter);
    this.productsFounds = this.products.filter(
      item => {
        return this.filter.includes(item.type);
      }
    );
  }

  public addToCart(product: Product, i: number) {
    product.photo = product.photo + i;
    this.cartService.addToCart(product);
    console.log(this.cartService.getCart());
  }

  async deleteProduct(id: string){
    this.productService.removeProduct(id).then(async (result)=>{
      if(result === 'success'){
        console.log("Producto eliminado correctamente");
        const toast = await this.toastController.create({
          message: 'Producto eliminado correctamente',
          duration: 2000, // Duración de 2 segundos
          position: 'top' // Posición superior
        });
        toast.present();
      }else{
        console.log("No sirve");
      }
     })
     .catch((error)=>{
      console.log("Error");
     });
  }

  public openUpdateProductPage(id: string) {
    this.router.navigate(['/add-product', { id: id }]);
  }

  //A la grande le puse cuca 

  addTofavorite(product:Product){
    this.cartService.addToFavorites(product);
    this.presentToast2("Se añadio a favoritos");
  }

  async presentToast2(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000, // Duración en milisegundos
      position: 'bottom', // Posición del toast (puedes cambiarla)
    });
    toast.present();
  }

  //********************************************** */
  openProductAddPage() {
    this.router.navigate(['/add-product']); // Asume que la ruta 'product-add' existe para añadir productos.
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  

}
