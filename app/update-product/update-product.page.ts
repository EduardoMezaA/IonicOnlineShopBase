import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastController } from '@ionic/angular';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage{

  public productForm: FormGroup;
  isUpdateEnabled: boolean = false;
  productIndexToUpdate: number = -1;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private toastController: ToastController, private router: Router,
    private route: ActivatedRoute) {

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      photo: [''],
      type: ['', Validators.required]
    });
  }

  async yeetProduct() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      /*
      this.productService.saveProduct(product).subscribe({
        next: (response) => {
          // next callback
          console.log('Producto guardado exitosamente:', response);
          // Aquí puedes realizar cualquier acción adicional después de guardar el producto
        },
        error: (error) => {
          // error callback
          console.error('Error al guardar el producto:', error);
          // Aquí puedes manejar el error de guardar el producto
        },
        complete: () => {
          // complete callback
          console.log('Subscription completed.');
        }
      });
      */
     this.productService.updateProduct(product)
     .then(async (result)=>{
      if(result === 'success'){
        console.log("Producto guardado correctamente");
        const toast = await this.toastController.create({
          message: 'Producto guardado correctamente',
          duration: 2000, // Duración de 2 segundos
          position: 'top' // Posición superior
        });
        toast.present();
      }else{
        console.log("Nigger");
      }
     })
     .catch((error)=>{
      console.log("Error");
     });
    } else {
      console.warn('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }

    

    // Redirigir a la pestaña tab1
    this.router.navigate(['/tabs/tab1']);
  }


}
