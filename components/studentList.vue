<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>学生列表</span>
        </div>

        <div style="display: table;width: 100%">
            <div style="display: table-row">
                <div class="tableTitle">
                    序号
                </div>
                <div class="tableTitle">
                    学号
                </div>
                <div class="tableTitle">
                    姓名
                </div>
            </div>
            <div
                    :class="{'grayLine': (index % 2 === 0)}"
                    style="display: table-row;"
                    v-for="(item, index) in studentList"
                    :key="item.id">
                <div class="tableCell">
                    {{index+1}}
                </div>
                <div class="tableCell">
                    {{item.sid}}
                </div>
                <div class="tableCell">
                    {{item.sName}}
                </div>
            </div>

        </div>

    </el-card>
</template>

<script>
    import API from "../api";
    export default {
        name: "studentList",
        data(){
            return{
                studentList:[],
            }
        },

        mounted(){
            this.getStudentList();
        },

        methods:{
            getStudentList(){
                let data={
                };
                API.getStuList(data).then(res=>{
                    this.studentList=res;
                }).catch(msg=>{
                    alert(msg);
                });
            }
        }
    }
</script>

<style scoped>
    .tableTitle{
        display: table-cell;
        text-align: center;
        font-size: 15px;
        padding: 5px;
        color: gray;
    }

    .tableCell{
        display: table-cell;
        text-align: center;
        font-size: 15px;
        padding: 20px 10px;
    }

    .grayLine{
        background-color: #f5f5f5;
    }
</style>