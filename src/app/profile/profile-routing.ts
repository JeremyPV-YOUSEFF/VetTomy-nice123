import { Routes } from "@angular/router";
import { ProfileBasePageComponent } from "./page/profile-base-page/profile-base-page.component";
import { MyProfilePageComponent } from "./page/my-profile-page/my-profile-page.component";
import { MyPasswordPageComponent } from "./page/my-password-page/my-password-page.component";
import { MyPetPageComponent } from "./page/my-pet-page/my-pet-page.component";
import { MyShoppingPageComponent } from "./page/my-shopping-page/my-shopping-page.component";
import { MyAppointmentPageComponent } from "./page/my-appointment-page/my-appointment-page.component";
import { SaleDetailPageComponent } from "./page/sale-detail-page/sale-detail-page.component";
import { MyAddressPageComponent } from "./page/my-address-page/my-address-page.component";
import { CanActivateService, canActivateSignIn } from "../shared/services/can-activate.service";

export default[
    {
        path: '',
        component : ProfileBasePageComponent,
        children: [
            {path:'myProfile',component:MyProfilePageComponent},
            {path:'myPassword',component:MyPasswordPageComponent},
            {path:'myPet',component:MyPetPageComponent},
            {path:'myShopping',component:MyShoppingPageComponent},
            {path:'myAppointment',component:MyAppointmentPageComponent},
            {path:'saleDetail/:id',component:SaleDetailPageComponent},
            {path:'address',component:MyAddressPageComponent},
            {path:'**',redirectTo:'sign-in'}
        ]
    },
] as Routes;