import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ShopItem } from 'src/app/core/model/shop_item';
import { ConnectorService } from 'src/app/core/service/connector.service';
import { ImageUtil } from 'src/app/core/util/imageutil';

@Component({
    selector: 'app-edit-product',
    templateUrl: 'edit-product.component.html',
    styleUrls: ['edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

    constructor(private router: Router, private connector: ConnectorService, private snack: MatSnackBar) { }

    public imageUtil: ImageUtil = new ImageUtil();
    public product: ShopItem = undefined;
    public creating: boolean = false;

    async ngOnInit() {
        var parameters = window.location.href.split("/");
        var productId = parameters[parameters.length - 1];
        if (productId === "new") {
            console.log("NEGA");
            this.product = new ShopItem(-1, "Neues Produkt", "1.00", 'default', 0, "Beschreibung");
            this.creating = true;
        }
        else {
            var prodId = Number.parseInt(productId);
            this.connector.getProductById(prodId, item => this.product = item);
        }
    }

    async saveProduct() {
        console.log("PROD: " + JSON.stringify(this.product));
        this.connector.editProduct(this.product).then(x => {
            this.router.navigate(['/product/' + x.id])
                .then(_ =>window.location.reload());
        });
    }

    uploadPicture(event) {
        const file = event.target.files[0];
        this.connector.uploadImage(file).subscribe(x => this.refreshPicture(x.name));
    }

    refreshPicture(picture: string) {
        this.product.picture = picture;
    }
}
