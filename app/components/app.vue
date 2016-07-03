<template>
    <div>
        <!--头部start-->
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">鸡冷的电影院</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li :class="{'active':$route.path === '/index'}"><a v-link="{path: '/index'}">首页</a></li>
                        <li :class="{'active':$route.path === '/in_theaters'}"><a v-link="{path: '/in_theaters'}">正在热映</a></li>
                        <li :class="{'active':$route.path === '/coming_soon'}"><a v-link="{path: '/coming_soon'}">即将上映</a></li>
                        <li :class="{'active':$route.path === '/top250'}"><a v-link="{path: '/top250'}">Top 250</a></li>
                    </ul>
                    <form class="navbar-form navbar-right" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="电影搜索" v-model="search">
                        </div>
                        <button type="submit" class="btn btn-default" @click="searchMovie">搜索</button>
                    </form>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <!--头部end-->

        <!--路由部分-->
        <main>
            <router-view></router-view>
        </main>
        <!---->

        <!---->

        <!--分页-->
    </div>
</template>
<script>
    import {router} from '../main'
    export default {
        data: function () {
            return {
                search: ''
            }
        },
        methods: {
            searchMovie: function () {
                if(this.search.trim()!==''){
                    router.go('/search?q='+this.search)
                }
            }
        }
    }
</script>
