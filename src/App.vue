<template>
  <v-app id="app">
    <v-card >
    <v-app-bar
      absolute
      color="indigo darken-2"
      dark
      shrink-on-scroll
      prominent
      scroll-target="#scrolling-techniques"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      

      <v-app-bar-title>Title</v-app-bar-title>
      

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques"
      class="overflow-y-auto"
      max-height="1000"
    >
      <v-container style="height: 1000px;"><h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo porro cumque tempore id voluptas debitis animi? Dolore porro soluta magni, quisquam cupiditate molestiae ad consequatur dolores voluptatibus cumque quas doloribus, pariatur eos ipsum voluptatem obcaecati iusto iure! Accusantium placeat ipsum illo tenetur perspiciatis voluptates ipsa blanditiis hic, natus quaerat expedita iste eaque commodi fuga autem quos a consequatur dolore unde. Amet culpa at ipsam rem eum, officia veritatis eaque ipsum beatae voluptatibus vero, laborum iste quas sit voluptatem sed? Iste, corporis obcaecati nam consectetur distinctio eaque unde odit quos fuga molestiae, reiciendis atque molestias quis quisquam voluptatibus a. Soluta, debitis? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore fugiat enim et ad earum velit unde alias incidunt quis inventore voluptatum accusantium veniam assumenda, tempora fugit nam sapiente animi omnis quaerat voluptate esse reiciendis numquam perspiciatis quam? Quaerat eos quia cupiditate in magni asperiores officia magnam similique, tempore hic sequi error maiores soluta assumenda nihil sapiente, amet, velit aut? Ad perspiciatis alias blanditiis quibusdam doloribus, a magni fugit aperiam molestias dolores repellat asperiores tempora minima. Ullam sit excepturi aliquam rerum ea soluta dolore enim laboriosam, commodi, quaerat hic cupiditate nobis magnam fugiat velit. Nisi tempora nobis aspernatur, reiciendis saepe libero itaque nam corrupti quam sit distinctio quos quia, enim eligendi reprehenderit earum doloremque, a suscipit. Neque rerum, alias praesentium tempora placeat, vel rem expedita omnis quo accusamus assumenda veritatis minus obcaecati fuga nostrum, reprehenderit facilis nisi ratione libero pariatur dolor sequi. Repellat eum quas sequi voluptates totam eaque magnam cupiditate soluta omnis. Eaque officiis voluptates ipsum asperiores. Itaque temporibus aspernatur impedit, enim mollitia voluptas esse ea facere sunt quae neque fuga, alias ipsum harum facilis dignissimos veniam consequuntur porro. Saepe commodi itaque repudiandae, voluptatum iure dolores quod labore distinctio numquam molestiae in corporis nobis eos ex quaerat! Exercitationem sequi omnis, molestiae amet error sed dolores eius, mollitia officia eligendi neque iusto optio pariatur, natus debitis tempora velit cumque laborum tenetur minima minus? Sit, libero? Nulla numquam quia vel rerum labore sequi possimus dolorum, aliquid quas perferendis pariatur obcaecati nihil. Sint quam et rerum nesciunt tempore dolorum voluptate nisi iure! Sit commodi quidem aliquid repudiandae fugit ex fuga facere assumenda cupiditate eveniet suscipit dicta pariatur obcaecati ullam cumque, quae eaque eos numquam unde reprehenderit quo molestiae? Atque excepturi officia sunt eaque aut tenetur commodi vero error enim saepe suscipit corrupti in qui tempora perspiciatis eveniet, maiores quidem quisquam sequi recusandae minus? Voluptate necessitatibus fugiat id rerum ipsa tempora, ullam vero labore sequi, non facere eius vitae quisquam quis tempore nostrum nulla, placeat repudiandae voluptatum. Ipsam dignissimos inventore repudiandae porro beatae, harum mollitia ratione libero, quibusdam nam, tenetur aut nulla officia blanditiis ab voluptatum dicta nobis. Necessitatibus, minus! Enim, et asperiores excepturi quaerat incidunt quam ad earum quia eum deleniti quidem magnam quis. Sapiente est consectetur debitis, placeat ipsam eaque alias hic culpa quidem laboriosam sunt dolores asperiores itaque blanditiis minima modi maiores ipsum voluptates nemo cumque provident expedita! Culpa reiciendis impedit sed quibusdam doloribus inventore incidunt nobis exercitationem, tenetur, quia laboriosam repellendus voluptas odio saepe? Deleniti dolorum consequatur cum corrupti veniam dolor quae obcaecati eos temporibus sunt, explicabo et vitae recusandae voluptatum mollitia laboriosam atque libero? Molestias, tempora. Sed autem delectus atque consectetur temporibus sunt provident. Delectus facilis eum quia eius, molestias fuga sed esse quisquam. Placeat tempore atque non ab sint possimus aut sit fugit debitis id animi alias, libero vitae, quidem quae, vel tempora dicta. Necessitatibus similique, excepturi fugiat quia, libero aperiam eum est dolor impedit voluptatum doloremque nobis exercitationem id incidunt quam voluptatibus modi vel vero reiciendis amet? Est exercitationem harum dignissimos saepe facilis voluptate, quod laborum voluptatibus.</h2></v-container>
    </v-sheet>
  </v-card>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
