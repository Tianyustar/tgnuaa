<template>
  <div class="navbar">
    <div class="hamburger-container">logo position</div>
    <div class="menu-container">
      <!-- <el-row :gutter="10" type="flex">
        <el-col :xs="0" :sm="3" :md="4" :lg="3" :xl="1" />
        <el-col :xs="8" :sm="7" :md="4" :lg="3" :xl="1"><div class="menu-container-item">主页</div></el-col>
        <el-col :xs="8" :sm="7" :md="4" :lg="3" :xl="1"><div class="menu-container-item">比赛</div></el-col>
        <el-col :xs="8" :sm="7" :md="4" :lg="3" :xl="1"><div class="menu-container-item">题目集</div></el-col>
      </el-row> -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/"><div class="menu-container-item">检索</div></el-menu-item>
        <el-menu-item index="/analysis"><div class="menu-container-item">分析/预测</div></el-menu-item>
        <el-menu-item index="/advisory"><div class="menu-container-item">咨询</div></el-menu-item>
      </el-menu>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div>
            <el-avatar> user </el-avatar>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  data() {
return{
  activeIndex:"/"
}
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    margin-left: 10px;
  }
.menu-container {
    line-height: 56px;
    height: 100%;
    text-align: center;
    float: left;
    margin-left: 200px;
    width: calc(100% - 400px);
  }
.menu-container-item {
  cursor: pointer;
  border-radius: 4px;
  width: 100px;
  color: #6c7293;
}
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
