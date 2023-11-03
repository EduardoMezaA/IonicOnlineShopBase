import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  public productsFounds: Product[] = [];
  isUpdateEnabled: boolean = false;

  constructor(private alertController: AlertController) { 

    this.products.push({
      name: "Aguacate",
      price: 100,
      description: "Lorem ipsum dolor sit amet.",
      type: "Frutas y Verduras",
      photo: "https://picsum.photos/500/300?random",
    });
    this.products.push({
      name: "Coca Cola",
      price: 20,
      description: "Lorem ipsum dolor sit amet.",
      type: "Abarrotes",
      photo: "https://picsum.photos/500/300?random"
    });
    this.products.push({
      name: "Jabón Zote",
      price: 40,
      description: "Lorem ipsum dolor sit amet.",
      type: "Limpieza",
      photo: "https://picsum.photos/500/300?random"
    });
    this.products.push({
      name: "Aspirina",
      price: 50,
      description: "Lorem ipsum dolor sit amet.",
      type: "Farmacia",
      photo: "https://picsum.photos/500/300?random"
    });

  }

  public addProduct(p: Product): Product[] {
    this.products.push(p);
    return this.products;
  }

  public removeProduct(pos: number): Product[] {
    this.products.splice(pos, 1);
    return this.products;
  }

  public refreshProducts() {
    this.products = this.getProducts();
    this.productsFounds = this.products;
  }

  
  public updateProduct(pos: number, p: Product): Product[] {
    if (pos >= 0 && pos < this.products.length) {
      this.products[pos] = p;
    }
    return this.products;
  }

  public getProducts(): Product[] {
    return this.products;
  }

  async confirmRemoveProduct(productos: Product[], producto: Product): Promise<Product[]> {
    

    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // No elimina el producto
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            const pos = productos.indexOf(producto);
            if (pos !== -1) {
              productos.splice(pos, 1);
            }
          }
        }
      ]
    });
    await alert.present();
    return productos;
  }

  
}