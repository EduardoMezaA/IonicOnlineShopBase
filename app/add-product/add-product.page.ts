import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage {

  public productForm: FormGroup;
  isUpdateEnabled: boolean = false;
  productIndexToUpdate: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params['index']) {
        const index = +params['index'];
        const product = this.productService.getProducts()[index];
        if (product) {
          this.productForm.patchValue(product);
          this.isUpdateEnabled = true;
          this.productIndexToUpdate = index;
        }
      }
    });
    

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
      type: ['', Validators.required],
      photo: ['', Validators.required]
    });

    // Si la página se abrió con un índice de producto, entonces habilita el modo de actualización
    this.route.params.subscribe(params => {
      if (params['index']) {
        const index = +params['index'];
        const product = this.productService.getProducts()[index];
        if (product) {
          this.productForm.patchValue(product);
          this.isUpdateEnabled = true;
          this.productIndexToUpdate = index;
        }
      }
    });
  }

  public async addProduct() {
    const product = this.productForm.value;
    if (this.isUpdateEnabled) {
      // Modo de actualización
      if (this.productIndexToUpdate >= 0) {
        this.productService.updateProduct(this.productIndexToUpdate, product);
        
        this.productIndexToUpdate = -1;
      }
    } else {
      // Modo de adición
      this.productService.addProduct(product);
    }
    this.productForm.reset();

    const toast = await this.toastController.create({
      message: this.isUpdateEnabled ? 'Producto actualizado' : 'Producto agregado',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    this.router.navigate(['/tabs/tab1']);
    this.productService.refreshProducts();
    this.isUpdateEnabled = false;
  }
}