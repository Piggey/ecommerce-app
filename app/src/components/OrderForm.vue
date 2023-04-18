<template>
    <div>
        <h1>Podsumowanie zamówienia</h1>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Ilość</th>
                        <th>Nazwa</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in ordered" :key="product._id">
                        <td>
                            <input type="number" min="1" v-model="product.quantity" @input="validateQuantity(product)"
                                @blur="updateTotalPrice" />
                        </td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }} {{ currency }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        łącznie: <b>{{ totalPrice }} {{ currency }}</b>

        <h2>Podaj swoje dane</h2>

        <form>
            <div class="form-group">
                <label for="username">Nazwa użytkownika</label>
                <input type="text" class="form-control" id="username" v-model="user.username" placeholder="użytkownik" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="user.email" placeholder="xxx@abc.com"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
            </div>
            <div class="form-group">
                <label for="phone">Numer telefonu</label>
                <input type="tel" class="form-control" id="phone" v-model="user.phone"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{3}" inputmask="'mask': '999 999 999'" placeholder="123 456 789" />
            </div>

            <button class="btn btn-primary" type="submit" @click="placeOrder">Zamów</button>
        </form>

    </div>

</template>

<script>
import axios from 'axios';

const GET_PRODUCT_BY_ID_BASE_URL = 'http://localhost:5000/api/v1/products/';
const PLACE_ORDER_URL = 'http://localhost:5000/api/v1/orders';

export default {
    name: 'OrderForm',

    data() {
        return {
            currency: 'PLN',
            ordered: [],
            user: {
                username: '',
                email: '',
                phone: '',
            },
        }
    },

    created() {
        this.fetchOrderedProducts();
    },

    methods: {
        fetchOrderedProducts() {
            const productIds = localStorage['orderedProducts'].split(',');
            const requests = productIds.map(id => {
                return axios.get(GET_PRODUCT_BY_ID_BASE_URL + id);
            });

            Promise.all(requests).then(responses => {
                this.ordered = responses.map(response => {
                    const product = response.data;
                    product.quantity = 1;
                    return product;
                });
            });
        },

        validateQuantity(product) {
            if (!product.quantity) {
                product.quantity = 1;
            }
        },

        placeOrder() {
            const orderedProducts = this.ordered.map(prdct => {
                const quantity = prdct.quantity;
                delete prdct.quantity;

                return {
                    quantity: quantity,
                    product: prdct,
                };
            });

            axios.post(PLACE_ORDER_URL, {
                orderDate: Date.now(),
                status: 'NOTAPPROVED',
                username: this.user.username,
                email: this.user.email,
                phoneNumber: this.user.phone,
                orderedProducts: orderedProducts
            }).then(response => {
                const orderId = response.data._id;
                alert(`Pomyślnie dokonano zamówienia! Numer zamówienia: ${orderId}`);
            }).catch(err => {
                console.error(err);
                alert(`Nie udało się złożyć zamówienia! ${err}`);
            })
        }
    },

    computed: {
        totalPrice() {
            return this.ordered.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
        }
    }
}
</script>