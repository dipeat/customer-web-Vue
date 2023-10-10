import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{
        options: {
            customProperties: true,
        },
        themes:{
            light:{
                primary:'#7B46B1',
            },
            // dark:{
            //     primary:'black'
            // }
        }
    }
});
