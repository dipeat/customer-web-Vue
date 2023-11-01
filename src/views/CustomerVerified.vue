<template>
    <div class="box">
        <!-- <h1 class="text-center">{{hashedUrl}}</h1> -->
        <h1 class="text-center">{{setMessage}}</h1>
    </div>
</template>

<script>
import api from "@/main";
export default{
    name:'CustomerVerified',
    data:()=>({
        dialog:true,
        loc:window.location.href,
        setMessage:''
    }),
    methods:{
        verifyCustomer(){
            api
                .post("/api/v1/AtOnVerify",{
                    user_id :this.hashedUrl
                })
                .then((response)=>{
                    // console.log(response.data)
                    if(response.data.verified === "yes"){
                        this.setMessage = 'You are an already verified customer, Please Login. Redirecting to home ...'
                    }
                    else if(response.data === 'Verification is Done'){
                        this.setMessage = 'You are now a verified customer, Please Login. Redirecting to home ...'
                    }
                    setTimeout(() =>{
                        this.$router.push('/');
                    },5000)
                })
                .catch((error)=>{
                    // console.log(error)
                    this.setMessage = 'You are not a valid user'
                })
        }
    },
    created(){
        this.verifyCustomer();
    },
    computed:{
        hashedUrl(){
            const arr = this.loc.split('/');
            return arr[4]
        }
    }
}

</script>

<style>

.box{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
}

</style>