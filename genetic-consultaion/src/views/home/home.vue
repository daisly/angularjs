<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="2">
          <a href="#" class="logo">
            <span class="logo-lg"><b>易</b>得好康</span>
          </a>
        </el-col>
        <!--<el-col :span="2">-->
          <!--<el-button icon="el-icon-menu" circle @click="isCollapseMenu"></el-button>-->
        <!--</el-col>-->
        <el-col :span="14"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4" :offset="16">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="logout">退出</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{username}}</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!--<el-menu class="el-menu-vertical-demo" router :collapse="isCollapse">-->
        <el-menu class="el-menu-vertical-demo" router>
          <el-menu-item index="/">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span slot="title">首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="upload">
            <template slot="title"><i class="el-icon-upload"></i><span slot="title">文件上传</span></template>
            <el-menu-item-group>
              <el-menu-item index="/informed/upload">上传知情同意</el-menu-item>
              <el-menu-item index="/report/upload">上传报告</el-menu-item>
              <el-menu-item index="/informed/upload" disabled>上传病历</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="info">
            <template slot="title"><i class="el-icon-edit-outline"></i><span slot="title">信息提取</span></template>
            <el-menu-item-group>
              <el-menu-item index="/informed/list">知情同意</el-menu-item>
              <el-menu-item index="/report/list">报告</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/review">
            <i class="el-icon-view"></i>
            <span slot="title">信息复核</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i><span slot="title">系统管理</span></template>
            <el-menu-item-group>
              <!--<template slot="title">用户信息</template>-->
              <el-menu-item index="/user">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      // isCollapse: true,
      username: window.localStorage.username
    }
  },
  methods: {
    logout () {
      window.localStorage.clear()
      window.location.href = 'https://z.mdhcare.cn/login.html'
    }
    // ,
    // isCollapseMenu () {
    //   console.log(this.isCollapse)
    //   this.isCollapse = !this.isCollapse
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-header {
    background-color: #00c2a9;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .el-header .logo {
    /*padding-left: 20px;*/
    color: #fff;
    text-decoration: none;
    font-size: 24px;
    float: left;
    width: 100px;
  }
  .el-dropdown {
    color: #fff;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>
