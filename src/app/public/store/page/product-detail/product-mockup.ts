export interface Information{
    description : string,
    icon: string
}

export const InformationProduct : Information[] = [
    {description: '!Recibelo en 3 dias!',icon:'fa-solid fa-truck fa-xl'},
    {description: 'Retiro en tienda',icon:'fa-solid fa-store fa-xl'},
    {description: 'Envios a solo Huancayo',icon:'fa-solid fa-globe fa-xl'},
    {description: 'Compra con confianza, tus datos viajan seguro',icon:'fa-solid fa-credit-card fa-xl'},
]

export interface MeansPaymentImage {
    url: string
}

export interface MeansPayment {
    name  : string,
    image : MeansPaymentImage[]
}

export const MeansPaymentInfo : MeansPayment[] = [
    {
        name: 'Tarjeta de debito',
        image : [
            {url: './assets/image/visa.webp'},
        ]
    },
    {
        name: 'Tarjeta de credito',
        image : [
            {url: './assets/image/visa.webp'},
        ]
    },
    /* {
        name: 'Billeteras digitales',
        image : [
            {url: './assets/image/yape.jpg'},
            {url: './assets/image/plin.png'},
        ]
    } */
] 