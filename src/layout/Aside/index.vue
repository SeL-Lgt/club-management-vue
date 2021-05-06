<template>
  <el-aside id="aside" width="15vw">
    <div class="title" @click="$router.push('/home')">
      <p>社团管理系统</p>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        unique-opened
        :default-active="$router.path"
      >
        <template v-for="item in items">
          <!--第一层路由：是否有子目录-->
          <template v-if="item.subs">
            <el-submenu :index="item.index"
                        :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>

              <template v-for="subItem in item.subs">
                <!--第二层目录：是否有子目录-->
                <el-submenu v-if="subItem.subs"
                            :index="item.index+'/'+subItem.index"
                            :key="item.index+'/'+subItem.index">
                  <template slot="title">{{ subItem.title }}</template>
                  <el-menu-item v-for="(threeItem,i) in subItem.subs"
                                :key="i"
                                :index="item.index+'/'+subItem.index+'/'+threeItem.index">
                    {{ threeItem.title }}
                  </el-menu-item>
                </el-submenu>

                <el-menu-item v-else
                              :index="item.index+'/'+subItem.index"
                              :key="item.index+'/'+subItem.index"
                >{{ subItem.title }}
                </el-menu-item>
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
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside',
  data() {
    return {
      items: [],
      job: null,
    };
  },
  mounted() {
    this.getJob();
  },
  watch: {
    job: {
      handler() {
        this.$nextTick(() => {
          this.getJob();
        });
      },
    },
  },
  methods: {

    getJob() {
      if (this.$store.state.nowSocieties.job != null) {
        this.getMenu(this.$store.state.nowSocieties.job);
      } else if (this.$store.state.userInfo.type === 2) {
        this.getMenu(4);
      } else {
        this.getMenu(4);
      }
    },

    getMenu(index) {
      switch (index) {
        case 1: {
          this.items = [
            {
              icon: 'el-icon-s-home',
              index: '/backstage',
              title: '系统首页',
            },
            {
              icon: 'el-icon-s-order',
              index: '/userInfo',
              title: '个人信息管理',
            },
            {
              icon: 'el-icon-s-order',
              index: '/affairs',
              title: '事务管理',
              subs: [
                {
                  index: 'myAffairs',
                  title: '个人事务管理',
                },
                {
                  index: 'allAffairs',
                  title: '社团事务管理',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/clubManagement',
              title: '社团管理',
              subs: [
                {
                  index: 'member',
                  title: '查看社团成员',
                },
                {
                  index: 'info',
                  title: '查看社团信息',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/activity',
              title: '活动管理',
              subs: [
                {
                  index: 'myActivity',
                  title: '查看我的活动',
                },
                {
                  index: 'queryActivity',
                  title: '查看活动信息',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/photo',
              title: '相册管理',
            },
            {
              icon: 'el-icon-s-order',
              index: '/funding',
              title: '经费管理',
              subs: [
                {
                  index: 'selectFunding',
                  title: '经费查询',
                },
              ],
            }];
          break;
        }
        case 2:
        case 3: {
          this.items = [
            {
              icon: 'el-icon-s-home',
              index: '/backstage',
              title: '系统首页',
            },
            {
              icon: 'el-icon-s-order',
              index: '/userInfo',
              title: '个人信息管理',
            },
            {
              icon: 'el-icon-s-order',
              index: '/affairs',
              title: '事务管理',
              subs: [
                {
                  index: 'myAffairs',
                  title: '个人事务管理',
                },
                {
                  index: 'allAffairs',
                  title: '社团事务管理',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/clubManagement',
              title: '社团管理',
              subs: [
                {
                  index: 'member',
                  title: '查看社团成员',
                },
                {
                  index: 'info',
                  title: '查看社团信息',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/activity',
              title: '活动管理',
              subs: [
                {
                  index: 'createActivity',
                  title: '创建社团活动',
                },
                {
                  index: 'myActivity',
                  title: '查看我的活动',
                },
                {
                  index: 'queryActivity',
                  title: '查看活动信息',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/photo',
              title: '相册管理',
            },
            {
              icon: 'el-icon-s-order',
              index: '/funding',
              title: '经费管理',
              subs: [
                {
                  index: 'processFunding',
                  title: '经费分配',
                },
                {
                  index: 'selectFunding',
                  title: '经费查询',
                },
              ],
            }];
          break;
        }
        case 4: {
          this.items = [
            {
              icon: 'el-icon-s-order',
              index: '/userInfo',
              title: '个人信息管理',
            },
            {
              icon: 'el-icon-s-order',
              index: '/affairs',
              title: '事务管理',
              subs: [
                {
                  index: 'myAffairs',
                  title: '个人事务管理',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/clubManagement',
              title: '社团管理',
              subs: [
                {
                  index: 'member',
                  title: '查看社团成员',
                },
                {
                  index: 'info',
                  title: '查看社团信息',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/activity',
              title: '活动管理',
              subs: [
                {
                  index: 'myActivity',
                  title: '查看我的活动',
                },
                {
                  index: 'queryActivity',
                  title: '查看活动信息',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/funding',
              title: '经费管理',
              subs: [
                {
                  index: 'processFunding',
                  title: '经费分配',
                },
                {
                  index: 'selectFunding',
                  title: '经费查询',
                },
              ],
            }];
          break;
        }
        default: {
          this.items = [
            {
              icon: 'el-icon-s-order',
              index: '/userInfo',
              title: '个人信息管理',
            },
            {
              icon: 'el-icon-s-order',
              index: '/affairs',
              title: '事务管理',
              subs: [
                {
                  index: 'myAffairs',
                  title: '个人事务管理',
                },
              ],
            },
            {
              icon: 'el-icon-s-order',
              index: '/activity',
              title: '活动管理',
              subs: [
                {
                  index: 'myActivity',
                  title: '查看我的活动',
                },
                {
                  index: 'queryActivity',
                  title: '查看活动信息',
                },
              ],
            }];
          break;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
