<template>
  <div>
    <v-container class="mt-10" align-center justify-center>
      <div>
        <h3>Change Password</h3>

        <v-form ref="form" @submit.prevent="changePassword" v-model="valid">
          <v-text-field
            v-model="email"
            color="primary"
            counter
            maxlength="50"
            label="Enter your Email ID..."
            :rules="emailRules"
          />

          <v-btn color="primary" @click="changePassword">Submit</v-btn>
        </v-form>
        <h3>{{message}}</h3>
      </div>
    </v-container>
  </div>
</template>

<script>
import api from "@/main";

export default {
  name: "ForgetPassword",
  data: () => ({
    valid:true,
    email: "",
    message:'',
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Enter a valid email address",
    ],
  }),
  methods:{
    changePassword(){
        if(this.$refs.form.validate()){
            api
              .post('/api/v1/check/',{
                email:this.email.toLowerCase()
              })
              .then(response =>{
                // console.log(response)
                if(response.data.valid === 'yes'){
                  api
                    .post('/api/v1/forget/link',{
                      email : this.email.toLowerCase()
                    })
                    .then(response =>{
                      // console.log(response)
                      this.message = response.data

                      setTimeout(()=>{
                        this.$router.push('/');
                      },10000)
                      
                    })
                    .catch(err =>{
                      console.log(err)
                    })
                }
                else if(response.data.valid === 'no'){
                  this.message = response.data.message
                }
                
              })
              .catch(err =>{
                console.log(err)
              })
        }
       
    }
  }
};
</script>

<style>
.box {
  width: 500px;
  position: relative;
  left: 350px;
}
</style>
