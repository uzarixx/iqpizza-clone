import File from '../components/ui/inputs/file';
import ReviewFetchService from '../services/http/reviewFetchService';
import { setReviewEndPopup, setReviewPopup } from '../store/counter/popupSlice';
import { useAppDispatch } from '../store/store';

export const useCreateReview = async (images: File[], props: { name: string, phoneNumber: string, reviewText: string }) => {
  try {
    const form = new FormData();
    images.forEach((e: File, i: number) => {
      form.append(`file${i}`, images[i]);
    });
    form.append('name', props.name);
    form.append('phoneNumber', props.phoneNumber);
    form.append('reviewText', props.reviewText);
    await ReviewFetchService.createReview(form);
  } catch (e) {
    console.log(e);
  }
};