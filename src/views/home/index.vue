<template>
  <div id="Home">
    <header @click="slide()">
      <h1>社团管理系统</h1>
      <div class="nav">
        <div class="arrow arrow-one"></div>
        <div class="arrow arrow-two"></div>
        <div class="arrow arrow-three"></div>
      </div>
    </header>
    <main v-show="isShow">
      <div :id="'bg'+(index+1)"
           v-for="(item,index) in entrance"
           :key="index"
           class="bg"
      >
        <div class="mask"></div>
        <div class="card"
             :style="{background: `url(${item.img})`,
                      backgroundSize:'100% 100%'
             }"
             @click="cardEvent(index+1)"
        >
          <div class="card-mask"></div>
          <div class="title">{{ item.name }}</div>
        </div>
      </div>
    </main>

    <!--  社团信息  -->
    <maskDemo v-if="event==1" ref="maskDemo">
      <template #content>
        <div class="league back">
          <template v-for="(item,index) in league">
            <div class="main" :key="index">
              <div class="title">{{ item.typeName }}</div>
              <template v-for="(children,index2) in item.children">
                <div class="label" :key="index2">
                  {{ children.sName }}
                </div>
              </template>
            </div>
          </template>
        </div>
      </template>
    </maskDemo>
    <!--  社团信息  -->
    <maskDemo v-if="event==4" ref="maskDemo">
      <template #content>
        <div :class="{login:true,to:LoginToRegistered,back:!LoginToRegistered}">
          <div class="title">Login</div>
          <div class="content">
            <input v-model="login.userName"
                   class="userName"
                   type="text"
                   placeholder="USERNAME"/>
            <input v-model="login.password"
                   class="password"
                   type="password"
                   placeholder="PASSWORD"/>
            <el-button type="primary">登录</el-button>
          </div>
          <div class="tips" @click="loginToRegistered(event)">
            没有账号?注册
          </div>
        </div>
        <div></div>
      </template>
    </maskDemo>
    <maskDemo v-if="event==5" ref="maskDemo">
      <template #content>
        <div :class="{registered:true,to:!LoginToRegistered,back:LoginToRegistered}">
          <div class="title">Registered</div>
          <div class="content">
            <el-form ref="registered" :model="registered" label-width="30%">
              <el-form-item label="用户名:">
                <el-input v-model="registered.userName"/>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="registered.password"/>
              </el-form-item>
              <el-form-item label="真实姓名:">
                <el-input v-model="registered.realName"/>
              </el-form-item>
              <el-form-item label="联系方式:">
                <el-input v-model="registered.phone"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="tips" @click="loginToRegistered(event)">
            已有账号?登录
          </div>
        </div>
        <div></div>
      </template>
    </maskDemo>
  </div>
</template>

<script>
import P1 from '@/assets/home/p1.jpg';
import P2 from '@/assets/home/p2.png';
import P3 from '@/assets/home/p3.jpg';
import P4 from '@/assets/home/p4.jpg';

import maskDemo from '@/components/maskDemo/index.vue';

export default {
  name: 'Home',
  components: {
    maskDemo,

  },
  data() {
    return {
      isShow: false,
      event: 0,
      // 导航栏数据
      entrance: [
        {
          name: '社团信息',
          router: '',
          img: P1,
        }, {
          name: '创建社团',
          router: '',
          img: P2,
        }, {
          name: '活动信息',
          router: '',
          img: P3,
        }, {
          name: '登录注册',
          router: '',
          img: P4,
        },
      ],
      // 社团数据
      league: [
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
        {
          id: '',
          typeName: '科技类',
          children: [
            {
              id: '',
              sName: '计算机社团',
            },
          ],
        },
      ],
      login: {
        userName: null,
        password: null,
      },
      registered: {
        userName: null,
        password: null,
        realName: null,
        phone: null,
      },
      LoginToRegistered: false,
    };
  },
  methods: {
    /**
     * 显示目录
     */
    slide() {
      this.isShow = true;
      const header = document.getElementsByTagName('header')[0];
      this.$nextTick()
        .then(() => {
          window.scrollTo({
            top: header.clientHeight,
            behavior: 'smooth',
          });
        });
    },
    /**
     * 卡片事件
     * @param index
     */
    cardEvent(index) {
      console.log(index);
      this.event = index;
      this.LoginToRegistered = false;// 恢复登录窗口

      this.$nextTick()
        .then(() => {
          this.$refs.maskDemo.show();
        });
    },

    /**
     * 翻转登录、注册卡片
     */
    loginToRegistered(index) {
      switch (index) {
        case 4:
          this.LoginToRegistered = true;
          setTimeout(() => {
            this.event = 5;
          }, 1300);
          break;
        case 5:
          this.LoginToRegistered = false;
          setTimeout(() => {
            this.event = 4;
          }, 1300);
          break;
        default:
          this.LoginToRegistered = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
