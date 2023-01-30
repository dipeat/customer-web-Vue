<template>
  <div>
    <div>
      <nav>
        <div class="logo">
          <img :src="image" alt="Logo/Name" />
        </div>
        <div class="hamburger">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#res-del">Menu</a></li>
          <li><a href="#offer-section">Offers</a></li>
          <li><a href="#footer">About Us</a></li>
          <li><a class="login-button" href="#">Login</a></li>
          <li><a class="joinus-button" href="#">Join Us</a></li>
        </ul>
      </nav>

      <div class="hero-large-bg">
        <img :src="bglargeimage" class="bg-large-image" alt="BG Image" />
        <div class="hero-text-overlay">
          <h1>
            It's not just food, <br />
            It's an Experience
          </h1>
        </div>
      </div>

      <div class="hero-mobile-bg">
        <img :src="bgmobileimage" class="bg-mobile-image" alt="BG Image" />
        <div class="hero-text-overlay">
          <h1>
            It's not just food, <br />
            It's an Experience
          </h1>
        </div>
      </div>
    </div>

    <div id="how-it-works">
      <h2>How It Works</h2>

      <div class="container-flex">
        <div class="box">
          <h3>Easy Order</h3>
          <span class="mdi mdi-food"></span>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, non?</p>
        </div>

        <div class="box">
          <h3>Dine In</h3>
          <span class="mdi mdi-seat-recline-normal"></span>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, non?</p>
        </div>

        <div class="box">
          <h3>Take Away</h3>
          <span class="mdi mdi-run"></span>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, non?</p>
        </div>
      </div>
    </div>

    <div id="offer-section">
      <div class="flex-offer">
        <div class="offer-box">
          <h4>Offer 1</h4>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, non?</p>
        </div>

        <div class="offer-box">
          <h4>Offer 2</h4>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, non?</p>
        </div>

        <div class="offer-box">
          <h4>Offer 3</h4>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, non?</p>
        </div>
      </div>
    </div>

    <v-carousel :show-arrows="false" id="offer-mobile">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>

    <div class="top-orders">
      <h1>Top Orders</h1>
      <div class="restaurant-menu">
        <div class="menu-item">
          <img
            src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/menu-1.jpg"
            alt=""
          />

          <div class="title">Foodie</div>
        </div>

        <div class="menu-item">
          <img
            src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/menu-2.jpg"
            alt=""
          />

          <div class="title">Foodie</div>
        </div>

        <div class="menu-item">
          <img
            src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/menu-3.jpg"
            alt=""
          />

          <div class="title">Foodie</div>
        </div>

        <div class="menu-item">
          <img
            src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/menu-4.jpg"
            alt=""
          />

          <div class="title">Foodie</div>
        </div>

        <div class="menu-item">
          <img
            src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/menu-5.jpg"
            alt=""
          />

          <div class="title">Foodie</div>
        </div>

        <div class="menu-item">
          <img
            src="https://raw.githubusercontent.com/programmercloud/foodlover/main/img/menu-6.jpg"
            alt=""
          />

          <div class="title">Foodie</div>
        </div>
      </div>
    </div>

    <div id="res-del">
      <div class="container-res-flex">
        <img
          src="https://images.unsplash.com/photo-1494233914995-8c8b438d3f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          alt=""
        />
        <div class="res-right">
          <h2>Resturant 1</h2>
          <br />
          <h3>Rating: 4/5</h3>
          <br />
          <p>Indian, Chinese, Thai</p>
          <br />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, non?</p>
        </div>
      </div>
    </div>

    <div id="res-del">
      <div class="container-res-flex">
        <img
          src="https://images.unsplash.com/photo-1494233914995-8c8b438d3f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          alt=""
        />
        <div class="res-right">
          <h2>Resturant 1</h2>
          <br />
          <h3>Rating: 4/5</h3>
          <br />
          <p>Indian, Chinese, Thai</p>
          <br />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, non?</p>
        </div>
      </div>
    </div>

    <div id="res-del">
      <div class="container-res-flex">
        <img
          src="https://images.unsplash.com/photo-1494233914995-8c8b438d3f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          alt=""
        />
        <div class="res-right">
          <h2>Resturant 1</h2>
          <br />
          <h3>Rating: 4/5</h3>
          <br />
          <p>Indian, Chinese, Thai</p>
          <br />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, non?</p>
        </div>
      </div>
    </div>

    <section id="footer">
      <div class="main-footer">
        <div class="logoinfo" data-aos="fade-up">
          <h2>Food Project</h2>

          <div class="contact-details">
            <h1>Contact Us</h1>
            <li>
              <div class="fa fa-phone"></div>
              <a href="tel:+91123456789">+91 123456789</a>
            </li>
            <li>
              <div class="fa fa-envelope"></div>
              <a href="mailto:yourmail@gmail.com">yourmail@gmail.com</a>
            </li>
          </div>
        </div>
        <div class="com" data-aos="fade-up">
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Cancellation/Refund Policy</a></li>
          </ul>
        </div>
        <div class="info" data-aos="fade-up">
          <h1>Social Media</h1>
          <div class="sociallogos">
            <div class="logobox">
              <a href="#"><span class="mdi mdi-instagram"></span></a>
              <a href="#"><span class="mdi mdi-linkedin"></span></a>
              <a href="#"><span class="mdi mdi-facebook"></span></a>
            </div>
          </div>
        </div>
      </div>
      <footer>© Copyright 2023 All Rights Reserved</footer>
    </section>
  </div>
</template>

<script>
/* Importing Images */
import image from "../assets/burger.png";
import bglargeimage from "../assets/bg-large.gif";
import bgmobileimage from "../assets/bg-mobile.gif";

export default {
  data: function () {
    return {
      image: image,
      bglargeimage: bglargeimage,
      bgmobileimage: bgmobileimage,
      items: [
        {
          src:
            "https://img.freepik.com/free-vector/gradient-colorful-sale-wallpaper_52683-55788.jpg?w=1380&t=st=1674988270~exp=1674988870~hmac=5dfb86a1067e5aee80d33575ec34c1ac3b4bec23a184890d95565c9458fae605",
        },
        {
          src:
            "https://img.freepik.com/free-vector/gradient-colorful-sale-wallpaper_52683-55788.jpg?w=1380&t=st=1674988270~exp=1674988870~hmac=5dfb86a1067e5aee80d33575ec34c1ac3b4bec23a184890d95565c9458fae605",
        },
        {
          src:
            "https://img.freepik.com/free-vector/gradient-colorful-sale-wallpaper_52683-55788.jpg?w=1380&t=st=1674988270~exp=1674988870~hmac=5dfb86a1067e5aee80d33575ec34c1ac3b4bec23a184890d95565c9458fae605",
        },
        {
          src:
            "https://img.freepik.com/free-vector/gradient-colorful-sale-wallpaper_52683-55788.jpg?w=1380&t=st=1674988270~exp=1674988870~hmac=5dfb86a1067e5aee80d33575ec34c1ac3b4bec23a184890d95565c9458fae605",
        },
      ],
    };
  },
};
</script>

<style>
/*Remove Scroll Bar */
::-webkit-scrollbar {
  display: none;
}

* {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

/*Navigation Bar and Hamburger */

nav {
  height: 5rem;
  width: 100vw;
  background: rgba(118, 75, 162, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);
  border: 1px solid rgba(118, 75, 162, 1);
  display: flex;
  position: fixed;
  z-index: 10;
  font-family: "Montserrat", sans-serif;
}

/*Styling logo*/
.logo {
  padding: 1vh 1vw;
  text-align: center;
}
.logo img {
  height: 4rem;
  width: 4rem;
  margin-left: 15px;
}

/*Styling Links*/
.nav-links {
  display: flex;
  list-style: none;
  width: 88vw;
  padding: 0 0.7vw;
  justify-content: right;
  align-items: center;
  text-transform: uppercase;
  font-weight: 400;
}
.nav-links li a {
  text-decoration: none;
  margin: 0 1.3vw;
  color: #ffffff;
  font-size: medium;
}

.nav-links li {
  position: relative;
}
.nav-links li a ::before {
  content: "";
  display: block;
  height: 3px;
  width: 0%;
  background-color: #ffffff;
  position: absolute;
  transition: all ease-in-out 250ms;
  margin: 0 0 0 10%;
}
.nav-links li a:hover {
  color: #ffffff;
  font-size: larger;
  padding: 0.6rem 0.8rem;
  transition: ease-in-out 300ms;
  position: relative;
}

/*Styling Buttons*/
.login-button {
  background-color: transparent;
  border: 1.5px solid #ffffff;
  border-radius: 2em;
  padding: 0.6rem 0.8rem;
  margin-left: 2vw;
  font-size: 1rem;
  cursor: pointer;
}
.login-button:hover {
  background: rgba(97, 35, 160, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  border: 1px solid rgba(118, 75, 162, 1);
  border: 1.5px solid #f2f5f7;
  transition: all ease-in-out 150ms;
}
.joinus-button {
  color: #ffffff;
  border: 1.5px solid #ffffff;
  border-radius: 2em;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  cursor: pointer;
}
.joinus-button:hover {
  background: rgba(97, 35, 160, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  border: 1px solid rgba(118, 75, 162, 1);
  border: 1.5px solid #f2f5f7;
  transition: all ease-in-out 150ms;
}

/*Styling Hamburger Icon*/
.hamburger div {
  width: 30px;
  height: 2.6px;
  background: #000000;
  margin: 5px;
  transition: all 0.3s ease;
}
.hamburger {
  display: none;
}

/*Stying for small screens*/
@media screen and (max-width: 800px) {
  .logo img {
    height: 4rem;
    width: 4rem;
  }

  nav {
    position: fixed;
    z-index: 3;
    height: 5rem;
  }
  .hamburger {
    display: block;
    position: absolute;
    cursor: pointer;
    right: 5%;
    top: 50%;
    transform: translate(-5%, -50%);
    z-index: 2;
    transition: all 0.5s ease;
  }
  .nav-links {
    position: fixed;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 80vh;
    width: 100%;
    flex-direction: column;
    clip-path: circle(50px at 90% -20%);
    -webkit-clip-path: circle(50px at 90% -10%);
    transition: all 1s ease-out;
    pointer-events: none;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  .nav-links.open {
    clip-path: circle(1000px at 90% -10%);
    -webkit-clip-path: circle(1000px at 90% -10%);
    pointer-events: all;
  }
  .nav-links li {
    opacity: 0;
    margin-top: 35px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .nav-links li:nth-child(1) {
    transition: all 0.5s ease 0.2s;
  }
  .nav-links li:nth-child(2) {
    transition: all 0.5s ease 0.4s;
  }
  .nav-links li:nth-child(3) {
    transition: all 0.5s ease 0.6s;
  }
  .nav-links li:nth-child(4) {
    transition: all 0.5s ease 0.8s;
  }
  .nav-links li:nth-child(5) {
    transition: all 0.5s ease 1s;
  }
  .nav-links li:nth-child(6) {
    transition: all 0.5s ease 1.2s;
  }

  li.fade {
    opacity: 1;
  }
}
/*Animating Hamburger Icon on Click*/
.toggle .line1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}
.toggle .line2 {
  transition: all 0.7s ease;
  width: 0;
}
.toggle .line3 {
  transform: rotate(45deg) translate(-5px, -6px);
}

/*Background Image for Large Devices*/
.bg-large-image {
  position: relative;
  height: auto;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}

/*Background Image for Mobile Devices*/
.bg-mobile-image {
  position: relative;
  height: auto;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}

/*Responsiveness of Backgorund Image*/
@media only screen and (max-width: 450px) and (min-width: 100px) {
  .hero-large-bg {
    display: none;
  }
}

@media only screen and (min-width: 451px) {
  .hero-mobile-bg {
    display: none;
  }
}

/*Hero Text or Heading Large Device*/
.hero-large-bg .hero-text-overlay {
  font-size: 2.8em;
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: white;
  font-family: "Great Vibes", cursive;
}

.hero-text-overlay h1 {
  overflow: hidden;
  border-right: 0.1em solid #6a1b9a;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: typing 3.8s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #ab47bc;
  }
}

.hero-mobile-bg .hero-text-overlay {
  font-size: 1em;
  position: absolute;
  top: 4%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: white;
  font-family: "Great Vibes", cursive;
}

@media only screen and (min-width: 1920px) {
  .hero-large-bg .hero-text-overlay {
    font-size: 4em;
  }
}

@media only screen and (min-width: 1400px) and (max-width: 1919px) {
  .hero-large-bg .hero-text-overlay {
    font-size: 3em;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1399px) {
  .hero-large-bg .hero-text-overlay {
    font-size: 2.5em;
  }
}

/*How it works Section*/
#how-it-works {
  width: 70%;
  margin: 40px auto;
  text-align: center;
  font-size: 1.8rem;
  font-family: "Montserrat", sans-serif;
}

.container-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
}

.box {
  border: 1px solid #b2b2b2;
  padding: 25px 25px;
  margin: 0 10px;
  border-radius: 10px;
  font-size: 18px;
  transition: 0.3s ease;
  cursor: pointer;
}

.box h3 {
  font-size: 1.5rem;
}

.box .mdi-food,
.mdi-seat-recline-normal,
.mdi-run {
  font-size: 2rem;
}

.box ion-icon {
  font-size: 35px;
  color: #fe5722;
  margin: 15px 0;
}

.box.active,
.box:hover {
  color: #fff;
  background: #6a1b9a;
  border: 2px solid;
  border-color: #f06292;
  transition: linear 350ms;
  animation-timing-function: 1s;
}

.box.active ion-icon,
.box:hover ion-icon {
  color: #fff;
}

@media only screen and (max-width: 450px) and (min-width: 100px) {
  .container-flex {
    flex-direction: column;
  }

  .box {
    margin: 10px;
  }

  #how-it-works {
    font-size: 1.5rem;
  }
}

/*Offer Section*/
#offer-section {
  background-image: url("../assets/section-two-bg.jpg");
  margin: 50px auto;
  height: 50vh;
  width: 100%;
  padding: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  font-family: "Montserrat", sans-serif;
}

.flex-offer {
  display: flex;
  padding: 30px;
  height: 40vh;
  width: auto;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
}

.flex-offer > div {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.4);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 10px;
  padding: 40px;
  font-size: 30px;
}

.offer-box h4 {
  text-align: center;
  margin: 0 0 15px 0;
}

.offer-box p {
  text-align: center;
}

@media only screen and (min-width: 1920px) {
  #offer-section {
    height: 40vh;
  }
  .flex-offer {
    height: 30vh;
  }
  #offer-mobile {
    display: none;
  }
}

@media only screen and (min-width: 1400px) and (max-width: 1919px) {
  .flex-offer {
    height: 33vh;
    padding: 50px;
  }
  #offer-mobile {
    display: none;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1399px) {
  .flex-offer {
    height: 25vh;
    width: auto;
    padding: 50px;
  }
  .offer-heading {
    margin: 20px auto;
    text-align: center;
  }
  .offer-heading {
    margin: 0 0 30px 0;
  }
  #offer-mobile {
    display: none;
  }
}

@media only screen and (max-width: 450px) and (min-width: 100px) {
  .offer-heading {
    margin: 0 auto;
  }
  #offer-section {
    display: none;
  }
}

/*Food Items Section*/
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

.menu-item img {
  width: 100%;
  height: auto;
  border-radius: 20%;
}

.order {
  justify-content: space-between;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin: 8px 0;
  text-align: center;
}

@media only screen and (max-width: 450px) and (min-width: 100px) {
  .restaurant-menu {
    grid-template-columns: repeat(1, 1fr);
  }
}

/* Resturant Details */
#res-del {
  margin: 30px auto;
  width: 70%;
  height: auto;
  background: rgba(202, 198, 198, 0.5);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-family: "Montserrat", sans-serif;
}

.container-res-flex {
  display: flex;
  padding: 10px;
}

.container-res-flex img {
  width: 25%;
  height: auto;
  border-radius: 16px;
}

.res-right {
  margin-top: 0.8rem;
}

.container-res-flex h2,
h3,
p {
  margin: 0 6rem;
}

@media only screen and (max-width: 450px) and (min-width: 100px) {
  #res-del {
    margin: 20px auto;
  }
  .container-res-flex img {
    width: 100%;
    height: auto;
    border-radius: 16px;
    margin: 0 auto;
  }
  .container-res-flex {
    flex-direction: column;
    padding: 10px;
  }
  .container-res-flex h2,
  h3,
  p {
    margin: 0 2rem;
  }
}

/* Footer */

.main-footer {
  margin-top: 40px;
  padding: 70px 0;
  display: flex;
  justify-content: space-evenly;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: "Montserrat", sans-serif;
}

.main-footer ul {
  list-style: none;
}

.main-footer h1 {
  font-size: 25px;
  line-height: 117%;
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 500;
}

.main-footer h2 {
  color: #ffffff;
  font-weight: 500;
}

.main-footer ul li a {
  color: #ffffff;
  text-decoration: none;
}

footer {
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-top: 2px solid #ffffff;
  font-size: 20px;
  padding: 15px 5px;
  color: #ffffff;
  text-align: center;
}

footer a {
  text-decoration: none;
  color: #ffffff;
}

.logoinfo p {
  color: #ffffff;
  font-size: 20px;
  margin-top: 5px;
}

.contact-details {
  margin-top: 22px;
}

.contact-details li {
  list-style: none;
  margin: 10px 0;
}

.contact-details li a {
  text-decoration: none;
  color: #ffffff;
}

.contact-details .fa {
  color: #ffffff;
  margin-right: 10px;
}

.sociallogos {
  padding: 20px 0;
}

.sociallogos .logobox a {
  padding: 0 10px;
  text-decoration: none;
  color: #ffffff;
  font-size: 30px;
}

.mdi-instagram:hover {
  color: #e1306c;
}

.mdi-linkedin:hover {
  color: #0a66c2;
}

.mdi-facebook:hover {
  color: #3b5998;
}

.com ul li {
  padding: 5px 0;
  font-size: 20px;
}

@media only screen and (max-width: 749px) {
  .main-footer {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .info {
    padding: 20px 0;
  }
}

@media (max-width: 480px) {
  .main-footer {
    grid-template-columns: 1fr;
  }
  .sociallogos {
    padding: 20px 0;
  }
  .com {
    padding: 20px 0;
  }
}
</style>
