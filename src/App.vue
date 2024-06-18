<template>
  <div>
    <div>
      <input id="search" type="text" v-model="search" placeholder="Search..." />
    </div>
    <div v-if="activeBook">
      <EditRating
        :initial-rating="activeBook.rating"
        :book-id="activeBook.id"
        @closeForm="activeBook = null"
      />
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else v-for="book in books">
      {{ book.title }} - {{ book.rating }}
      <button @click="activeBook = book">Edit rating</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import ALL_BOOKS_QUERY from "./graphql/allBooks.query.gql";
import { ref, computed } from "vue";
import EditRating from "./components/EditRating.vue";

const search = ref("");
const { result, loading, error } = useQuery(
  ALL_BOOKS_QUERY,
  () => ({
    search: search.value,
  }),
  () => ({
    debounce: 800,
  })
);
const books = computed(() => result?.value?.allBooks ?? []);
const activeBook = ref(null);
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
