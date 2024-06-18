<template>
  <input
    type="text"
    v-model="rating"
    @keyup.enter="updateRating"
    @keyup.esc="$emit('closeForm')"
  />

  <p v-if="loading">Loading...</p>
  <p v-if="error">Error: {{ error }}</p>
</template>

<script setup>
import { ref, defineProps } from "vue";
import UPDATE_BOOK_MUTATION from "../graphql/updateBook.mutation.gql";
import { useMutation } from "@vue/apollo-composable";

const props = defineProps({
  initialRating: {
    type: Number,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["closeForm"]);
const rating = ref(props.initialRating);

const {
  mutate: updateRating,
  onDone,
  loading,
  error,
} = useMutation(UPDATE_BOOK_MUTATION, () => ({
  variables: {
    id: props.bookId,
    rating: parseFloat(rating.value),
  },
}));

onDone(() => {
  emit("closeForm");
});
</script>
