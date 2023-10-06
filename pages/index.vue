<template>
    <div>
        <div style="position: fixed;width: 100%; height: 100%;left:0;top:0; z-index: -1; overflow: hidden">
            <img style="width: 100%;" src="../assets/digitalCityMin.png" alt="背景图片">
        </div>
        <el-tabs class="card" type="border-card">
            <el-tab-pane label="用户登录">
                <p class="title">
                    雪豹作业提交系统
                </p>
                <el-form :model="login_module" :rules="loginRule" label-width="100px" label-position="left">
                    <el-form-item label="学号" prop="userAccount">
                        <el-input v-model="login_module.userAccount" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPassword">
                        <el-input v-model="login_module.userPassword" style="width: 250px" show-password></el-input>
                    </el-form-item>
                    <div style="margin-left: 100px;margin-bottom: 20px">
                        <el-radio v-model="type" label="xuebao">学委</el-radio>
                        <el-radio v-model="type" label="2">学生</el-radio>
                    </div>
                </el-form>
                <div style="text-align: center">
                    <el-button type="primary" @click="submitForm" size="medium">登录</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="用户注册">
                <el-form :model="register_module" :rules="registerRule" label-width="100px" label-position="left">
                    <el-form-item label="姓名">
                        <el-input v-model="register_module.userName" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                        <el-input v-model="register_module.userAccount" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="register_module.userPassword" type="userPassword"
                                  style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="二次确认密码" prop="confirmPsw">
                        <el-input v-model="register_module.checkPassword" type="checkPassword"
                                  style="width: 250px"></el-input>
                    </el-form-item>
                    <div style="margin-left: 100px;margin-bottom: 20px">
                        <el-radio v-model="type" label="xuebao">学委</el-radio>
                        <el-radio v-model="type" label="2">学生</el-radio>
                    </div>
                </el-form>
                <div style="text-align: center">
                    <el-button @click="registerUser" type="primary" size="medium">注册</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="footer">
            <p>
                ©2023 5S115 出品<br/>
            </p>
            <p>
                一个方便雪豹收集作业的作业提交系统<br/>
            </p>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import API from "../api";
    import qs from "qs";

    export default {

        data() {
            let validateRepeatPassword = (rule, value, cb) => {
                console.log(value);
                if (value !== this.register_module.userPassword) {
                    cb(new Error('两次输入密码不一致!'))
                } else {
                    cb()
                }
            };
            return {
                login_module: {
                    userAccount: '',
                    userPassword: '',
                },
                register_module: {
                    userName: '',
                    userAccount: '',
                    userPassword: '',
                    checkPassword: ''
                },
                loginRule: {
                    userAccount: [
                        {required: true, message: '请输入学号', trigger: 'blur'}
                    ],
                    userPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                registerRule: {
                    registerPsw: [
                        {validate: validateRepeatPassword, trigger: 'blur'}
                    ]
                },
                type: '1',
            }
        },

        mounted() {

        },

        methods: {
            submitForm() {
                if (this.type === 'xuebao') {
                    let data = {
                        userAccount: this.login_module.userAccount,
                        userPassword: this.login_module.userPassword,
                        type: this.type
                    };
                    // data = qs.stringify(data);
                    API.teacherLogin(data).then(res => {
                        if (res.code==40000) { // 如果存在错误代码，说明登录失败
                            let errorMsg = "";
                            switch (res.code) {
                                case 40000: // 输入的学号有误
                                    errorMsg = res.description;
                                    break;
                                // 在这里添加更多的错误代码和对应的错误处理逻辑
                                default: // 未知的错误代码
                                    errorMsg = res.message;
                                    break;
                            }
                            alert(errorMsg); // 显示错误消息
                            return; // 停止执行后续的代码
                        }
                        Cookies.set("userAccount", this.login_module.userAccount);
                        Cookies.set("userName", res);
                        Cookies.set("type", '1');
                        this.$router.push({path: '/teacher'});
                    }).catch(msg => {
                        alert(msg)
                    })
                } else {
                    let data = {
                        userAccount: this.login_module.userAccount,
                        userPassword: this.login_module.userPassword,
                        type: this.type
                    };
                    // data = qs.stringify(data);
                    API.studentLogin(data).then(res => {
                        if (res.code==40000) { // 如果存在错误代码，说明登录失败
                            let errorMsg = "";
                            switch (res.code) {
                                case 40000: // 输入的学号有误
                                    errorMsg = res.description;
                                    break;
                                // 在这里添加更多的错误代码和对应的错误处理逻辑
                                default: // 未知的错误代码
                                    errorMsg = res.message;
                                    break;
                            }
                            alert(errorMsg); // 显示错误消息
                            return; // 停止执行后续的代码
                        }
                        Cookies.set("userAccount", this.login_module.userAccount);
                        Cookies.set("userName", res);
                        Cookies.set("type", '2');
                        this.$router.push({path: '/student'});
                    }).catch(msg => {
                        alert(msg)
                    })
                }
            },
            registerUser: function () {
                if (this.type === 'xuebao') {
                    let data = {
                        userAccount: this.register_module.userAccount,
                        userName: this.register_module.userName,
                        userPassword: this.register_module.userPassword,
                        checkPassword: this.register_module.checkPassword
                    };
                    //data = qs.stringify(data);
                    API.teacherReg(data).then(res => {
                        if (res.code==40000) { // 如果存在错误代码，说明登录失败
                            let errorMsg = "";
                            switch (res.code) {
                                case 40000: // 输入的学号有误
                                    errorMsg = res.description;
                                    break;
                                // 在这里添加更多的错误代码和对应的错误处理逻辑
                                default: // 未知的错误代码
                                    errorMsg = res.message;
                                    break;
                            }
                            alert(errorMsg); // 显示错误消息
                            return; // 停止执行后续的代码
                        }
                        alert("注册成功，请登录");
                    }).catch(msg => {
                        alert(msg)
                    })
                } else {
                    let data = {
                        userAccount: this.register_module.userAccount,
                        userName: this.register_module.userName,
                        userPassword: this.register_module.userPassword,
                        checkPassword: this.register_module.checkPassword
                    };
                    //data = qs.stringify(data);
                    API.studentReg(data).then(res => {
                        if (res.code==40000) { // 如果存在错误代码，说明登录失败
                            let errorMsg = "";
                            switch (res.code) {
                                case 40000: // 输入的学号有误
                                    errorMsg = res.description;
                                    break;
                                // 在这里添加更多的错误代码和对应的错误处理逻辑
                                default: // 未知的错误代码
                                    errorMsg = res.message;
                                    break;
                            }
                            alert(errorMsg); // 显示错误消息
                            return; // 停止执行后续的代码
                        }
                        alert("注册成功，请登录");
                    }).catch(msg => {
                        alert(msg)
                    })
                }

            }
        },

    }
</script>

<style scoped>
    .title {
        font-size: 1.8rem;
        text-align: center;
    }

    .card {
        width: 30rem;
        min-height: 15rem;
        margin: 10% auto;
        border-radius: 10px;
    }
    .footer {
        position: relative;
        text-align: center;
        color: #ccc;
    }

</style>

