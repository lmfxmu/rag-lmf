<template>

  <div style="height: 100%;width:100%">
  <el-row style="width: 100%;height: calc( 100% );">
    <el-col :span="12" style="border-right: 1px solid var(--el-border-color);height:100%;">
    <div class="home" style="width: 100%;padding: 10px">
    <div style="margin:20px 0;">
      <!-- <el-icon size=20><Document /></el-icon> -->
      <span style="font-size: 20px;font-weight:bold;margin-left:20px;">知识库集合</span>
      
    </div>
    <div style="margin:20px 0;">
      <el-button type="primary" @click="add1()" style="margin-left:20px;" size="normal">新增</el-button>
      <el-input clearable v-model="searchid1" placeholder="请输入用户id" style="width:20%;margin-left:40px;"></el-input>
      <el-input clearable v-model="searchcode1" placeholder="请输入查询code" style="width:20%;margin-left:20px;"></el-input>
      <el-button type="primary" style="margin-left:20px;" @click="loadid1()" plain >查询</el-button>
      
    </div>
    <el-table :data="tableData" border stripe style="width: 100%;margin-top:20px;" max-height="470">
      <el-table-column prop="id" label="id" width="40" />
      <el-table-column prop="code" label="编码" width="60" />
      <el-table-column prop="title" label="标题" width="80">
        <template #default="scope1">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 5px">{{ scope1.row.title }}</span>
        </div>
      </template>
       </el-table-column>
       <el-table-column prop="status" label="状态" width="50" />
      <el-table-column prop="description" label="描述" >
        <template #default="scope">
        <span v-if="scope.row.description && scope.row.description.length > 20">{{ scope.row.description.substring(0, 20) }}...</span>
        <span v-else>{{ scope.row.description }}</span>
      </template>
        </el-table-column>
        <el-table-column prop="userId" label="用户id" width="70" />
      <el-table-column fixed="right" label="操作" width="200" >
        <template #default="scope">
          <el-row>
          <el-button type="primary" plain size="small" @click="handleEdit1(scope.row)">编辑</el-button>
          <el-button type="primary" plain size="small" @click="select1(scope.row)">详情</el-button>
          <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete1(scope.row)">
            <template #reference>
              <el-button type="danger" size="small" plain>删除</el-button>
            </template>
          </el-popconfirm>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-button  type="primary" plain size="small" @click="open1(scope.row)">启用</el-button>
          <el-button  type="danger" size="small" plain @click="close1(scope.row)">禁用</el-button>
        </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px 0;"></div>
    <div class="demo-pagination-block">
      <el-dialog v-model="dialogVisible1" title="添加" width="50%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="编号(必需)">
            <el-input v-model="form.code" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="标题(必需)">
            <el-input v-model="form.title"  style="width:80%;" ></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description"  type="textarea" style="width:80%;" autosize></el-input>
          </el-form-item>
          <el-form-item label="用户id(必需)">
            <el-input v-model.number="form.userId" style="width:80%;"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取消</el-button>
            <el-button type="primary" @click="save1()">确定</el-button>
          </span>
        </template>
      </el-dialog>
      
   <span></span>
    </div>
  </div>
  </el-col>

  <el-col :span="12">
    <div class="home" style="width: 100%;padding: 10px">
    <div style="margin:20px 0;margin-top:50px;">
      <!-- <el-icon size=20><Document /></el-icon> -->
      <span style="font-size: 18px;font-weight:bold;margin-left:20px;">知识库内容</span>
      <span style="font-size: 16px;margin-left:50px;color:#868e96">当前知识库id为：{{kbid}}</span>
    </div>
    <div style="margin:20px 0;">
      <el-button type="primary" @click="add2()" style="margin-left:20px;" size="normal">新增</el-button>
      <el-input clearable v-model="searchid2" placeholder="请输入知识库id" style="width:20%;margin-left:20px;"></el-input>
      <el-input clearable v-model="searchcode2" placeholder="请输入查询code" style="width:20%;margin-left:20px;"></el-input>
      <el-input clearable v-model="searchkeyword2" placeholder="请输入关键词" style="width:20%;margin-left:20px;"></el-input>
      <el-button type="primary" style="margin-left:20px;" @click="loadid2()" plain >查询</el-button>
      
    </div>
    <el-table :data="tableData2" border stripe style="width: 100%;margin-top:20px;" max-height="450">
      <el-table-column prop="kbId" label="kb_id" width="65" />
      <el-table-column prop="code" label="编码" width="65" />
      <el-table-column prop="title" label="标题" width="80">
        <template #default="scope1">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 5px">{{ scope1.row.title }}</span>
        </div>
      </template>
      
       </el-table-column>
       <el-table-column prop="status" label="状态" width="60" />
      <el-table-column prop="content" label="正文" >
        <template #default="scope">
        <span v-if="scope.row.content.length > 70">{{ scope.row.content.substring(0, 70) }}...</span>
        <span v-else>{{ scope.row.content }}</span>
      </template>
        </el-table-column>
  
      <el-table-column fixed="right" label="操作" width="140" >
        <template #default="scope">
          <el-row>
          <el-button type="primary" plain size="small" @click="handleEdit2(scope.row)">编辑</el-button>
          <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete2(scope.row)">
            <template #reference>
              <el-button type="danger" size="small" plain>删除</el-button>
            </template>
          </el-popconfirm>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-button  type="primary" plain size="small" @click="open2(scope.row)">启用</el-button>
          <el-button  type="danger" size="small" plain @click="close2(scope.row)">禁用</el-button>
        </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px 0;"></div>
    <div class="demo-pagination-block">
      <!-- <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
      <el-dialog v-model="dialogVisible2" title="添加" width="50%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="编码">
            <el-input v-model="form.code" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="文本内容">
            <el-input v-model="form.content" type="textarea" style="width:80%;" autosize></el-input>
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
            <el-button @click="dialogVisible2 = false">取消</el-button>
            <el-button type="primary" @click="save2()">确定</el-button>
          </span>
        </template>
      </el-dialog>
      
   <span></span>
    </div>
  </div>
  </el-col>

  </el-row>

</div>
</template>

<script>
import { request } from '@/utils/request';
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue';

export default {
  title: 'Knowledgebase',
  components: {

  },
  data() {
    return {
      form: {
      },
      dialogVisible1: false,
      dialogVisible2: false,

      searchid1: '',
      searchcode1: '',
      searchid2: '',
      searchcode2: '',
      searchkeyword2: '',
      kbid: Number(),
      tableData: [],
      tableData2: [],
      ElMessage,
      createp: 0,

    }
  },
  created() {
    this.loadid1();
  },
  methods: {
    async loadid1() {
      let num1 = 0;
      let code1 = '*';

      if ( this.searchid1 === '')
      {
        num1=0;
      }else{
        let num11 = parseFloat(this.searchid1);
        if(!isNaN(num11)){
          num1=num11;
        } else {
          ElMessage.error('请输入数字id')
          return;
        }
      }


      if(this.searchcode1 !== '')
        code1=this.searchcode1;

      try{
        await  request.get("/knowledgebase/"+num1+"/"+code1).then(res => {
        // console.log(res.data);
        // const data1 = [res.data];
        this.tableData = res.data;
        // console.log("biaogeneirong",this.tableData);
      })

        }
        catch(error) {
          ElMessage.error(error.response.data.errMsg)
        }

    },
    async loadid2() {
      let num2 = 0;
      let code2 = '*';
      let keyword2 = '*';

      if ( this.searchid2 === '')
      {
        num2=0;
        ElMessage.error('请输入正确的知识库id');
        return;
      }else{
        let num22 = parseFloat(this.searchid2);
        if(!isNaN(num22)){
          num2=num22;
        } else {
          ElMessage.error('请输入数字id')
          return;
        }
      }


      if(this.searchcode2 !== '')
        code2=this.searchcode2;

      if(this.searchkeyword2 !== '')
        keyword2=this.searchkeyword2;
      console.log("keyword2",keyword2)
      try{
        await  request.get("/knowledge/"+num2+"/"+code2+"/"+keyword2).then(res => {
        this.tableData2 = res.data;
      })

        }
        catch(error) {
          ElMessage.error(error.response.data.errMsg)
        }

    },
    // load() {
    //   request.get("/knowledgebase/0/*", {
    //   }).then(res => {
    //     console.log(res.data);
    //     this.tableData = res.data;
    //   })
    // },
    add1() {
      this.dialogVisible1 = true;
      this.createp = 1;
      this.form = {};
    },
    add2() {
      this.dialogVisible2 = true;
      this.createp = 1;
      this.form = {};
    }
    ,
    async save1() {
      // console.log(this.form);
      if (this.createp === 1) {
        // console.log(this.form);
        try{
        await request.post("/knowledgebase", this.form)
        ElMessage.success('添加成功')
        }
          catch(error) {
            ElMessage.error(error.response.data.errMsg)
          }
        // this.load();
      } 
      else {
        try{
          // console.log('修改前',this.form);
        await request.put("/knowledgebase", this.form)
        ElMessage.success('修改成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        }
      this.dialogVisible1 = false;
      this.createp = 0;
      this.loadid1();
      },
      async save2() {
      // console.log(this.form);
      if (this.createp === 1) {
        this.form.kbId=this.kbid;
        console.log("zheli ",this.form);
        try{
        await request.post("/knowledge", this.form)
        ElMessage.success('添加成功')
        }
          catch(error) {
            ElMessage.error(error.response.data.errMsg)
          }
        // this.load();
      } 
      else {
        try{
          // console.log('修改前',this.form);
        await request.put("/knowledge", this.form)
        ElMessage.success('修改成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        }
      this.dialogVisible2 = false;
      this.createp = 0;
      this.loadid2();
      }
      
    
  ,
    handleEdit1(row) {
      //深拷贝，为了防止更改了本地变量里面的form
      // console.log('测试');
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible1 = true;
    },
    handleEdit2(row) {
      //深拷贝，为了防止更改了本地变量里面的form
      // console.log('测试');
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible2 = true;
    },

    async handleDelete1(data) {
      
      try{
          // console.log('修改前',this.form);
        await request.delete("/knowledgebase/"+data.id)
        ElMessage.success('删除成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        this.loadid1();

  },
  async handleDelete2(data) {
      
      try{
          // console.log('修改前',this.form);
        await request.delete("/knowledge/"+data.id)
        ElMessage.success('删除成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        this.loadid2();

  },
  async  open1(data)
  {
    try{
        await request.put("/knowledgebase/"+data.id+'/'+1)
        ElMessage.success('启用成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        this.loadid1();
  },
  async  open2(data)
  {
    try{
        await request.put("/knowledge/"+data.id+'/'+1)
        ElMessage.success('启用成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        this.loadid2();
  },
  async close1(data)
  {
    try{
      // console.log('修改前',data);
      await request.put("/knowledgebase/"+data.id+'/'+0)
      ElMessage.success('禁用成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        this.loadid1();
  },
  async close2(data)
  {
    try{
      // console.log('修改前',data);
      await request.put("/knowledge/"+data.id+'/'+0)
      ElMessage.success('禁用成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
        }
        this.loadid2();
  },
  async select1(data)
  {
    this.kbid=data.id;
    this.searchid2=data.id;
    this.loadid2();
    // try{
    //   console.log('修改前',data);
    //   await request.put("/knowledgebase/"+data.id+'/'+0)
    //   ElMessage.success('禁用成功')
    //     }
    //     catch(error)
    //     {
    //       ElMessage.error(error.response.data.errMsg)
    //     }
    //   this.loadid();
  }
}
}



</script>

<style scoped>

</style>
