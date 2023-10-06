<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加学生</span>
        </div>
        <el-form :label-position="'120px'" label-width="80px" :model="form">
            <el-form-item label="学号">
                <el-input v-model="form.sid"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.sName"></el-input>
            </el-form-item>
        </el-form>

        <el-button type="primary" style="float: right;margin-right: 30px;margin-bottom: 20px" @click="addStudent">添加</el-button>

    </el-card>
</template>

<script>
    import API from "../api";
    import qs from "qs";
    export default {
        name: "add",
        data(){
            return{
                form:{
                    sid:'',
                    sName:'',
                }
            }
        },

        methods:{
            addStudent(){
                let data = {
                    sid:parseInt(this.form.sid),
                    sName: this.form.sName,
                    sPassword: "123456"
                };
                data = qs.stringify(data);
                API.studentReg(data).then(res=>{
                    if(res==='Fail insert'){
                        alert("添加失败");
                        return;
                    }
                    alert("添加成功，请刷新");
                }).catch(msg=>{
                    alert(msg);
                })
            }
        }

    }
</script>

<style scoped>

</style>