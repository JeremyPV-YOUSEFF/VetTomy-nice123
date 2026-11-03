export interface ProfileModel {
    name    : string,
    icon    : string,
    router  :string
}

export const DataProfile : ProfileModel[] = [
    {name:'Mi perfil',icon:'fa-solid fa-user',router:'/profile/myProfile'},
    {name:'Mis direccionees',icon:'fa-solid fa-location-dot',router:'/profile/address'},
    {name:'Mis contraseñas',icon:'fa-solid fa-lock',router:'/profile/myPassword'},
    {name:'Mis mascotas',icon:'fa-solid fa-paw',router:'/profile/myPet'},
    {name:'Mis citas',icon:'fa-solid fa-clock',router:'/profile/myAppointment'},
    {name:'Mi pagos',icon:'fa-solid fa-cart-shopping',router:'/profile/myShopping'},
]