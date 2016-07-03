/**
 * Created by Jaylen on 16/7/2.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './components/app.vue'

Vue.use(VueRouter);
Vue.use(VueResource);
export var router = new VueRouter();
Vue.http.options.emulateJSON = true;

Vue.filter('name', function (val) {
    return val.map(function (item) {
        return item.name;
    }).join('、');
});

router.map({
    '/index': {
        component(resolve){
            require(['./components/index.vue'],resolve)
        }
    },
    '/in_theaters': {
        component(resolve){
            require(['./components/template.vue'],resolve)
        }
    },
    '/coming_soon': {
        component(resolve){
            require(['./components/template.vue'],resolve)
        }
    },
    '/top250': {
        component(resolve){
            require(['./components/template.vue'],resolve)
        }
    },
    '/subject/:id': {
        component(resolve){
            require(['./components/details.vue'],resolve)
        }
    },
    '/search': {
        component(resolve){
            require(['./components/template.vue'],resolve)
        }
    }
});
router.redirect({
   '*':  '/index'
});

router.start(App,"#app");

