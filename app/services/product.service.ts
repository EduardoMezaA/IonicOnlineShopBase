import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Observable <Product[]>;
  private productCollection: AngularFirestoreCollection<Product>;

  constructor(private firestore: AngularFirestore,
    private alertController: AlertController) {
    /*
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
    */
   this.productCollection = this.firestore.collection<Product>('products');
   this.products = this.productCollection.valueChanges();
  }

  saveProduct(product: Product): Promise<string> {
    //this.products.push(product);
    //return of(product);
    return this.productCollection.add(product)
    .then((doc)=>{
      console.log("Producto añadido " + doc.id);
      const productoRef = this.productCollection.doc(doc.id);
      productoRef.update({ id: doc.id });
      return "success";
    })
    .catch((error)=>{
      console.log("Error al añadir el producto"+error);
      return "error";
    });
  }

  async updateProduct(product: Product): Promise<string>{
    console.log('el id del producto es: ' + product.id);
    return this.productCollection.doc(product.id).update(product)
    .then((doc)=>{
      console.log("Producto actualizado " + product.id);
      return "success";
    })
    .catch((error)=>{
      console.log("Error al actualizar el producto" + error);
      return "error";
    });
  }

  async removeProduct(id: string): Promise<string>{
    console.log('el id del producto es: ' + id);
    const documentRef = this.firestore.collection('products').doc(id);
    let yeet: string = "mojarra";
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
            return documentRef.delete().then((doc)=>{
              console.log("Producto eliminado"+id);
              yeet = "success";
            })
            .catch((error)=>{
              console.log("Error al eliminar el producto"+error);
              yeet = "error";
            });
          }
        }
      ]
    });
    await alert.present();
    return yeet;
  }


  getProducts(): Observable<Product[]> {
    //return of(this.products);
    return this.products;
  }
}
