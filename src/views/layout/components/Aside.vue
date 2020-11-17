<template>
  <div class="aside">
    <el-menu
            :default-active="onRoutes"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="rgb(48, 65, 86)"
            text-color="#fff"
            active-text-color="rgb(64, 158, 255)"
            router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                        v-for="(threeItem,i) in subItem.subs"
                        :key="i"
                        :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        //配置目录
        items: [
          {
            icon: "el-icon-edit-outline",
            index: "home",
            title: "系统首页"
          },
          {
            icon: "el-icon-suitcase",
            index: "test",
            title: "测试页",
            subs: [
              {
                index: "test1",
                title: "测试页1"
              },
              {
                index: "test2",
                title: "测试页2"
              },
            ]
          }
        ]
      };
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace("/", "");
      },
      ...mapState(["isCollapse"]) //从vuex里面获取菜单是否折叠
    },
    methods: {
      //下拉展开
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      //下来关闭
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
.aside {
  -webkit-transition: width 0.28s;
  transition: width 0.28s;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    height: 100%;
    text-align: left;
  }
  .el-menu--collapse {
    height: 100%;
  }
}
.el-submenu:hover, .el-menu-item:hover {
  background-color: rgb(38, 52, 69) !important;

}
//设置选中el-menu-item时的样式
.el-menu-item.is-active {
  box-sizing: border-box;
  background-color: rgb(38, 52, 69) !important;
  color: #38B2FF !important;
}
</style>
