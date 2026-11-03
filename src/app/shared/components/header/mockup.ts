export interface IMenu {
    id : number,
    name : string;
    route : string;
    icon ?: string
}

export const Menu : IMenu[] = [
    {id:1,name:'Inicio',route:'/dashboard/home'},
    {id:2,name:'Servicio',route:'/dashboard/service'},
    {id:3,name:'Tienda',route:'/dashboard/store'},
    /* {id:4,name:'Reseña',route:'/dashboard/review'}, */
   /*  {id:5,name:'Mi cuenta',route:'/auth/sign-in'},
    {id:5,name:'Mi perfil',route:'/profile/myProfile'}, */
]