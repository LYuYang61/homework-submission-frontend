export default {

    //baseURL: 'http://39.106.160.119:8080/',//后端地址
    baseURL: 'http://localhost:8081/',//后端地址
    
    method: 'post',
    //登录模块接口
    studentLogin:{url:'user/login'},
    teacherLogin:{url:'user/login'},

    //注册模块
    studentReg:{url:'user/register'},
    teacherReg:{url:'user/register'},

    getStuList:{url:'teacher/getStudentList'},

    allHomeworkList:{url:'homework/getHomeworkList'},
    tHomeworkList:{url:'homework/getHomeworkList'},

    addHW:{url:'homework/release'},
    deletHW:{url:'homework/delete'},
    updateHW:{url:'homework/edit'},

    detailSHList:{url:'homework/getDetailHomeworkList'},
    studentSHList:{url:'homework/getMyHomeworkList'},

    submitSHom:{
        url:'homework/submit',
        headers:{
            'Content-Type':'multipart/form-data'
        }
    },
    downloadHomework:{
        url:'homework/download',
        method:'GET'
    },
    checkCompletion:{url:'homework/check'},
    updateSHome:{url:'homework/updateHomework'},


}
