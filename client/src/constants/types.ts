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