<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>信息提取</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/report/list' }">报告</el-breadcrumb-item>
          <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div class="user-container">
          <el-form ref="reportForm" :model="report" label-width="80px" size="mini" class="edit-form">
            <el-form-item label="条码编号">
              <el-input v-model="report.sampleCode"></el-input>
            </el-form-item>
            <el-form-item label="送检项目">
              <el-select class="width-100-p" v-model="report.solutionId" filterable placeholder="请选择">
                <el-option
                  v-for="item in projects"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="report.cellphone"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="report.truename"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancel">取消</el-button>
              <el-button>文件不可读</el-button>
              <el-button type="primary" @click="edit">保存信息</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="img-content">
          <img :src="imagePath">
          <object :data="imagePath" type="application/pdf" width="95%" height="700px">
            <embed :src="imagePath">
          </object>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'EditInformed',
  data () {
    return {
      report: {},
      projects: [],
      idType: [
        {'id': 0, 'name': '身份证'},
        {'id': 1, 'name': '军官证'},
        {'id': 2, 'name': '通行证'},
        {'id': 3, 'name': '社保卡'}
      ],
      imagePath: ''
    }
  },
  props: {},
  methods: {
    _initData () {
      this.axios.get('report/' + this.$route.params.reportId).then(res => {
        this.report = res.data
        this.imagePath = this.axios.defaults.baseURL + '/report/file/' + res.data.path + '?Authorization=' + window.localStorage.token
      }).catch(err => {
        console.log(err)
      })

      this.axios.get('solution').then(res => {
        this.projects = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    edit () {
      delete this.report.createTime
      this.axios.put('report/' + this.$route.params.reportId, this.report).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.push('/informed/list')
      }).catch(err => {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
        console.log(err)
      })
    },
    cancel () {
      this.$router.push({
        name: 'InfoArchiveReport'
      })
    }
  },
  filters: {},
  computed: {},
  created () {
    this._initData()
  },
  mounted () {},
  destroyed () {}
}
</script>
<style>
  .user-container {
    margin: 20px 0px;
    padding: 20px;
    background: #ffffff;
  }
  .user-container .header {
    margin-bottom: 20px;
    font-size: 18px;
  }
  .edit-form {
    max-width: 400px;
  }
  .width-100-p {
    width: 100%
  }
  .img-content {
    margin: 20px 0px 20px 20px;
    height: 500px;
    background: #ffffff;
    overflow: auto;
  }
</style>
