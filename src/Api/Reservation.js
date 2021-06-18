import Api from './Api'
import Csrf from './Csrf'


export default {

    async createReservation(form) {
        await Csrf.getCookie();
        
        return Api.post("/reservations", form);
    },
    async updateReservation(id,form) {
        await Csrf.getCookie();

        return Api.post(`/reservations/update/${id}`, form);
    },
    async getReservations() {
        await Csrf.getCookie();
        
        return Api.get("/reservations");
    },
    async getAllReservations() {
        await Csrf.getCookie();
        
        return Api.get("/allReservations");
    },
    async getReservationsByPage(page) {
        await Csrf.getCookie();

        return Api.get(`reservationsByPage?page=${page}`)
    },
    async getReservation(id) {
        await Csrf.getCookie();
        
        return Api.get(`/reservations/${id}`)
    },
    async getReservationbyOrderId(id) {
        await Csrf.getCookie();
        
        return Api.get(`/reservation/${id}`)
    },
    Payment(price) {
        return Api.post(`/payment/${price}`);
    },
    RefundPayment(PaymentId, refundPrice){
        return Api.post( `/payment/${PaymentId}/${refundPrice}`);
    },
    async getWebhook(orderId) {
        await Csrf.getCookie();
        
        return Api.post("/webhook", orderId ) 
    },
};