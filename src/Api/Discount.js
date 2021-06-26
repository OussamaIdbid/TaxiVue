import Api from './Api'
import Csrf from './Csrf'

export default {
    async getDiscount(code) {
        await Csrf.getCookie()

        return Api.get(`/discount/${code}`);
    },
    async getDiscountUser() {

        await Csrf.getCookie

        return Api.get('/discount-user')
    }
}