import { useEffect, useState } from 'react';
import ProductsFetchService from '../services/http/productsFetchService';
import { IAttributes, IProduct } from '../constants/types';




export const useFetchProduct = (isActive: boolean, productId: number) => {
  const [product, setProduct] = useState<IProduct[]>([]);
  const [attributes, setAttributes] = useState<IAttributes[]>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await ProductsFetchService.getProductById(productId);
      const attributes = await ProductsFetchService.getAllAttributes();
      setProduct(product.data);
      setAttributes(attributes.data);
    };
    if (isActive) {
      fetchProduct();
    }
  }, [isActive]);

  return {product, attributes}
}