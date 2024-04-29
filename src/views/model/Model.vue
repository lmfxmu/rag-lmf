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
      <el-button type="primary" style="margin-left:10px;" @click="loadid()" plain >查询</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 96%;margin-left:2%;margin-top:20px;">
      <el-table-column prop="id" label="id" sortable  width="70" />
      <el-table-column prop="code" label="编号" width="70" />
      <el-table-column prop="name" label="名称" width="100"/>
      <el-table-column prop="description" label="描述" >
        <template #default="scope">
        <span v-if="scope.row.description.length > 70">{{ scope.row.description.substring(0, 70) }}...</span>
        <span v-else>{{ scope.row.description }}</span>
      </template>
        </el-table-column>
      <!-- <el-table-column prop="status" label="状态" width="70"/> -->
      <el-table-column prop="product" label="产品名" width="70"/>
      <el-table-column prop="rule" label="角色" width="70"/>
      <el-table-column prop="url" label="网址" width="220"/>
      <el-table-column fixed="right" label="操作" width="300">
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
          <el-form-item label="标题">
            <el-input v-model="form.name" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="编号">
            <el-input v-model="form.code" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="系统提示词">
            <el-input v-model="form.systemPrompt" type="textarea" style="width:80%;" autosize></el-input>
          </el-form-item>
          <el-form-item label="用户提示词">
            <el-input v-model="form.userPrompt" type="textarea" style="width:80%;" autosize></el-input>
          </el-form-item>
          <el-form-item label="模型id">
            <el-input v-model="form.modelId" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="用户id">
            <el-input v-model="form.userId" style="width:80%;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="权限">
            <el-radio v-model="form.type" :label = 0 >管理员</el-radio>
            <el-radio v-model="form.type" :label = 1>用户</el-radio>
          </el-form-item> -->
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
      form: {
        modelId: Number(),
        userId: Number()
      },
      dialogVisible: false,
      getvisible: false,
      search: '',
      tableData: [
      {
        id: 1,
        code: "GLM",
        name: "智谱",
        description: "智谱与清华联合推出的大模型",
        status: 1,
        product: "glm3",
        rule: "1",
        url: "https://open.bigmodel.cn/",
      },
      {
        id: 2,
        code: "GLM",
        name: "智谱",
        description: "智谱glm4，更智能，消耗更多的token",
        status: 1,
        product: "glm4",
        rule: "1",
        url: "https://open.bigmodel.cn/",
      }

      ],
      ElMessage,
      createp: 0

    }
  },
  created() {
    // this.load();
  },
  methods: {
    loadid() {
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
          request.get("/prompt/"+num1).then(res => {
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
    load() {
      request.get("/prompt/0/0/*", {
      }).then(res => {
        console.log(res.data);
        this.tableData = res.data;
      })
    },
    loadidid() {
      this.getvisible = true;
      this.form = {};
      this.form.userId=0;
      this.form.modelId=0;
      this.form.code='*';

     
    },
    save1(){
      
      try{
        console.log(this.form);
        request.get("/prompt/"+this.form.userId+'/'+this.form.modelId+'/'+this.form.code).then(res => {
          console.log(res.data);
        this.tableData = res.data;
      })
    }
      catch(error) {
            ElMessage.error(error.response.data.errMsg)
      }
      this.getvisible = false;
    }
    ,
    add() {
      this.dialogVisible = true;
      this.createp = 1;
      this.form = {};
    },
    save() {
      // console.log(this.form);
      if (this.createp === 1) {
        console.log(this.form);
        try{
        request.post("/prompt", this.form)
        }
          catch(error) {
            ElMessage.error(error.response.data.errMsg)
          }
        // this.load();
      } 
      else {
        try{
          console.log('修改前',this.form);
        request.put("/prompt", this.form)
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        }
      this.dialogVisible = false;
      this.createp = 0;
      this.load();
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
    handleDelete(data) {
      
      try{
          // console.log('修改前',this.form);
        request.delete("/prompt/"+data.id)
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }

  },
  open1(data)
  {
    try{
        request.put("/prompt/"+data.id+'/'+1)
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
  },
  close1(data)
  {
    try{
      console.log('修改前',data);
        request.put("/prompt/"+data.id+'/'+0)
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
  }
}
}



</script>

<style scoped>
.systemPrompt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
