import Discount from "./../Api/Discount";

export const discountIsValid = () =>
  new Promise(async (resolve, reject) => {
    if (!moment(discount.expire_date).isBefore(moment()))
      return reject({
        success: false,
        errorMsg: "Kortingscode niet meer geldid",
      });

    const discountUsers = await Discount.getDiscountUser();

    const usedDiscount = discountUsers.filter(
      (userDiscount) =>
        userDiscount.user_id === userId &&
        userDiscount.discount_id === discount.id
    );

    if (usedDiscount !== undefined)
      return reject({
        success: false,
        errorMsg: "Kortingscode is al gebruikt",
      });

    return resolve({ success: true });
  });

