import Api from './Api'
import Csrf from './Csrf'


export default {

    async createReservation(form) {
        await Csrf.getCookie();
        
        return Api.post("/reservations", form);
    },
    async getReservations() {
        await Csrf.getCookie();
        
        return Api.get("/reservations");
    },
    async getAllReservations() {
        await Csrf.getCookie();
        
        return Api.get("/allReservations");
    },
    async getReservation(Id) {
        await Csrf.getCookie();
        
        return Api.get("/reservations/" + Id)
    },
    async getReservationbyOrderId(Id) {
        await Csrf.getCookie();
        
        return Api.get("/reservation/" + Id)
    },
    Payment(price) {
        return Api.post('/payment/' + price);
    },
    RefundPayment(PaymentId, refundPrice){
        return Api.post('/payment/' + PaymentId + '/' + refundPrice);
    },
    async getWebhook(orderId) {
        await Csrf.getCookie();
        
        return Api.post("/webhook", orderId ) 
    },
};