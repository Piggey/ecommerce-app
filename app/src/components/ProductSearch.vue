<template>
    <div>
        <h1>Wyszukaj produkty</h1>
        <div class="d-flex justify-content-center">
            <form @submit.prevent="search" class="form-inline">
                <label for="name" class="sr-only"> Nazwa produktu: </label>
                <input type="text" id="name" v-model="filters.name" class="form-control mr-2" placeholder="Nazwa produktu" />

                <label for="category" class="sr-only"> Kategoria: </label>
                <select id="category" v-model="filters.category" class="form-control mr-2">
                    <option value=""> Wszystkie </option>
                    <option v-for="category in categories" :key="category.name"> {{ category.name }} </option>
                </select>

                <button type="submit" class="btn btn-primary"> Szukaj </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

const GET_ALL_CATEGORIES_URL = 'http://localhost:5000/api/v1/categories';

export default {
    name: 'ProductSearch',

    data() {
        return {
            filters: {
                name: '',
                category: '',
            },
            categories: [],
        }
    },

    created() {
        this.fetchCategories();
    },

    methods: {
        async fetchCategories() {
            try {
                const response = await axios.get(GET_ALL_CATEGORIES_URL);
                this.categories = response.data;
            } catch (err) {
                console.error(err);
                this.categories = [];
            }
        },

        search() {
            this.$emit('emitSearchFilters', this.filters);
        }
    }
}
</script>