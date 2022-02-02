import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/model/login_model';
import { ConnectorService } from 'src/app/core/service/connector.service';

@Component({
    selector: 'app-login',
    templateUrl: "login.component.html",
    styleUrls: ["login.component.scss"]
})
export class LoginComponent implements OnInit {

    constructor(private connector: ConnectorService, private router: Router, private snackBar: MatSnackBar) { }

    public loginModel: LoginModel = new LoginModel("", "");

    ngOnInit(): void {

    }

    redirect(jwt: string) {
        localStorage.setItem("__bearer", jwt);
        this.snackBar.open("Login erfolgreich!", "Okay");
        this.router.navigate(['shop']);
    }

    performLogin() {
        console.log(this.loginModel)
        this.connector.login(new LoginModel(this.loginModel.email, this.loginModel.password), 
            (jwt) => this.redirect(jwt.token.toString()),
            () => this.snackBar.open("Ungültiger Benutzer oder Passwort!", "Okay"));
    }
}
