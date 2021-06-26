/* eslint-disable */
import Discount from "./../Api/Discount";
import moment from 'moment'
export const discountIsValid = (userId, discount) =>
  new Promise( async(resolve) => {
    if (!moment().isBefore(moment(discount.expire_date)))
      return resolve({
        success: false,
        errorMsg: "Kortingscode niet meer geldig",
      });

    const {data} = await Discount.getDiscountUser();
    
    if(data.length === 0) return resolve({success: true})

    const usedDiscount = data.filter(
      (userDiscount) =>
        userDiscount.user_id === userId &&
        userDiscount.discount_id === discount.id
    );
    
    if (usedDiscount !== undefined)
      return resolve({
        success: false,
        errorMsg: "Kortingscode is al gebruikt",
      });

    return resolve({ success: true });
  });

