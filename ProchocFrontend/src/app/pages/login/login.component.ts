import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/core/model/login_model';
import { ConnectorService } from 'src/app/core/service/connector.service';

@Component({
    selector: 'app-login',
    templateUrl: "login.component.html",
    styleUrls: ["login.component.scss"]
})
export class LoginComponent implements OnInit {

    constructor(private connector: ConnectorService) { }

    public loginModel: LoginModel = new LoginModel("", "");

    ngOnInit(): void {
    }

    performLogin() {
        console.log(this.loginModel)
        this.connector.login(new LoginModel(this.loginModel.email, this.loginModel.password), (jwt) => console.log(jwt));
    }
}
