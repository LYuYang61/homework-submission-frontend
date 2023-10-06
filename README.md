# homework-submission-backend      
- 后端地址 https://github.com/LYuYang61/homework-submission-backend
- 前端地址 https://github.com/LYuYang61/homework-submission-frontend


## 1 题目     
作业提交管理系统        


## 2 需求分析与设计     
### 2.1 需求分析     
班级学委在收集班级作业时，常会面临以下问题：     
- 所交的作业名称格式有误（比如：学号+姓名的命名模式）；     
- 所交的作业格式有误（比如：PDF，DOC等等）；     
- 查询未提交作业的同学名单时比较麻烦；     
- 当同一时间段收集不同科目作业时，难以快速地分类打包。


### 2.2 系统设计    
![image](https://github.com/LYuYang61/homework-submission/assets/131588563/06ddcf5f-a25a-4328-b189-40f29b6d22df)



## 3 系统实现与使用方法
### 3.1 系统开发环境
- 开发环境
  - 前端：WebStorm2020。
  - 后端：IDEA2020。

- 技术选型

![image](https://github.com/LYuYang61/homework-submission/assets/131588563/b0fa1ca9-cfbe-49af-bac7-0ca0143defce)

- 数据库设计
  - user表
    - 字段名称	    字段类型	    字段描述
    - id	          bigint	      序号
    - userName	    varchar(256)	姓名
    - userAccount	  varchar(256)	学号
    - avatarUrl	    varchar(1024)	用户头像
    - userPassword	varchar(512)	密码
    - email	        varchar(512)	邮箱
    - userStatus	  int	          状态 0 - 正常
    - createTime	  datetime	    创建时间
    - updateTime	  datetime	    更新时间  
    - userRole	    int	          用户角色 0 - 学生 1 - 学委
    - isDelete	    tinyint	      是否删除

  - homework表
    - 字段名称	    字段类型	    字段描述
    - homeworkID	  int	          作业ID
    - homeworkTitle	varchar(300)	作业标题
    - homeworkComment	varchar(300)作业描述
    - fileType	    enum	        作业提交的文件类型
    - endTime	      datetime	    截止时间


  - homeworkassignments表
    - 字段名称	    字段类型	    字段描述
    - homeworkID	  bigint	      作业ID
    - userAccount	  varchar(256)	学号
    - status	      tinyint	      作业提交状态   


### 3.2 系统界面简介
- 登录与注册界面

![image](https://github.com/LYuYang61/homework-submission-backend/assets/131588563/e39ef381-6e28-4d41-adbe-dd1d020b3cab)
![image](https://github.com/LYuYang61/homework-submission-backend/assets/131588563/f6884ef5-bf79-4306-82e0-06d00ff24931)

- 学委端界面
学委可以查看已经发布的作业，并且可以进行添加新作业、修改已发布的作业、删除已发布的作业、查看未提交同学名单、下载打包作业的操作。

![image](https://github.com/LYuYang61/homework-submission-backend/assets/131588563/c3d19296-73df-4e6b-bf91-51a74e4915aa)
![image](https://github.com/LYuYang61/homework-submission-backend/assets/131588563/2ef35f05-90d2-486d-9a6f-ab476f7772eb)
![image](https://github.com/LYuYang61/homework-submission-backend/assets/131588563/299dfb94-df36-4aa5-b80e-4d44f24d0e20)

- 学生端界面
学生可以在这里查看已经发布的作业的信息，并可以进行提交作业、修改已提交作业的操作。

![image](https://github.com/LYuYang61/homework-submission-backend/assets/131588563/74a7a8ae-e94a-447c-a817-3caa9e73269a)
![image](https://github.com/LYuYang61/homework-submission-backend/assets/131588563/bb7bc5af-7317-4e92-9659-c4df070c5ffd)
    

### 3.3 系统功能模块简介
- 登录功能
  - 用户登录时首先会做以下校验：
    - 参数是否为空
    - 学号userAccount是否为10位；
    - 学号userAccount是否包含特殊字符；
    - 密码userPassword长度是否符合。
  - 使用md5算法对密码userPassword进行加密。
  - 查询数据库是否存在该用户（通过学号和密码进行判断）。
  - 进行用户脱敏，以防止敏感信息（如密码）在浏览器控制台中显示。
  - 根据userRole判断是学委还是学生，以便跳转到不同界面。

- 注册功能
  - 用户注册时首先会做以下校验：
    - 参数是否为空
    - 学号userAccount是否为10位；
    - 学号userAccount是否包含特殊字符；
    - 密码userPassword长度是否符合；
    - 二次密码checkPassword是否与userPassword相同；
    - 学号userAccount不能与数据库中重复。
  - 使用md5算法对密码userPassword进行加密。
  - 将用户信息存入数据库。

- 学委发布作业功能
  - 设置作业标题homeworkTitle，查询数据库是否有重复的作业标题。
  - 将作业信息保存到数据库。
  - 获取该作业的作业序号homeworkID与全部学生的学号，发布作业时，向homeworkassignments表中插入作业序号homeworkID和学生学号userAccount的内容。

- 学委修改作业功能
  - 从homeworkRequest中获取创建一个homework所需要的相关参数，并且创建一个新的Homework对象：
    - homeworkID：作业ID；
    - homeworkTitle：修改后的作业标题；
    - homeworkComment：修改后的作业描述；
    - fileType：修改后的文件提交类型；
    - endTime：修改后的作业提交截止时间。
  - 从数据库中获取原homeworkTitle，用于修改服务器中保存作业的目录名称，以保证目录名称与homeworkTitle一致；
  - 使用新的Homework对象，根据homeworkID更新数据库中的作业信息。

- 学委删除作业功能
  - 从请求参数中获取将要被删除作业的homeworkID；
  - 将其从homework表中删除对应的作业；
  - 将其从homeworkAssignments表中删除作业的分配。

- 学委查看未提交同学名单功能
  - 从请求参数中获取对应作业的homeworkID；
  - 从homeworkAssignments表中查找homeworkID为目标作业并且完成状态（status）为0（未完成）的学生，获得其学号。然后从user表中查询对应的学生，并且向添加到即将返回的未完成作业的学生列表中。

- 学委下载作业功能
  - 通过GET请求方式传入所要下载作业的homeworkID；
  - 利用homeworkID从homework表中查找对应的homeworkTitle；
  - 使用homeworkTitle在本地的result目录中查找对应的文件夹；
  - 使用自行实现的ZipUtils中实现的对目录压缩的功能，将对应的文件夹进行压缩；
  - 返回使用ResponseEntity包装的作业集合压缩包。

- 学生提交和修改作业功能
  - 获取作业的homeworkID和学生上传的文件；
  - 根据homeworkID获取该作业的homeworkTitle，方便后续将学生上传的文件放置到对应的目录中；
  - 截取上传文件的前10个字符，与学生的学号进行比较，检查是否为该学生的作业或命名是否正确，如果不匹配，则进行提示；
  - 将文件提交到对应的目录中，并且更新该学生在homeworkAssignments目录中的提交状态。

- Excel导入数据库功能
  - 创建班级同学信息类，将表格和数据库对象关联起来；
  - 使用EasyExcel框架，采用同步读方式（一次性读取全部数据，适用于数据量较少的情景下），将excel中的数据导入到数据库中，并设置初始密码为12345678。

- 通用返回对象功能
  - 创建通用返回类，包括code（状态码），data（后端返回的数据），message（后端返回的消息，成功为“ok”），description（后端返回的详细信息）。
  - 创建返回工具类，定义success和error方法，并调用通用返回类设置相关信息。
  - 将需要向前端返回信息的地方，调用返回工具类进行编写，方便调试时前端接收信息可以具体知道是哪里、为什么报错。



## 改进方案
- 本项目目前用户角色userRole默认为0（学生）时，在设置角色为学委时，需要在数据库中找到相应用户并将用户角色userRole设置为1（学委）。因此我们需要添加系统管理员（可以将用户角色userRole设置为2），前端在添加一个系统管理界面，可以获取全部用户的信息，并可以设置用户角色userRole为学生还是学委，这样系统的功能性更加完整。
- 本项目目前学委和学生登录进去过后，不能对自己的信息进行修改，如修改头像、密码、邮箱等操作。因此需要添加个人信息界面，方便查看和修改个人信息，这样系统的功能性更加完整。
- 本项目目前在作业截止时间快到时，学生端不能收到提醒。因此需要设置一个定时功能，在作业截止时间前（比如前6个小时），向学生发送提醒消息，比如可以通过邮箱的方式发送。
- 本项目目前只针对本班级同学，若想扩大规模，需要对数据库表和字段进行修改，对前后端系统功能做进一步完善。


# agricultural-client

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
