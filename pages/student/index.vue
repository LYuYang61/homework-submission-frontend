<template>
    <div style="background-color: #dededf">
        <my-title :active-index="'1'"></my-title>
        <div style="min-height: 650px">
            <el-card style="margin-left: 2%;width: 95%;margin-top: 20px;float: left">
                <div style="display: table;width: 100%">
                    <div style="display: table-row">
                        <div class="tableTitle">
                            序号
                        </div>
                        <div class="tableTitle">
                            作业名称
                        </div>
                        <div class="tableTitle">
                            作业内容
                        </div>
                        <div class="tableCell">
                            文件类型
                        </div>
                        <div class="tableTitle">
                            截止时间
                        </div>
                        <div class="tableTitle">
                        </div>
                    </div>
                    <div
                            :class="{'grayLine': (index % 2 === 0)}"
                            style="display: table-row;"
                            v-for="(item, index) in homeworkList"
                            :key="item.id">
                        <div class="tableCell">
                            {{index+1}}
                        </div>
                        <div class="tableCell">
                            {{item.homeworkTitle}}
                        </div>
                        <div class="tableCell">
                            {{item.homeworkComment}}
                        </div>
                        <div class="tableCell">
                            {{item.fileType}}
                        </div>
                        <div class="tableCell">
                            {{item.endTime | formatDate}}
                        </div>
                        <div class="tableCell">
                            <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="submitHomework(item)"></el-button>

<!--                            <p v-if="item.isStart===false">作业暂未开始</p>-->
<!--                            <p v-if="isAfter()">作业提交结束</p>-->
                        </div>
                    </div>

                </div>
            </el-card>

            <el-dialog title="提交作业" :visible.sync="submitVisible">
                <el-form :model="form1">
                    <el-form-item label="作业名称" :label-width="'120px'">
                        <el-input v-model="form.homeworkTitle" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="作业内容" :label-width="'120px'">
                        <el-input v-model="form.homeworkComment" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="提交作业" :label-width="'120px'">
                        <el-upload
                                class="upload"
                                drag
                                action="http://localhost:8081/homework/submit"
                                show-file-list
                                :before-upload="submit"
                                :accept="uploadAccept"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
<!--                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="submitVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="更新作业" :visible.sync="updateVisible">
                <el-form :model="form1">
                    <el-form-item label="作业序号" :label-width="'120px'">
                        <el-input v-model="form1.homeworkId" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="修改作业" :label-width="'120px'">
                        <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="form1.homework_content"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </div>
            </el-dialog>

            <my-footer style="bottom: 0;position: absolute;z-index: 999;"></my-footer>
        </div>
    </div>
</template>

<script>
    import API from "../../api";
    import Cookies from 'js-cookie'
    import qs from "qs";
    import MyTitle from "../../components/myTitle";
    import MyFooter from "../../components/myFooter";
    import moment from 'moment'


    export default {
        name: "index",
        components: {MyFooter, MyTitle},
        filters:{
            formatDate(value){
                if(value){
                    return moment(String(value)).format("YYYY/MM/DD hh:mm")
                }
            }
        },
        data(){
            return{
                userAccount:Cookies.get('userAccount'),
                homeworkList:[],
                myHomeworkList:[],
                submitVisible:false,
                updateVisible:false,
                certainId:0,
                uploadAccept:"",
                form:{
                    homeworkID:0,
                    homeworkTitle:'',
                    homeworkComment:'',
                    homework_content:"",
                    fileType: "",
                },
                form1:{
                    homeworkID:0,
                    homework_content:"",
                }
            }
        },

        mounted(){
            this.getHomeworkList();
            this.getMyHomeworkList();
        },

        methods:{
            getHomeworkList(){
                let data = {
                    userAccount: parseInt(this.userAccount),
                };
                API.tHomeworkList(data).then(res=>{
                    console.log(res);
                    this.homeworkList=res.data; // 注意这里改成 res.data
                    if(this.homeworkList.length!==0){
                        this.homeworkList.forEach(item=>{
                            item.hstart= new Date(item.startTime * 1000).toLocaleDateString();
                            item.hddl= new Date(item.endTime * 1000).toLocaleDateString();
                        })
                    }
                }).catch(msg=>{
                    alert(msg);
                })
            },

            submitHomework: function (item) {
                this.form.homeworkID = item.homeworkID;
                this.form.homeworkTitle = item.homeworkTitle;
                this.form.homeworkComment = item.homeworkComment;
                this.form.fileType = item.fileType;
                this.submitVisible = true;
                if(item.fileType === 'ANY'){
                    this.uploadAccept = ".";
                }else if(item.fileType === 'DOC'){
                    this.uploadAccept = ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                }else if(item.fileType === 'PDF'){
                    this.uploadAccept = ".pdf,application/pdf";
                }else if(item.fileType === 'DOC&PDF'){
                    this.uploadAccept = ".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf";
                }else if(item.fileType === 'ZIP'){
                    this.uploadAccept = ".zip,.rar,application/zip,application/x-rar-compressed";
                }
            },

            submit(file){
                let data = new FormData();
                console.log("userAccount" + this.userAccount)
                data.append('userAccount', this.userAccount);
                data.append('homeworkID', this.form.homeworkID);
                data.append('uploadFile', file);
                API.submitSHom(data).then(res=>{
                    if(res.data===true){
                        alert("提交作业成功");
                        this.form.homework_content="";
                        this.getMyHomeworkList();
                    }else{
                        alert("提交作业失败，文件请以自己的学号开头命名");
                    }
                    this.submitVisible=false;
                }).catch(msg=>{
                    alert(msg);
                });
                // 阻止Upload组件的默认上传行为
                return false;
            },

            getMyHomeworkList(){
                let data = {
                    userAccount: parseInt(this.userAccount),
                };
                API.tHomeworkList(data).then(res=>{
                    console.log(res);
                    this.homeworkList=res.data; // 注意这里改成 res.data
                    if(this.homeworkList.length!==0){
                        this.homeworkList.forEach(item=>{
                            item.hstart= new Date(item.startTime * 1000).toLocaleDateString();
                            item.hddl= new Date(item.endTime * 1000).toLocaleDateString();
                        })
                    }
                }).catch(msg=>{
                    alert(msg);
                })
            },

            updateHomework(item){
                this.form1.homeworkID=item.homeworkID;
                this.form1.homework_content=item.homework_content;
                this.certainId=item.id;
                this.updateVisible=true;
            },

            update(){
                let data = {
                    id:parseInt(this.certainId),
                    homework_content:this.form1.homework_content,
                    update_time: Math.round(new Date().getTime()/1000) ,
                };
                data = qs.stringify(data);
                API.updateSHome(data).then(res=>{
                    if(res==='Successful update'){
                        alert("修改作业成功");
                        this.getMyHomeworkList();
                    }else{
                        alert("修改作业失败");
                    }
                    this.updateVisible=false;
                }).catch(msg=>{
                    alert(msg);
                })
            },


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