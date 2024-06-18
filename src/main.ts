import { createApp, h, provide } from "vue";
import "./style.css";
import App from "./App.vue";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
// import gql from "graphql-tag";a
import { DefaultApolloClient } from "@vue/apollo-composable";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.mount("#app");
