<template>
    <div style="background-color: #dededf">
        <my-title :active-index="'1'"></my-title>
        <div style="min-height: 650px">
            <el-card style="margin: auto;width: 95%;margin-top: 20px">
                <el-button type="success" style="float: right;margin-right: 20px;margin-bottom: 10px" @click="newHomeworkVisible=true">添加作业</el-button>
                <div style="display: table;width: 100%">
                    <div style="display: table-row">
                        <div class="tableTitle">
                            序号
                        </div>
                        <div class="tableTitle" style="width: 200px">
                            作业名称
                        </div>
                        <div class="tableTitle" style="width: 300px">
                            作业内容
                        </div>
                        <div class="tableTitle">
                            文件类型
                        </div>
                        <div class="tableTitle" style="width: 125px">
                            截止时间
                        </div>
                        <div class="tableTitle">
                        </div>
                        <div class="tableTitle">
                        </div>
                        <div class="tableTitle">
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
                            <el-button size="mini" type="primary" @click="updateHomework(item)">修改</el-button>
                        </div>
                        <div class="tableCell">
                            <el-button size="mini" type="primary" @click="delH(item.homeworkID)">删除</el-button>
                        </div>
                        <div class="tableCell">
                            <el-button size="mini" type="primary" @click="checkHomeworkList(item.homeworkID, item.homeworkTitle)">查看未提交</el-button>
                        </div>
                        <div class="tableCell">
                            <el-button size="mini" type="primary" @click="download(item)">下载</el-button>
                        </div>
                    </div>

                </div>
            </el-card>

            <el-dialog
                    title="提示"
                    :visible.sync="deleteVisible"
                    width="30%">
                <span>确定删除该作业吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteHomework">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog :title="nowHomeworkTitle" :visible.sync="showHomeworkList">
                <div style="display: table;width: 100%">
                    <div style="display: table-row">
                        <div class="tableTitle">
                            序号
                        </div>
                        <div class="tableTitle">
                            学生学号
                        </div>
                        <div class="tableTitle" style="width: 200px">
                            学生姓名
                        </div>
                    </div>
                    <div
                            :class="{'grayLine': (index % 2 === 0)}"
                            style="display: table-row;"
                            v-for="(item, index) in studentHomeworkList"
                            :key="item.id">
                        <div class="tableCell">
                            {{index+1}}
                        </div>
                        <div class="tableCell">
                            {{item.userAccount}}
                        </div>
                        <div class="tableCell">
                            {{item.userName}}
                        </div>
                    </div>

                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showHomeworkList = false">取 消</el-button>
                    <el-button type="primary" @click="showHomeworkList = false">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="添加作业" :visible.sync="newHomeworkVisible">
                <el-form :model="newHomework">
                    <el-form-item label="作业标题" :label-width="'120px'">
                        <el-input v-model="newHomework.homeworkTitle" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="作业内容" :label-width="'120px'">
                        <el-input v-model="newHomework.homeworkComment" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="提交文件类型" :label-width="'120px'">
                        <el-radio-group v-model="newHomework.fileType">
                            <el-radio-button label="ANY">ANY</el-radio-button>
                            <el-radio-button label="DOC">DOC</el-radio-button>
                            <el-radio-button label="PDF">PDF</el-radio-button>
                            <el-radio-button label="DOC&PDF">DOC&PDF</el-radio-button>
                            <el-radio-button lebel="ZIP">ZIP</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="时间范围" :label-width="'120px'">
                        <el-date-picker
                                v-model="newHomework.time"
                                type="datetime"
                                placeholder="选择截止时间">
                        </el-date-picker>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="newHomeworkVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addHomework">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改作业" :visible.sync="updateHomeworkVisible">
                <el-form :model="newHomework">
                    <el-form-item label="作业标题" :label-width="'120px'">
                        <el-input v-model="newHomework.homeworkTitle" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="作业内容" :label-width="'120px'">
                        <el-input v-model="newHomework.homeworkComment" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="提交文件类型" :label-width="'120px'">
                        <el-radio-group v-model="newHomework.fileType">
                            <el-radio-button label="ANY">ANY</el-radio-button>
                            <el-radio-button label="DOC">DOC</el-radio-button>
                            <el-radio-button label="PDF">PDF</el-radio-button>
                            <el-radio-button label="DOC&PDF">DOC&PDF</el-radio-button>
                            <el-radio-button lebel="ZIP">ZIP</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="时间范围" :label-width="'120px'">
                        <el-date-picker
                                v-model="newHomework.time"
                                type="datetime"
                                placeholder="选择截止时间">
                        </el-date-picker>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateHomeworkVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <my-footer style="bottom: 0;position: absolute"></my-footer>
    </div>
</template>

<script>
    import MyTitle from "../../components/myTitle";
    import MyFooter from "../../components/myFooter";
    import Cookies from 'js-cookie'
    import API from "../../api";
    import qs from "qs";
    import moment from 'moment'
    import axios from 'axios'

    export default {
        name: "index",
        components: {MyFooter, MyTitle},
        filters:{
            formatDate(value){
                if(value){
                    return moment(String(value)).format("YYYY-MM-DD hh:mm")
                }
            }
        },
        data(){
            return{
                userAccount:Cookies.get('userAccount'),
                homeworkList:[],
                newHomework:{
                    ID:'',
                    title:'',
                    content:'',
                    time:'',
                    fileType:''
                },
                showHomeworkList:false,
                nowHomeworkTitle:"",
                noData:false,
                newHomeworkVisible:false,
                deleteVisible:false,
                delID:0,
                updateId:0,
                studentHomeworkList:[],
                updateHomeworkVisible:false,

                queryInfo: {
                    pageNum: 1,
                    pageSize: 5,
                },
            }
        },

        mounted(){
            this.getHomeworkList();
        },

        methods:{
            handleSizeChange(val) {
                this.queryInfo.pageSize = val;
                this.getHomeworkList();
            },
            handleCurrentChange(val) {
                this.queryInfo.pageNum = val;
                this.getHomeworkList();
            },
            checkHomeworkList(id, title){
                let data = {
                    homeworkID:id,
                };

                API.checkCompletion(data).then(res=>{
                    console.log("result" + res);
                    this.studentHomeworkList=res.data;
                    // if(this.studentHomeworkList.length!==0){
                    //     this.studentHomeworkList.forEach(item=>{
                    //         item.time1= new Date(item.createTime * 1000).toLocaleDateString();
                    //         item.time2= new Date(item.updateTime * 1000).toLocaleDateString();
                    //     })
                    // }
                }).catch(msg=>{
                    alert(msg);
                });
                this.nowHomeworkTitle=title;
                this.showHomeworkList=true;
            },

            getHomeworkList(){
                let data = {
                };
                API.tHomeworkList(data).then(res=>{
                    console.log(res);
                    this.homeworkList=res.data; // 注意这里改成 res.data
                }).catch(msg=>{
                    alert(msg);
                })
            },
            addHomework(){
                let data = {
                    homeworkTitle:this.newHomework.homeworkTitle,
                    homeworkComment:this.newHomework.homeworkComment,
                    fileType:this.newHomework.fileType,
                    // start_time: new Date(this.newHomework.time[0]).valueOf() / 1000,
                    endTime: new Date(this.newHomework.time).valueOf() / 1000,
                };
                // data = qs.stringify(data);
                console.log("newHomework.time"+this.newHomework.time)
                console.log("data.endTime"+data.endTime)
                API.addHW(data).then(res=>{
                    if(res.message=='ok'){
                        alert("添加作业成功");
                        this.getHomeworkList();
                        this.newHomework.homeworkTitle="";
                        this.newHomework.homeworkComment="";
                        this.newHomework.fileType="";
                        this.newHomework.time="";
                    }else{
                        alert("添加作业失败");
                    }
                    this.newHomeworkVisible=false;
                }).catch(msg=>{
                    alert(msg);
                })
            },

            delH(homeworkID){
                this.deleteVisible=true;
                this.delID=homeworkID;
            },

            deleteHomework(){
                let data={
                    homeworkID:this.delID,
                };
                // data = qs.stringify(data);
                console.log("啦啦啦" + data);
                API.deletHW(data).then(res=>{
                    if(res.message==='ok'){
                        alert("删除作业成功");
                        this.getHomeworkList();
                    }else{
                        alert("删除作业失败");
                    }
                    this.deleteVisible=false;
                    this.delID=0;
                }).catch(msg=>{
                    alert(msg);
                })
            },

            //点击按钮前提取信息
            updateHomework(item){
                this.newHomework.homeworkTitle=item.homeworkTitle;
                this.newHomework.homeworkComment=item.homeworkComment;
                this.updateId=item.homeworkID;
                this.newHomework.fileType = item.fileType;
                this.newHomework.time = item.endTime;
                this.updateHomeworkVisible=true;
            },

            update(){
                let data = {
                    homeworkID:this.updateId,
                    homeworkTitle:this.newHomework.homeworkTitle,
                    homeworkComment:this.newHomework.homeworkComment,
                    fileType:this.newHomework.fileType,
                    endTime: new Date(this.newHomework.time).valueOf() / 1000,
                };

                API.updateHW(data).then(res=>{
                    if(res.message==='ok'){
                        alert("修改作业内容成功");
                        this.getHomeworkList();
                        this.newHomework.homeworkTitle="";
                        this.newHomework.homeworkComment="";
                        this.newHomework.time="";
                    }else{
                        alert("修改作业失败");
                    }
                    this.updateHomeworkVisible=false;
                }).catch(msg=>{
                    alert(msg);
                })
            },
            download(item){
                console.log("homeworkID："+ item.homeworkID);
                axios({
                    url: `http://localhost:8081/homework/download/${item.homeworkID}`,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', item.homeworkTitle + ".zip");
                    document.body.appendChild(link);
                    link.click();
                })
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