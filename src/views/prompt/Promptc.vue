<template>
  <!-- <Headerm /> -->
  <div class="home" style="width: 100%;padding: 10px">
    <div style="margin:20px 0;">
      <el-button type="primary" @click="add" style="margin-left:20px;" size="normal">新增</el-button>
      <el-button type="primary" style="margin-left:80%;" @click="load()" plain size="normal">查询全部</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%;margin-top:20px;font-size:16px; font-weight:bold;color:#8b7042;">
      <el-table-column prop="id" label="id" sortable  width="70" />
      <el-table-column prop="gmtCreate" label="创建时间" width="150"/>
      <el-table-column prop="gmtModified" label="修改时间" width="150"  />
      <el-table-column prop="name" label="标题" width="120"/>
      <el-table-column prop="code" label="编号" width="100" />
      <!-- <el-table-column prop="status" label="状态" width="70"/> -->
      <el-table-column prop="systemPrompt" label="系统提示词" >
        <template #default="scope">
        <span v-if="scope.row.systemPrompt &&scope.row.systemPrompt.length > 50">{{ scope.row.systemPrompt.substring(0, 50) }}...</span>
        <span v-else>{{ scope.row.systemPrompt }}</span>
      </template>
        </el-table-column>
      <el-table-column prop="userPrompt" label="用户提示词" width="120" />
      <el-table-column prop="modelId" label="模型id" width="100" />
      <!-- <el-table-column prop="userId" label="用户id" width="70"/> -->
  
      <el-table-column fixed="right" label="操作" width="200" >
        <template #default="scope">
          <el-row>
          <el-button type="primary" plain size="normal" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button type="danger" size="normal" plain>删除</el-button>
            </template>
          </el-popconfirm>
        </el-row>

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
          <!-- <el-form-item label="用户id">
            <el-input v-model="form.userId" style="width:80%;"></el-input>
          </el-form-item> -->
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
import { useUserStore } from '@/stores'

export default {
  name: 'Prompt',
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
      userStore: null,
      tableData: [],
      ElMessage,
      createp: 0

    }
  },
  created() {
    this.userStore = useUserStore(); // 在 created 钩子中赋值
    this.load();
    console.log("userstore",this.userStore.user)
  },
  methods: {
   
    async load() {
      await request.get("/prompt/"+this.userStore.user+"/0/*", {
      }).then(res => {
        console.log(res.data);
        this.tableData = res.data;
      })
    }
    ,
    add() {
      this.dialogVisible = true;
      this.createp = 1;
      this.form = {};
    },
    async save() {
      // console.log(this.form);
      if (this.createp === 1) {
        // console.log(this.form);
        try{
          const num1 = parseFloat(this.userStore.user);
          this.form.userId = num1
          await request.post("/prompt", this.form)
          ElMessage.success('添加成功')
        }
          catch(error) {
            ElMessage.error(error.response.data.errMsg)
            ElMessage.error('添加失败')
          }
        // this.load();
      } 
      else {
        try{
          console.log('修改前',this.form);
          await request.put("/prompt", this.form)
          ElMessage.success('修改成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
          ElMessage.error('修改失败')
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

    async  handleDelete(data) {
      
      try{
          // console.log('修改前',this.form);
        await request.delete("/prompt/"+data.id)
        ElMessage.success('删除成功')
        }
        catch(error)
        {
          ElMessage.error(error.response.data.errMsg)
          ElMessage.error('删除失败')
        }
        this.load();
       
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


.el-table :deep(.cell) {
  font-size: 50;
}
</style>
