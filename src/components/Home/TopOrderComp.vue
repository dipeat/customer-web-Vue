<template>
    <div class="top-orders">
      <h1>
        <u
          >Smart platform,<br />
          Smart service.</u
        >
      </h1>
      <div class="restaurant-menu">
        <div class="menu-item">
          <img src="https://dipeat-s3-bucket-1.s3.amazonaws.com/pizza.jpg" alt="" />

          <div class="title grey--text">Pizza</div>
        </div>

        <div class="menu-item">
          <img
            src="https://dipeat-s3-bucket-1.s3.amazonaws.com/fresh-cold-orange-juice.jpg"
            alt=""
          />

          <div class="title grey--text">Healthy Drinks</div>
        </div>

        <div class="menu-item">
          <img
            src="https://dipeat-s3-bucket-1.s3.amazonaws.com/dosa-compressed.jpg"
            alt=""
          />

          <div class="title grey--text">Masala Dosa</div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.top-orders {
  font-family: "Montserrat", sans-serif;
}

.top-orders h1 {
  margin: 30px auto;
  text-align: center;
  font-size: 2rem;
}
.restaurant-menu {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.menu-item {
  width: 260px;
  margin: 20px auto;
  border-radius: 6px;
  overflow: hidden;
}
@media only screen and (max-width: 750px) and (min-width: 100px){
    .menu-item{
        width: 150px;
    }
}

.menu-item img {
  width: 100%;
  height: auto;
  border-radius: 20%;
}
</style>