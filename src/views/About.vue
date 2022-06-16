<template>
 <v-main>
  <v-container>
    <p>
      {{ tasks }}
    </p>
  </v-container>

  <v-container>
    <form 
    v-on:submit.prevent="submit"
    >
    <v-text-field
      v-model="name"
      :counter="10"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>
    
    

    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    
  </form>
  </v-container>


  </v-main>

  
</template>

<script>
import axios from "axios";

export default {
  name: "Home",

  data() {
    return {
      tasks: [],
      name: "",
      email: "",
    };
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    getTasks() {
      axios({
        method: "get",
        url: "http://localhost:8000/tasks/",
        
        auth: {
          username: "satyamraj",
          password: "12345678",
        },
      })
        .then(response => 
          this.tasks = response.data
        )
        
    },
    submit () {
      axios({
        method: "post",
        url: "http://localhost:8000/tasks/",
        data: {
          name: this.name,
          description: this.email,
        },
        auth: {
          username: "satyamraj",
          password: "12345678",
        },
      })
        .then(response => {
          this.getTasks();
        
        })
        .catch(error => {
          console.log(error);
        });
      },
  },
};
</script>