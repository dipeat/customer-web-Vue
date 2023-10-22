<template>
    <div>
    <div>
      <div class="text-h5 pa-3 mt-10 text-center">
        <strong>Technology Partner</strong>
      </div>

      <carousel-3d autoplay clickable display="3">
        <slide v-for="(slide, i) in slides" :index="i" :key="i" class="carousel-bg">
          <template slot-scope="{ index }">
            <img :data-index="index" :src="slide.src" height="240" class="mt-3 bg-dark" />
          </template>
        </slide>
      </carousel-3d>
    </div>

    <!-- <div >
      <div class="text-h5 pa-3 mt-3 text-center">
        <strong>Restaurant Partner</strong>
      </div>
      <carousel-3d autoplay clickable display="5" class="text-dark">
        <slide v-for="(item, i) in items" :index="i" :key="i" class="carousel-bg">
          <template slot-scope="{ index }">
            <img :data-index="index" :src="item.src" height="270" class="" />
          </template>
        </slide>
      </carousel-3d>
    </div> -->
    <br/>
    <br/>
    <br/>
    <div class="text-h5 pa-3 text-center">
      <strong>Restaurant Partner</strong>
    </div>
    <div class="marquee-container"  >
      <div class="marquee" :class="{'paused':!isScrolling}">
        <img @mouseover="stopScroll" @mouseout="resumeScroll"
          v-for="(image, index) in items"
          :key="index"
          class="marquee-image"
          :src="image.src"
          :alt="image.alt"
        />
        
      </div>
      
      
    </div>
</div>
</template>

<script>

export default{
    data :()=>({
        slides: [
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/pet-pooja-removebg-preview.png",
      },
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/Microsoft-Azure-Logo+(1).png",
      },
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/phone-pe-logo.png",
      },
      {
        src:
          "https://dipeat-s3-bucket-1.s3.amazonaws.com/AWS-Cloud-logo-removebg-preview.png",
      },
    ],
    items: [
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/hoy+punjab+logo.jpg",
      },
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/punjXpres+logo.jpg",
      },
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/creamplanet+image.jpg",
      },
      {
        src:
          "https://dipeat-s3-bucket-1.s3.amazonaws.com/simmKitchen.jpg",
      },
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/food-xpress-logo.jpg",
      },
    ],
    isScrolling: true,
    }),
    methods: {
    stopScroll() {
      this.isScrolling = false;
    },
    resumeScroll() {
      this.isScrolling = true;
    },
  },
}
</script>


<style scoped>
.carousel-bg {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
}

.marquee-container {
  margin-top: 60px;
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 300px; /* Adjust the height to your needs */
}

.marquee {
  display: inline-block;
  white-space: nowrap;
  animation: scroll 20s linear infinite; /* Adjust the animation speed (10s in this example) */
}
.marquee.paused{
 animation-play-state: paused;
}
.marquee-image {
  margin:0px 10px; 
  height: 250px; /* Adjust the image height */
  width: 400px;
  cursor: pointer;
}
@media(max-width:600px){
  .marquee-image{
    height: 100px;
    width: 100px;
  }
  .marquee-container{
    height: 150px ;
  }
}
@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
 
  100% {
    transform: translateX(-100%);
  }
}

</style>