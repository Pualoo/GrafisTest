import { DatePipe } from "@angular/common";
import { Product } from "./product.model";
import { RequestProduct } from "./request-product.model";

export class Request {
    idRequest: number=0;
    numberRequest: number=0;
    dateRequest: Date = new Date();
    requestProducts: Array<{idProduct: number,idRequest: number,quantityProduct: number}> = [];
    idClient: number=0;
    valueRequest: number=0.0;
    discountRequest: number=0.0;
    totalValue: number=0.0;
}
