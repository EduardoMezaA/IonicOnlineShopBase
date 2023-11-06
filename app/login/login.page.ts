import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  public productFormxd: FormGroup;

  constructor(private loginService: LoginService, private router: Router,
    private formBuilder: FormBuilder, public alertController: AlertController) {
    this.productFormxd = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public loginYeet() {
    const user = this.productFormxd.value;
    const isAuthenticated = this.loginService.login(user.username, user.password);
    if (isAuthenticated) {
      this.router.navigate(['/tabs/tab1']); // Redirige a la página de inicio después del login exitoso
    } else {
      user.username, user.password = "";
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: 'Datos Incorrectos',
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
