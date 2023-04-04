export interface IProduct {
  description: string,
  id: number,
  imageLink: string,
  isPizza: boolean,
  name: string,
  price: number,
  weight: number
  count: number
  selectedAttributes: IAttributes[]
}

export interface IAttributes {
  id: number,
  name: string,
  price: number
}


interface order {
  id: number;
  status: string;
  createdAt: string;
  isDelivery: boolean;
  address: string;
  orderPrice: number;
}

interface orderMenu {
  count: number;
  pizza: { name: string, price: number };
  productsAttributes: [{ name: string, price: number }];

}


export interface IOrder {
  order: order;
  orderMenu: Array<orderMenu>;
}
