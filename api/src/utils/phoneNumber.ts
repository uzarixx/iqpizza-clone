export const phoneNumber = (phoneNumber: string) => {
  let cleanedNumber = phoneNumber.replace(/\D/g, '');
  cleanedNumber = cleanedNumber.startsWith('38') ? cleanedNumber : `38${cleanedNumber}`;
  return `+${cleanedNumber.slice(0, 2)} (${cleanedNumber.slice(2, 5)}) ${cleanedNumber.slice(5, 8)} ${cleanedNumber.slice(8, 10)} ${cleanedNumber.slice(10, 12)}`;
};