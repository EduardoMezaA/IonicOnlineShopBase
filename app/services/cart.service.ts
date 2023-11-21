import { Injectable } from '@angular/core';
import { Cart, Product, CartItem } from '../models/product.model';
import { Buy } from '../models/buy.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = {
    items: [],
    total: 0,
    itemCount: 0
  };
  public favoriteItems:Product[]=[];
  public buys:Buy[] = [];
  public zaza: any;

  constructor() { }

  public getCart(): Cart {
    return this.cart;
  }

  public addToCart(product: Product): Cart {

    const existingCartItem = this.cart.items.find((item) => item.product.name === product.name);

    if (existingCartItem) {
      // El producto ya existe en el carrito, actualiza la cantidad
      existingCartItem.quantity += 1;
    } else {
      // El producto no existe en el carrito, agrégalo como un nuevo elemento
      const newItem: CartItem = {
        product: product,
        quantity: 1,
      };
      this.cart.items.push(newItem);
    }

    // Actualiza el total y la cantidad de artículos
    this.cart.total = this.calculateTotal(this.cart);
    this.cart.itemCount = this.calculateItemCount(this.cart);

    return this.cart;
  }

  private calculateTotal(cart: Cart): number {
    return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  private calculateItemCount(cart: Cart): number {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }

  public removeItemFromCart(item: CartItem, quantityToRemove: number) {
    const index = this.cart.items.findIndex((cartItem) => cartItem === item);
    if (index !== -1) {
      if (item.quantity > quantityToRemove) {
        item.quantity -= quantityToRemove;
      } else {
        // Si la cantidad a eliminar es igual o mayor que la cantidad en el carrito, elimina el elemento por completo.
        this.cart.items.splice(index, 1);
      }
  
      // Actualiza el total y la cantidad de artículos
      this.cart.total = this.calculateTotal(this.cart);
      this.cart.itemCount = this.calculateItemCount(this.cart);
    }
  }

  isEmpty(): boolean {
    return this.cart.total === 0;
  }

  clearCart() {
    this.zaza = this.cart.total;
    
    const yoYottyTakeAWhiffOfThis: Buy = {
      total: this.cart.total,
      date: new Date() // Fecha actual
    };
    this.buys.push(yoYottyTakeAWhiffOfThis); // Agrega la nueva compra al historial de compras
    this.cart ={
      items: [],
      total: 0,
      itemCount: 0
    }
    return this.cart;
  }

  thatshitgonemad(){
    return this.zaza;
  }

  getBuys(){
    return this.buys;
  }


  // aaaa

  addToFavorites(product: Product) {
    const existingProduct = this.favoriteItems.find((item) => item.name === product.name);

    if (!existingProduct) {
      this.favoriteItems.push(product);
      console.log('Producto agregado a favoritos:', product);
    }
  }

  getFavoriteItems() {
    return this.favoriteItems;
  }

  removeFromFavorites(product: Product) {
    const index = this.favoriteItems.indexOf(product);
    if (index !== -1) {
      this.favoriteItems.splice(index, 1);
    }
  }
}
