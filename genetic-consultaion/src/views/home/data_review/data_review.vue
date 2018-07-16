<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>信息复核</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user-container">
      <el-table
        :data="reportList"
        border
        style="width: 100%">
        <el-table-column
          prop="sampleCode"
          label="编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="solutionName"
          label="项目"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="报告时间"
          width="160">
          <template slot-scope="scope">
            {{scope.row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="比较">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.recheckState === 0" type="success">{{scope.row.recheckState | stateFilter}}</el-tag>
            <el-tag v-else-if="scope.row.recheckState === 1" type="info">{{scope.row.recheckState | stateFilter}}</el-tag>
            <el-tag v-else type="danger">人工检验</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="受检者"
          width="180">
          <template slot-scope="scope">
            {{scope.row.patientCellphone }}
          </template>
        </el-table-column>
        <el-table-column
          prop="salesmanCellphone"
          label="知情来源"
          width="180">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="对照"
          width="60">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.id && scope.row.informedId"
                       @click="toRecheck(scope.row.id, scope.row.informedId)" >查看</el-button>
            <el-button type="text" size="small" v-else-if="scope.row.id && !scope.row.informedId"
                       @click="toEditReport(scope.row.id)">完善</el-button>
            <el-button type="text" size="small" v-else-if="!scope.row.id && scope.row.informedId"
                       @click="toEditInformed(scope.row.informedId)">完善</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[20, 50, 100, 150]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>

    <el-dialog title="复核" :visible.sync="dialogFormVisible">
      <div class="row">
        <div class="col-sm-6">
          <div class="rechecked-info bg-info">
            <h4>报告 <el-button type="text" @click="toEditReport(report.id)">修改信息</el-button></h4>
            <p>样本编号: {{report.sampleCode}}</p>
            <p>受检者姓名: {{report.truename}}</p>
            <p>电话号码: {{report.cellphone}}</p>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="rechecked-info bg-info">
            <h4>知情同意 <el-button type="text" @click="toEditInformed(informed.id)">修改信息</el-button></h4>
            <p>样本编号: {{informed.sampleCode}}</p>
            <p>受检者姓名: {{informed.truename}}</p>
            <p>电话号码: {{informed.cellphone}}</p>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  name: 'ReportList',
  data () {
    return {
      reportList: [],
      pageNum: 1,
      pageSize: 20,
      totalPage: 0,
      dialogFormVisible: false,
      report: {},
      informed: {}
    }
  },
  methods: {
    _initData () {
      this.getData()
    },
    getData () {
      this.axios.get('report/recheck', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.reportList = res.data.list
        this.pageSize = res.data.pageSize
        this.pageNum = res.data.pageNum
        this.totalPage = res.data.total
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getData()
    },
    toRecheck (reportId, informedId) {
      this.axios.get('report/recheck/' + reportId, {
        params: {
          informedId: informedId
        }
      }).then(res => {
        this.informed = res.data.informed
        this.report = res.data.report
        this.dialogFormVisible = true
      }).catch(err => {
        console.log(err)
      })
    },
    toEditReport (id) {
      this.$router.push('/report/edit/' + id)
    },
    toEditInformed (id) {
      this.$router.push('/informed/edit/' + id)
    }
  },
  filters: {
    stateFilter: function (state) {
      if (state === 0) return '完全匹配'
      if (state === 1) return '点击复核'
    }
  },
  computed: {},
  created () {
    this._initData()
  },
  mounted () {},
  destroyed () {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .user-container {
    margin: 20px 0px;
    padding: 20px;
    background: #ffffff;
  }
  .user-container .header {
    margin-bottom: 20px;
    font-size: 18px;
  }

</style>
