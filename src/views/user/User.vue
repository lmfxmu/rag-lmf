<template>
  <!-- <Headerm /> -->
  <div class="home" style="width: 100%;padding: 10px">
    <el-breadcrumb :separator-icon="ArrowRight" style="height:40px;border-bottom: 2px dashed #ced4da;">
    <el-breadcrumb-item :to="{ path: '/manage' }" style="font-size: 25px;">manange</el-breadcrumb-item>
    <el-breadcrumb-item style="font-size: 25px;">user</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-left:2%;margin-top:20px;">
      <el-button type="primary" @click="add()">新增</el-button>
      <el-input clearable v-model="search" placeholder="请输入用户id" style="width:20%;margin-left:10px;"></el-input>
      <el-button type="primary" style="margin-left:10px;" @click="load()">查询</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 96%;margin-left:2%;margin-top:20px;" max-height="500">
      <el-table-column prop="id" label="用户ID" sortable />
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="type" label="权限" />
      <el-table-column prop="token" label="token" />
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px 0;"></div>
    <div class="demo-pagination-block">
      <!-- <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
      <el-dialog v-model="dialogVisible" title="添加" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.name" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-radio v-model="form.type" :label = 0 >管理员</el-radio>
            <el-radio v-model="form.type" :label = 1>用户</el-radio>
          </el-form-item>
          <el-form-item label="token">
            <el-input  v-model="form.token" style="width:80%;"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save()">确定</el-button>
          </span>
        </template>
      </el-dialog>
   <!-- <span>状态是否要显示，修改框也要同步删除修改状态，状态为0即删除，查询功能查询包括0的</span> -->
    </div>
  </div>
</template>

<script>
import { request } from '@/utils/request';
import { ElMessage } from 'element-plus'


export default {
  name: 'User',
  components: {

  },
  data() {
    return {
      form: {
        id: null,
        type: 0 || 1,
        name: "",
        password: "",
        token: ""
      },
      dialogVisible: false,
      search: '',
      // currentPage: 1,
      // pageSize: 10,
      // total: 0,
      tableData: [],

    }
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      console.log(this.search);
      if (this.search === '')
      {
        try{
        await request.get("/userList", {
      }).then(res => {
        this.tableData = res.data;
      })
      }
        catch(error) {
          ElMessage.error(error.response.data.errMsg)
        }

      }
      else {
      const num1 = parseFloat(this.search);
      console.log(num1);
      if(!isNaN(num1))
      { 
        try{
        await  request.get("/user/"+num1, {
      }).then(res => {
        console.log(res.data);
        const data1 = [res.data];
        console.log(this.tableData)
        this.tableData = data1;
        console.log(this.tableData)
        ElMessage.success("查询成功")
      }) 
        }
        catch(error) {
          ElMessage.error(error.response.data.errMsg)
        }
    
      }
      else { this.tableData = []
        ElMessage.error("查询失败");
      }
      }
    },
    add() {
      this.dialogVisible = true;
      this.form = {};
    },
    async save() {
      console.log(this.form);
      if (this.form.id != null) {
        console.log(this.form);
        try{
        await request.put("/user", this.form)
        ElMessage.success("修改成功")
        this.load();
        }
        catch(error) {
            ElMessage.error(error.response.data.errMsg)
          }
        }
       else {

        try{
        await request.post("/user/new", this.form)
        ElMessage.success("创建成功")
        }
        catch(error) {
          ElMessage.error(error.response.data.errMsg)
        }


      }
      this.dialogVisible = false;
      this.load();
    },
    handleEdit(row) {
      //深拷贝，为了防止更改了本地变量里面的form
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    // handleSizeChange(pageSize) { //改变当前每页的个数触发
    //   //this.pageSize = pageSize; 我使用了双向绑定
    //   this.load();
    // },
    // handleCurrentChange(pageNum) {  //改变当前页码触发
    //   //this.currentPage = pageNum; 同上
    //   this.load();
    // },
    async handleDelete(data) {
      
      // 创建一个新对象，该对象是data对象的深拷贝
     const userData = JSON.parse(JSON.stringify(data));

      // 使用delete操作符删除id属性
      // delete userData.id;

      console.log(data);
      console.log(userData);
      

      try{
        await request.delete("/user",{data: userData})
        ElMessage.success("删除成功")
        this.load();
        }
        catch(error) {
          ElMessage.error(error.response.data.errMsg)
        }

      // this.load();
    }
  }
}
</script>
