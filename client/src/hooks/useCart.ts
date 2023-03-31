import { setCart } from '../store/counter/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useState } from 'react';
import { IAttributes, IProduct } from '../constants/types';


export const useCart = (onClosePopup: () => void) => {
  const [count, setCount] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<IAttributes[]>([]);
  const cart = useAppSelector((root) => root.cartSlice.cart);
  const dispatch = useAppDispatch();
  const onAddToCard = (el: IProduct) => () => {
    const findProduct = cart.findIndex((obj: IProduct) => obj.id === el.id && JSON.stringify(obj.selectedAttributes) === JSON.stringify(selectedAttributes));
    if (findProduct >= 0) {
      const result = cart.map((obj: IProduct, index: number) => index === findProduct ? ({
        ...obj,
        count: obj.count + count,
        selectedAttributes,
      }) : obj);
      saveResult(result);
    } else {
      const result = cart.concat({ ...el, count, selectedAttributes });
      saveResult(result);
    }
    onClosePopup();
  };

  const onClickAttributes = (el: IAttributes) => () => {
    const findAttributes = selectedAttributes.find((obj: IAttributes) => obj.id === el.id);
    if (findAttributes) {
      setSelectedAttributes(selectedAttributes.filter((obj) => obj.id !== el.id));
    } else {
      setSelectedAttributes(selectedAttributes.concat(el));
    }
  };

  const onChangeCount = (i: number, isMinus: boolean) => () => {
    const result = cart.map((obj: IProduct, index: number) => i === index ? ({
      ...obj,
      count:  isMinus ? (obj.count >= 2 ? obj.count - 1 : 1) : obj.count + 1,
      selectedAttributes: obj.selectedAttributes,
    }) : obj);
    saveResult(result);
  };

  const onRemoveFromCart = (i: number) => () => {
    const result = cart.filter((_, index) => i !== index);
    if (!result.length) onClosePopup();
    saveResult(result);
  };

  const saveResult = (result: IProduct[]) => {
    localStorage.setItem('cart', JSON.stringify(result));
    dispatch(setCart(result));
  };

  return {
    onAddToCard, onClickAttributes, selectedAttributes, setCount, count, onChangeCount, onRemoveFromCart,
  };
};