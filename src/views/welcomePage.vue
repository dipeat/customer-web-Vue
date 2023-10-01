<template>
  <v-main>
    <v-container>
      <v-chip color="red" v-if="errors.length">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </v-chip>

      <div v-if="$store.state.isAuthenticated">
        <h3>Logged In</h3>
        <h2>{{ $store.state.user.username }}</h2>
      </div>
      <div v-else>
        <h3>Logged Out</h3>
      </div>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "welcome",

  data: () => ({
    errors: [],
  }),
};
</script>
