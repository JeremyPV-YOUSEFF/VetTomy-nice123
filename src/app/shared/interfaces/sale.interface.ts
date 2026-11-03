import { ProductItemCartClass } from "./product.interface";

export interface Sale {
    data :  ProductItemCartClass[],
    employeId: number,
    customerId: number,
    receiptType: string,
    branchId: number,
    deliveryDate : string
    total: number,
    observation: string,
    deliveryType: string,
    meansPayment: string,
    deliveryPrice: number,
    addressId : number,
}

export class SaleExtraData {
    deliveryType : string = ''
    deliveryDate : string = ''
    addressId    : number = 0
    receiptType  : IReceiptType = 'Boleta'
    deliveryPrice: number = 0
}

export type IReceiptType = 'Boleta' | 'Factura'


export class SaleClass {
    data        :  ProductItemCartClass[] = [];
    employeId   : number = 0;
    customerId  : number = 0;
    receiptType : string = '';
    deliveryDate : string = ''
    branchId    : number = 0;
    total       : number = 0;
    observation : string = '';
    deliveryType: string = '';
    meansPayment: string = '';
    deliveryPrice: number = 0;
    addressId : number = 0
}

export interface SaleData {
    saleNumber: string,
    date: string,
    employeName: string,
    customerName: string,
    receiptType: string,
    meansPayment : string,
    subTotal : number,
    total: string,
    deliveryType : string,
    address : string,
    deliveryPrice : number
    state: string,
    typePurchase : string,
    pdfUrl : string
    deliveryDate : Date,
    observation : string
    data: SaleDetailData[]
}




export interface SaleDetailData {
    id: number,
    price: number,
    quantity: number,
    productId: number,
    productName: string,
    brandName: string,
    productUrl: string,
    saleId: number,
    total: number
}

export class SaleParams {
    CurrentPage : number = 1 ;
    PageSize    : number = 3;
    Sort        : SaleSort = 'dateDesc';
    Search      : string = '';
    CustomerId  : number = 0;
    EmployeeId  : number = 0;
    Date        : Date | null = null;
    TypePurchase :  TypePurchaseEnum = 'Producto'
}

export type TypePurchaseEnum = "Producto" |"Servicio" |''
export type SaleSort = 'dateDesc'|'dateAsc'|'idDesc'|''


export interface NewSaleService {
    serviceId: number,
    serviceName: string,
    employeId: number,
    customerId: number,
    price: number,
    meansPayment: string,
    receiptType: string
    serviceImage : string
}

export interface SaleResponse 
{
  saleNumber    : number,
  date          : Date,
  employeId     : number,
  customerId    : number,
  receiptType   : string,
  branchId      : number,
  total         : number,
  subTotal      : number,
  pdfUrl        : string,
  addressId     : number,
  state         : string,
  observation   : string,
  deliveryType  : string,
  meansPayment  : string,
  deliveryDate  : Date,
  deliveryPrice : number,
  typePurchase  : string
}