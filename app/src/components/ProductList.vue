<template>
    <div>
        <ProductSearch @emitSearchFilters="applySearchFilters" />
        <h1>Lista produktow</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Opis</th>
                    <th>Kategoria</th>
                    <th>Cena</th>
                    <th>Zamow</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="product in visibleProducts.slice(0, visible)" :key="product.name">
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.category.name }}</td>
                    <td>{{ product.price }} {{ currency }}</td>
                    <td>
                        <button class="btn btn-primary" type="button" @click="addProduct(product)">{{ !product.bought ? 'Dodaj' : 'Usuń' }}</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <button v-if="allProducts.length > visible" 
            class="btn btn-secondary" type="button" 
            :on-click="loadMore">Pokaz wiecej</button>

        <router-link to="/order" class="btn btn-primary">Przejdź do koszyka.</router-link>
    </div>
</template>

<script>
import axios from 'axios';

import ProductSearch from './ProductSearch.vue';

const GET_ALL_PRODUCTS_URL = 'http://localhost:5000/api/v1/products/';

export default {
    name: 'ProductList',

    components: {
        ProductSearch
    },

    data() {
        return {
            visible: 10,
            currency: 'PLN',
            allProducts: [],
            visibleProducts: [],
            ordered: [],
        }
    },

    created() {
        localStorage['orderedProducts'] = [];
        this.fetchProducts();
    },

    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get(GET_ALL_PRODUCTS_URL);
                this.allProducts = response.data;
                this.visibleProducts = this.allProducts;
            } catch (err) {
                console.error(err);
                this.allProducts = [];
            }
        },

        loadMore() {
            this.visible += 10;
        },

        addProduct(product) {
            if (product.bought) {
                const index = this.ordered.indexOf(product._id);
                this.ordered.splice(index, 1);
                product.bought = false;
                localStorage['orderedProducts'] = this.ordered;
                return;
            }

            product.bought = true;
            this.ordered.push(product._id);
            localStorage['orderedProducts'] = this.ordered;
        },

        applySearchFilters(filters) {
            const name = filters.name.toLowerCase();
            const category = filters.category.toLowerCase();

            this.visibleProducts = this.allProducts.filter(product => {
                return (!name || product.name.toLowerCase().includes(name)) &&
                    (!category || product.category.name.toLowerCase() === category)
            });
        }
    }
}
</script>