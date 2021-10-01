import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faEdit, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import capitalizeFilter from "./common/capitalize.filter";
import store from "./store/index";
import ApiService from "./common/api.service";

library.add(faEdit);
library.add(faTrash);
library.add(faStar);

ApiService.init();
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.filter("capitalize", capitalizeFilter);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
