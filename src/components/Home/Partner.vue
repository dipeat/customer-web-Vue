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

    <div >
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
          "https://cdn3.mydukaan.io/app/image/300x300/?url=https://dukaan-core-file-service.s3.ap-southeast-1.amazonaws.com/upload_file_service/9f6c9dca-881e-45f7-947c-6bcdff6a4473/simm-kitchen-logo-1.jpg",
      },
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/food-xpress-logo.jpg",
      },
    ],
    })
}
</script>


<style scoped>
.carousel-bg {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
}
</style>