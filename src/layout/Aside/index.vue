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
      items: [
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
          index: '/basicInformation',
          title: '活动管理',
          subs: [
            {
              index: 'customerData',
              title: '客户资料',
            },
            {
              index: 'productData',
              title: '产品数据',
            },
            {
              index: 'purchaseData',
              title: '采购数据',
            },
            {
              index: 'supplierData',
              title: '供应商数据',
            },
          ],
        },
        {
          icon: 'el-icon-s-order',
          index: '/basicInformation',
          title: '相册管理',
          subs: [
            {
              index: 'customerData',
              title: '客户资料',
            },
            {
              index: 'productData',
              title: '产品数据',
            },
            {
              index: 'purchaseData',
              title: '采购数据',
            },
            {
              index: 'supplierData',
              title: '供应商数据',
            },
          ],
        },
        {
          icon: 'el-icon-s-order',
          index: '/basicInformation',
          title: '经费管理',
          subs: [
            {
              index: 'customerData',
              title: '客户资料',
            },
            {
              index: 'productData',
              title: '产品数据',
            },
            {
              index: 'purchaseData',
              title: '采购数据',
            },
            {
              index: 'supplierData',
              title: '供应商数据',
            },
          ],
        },
        {
          icon: 'el-icon-s-order',
          index: '/basicInformation',
          title: '前台界面管理',
          subs: [
            {
              index: 'customerData',
              title: '客户资料',
            },
            {
              index: 'productData',
              title: '产品数据',
            },
            {
              index: 'purchaseData',
              title: '采购数据',
            },
            {
              index: 'supplierData',
              title: '供应商数据',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
