<template>
  <div class="about-frame">
    <v-row class="about-container">
      <v-col cols="12" sm="6" v-if="isDesktop == true">
        <v-layout align-center justify-center fill-height> </v-layout>
      </v-col>
      <v-col cols="12" sm="6" class="about-content">
        
        <div class="mt-3 pa-2 about-justify" :class="{ visible: isVisible }">
          <h2  class="text-h2 font-weight-bold my-6 ">About Us</h2>
          Calling all food enthusiasts! At dipEAT, we're a squad of flavor
          fanatics who live for taste explosions. Whether you're into dine-in or
          takeaway, we've got you covered. Order in advance, and your meal is
          prepped to perfection, so you can savor every bite the moment you
          arrive. No more waiting around! Our mission is simple: book before you
          leave, and your food is served the second you step through our doors.
          Say goodbye to hunger-induced impatience; say hello to instant foodie
          gratification at dipEAT! 🍔🌮🍕🕒<br/><br/>
          <v-btn large class="styleBtn" :class="{onScreen : isBtnVisible}" color="secondary"  href="http://partner.dipeat.com/">Partner With Us &nbsp;<svg-icon type="mdi" :path="path"></svg-icon></v-btn>
        </div>
        
      </v-col>
    </v-row> 
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHandshakeOutline } from '@mdi/js';

export default {
  components :{
    SvgIcon
  },
  data: () => ({
    page:1,
    isDesktop: true,
    isVisible: false,
    isBtnVisible:false,
    
    path: mdiHandshakeOutline,  
  }),
  methods: {
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 760; // Adjust the breakpoint as needed
    },
    handleAboutScroll() {
      const container = this.$el.querySelector(".about-container");
      const rect = container.getBoundingClientRect();
      const textBottom = rect.top + 50;
      if (textBottom <= window.innerHeight && !this.isVisible) {
        this.isVisible = true;
      }
    },
    handleBtnScroll() {
      const container = this.$el.querySelector(".styleBtn");
      const rect = container.getBoundingClientRect();
      const textBottom = rect.top+20 ;
      if (textBottom <= window.innerHeight && !this.isBtnVisible) {
        this.isBtnVisible = true;
      }
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
    window.addEventListener("scroll", this.handleAboutScroll);//aboutTextAnimate
    window.addEventListener("scroll", this.handleBtnScroll); 
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
    window.removeEventListener("scroll", this.handleAboutScroll);
    window.addEventListener("scroll", this.handleBtnScroll); 
  },
};
</script>

<style scoped>
/* .menu-item {
  width: 260px;
  margin: 20px auto;
  border-radius: 6px;
  overflow: hidden;
} */
@import url('https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Dancing+Script:wght@700&family=Galada&family=Pacifico&family=Style+Script&family=Tangerine:wght@700&family=Zeyada&display=swap');

* {
  padding: 0px;
  margin: 0px;
}
.menu-item {
  width: 100%;
  height: 50%;
}
.about-container {
  margin: 20px 0px;
}
.about-justify {
  font-size: 25px;
  font-style: italic;
  word-spacing: 5px;
  line-height: 35px;
  opacity: 0;
  color: white;
  height: 100%;
  font-weight: bold;
  transform: translateY(60%);
  transition: opacity 1s ease-in-out, transform 1.2s ease-in-out;
}
@media screen and (max-width: 400px) {
  .about-justify{
    background-color: rgb(0,0,0,0.5);
    font-size: 22px;
  }
}
.about-justify.visible {
  opacity: 1;
  transform: translateY(0);
}

.about-frame {
  width: 100vw;
  min-height: 600px;
  background-image: url('https://dipeat-s3-bucket-1.s3.amazonaws.com/dipeat-about.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 5px;
}
.about-content {
  display: flex;
  align-items: center;
  height: 100%;
}
.styleBtn{
  background: linear-gradient(to right, transparent 50%, #76047a 0%);
  background-position: 100% 0;  
  transition: background 0.4s ease-in-out ,opacity 1s ease-in-out,transform 0.7s ease-in-out;
  background-size: 200% 100%;
  color: #fff;
  transform:scale(0.2);
  opacity: 0;
  
}
.styleBtn.onScreen{
  opacity: 1;
  transform:scale(1);
}

.styleBtn:hover{
  background-position: 0 0;
}

</style>
