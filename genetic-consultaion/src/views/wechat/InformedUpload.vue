<template>
  <el-container>
    <el-header>上传知情同意</el-header>
    <el-main>
      <el-form :rules="rules" :model="informedConsent" ref="informedConsent" label-width="80px" label-position="left" size="mini">
        <el-form-item label="您的姓名" prop="name">
          <el-input class="width-100-p" v-model="informedConsent.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input class="width-100-p" v-model="informedConsent.cellphone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="送检医院" prop="hospital">
          <el-autocomplete
            class="inline-input width-100-p"
            v-model="informedConsent.hospitalName"
            :fetch-suggestions="getHospitalList"
            placeholder="请输入内容"
            @select="selectHospital">
            <template slot-scope="{item}">
              <div class="name">{{ item.name }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="送检科室" prop="dept">
          <el-autocomplete
            class="inline-input width-100-p"
            v-model="informedConsent.deptName"
            :fetch-suggestions="getDeptList"
            placeholder="请选择科室"
            @select="selectDept">
            <template slot-scope="{item}">
              <div class="name">{{ item.name }}</div>
            </template>
          </el-autocomplete>
          <!--<el-select class="width-100-p"-->
            <!--v-model="informedConsent.dept"-->
            <!--filterable-->
            <!--remote-->
            <!--reserve-keyword-->
            <!--placeholder="请选择科室"-->
            <!--:remote-method="getDeptList"-->
            <!--:loading="deptSelLoading">-->
            <!--<el-option-->
              <!--v-for="item in deptList"-->
              <!--:key="item.id"-->
              <!--:label="item.name"-->
              <!--:value="item.id">-->
            <!--</el-option>-->
          <!--</el-select>-->
        </el-form-item>
        <el-form-item label="送检医生" prop="doctor">
          <el-input class="width-100-p" v-model="informedConsent.doctor"></el-input>
        </el-form-item>
        <el-form-item label="选择图片" prop="fileNum">
          <el-upload ref="upload"
                     class="float-l"
                     :multiple="true"
                     :auto-upload="false"
                     :headers="uploadHeader"
                     :action="uploadAction"
                     :data="informedConsent"
                     list-type="picture-card"
                     :on-preview="handlePictureCardPreview"
                     :on-error="handleUploadError"
                     :on-change="handleChange">
                     <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button class="float-l" type="primary" @click="submitForm">上传</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'informed-upload',
  // components: {
  //   'vue-select': require('vue-select')
  // },
  data () {
    var checkName = (rule, value, callback) => {
      if (!this.informedConsent.name) {
        return callback(new Error('请输入姓名'))
      } else {
        callback()
      }
    }
    var checkCellphone = (rule, value, callback) => {
      if (!this.informedConsent.cellphone) {
        callback(new Error('请输入手机号码'))
      } else if (!(/^1\d{10}$/.test(parseInt(this.informedConsent.cellphone)))) {
        callback(new Error('请输入11位数字'))
      } else {
        callback()
      }
    }
    var checkFileNum = (rule, value, callback) => {
      if (this.fileNum === 0) {
        callback(new Error('请选择文件'))
      } else {
        callback()
      }
    }
    return {
      informedConsent: {
        hospitalName: window.localStorage.hospitalName !== undefined ? window.localStorage.hospitalName : '',
        hospital: window.localStorage.hospital !== undefined ? parseInt(window.localStorage.hospital) : '',
        deptName: window.localStorage.deptName !== undefined ? window.localStorage.deptName : '',
        dept: window.localStorage.dept !== undefined ? parseInt(window.localStorage.dept) : '',
        doctor: window.localStorage.doctor,
        name: window.localStorage.fullName === undefined ? '' : window.localStorage.fullName,
        cellphone: window.localStorage.cellphone === undefined ? '' : window.localStorage.cellphone
      },
      rules: {
        name: [
          {required: true, validator: checkName, trigger: 'blur'}
        ],
        cellphone: [
          {required: true, validator: checkCellphone, trigger: 'blur'}
        ],
        hospital: [
          {required: true, message: '请选择送检医院', trigger: 'change'}
        ],
        dept: [
          {required: true, message: '请选择送检科室', trigger: 'change'}
        ],
        doctor: [
          {required: true, message: '请填写送检医生', trigger: 'blur'}
        ],
        fileNum: [
          {required: true, validator: checkFileNum, trigger: 'blur'}
        ]
      },
      hospitalList: [],
      deptList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      hospitalSelLoading: false,
      deptSelLoading: false,
      uploadAction: this.axios.defaults.baseURL + '/informed/upload',
      uploadHeader: {'Authorization': window.localStorage.token},
      fileNum: 0,
      timeout: null
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getHospitalList (query, cb) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.axios.get('hospital', {
          params: {
            keywords: query
          }
        }).then(res => {
          this.hospitalList = res.data
        }).catch(err => {
          console.log(err)
        })

        var result = this.hospitalList
        // 调用 callback 返回建议列表的数据
        cb(result)
      }, 3000 * Math.random())
    },
    selectHospital (item) {
      this.informedConsent.hospitalName = item['name']
      this.informedConsent.hospital = item['id']
    },
    getDeptList (query, cb) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.axios.get('hospital-dept', {
          params: {
            keywords: query
          }
        }).then(res => {
          this.deptList = res.data
        }).catch(err => {
          console.log(err)
        })

        var result = this.deptList
        // 调用 callback 返回建议列表的数据
        cb(result)
      }, 3000 * Math.random())
    },
    selectDept (item) {
      this.informedConsent.deptName = item['name']
      this.informedConsent.dept = item['id']
    },
    submitForm () {
      this.$refs.informedConsent.validate((valid) => {
        if (valid) {
          window.localStorage.hospital = this.informedConsent.hospital
          window.localStorage.hospitalName = this.informedConsent.hospitalName
          window.localStorage.dept = this.informedConsent.dept
          window.localStorage.deptName = this.informedConsent.deptName
          window.localStorage.doctor = this.informedConsent.doctor
          window.localStorage.fullName = this.informedConsent.name
          window.localStorage.cellphone = this.informedConsent.cellphone
          this.$refs.upload.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleUploadError (err) {
      if (err.status === 403) {
        this.$message({
          message: '您的号码未注册，请微信联系我们注册',
          type: 'warning'
        })
      }
    },
    handleChange (file, fileList) {
      this.fileNum = fileList.length
    }
  },
  created () {
    this.getHospitalList()
    this.getDeptList()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-container {
    /*background: #fff;*/
  }
  .el-main {
    background: #f2f2f2;
  }
  .el-header {
    margin-top: 20px;
    text-align: left;
    height: 40px !important;
  }
  .form-h5 {
    padding-left: 16px;
    padding-top: 10px;
  }
  .mui-navigate-right {
    float: right;
    padding-right: 20px;
  }
  .float-l {
    float: left;
  }
  .width-100-p {
    width: 100%
  }
  .el-select-dropdown {
    width: 74% !important;
    left: 100px !important;
  }
  .el-popper[x-placement^=bottom] {
    width: 74% !important;
    left: 100px !important;
  }
  .el-scrollbar__wrap {
    width: 100%;
  }
  .el-select-dropdown__list {
    width: 100%;
  }
  .el-select-dropdown__item {
    width: 100%;
  }
  .mui-table-view:after {
    left: 15px;
  }
</style>
