<template>
    <div class="backgroud">
        <div style="width: 75%;">
            <h2 style="margin-left: 20px;float: left;">雪豹作业管理系统</h2>
        </div>
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 style="float: right"
                 v-if="this.type==='1'">
            <el-menu-item index="1" @click="toHomePage">首页</el-menu-item>
            <el-submenu index="3">
                <template slot="title">欢迎您! {{name}}学委</template>
                <el-menu-item index="3-1" @click="Exit">退出</el-menu-item>
            </el-submenu>
        </el-menu>

        <el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 style="float: right;width: 300px"
                 v-if="this.type==='2'">
            <el-menu-item index="1" @click="toHomePage">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">欢迎您! {{name}}同学</template>
                <el-menu-item index="2-1" @click="Exit">退出</el-menu-item>
            </el-submenu>
        </el-menu>

    </div>
</template>

<script>
    import API from "../api";
    import Pro from '../api/API_PRO';
    import Cookies from 'js-cookie';

    export default {
        name: "myTitle",
        props: {
            activeIndex: {
                type: String
            }
        },
        data() {
            return {
                name: Cookies.get('userAccount'),
                type: Cookies.get('type'),
                //type: '1',
            }
        },

        methods: {
            toHomePage() {
                if(this.type==='1'){
                    this.$router.push({path: `/teacher`});
                }else{
                    this.$router.push({path: `/student`});
                }
            },
            toAddstudent() {
                this.$router.push({path: `/teacher/addStudent`});
            },

            Exit() {
                this.$router.push({path: '/'})
            },
        }
    }
</script>

<style scoped>
    .backgroud {
        width: 100%;
        min-width: 1000px;
        height: 80px;
        display: flex;
        align-items: center;
        background-color: #e8e9fc;
    }

    >>> .el-menu {
        background-color: transparent;
    }

    >>> .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover, .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus {
        background-color: transparent;
    }

</style>