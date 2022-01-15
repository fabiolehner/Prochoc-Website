import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/core/model/login_model';
import { ConnectorService } from 'src/app/core/service/connector.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ["register.component.scss"]
})
export class RegisterComponent implements OnInit {

    registerModel: RegisterModel = new RegisterModel("", "", "", "", "", "");

    constructor(private router: Router, private connector: ConnectorService) { }

    ngOnInit(): void {
    }

    performRegister() {
        this.connector.register(this.registerModel, () => this.router.navigate(["/login"]));
    }
}
