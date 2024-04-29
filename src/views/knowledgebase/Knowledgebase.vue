<template>
  <!-- <Headerm /> -->
  <div style="height: 100%;width:100%">
  <!-- <el-row style="width:100%">
    <el-breadcrumb :separator-icon="ArrowRight" style="width:100%;height:40px;border-bottom: 2px dashed #ced4da;">
    <el-breadcrumb-item :to="{ path: '/manage' }" style="font-size: 25px;margin-left:20px;">manange</el-breadcrumb-item>
    <el-breadcrumb-item style="font-size: 25px;">prompt</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row> -->

  <el-row style="width: 100%;height: calc( 100% );">
    <el-col :span="12" style="border-right: 1px solid var(--el-border-color);height:100%;">
    <div class="home" style="width: 100%;padding: 10px">
    <div style="margin:20px 0;">
      <!-- <el-icon size=20><Document /></el-icon> -->
      <span style="font-size: 20px;font-weight:bold;margin-left:20px;">知识库集合</span>
      <el-button type="primary" @click="add" style="margin-left:300px;" size="normal">新增</el-button>
      <!-- <div style="flex"></div> -->
      <el-button type="primary" style="margin-left:20px;" @click="load()" plain size="normal">查询全部</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%;margin-top:20px;">
      <el-table-column prop="id" label="id" width="40" />
      <el-table-column prop="code" label="编码" width="60" />
      <el-table-column prop="name" label="名字" width="80">
        <template #default="scope1">
        <div style="display: flex; align-items: center">
          
          <span style="margin-left: 5px">{{ scope1.row.name }}</span>
        </div>
      </template>
       </el-table-column>
      <el-table-column prop="description" label="描述" >
        <template #default="scope">
        <span v-if="scope.row.description.length > 20">{{ scope.row.description.substring(0, 20) }}...</span>
        <span v-else>{{ scope.row.description }}</span>
      </template>
        </el-table-column>
        <el-table-column prop="userid" label="用户ID" width="70" />
      <el-table-column fixed="right" label="操作" width="200" >
        <template #default="scope">
          <el-row>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">详情</el-button>
          <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button type="danger" size="small" plain>删除</el-button>
            </template>
          </el-popconfirm>
        </el-row>

        </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px 0;"></div>
    <div class="demo-pagination-block">
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
  </el-col>

  <el-col :span="12">
    <div class="home" style="width: 100%;padding: 10px">
    <div style="margin:20px 0;">
      <!-- <el-icon size=20><Document /></el-icon> -->
      <span style="font-size: 20px;font-weight:bold;margin-left:20px;">知识</span>
      <el-button type="primary" @click="add" style="margin-left:350px;" size="normal">上传</el-button>
      <!-- <div style="flex"></div> -->
      <el-button type="primary" style="margin-left:20px;" @click="load()" plain size="normal">查询全部</el-button>
    </div>
    <el-table :data="tableData2" border stripe style="width: 100%;margin-top:20px;">
      <el-table-column prop="id" label="id" width="40" />
      <el-table-column prop="code" label="编码" width="70" />
      <el-table-column prop="name" label="标题" width="80">
        <template #default="scope1">
        <div style="display: flex; align-items: center">
          
          <span style="margin-left: 5px">{{ scope1.row.name }}</span>
        </div>
      </template>
       </el-table-column>
      <el-table-column prop="description" label="正文" >
        <template #default="scope">
        <span v-if="scope.row.description.length > 70">{{ scope.row.description.substring(0, 70) }}...</span>
        <span v-else>{{ scope.row.description }}</span>
      </template>
        </el-table-column>
  
      <el-table-column fixed="right" label="操作" width="140" >
        <template #default="scope">
          <el-row>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button type="danger" size="small" plain>删除</el-button>
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
  </el-col>

  </el-row>

</div>
</template>

<script>
import { request } from '@/utils/request';
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue';

export default {
  name: 'Knowledgebase',
  components: {
    Document
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
        code: "rag",
        name: "rag技术",
        status: 1,
        description: "关于rag检索增强技术的知识库",
        userid: 1
      },
      {
        id: 2,
        code: "xiamen",
        name: "厦门",
        status: 1,
        description: "关于厦门的历史文化",
        userid: 1
      }
      ],
      tableData2: [
      {
        id: 1,
        code: "rag-1",
        name: "rag是什么",
        status: 1,
        description: "众所周知，LLM是一个预训练的模型，这就决定了LLM自身无法实时更新模型中的知识，正因为如此，所以现在业界已经形成了通过RAG（Retrieval Augmented Generation）等外接知识库等方式是快速扩展LLM知识的方式，也是把内部资产快速接入模型形成应用的共识。",
      },
      {
        id: 2,
        code: "rag-2",
        name: "rag发展历程",
        status: 1,
        description: "RAG的概念是2020年提出的[2]，第一次将预训练的检索器与预训练的seq2seq模型相结合，并进行端到端的微调。真正发扬光大是在2022年后，特别是ChatGPT的提出，NLP迈入大模型时代。很多人不知道，RAG从诞生开始一直是研究预训练和SFT的，推理截断的RAG是在LLM时代后才开始井喷。因为高性能大模型的训练成本高，学术界和工业级试图通过推理阶段加入RAG模块，高性价比的方式整合外部知识来增强模型生成。RAG的检索范围也在逐步放开，早起的RAG重点关注开源的，非结构化知识；随着检索范围的扩大，高质量数据作为知识来源，逐步在减轻LLM大模型的错误知识和幻觉问题。最近也有很多关于知识图谱，自我检索等方向的研究，跨学科和LLM进行结合的探索。",
      }
      ],


      ElMessage,
      createp: 0,

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
