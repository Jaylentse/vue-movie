<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" v-for="movie in movies.subjects">
                <a v-link="'/subject/'+movie.id">
                    <div class="thumbnail">
                        <img :src="movie.images.large" :alt="movie.title">
                        <div class="caption">
                            <h5>{{movie.title}} <span class="badge">{{movie.rating.average}}分</span></h5>
                            <div class="sort">
                                <a v-link="'/search?tag='+info" v-for="info in movie.genres">
                                    <span class="label label-primary">{{info}}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

        </div>
        <nav class="clearfix" v-show="!$loadingRouteData">
            <ul class="pagination pagination-lg">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in pages" :class="{'active': $index==(start/20)}">
                    <a class="page-link" href="#" v-link="path +'?start='+$index*20+'&count=20'">{{page}}</a></li>
                <li>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="mask" v-show="$loadingRouteData">
            <div class="loader">
                <div class="loader-inner pacman" >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
    <!--<p>test</p>-->
</template>
<script>
    window.onscroll = function () {
        var mask = document.getElementsByClassName('mask')[0]
        if(document.body.scrollTop>50){
            mask.style.top = '0';
        }else {
            mask.style.top = '50px'
        }
    };
    export default {
        route:{
            data(transition){

                return this.$http.jsonp(`http://api.douban.com/v2/movie${transition.to.path}`).then((response)=>{
                    return {
                        movies: response.json(),
                        total: response.json().total,
                        start: response.json().start
                    }
                });
            }
        },
        data(){
            return {
                movies: {},
                total: 0,
                start: 0
            }
        },
        computed: {
            pages: function () {
                let p = [];
                for(let i=0;i<Math.ceil(this.total/20);i++){
                    p.push(i+1)
                }
                return p;
            },
            path: function () {
                return this.$route.path.replace(/\?.+/,'')
            }
        }
    }
</script>
<style scoped>
    .label{
        margin-left: 5px;
    }
    .thumbnail{
        transition: all .5s ease;
        position: relative;

    }
    .thumbnail:hover {
        transform: translate(2px,-2px);
        box-shadow: -5px 5px 2px #f0f0f0;
    }
    .thumbnail img {
        width: 100%;
        max-height: 380px;
        cursor: pointer;
    }
    h5{
        width: 70%;
    }
    .badge{
        position: absolute;
        right: 5px;
        background-color: orangered;
    }
    .sort{
        position: absolute;
        bottom: 15px;
        left: 5px;
    }
    @media screen and (min-width: 1170px){
        .thumbnail{
            height: 458px;
        }
    }
    @media screen and (min-width: 992px) and (max-width: 1169px){
        .thumbnail{
            height: 392px;
        }
    }
    @media screen and (min-width: 768px) and (max-width: 991px){
        .thumbnail{
            height: 400px;
        }
    }
    @media screen and (max-width: 767px){
        .sort{
            position: static;
        }
    }
    .mask {
        position: fixed;
        top: 50px;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
    }
    .loader{
        position: absolute;
        width: 250px;
        height: 200px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }

    @-webkit-keyframes rotate_pacman_half_up {
        0% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg); }

        50% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg); }

        100% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg); } }

    @keyframes rotate_pacman_half_up {
        0% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg); }

        50% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg); }

        100% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg); } }

    @-webkit-keyframes rotate_pacman_half_down {
        0% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg); }

        50% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }

        100% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg); } }

    @keyframes rotate_pacman_half_down {
        0% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg); }

        50% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }

        100% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg); } }

    @-webkit-keyframes pacman-balls {
        75% {
            opacity: 0.7; }

        100% {
            -webkit-transform: translate(-100px, -6.25px);
            transform: translate(-100px, -6.25px); } }

    @keyframes pacman-balls {
        75% {
            opacity: 0.7; }

        100% {
            -webkit-transform: translate(-100px, -6.25px);
            transform: translate(-100px, -6.25px); } }

    .pacman {
        position: relative; }
    .pacman > div:nth-child(2) {
        -webkit-animation: pacman-balls 1s 0s infinite linear;
        animation: pacman-balls 1s 0s infinite linear; }
    .pacman > div:nth-child(3) {
        -webkit-animation: pacman-balls 1s 0.33s infinite linear;
        animation: pacman-balls 1s 0.33s infinite linear; }
    .pacman > div:nth-child(4) {
        -webkit-animation: pacman-balls 1s 0.66s infinite linear;
        animation: pacman-balls 1s 0.66s infinite linear; }
    .pacman > div:nth-child(5) {
        -webkit-animation: pacman-balls 1s 0.99s infinite linear;
        animation: pacman-balls 1s 0.99s infinite linear; }
    .pacman > div:first-of-type {
        width: 0px;
        height: 0px;
        border-right: 25px solid transparent;
        border-top: 25px solid #fff;
        border-left: 25px solid #fff;
        border-bottom: 25px solid #fff;
        border-radius: 25px;
        -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
        animation: rotate_pacman_half_up 0.5s 0s infinite; }
    .pacman > div:nth-child(2) {
        width: 0px;
        height: 0px;
        border-right: 25px solid transparent;
        border-top: 25px solid #fff;
        border-left: 25px solid #fff;
        border-bottom: 25px solid #fff;
        border-radius: 25px;
        -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
        animation: rotate_pacman_half_down 0.5s 0s infinite;
        margin-top: -50px; }
    .pacman > div:nth-child(3), .pacman > div:nth-child(4), .pacman > div:nth-child(5), .pacman > div:nth-child(6) {
        background-color: #fff;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        width: 10px;
        height: 10px;
        position: absolute;
        -webkit-transform: translate(0, -6.25px);
        -ms-transform: translate(0, -6.25px);
        transform: translate(0, -6.25px);
        top: 25px;
        left: 100px; }

    .pagination{
        float: right;
    }
</style>
