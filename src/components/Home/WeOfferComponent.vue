<template>
  <div class="offer">
    <h2 class="pink--text text-h2 pt-5 text-center">
      <strong>We offer</strong>
      <v-row class="mt-10" d-flex align="center" justify="center">
        <v-col d-flex align="center" justify="center">
          <div   class="pa-4 card-box" >
            <p class="text-center text-h3">Swift and seamless</p>
            <div>
              <p class="text-h1 red--text"><strong>0</strong></p><p class="text-h6">apx</p>
            </div>
            <p class="text-h5 text-center">
              Login/Sign Up and give order online before leaving your home or office.
            </p>
          </div>
        </v-col>

        <v-col d-flex align="center" justify="center">
          <div   class="pa-4 card-box" @mouseover="onImgHover = true" @mouseout="onImgHover = false">
            <p class="text-center text-h3">Savor In / Grab on the Go</p>
            <div class="food-icon" >
              <img class="juice" :class="{'juice-effect':onImgHover}" height="80px" width="70px" :src="juice"/>
              <img class="donut" :class="{'donut-effect':onImgHover}" height="50px" width="50px" :src="donut"/>
              <img class="sandwich" :class="{'sandwich-effect':onImgHover}" height="80px" width="70px" :src="sandwich"/>
              
            </div>
            <p class="text-h5 text-center">
              Choose your preference of Dine-In or TakeAway, and get food at your selected time.
            </p>
          </div>
        </v-col>

        <v-col d-flex align="center" justify="center">
          <div   class="pa-4 card-box" @mouseover="onPriceHover = true" @mouseout="onPriceHover = false">
            <p class="text-center text-h3">Price Parity</p>
            <h1 class="red--text"  :class="onPriceHover == true ? 'cash-effect':'cash'">&#8377;</h1>
            
            <span  :class="onPriceHover==true? 'hand-effect':'hand'">
              <img :src="cash" width="100" height="100"/>
            </span>
            <p class="text-h5 text-center">
              Select the cuisine as of your choice at price as low as shop menu.
            </p>
          </div>
        </v-col>
      </v-row>
    </h2>
  </div>
</template>

<script>
export default{
  data:()=>({
    juice : "https://dipeat-s3-bucket-1.s3.amazonaws.com/juice.png",
    sandwich : "https://dipeat-s3-bucket-1.s3.amazonaws.com/sandwich.png",
    donut: "https://dipeat-s3-bucket-1.s3.amazonaws.com/donut.png",
    cash: "https://dipeat-s3-bucket-1.s3.amazonaws.com/cash.png",
    onImgHover:false,
    onPriceHover:false
  })
}
</script>

<style>
*{
  padding: 0px;
  margin: 0px;
}
.offer{
  display: flex column;
  align-items: center;
  justify-content: center;
  background-color: #683698;
  min-height: 650px;
  
}
.card-box{
  color: black;
  width:350px;
  height: 460px;
  background-color: rgb(227, 215, 215);
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  border-radius: 20px;
  cursor:pointer;
  transition:background 0.5s ease;
  box-shadow: rgb(59, 59, 59) 2px 9px 8px;
}
@media(max-width:600px){
  .card-box{
    width:330px;
    height: 480px;
  }
}
.card-box:hover{
  background:linear-gradient(135deg , #2d0138,#381042);
  color: white;
}
.food-icon{
  display: flex;
  align-items: center;
  justify-content: center; 
}
.juice{
  position: relative;
  left: 20px;
  transition: transform ease-in-out 400ms;
}
.juice-effect{
  transform:  rotate(-20deg) translateX(-20px) scale(1.4);
}
.donut{
  position: relative;
  top:10px;
  transition: transform ease-in-out 400ms;
}
.donut-effect{
  transform: translateY(-50px)  rotate(-10deg) scale(1.5);
}
.sandwich{
  position: relative;
  right: 15px;
  top:5px;
  transition: transform ease-in-out 400ms;
}
.sandwich-effect{
  transform:  rotate(30deg) scale(1.4) translateX(10px);
}

.cash{
  opacity: 1;
  transform: translateY(80px);
  transition: transform ease-in-out 400ms;
}
.cash-effect{
  opacity: 0.2  ;
  transform:scale(3) translateY(40px);

  transition: transform ease-in-out 400ms;
}
.hand{
  opacity: 0;
  transition: transform ease-in-out 300ms;
}
.hand-effect{
  opacity: 1;
  transform: scale(1.5);
  transition: transform ease-in-out 300ms;
} 


</style>


