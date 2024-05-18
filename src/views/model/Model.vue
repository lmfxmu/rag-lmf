<template>
  <!-- <Headerm /> -->
  <div class="home" style="width: 100%;padding: 10px">
    <el-breadcrumb :separator-icon="ArrowRight" style="height:40px;border-bottom: 2px dashed #ced4da;">
    <el-breadcrumb-item :to="{ path: '/manage' }" style="font-size: 25px;">manange</el-breadcrumb-item>
    <el-breadcrumb-item style="font-size: 25px;">model</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:20px 0;">
      <el-button type="primary" @click="add" style="margin-left:20px;" >新增</el-button>
      <el-input clearable v-model="search" placeholder="请输入查询id" style="width:20%;margin-left:20px;"></el-input>
      <el-button type="primary" style="margin-left:10px;" @click="load()" plain >查询</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 96%;margin-left:2%;margin-top:20px;">
      <el-table-column prop="id" label="id" sortable  width="70" />
      <el-table-column prop="code" label="编号" width="90" />
      <el-table-column prop="name" label="名称" width="110"/>
      <el-table-column prop="description" label="描述" width="240">
        <template #default="scope">
        <span v-if="scope.row.description && scope.row.description.length > 70">{{ scope.row.description.substring(0, 70) }}...</span>
        <span v-else>{{ scope.row.description }}</span>
      </template>
        </el-table-column>
      <!-- <el-table-column prop="status" label="状态" width="70"/> -->
      <el-table-column prop="product" label="产品名" width="70"/>
      <el-table-column prop="status" label="状态" width="70"/>
      <el-table-column prop="rule" label="角色" width="70"/>
      <el-table-column prop="url" label="网址" width="230"/>
      <el-table-column fixed="right" label="操作" >
        <template #default="scope">
          <el-row>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button type="danger" size="small" plain>删除</el-button>
            </template>
          </el-popconfirm>
          <el-button  type="primary" plain size="small" @click="open1(scope.row)">启用</el-button>
          <el-button  type="danger" size="small" plain @click="close1(scope.row)">禁用</el-button>
        </el-row>
        <!-- <el-row style="margin-top:10px;">
          <el-button  type="primary" plain size="small" @click="open1(scope.row)">启用</el-button>
          <el-button  type="danger" size="small" plain @click="close1(scope.row)">禁用</el-button>
        </el-row> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px 0;"></div>
    <div class="demo-pagination-block">
      <!-- <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
      <el-dialog v-model="dialogVisible" title="添加" width="50%">
        <el-form :model="form" label-width="120px">
          
          <el-form-item label="编号(必需)">
            <el-input v-model="form.code" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="名称(必需)">
            <el-input v-model="form.name" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description" type="textarea" style="width:80%;" autosize></el-input>
          </el-form-item>
          <el-form-item label="产品名">
            <el-input v-model="form.product" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="状态(必需)">
            <el-radio v-model="form.status" :label = 0>0</el-radio>
            <el-radio v-model="form.status" :label = 1>1</el-radio>
            <!-- <el-input v-model.number="form.status" style="width:80%;"></el-input> -->
          </el-form-item>
          <el-form-item label="角色">
            <el-radio v-model="form.rule" :label = 1>ai聊天</el-radio>
            <!-- <el-radio v-model="form.type" :label = 1>用户</el-radio> -->
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="form.url" style="width:80%;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="token">
            <el-input  v-model="form.token" style="width:80%;"></el-input>
          </el-form-item> -->
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save()">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="getvisible" title="查询" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户id">
            <el-input v-model="form.userId" style="width:80%;" placeholder="默认为0查找全部"></el-input>
          </el-form-item>
          <el-form-item label="模型id">
            <el-input v-model="form.modelId" style="width:80%;" placeholder="默认为0查找全部"></el-input>
          </el-form-item>
          <el-form-item label="编号">
            <el-input v-model="form.code" style="width:80%;" placeholder="默认为*查找全部"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save1()">确定</el-button>
          </span>
        </template>
      </el-dialog>
   <span></span>
    </div>
  </div>
</template>

<script>
import { request } from '@/utils/request';
import { ElMessage } from 'element-plus'


export default {
  name: 'Model',
  components: {

  },
  data() {
    return {
      form3: {
        id: Number()
      },
      form: {
        rule: Number(),
        status: 1
      },
      dialogVisible: false,
      getvisible: false,
      search: '',
      tableData: [],
      ElMessage,
      createp: 0

    }
  },
  created() {
    this.load();
  },
  methods: {
    async loadid() {
      console.log(this.search);
      if (this.search === '')
      {
        ElMessage.error('请输入查询id')
      }
      else 
      {
        const num1 = parseFloat(this.search);
        if(!isNaN(num1)){
        try{
        await  request.get("/model/"+num1).then(res => {
        console.log(res.data);
        const data1 = [res.data];
        console.log(this.tableData)
        this.tableData = data1;
        console.log(this.tableData)
      })

        }
        catch(error) {
          ElMessage.error(error.response.data.errMsg)
        }
      }
      else { 
        this.tableData = []
        ElMessage.error('请输入数字')
      }
      }

      
    },
    async load() {
      console.log(this.search);
      if (this.search === '')
      {
        try{
          console.log("这里");
        await request.get("/modelList", {
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
        await  request.get("/model/"+num1, {
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
      this.createp = 1;
      this.form = {};
    },
    async save() {
      console.log("form",this.form);
      console.log(this.createp);
      if (this.createp === 1) {
        console.log(this.form);
        try{
        await request.post("/model/new", this.form).then(res => {
        console.log(res.data);})
        }
          catch(error) {
            ElMessage.error(error.response.data.errMsg)
          }
      } 
      else {
        try{
          console.log('修改前',this.form);
        await request.put("/model", this.form)
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        }
      this.createp = 0;
      this.dialogVisible = false;
      await this.load();
      }
  ,
    handleEdit(row) {
      //深拷贝，为了防止更改了本地变量里面的form
      console.log('测试');
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
      
      try{
          // console.log('删除前',data);
          this.form3.id=data.id;
          // console.log('删除前',this.form3);
          const form4={ id: Number()};
          form4.id=data.id;
          console.log('删除前',form4);
        await request.delete("/model",{
        data: form4})
        }
        catch(error)
        {
          console.log('删除报错',error);
          ElMessage.error(error.response.data.errMsg)
        }
        this.load();

  },
  async open1(data)
  {
    try{
        await request.put("/model/"+data.id+'/'+1)
        ElMessage.success("启用成功")
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        this.load();
  },
  async close1(data)
  {
    try{
      console.log('修改前',data);
        await request.put("/model/"+data.id+'/'+0)
        ElMessage.success("禁用成功")
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        this.load();
  }
}
}



</script>

<style scoped>

</style>
