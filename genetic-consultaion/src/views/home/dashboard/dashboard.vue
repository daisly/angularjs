<template>
  <el-container>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="bg-blue">
          <div class="inner">
            <h3>{{informedNum}}</h3>
            <p>知情同意数量</p>
          </div>
          <div class="icon">
            <i class="el-icon-edit-outline"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="bg-green">
          <div class="inner">
            <h3>{{reportNum}}</h3>
            <p>报告数量</p>
          </div>
          <div class="icon">
            <i class="el-icon-edit-outline"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="bg-orange">
          <div class="inner">
            <h3>{{informedNum}}</h3>
            <p>医院数量</p>
          </div>
          <div class="icon">
            <i class="el-icon-edit-outline"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="bg-red">
          <div class="inner">
            <h3>{{informedNum}}</h3>
            <p>产品数量</p>
          </div>
          <div class="icon">
            <i class="el-icon-edit-outline"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      reportNum: 0,
      informedNum: 0
    }
  },
  methods: {
    _initData () {
      this.axios.get('overview').then(res => {
        this.reportNum = res.data.reportNum
        this.informedNum = res.data.informedNum
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {},
  created () {
    this._initData()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row {
    width: 100%
  }
  .bg-blue {
    background: rgba(64, 158, 255, .6);
    border: 1px solid rgba(64, 158, 255, .6);
    color: #fff;
    -webkit-transition: .3s;
    transition: .3s;
  }
  .bg-green {
    background: rgba(103, 194, 58, .6);
    border: 1px solid rgba(103, 194, 58, .6);
    color: #fff;
    -webkit-transition: .3s;
    transition: .3s;
  }
  .bg-orange {
    background: rgba(230, 162, 60, .6);
    border: 1px solid rgba(230, 162, 60, .6);
    color: #fff;
    -webkit-transition: .3s;
    transition: .3s;
  }
  .bg-red {
    background: rgba(245, 108, 108, .6);
    border: 1px solid rgba(245, 108, 108, .6);
    color: #fff;
    -webkit-transition: .3s;
    transition: .3s;
  }
</style>
