import { Routes } from "@angular/router";
import { ServicePageComponent } from "./service/page/service-page/service-page.component";
import { StorePageComponent } from "./store/page/store-page/store-page.component";
import { ReviewPageComponent } from "./review/page/review-page/review-page.component";
import { EmployeeDetailPageComponent } from "./home/pages/employee-detail-page/employee-detail-page.component";
import { ServiceDetailComponent } from "./service/page/service-detail/service-detail.component";
import { ProductDetailComponent } from "./store/page/product-detail/product-detail.component";
import { ShoppingCartPageComponent } from "./shopping/page/shopping-cart-page/shopping-cart-page.component";
import { CheckoutBasicPageComponent } from "./checkout/page/checkout-basic-page/checkout-basic-page.component";
import { IdPageComponent } from "./checkout/page/id-page/id-page.component";
import { DeliveryPageComponent } from "./checkout/page/delivery-page/delivery-page.component";
import { PayPageComponent } from "./checkout/page/pay-page/pay-page.component";
import { SucessPaymentComponent } from "./checkout/page/sucess-payment/sucess-payment.component";
import { ConfirmServiceComponent } from "./service/components/confirm-service/confirm-service.component";
import { ErrorPaymentComponent } from "./checkout/page/error-payment/error-payment.component";
import { CanActivateService } from "../shared/services/can-activate.service";

export default[
    {
        path: '',
        redirectTo : '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent : () => import('./page/basic-page/basic-page.component') ,
        children: [
            {path:'home',loadComponent:() => import('./home/pages/home-page/home-page.component'),title:'Home'},
            {path:'employeeDetail/:id',component:EmployeeDetailPageComponent},
            {path:'service',component:ServicePageComponent,title:'Servicio'},
            {path:'serviceDetail/:id',component:ServiceDetailComponent},
            {path:'store',component:StorePageComponent,title:'Tienda'},
            {path:'storeDetails/:id',component:ProductDetailComponent},
            {path:'review',component:ReviewPageComponent},
            {path:'shoppingCart',component:ShoppingCartPageComponent},
            {
                path:'checkout',
                component:CheckoutBasicPageComponent,
                canActivate : [CanActivateService],
                children: [
                    {path:'id',component:IdPageComponent},
                    {path:'delivery',component:DeliveryPageComponent},
                    {path:'pay',component:PayPageComponent},
                ]
            },
            {path:'**',redirectTo:'home'},
        ]
    },
    {
        path: 'sucessPayment',
        canActivate : [CanActivateService],
        component : SucessPaymentComponent
    },
    {
        path: 'sucessServicePayment',
        canActivate : [CanActivateService],
        component: ConfirmServiceComponent
    },
    {
        path: 'errorPayment',
        canActivate : [CanActivateService],
        component : ErrorPaymentComponent
    }
] as Routes;