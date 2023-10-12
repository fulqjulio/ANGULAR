import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    mensajeError: string;

    constructor(public authService: AuthService) {
        this.mensajeError = '';
    }

    login(username: string, password: string): boolean {
        this.mensajeError = '';
        if (!this.authService.login(username, password)) {
            const self = this;
            this.mensajeError = 'Login incorrecto';
            setTimeout(function() {
                self.mensajeError = '';
            }.bind(this), 2500);
            this.mensajeError = self.mensajeError;
        }
        return false;
    }

    logout(): boolean {
        this.authService.logout();
        return false;
    }
}
