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
    <main v-if="isShow">
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
             @click="item.name==='后台管理'?$router.push('/backHome'):cardEvent(index+1)"
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
          <template v-for="(item,index) in societiesType">
            <div class="main" :key="index">
              <div class="title">{{ item.typename }}</div>
              <template v-for="(children,index2) in item.children">
                <div class="label" :key="index2" @click="toDetail(children.id)">
                  {{ children.sname }}
                </div>
              </template>
            </div>
          </template>
        </div>
      </template>
    </maskDemo>
    <!--  创建社团  -->
    <maskDemo v-if="event==2" ref="maskDemo">
      <template #content>
        <div class="societies back">
          <div class="title">创建社团</div>
          <div class="content">
            <el-form ref="societiesInfo"
                     status-icon
                     label-width="30%"
                     :rules="registeredRules"
                     :model="societiesInfo"
            >
              <el-form-item label="社团名字:" prop="sname">
                <el-input v-model="societiesInfo.sname"/>
              </el-form-item>
              <el-form-item label="创建人学号:" prop="founder">
                <!--                <el-input v-model="societiesInfo.founder" disabled/>-->
                <span style="color:white">{{ societiesInfo.founder }}</span>
              </el-form-item>
              <el-form-item label="指导老师:" prop="instructor">
                <el-input v-model="societiesInfo.instructor"/>
              </el-form-item>
              <el-form-item label="社团所属类别:" prop="association">
                <el-select v-model="societiesInfo.association" placeholder="请选择社团类型">
                  <el-option v-for="(item,index) in societiesType"
                             :key="index"
                             :label="item.typename"
                             :value="item.id"
                             style="width: 16.8vw"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="简介:" prop="introduction">
                <el-input type="textarea" clearable v-model="societiesInfo.introduction"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="createSocieties">立即创建</el-button>
                <el-button @click="resetForm('societiesInfo')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
    </maskDemo>

    <maskDemo v-if="event==3" ref="maskDemo">
      <template #content>
        <el-card class="activity back">
          <MyTable :table-height="tableHeight" :table-prop="tableProp" :table-data="tableData">
            <el-table-column
              slot="operating"
              prop="operating"
              label="操作"
              align="center"
            >
              <template v-slot="scope">
                <el-button type="text" @click="addActivityPeople(scope.row)">参加活动</el-button>
              </template>
            </el-table-column>

          </MyTable>
        </el-card>
      </template>
    </maskDemo>

    <!--  登录注册  -->
    <maskDemo v-if="event==4" ref="maskDemo">
      <template #content>
        <div :class="{login:true,to:LoginToRegistered,back:!LoginToRegistered}">
          <div class="title">Login</div>
          <div class="content">
            <input v-model="loginInfo.number"
                   class="userName"
                   type="text"
                   placeholder="USERNAME"/>
            <input v-model="loginInfo.password"
                   class="password"
                   type="password"
                   placeholder="PASSWORD"/>
            <el-button type="primary" @click="login">登录</el-button>
          </div>
          <div class="tips" @click="loginToRegistered(event)">
            没有账号?注册
          </div>
        </div>
      </template>
    </maskDemo>
    <maskDemo v-if="event==5" ref="maskDemo">
      <template #content>
        <div :class="{registered:true,to:!LoginToRegistered,back:LoginToRegistered}">
          <div class="title">注册</div>
          <div class="content">
            <el-form ref="registered"
                     status-icon
                     label-width="30%"
                     :rules="registeredRules"
                     :model="registeredInfo"
            >
              <el-form-item label="用户名:" prop="number">
                <el-input v-model="registeredInfo.number"/>
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input type="password" v-model="registeredInfo.password"/>
              </el-form-item>
              <el-form-item label="真实姓名:" prop="name">
                <el-input v-model="registeredInfo.name"/>
              </el-form-item>
              <el-form-item label="联系方式:" prop="phone">
                <el-input v-model="registeredInfo.phone"/>
              </el-form-item>
              <el-form-item label="所属班级:" prop="classname">
                <el-input v-model="registeredInfo.classname"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="registered">立即创建</el-button>
                <el-button @click="resetForm('registered')">取消</el-button>
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

    <societiesShow
      v-if="isRouterShow"
      style="position: relative;"
      ref="societiesShow"
      :id="societiesShowId"
      :societiesType="societiesType"/>

  </div>
</template>

<script>
import P1 from '@/assets/home/p1.jpg';
import P2 from '@/assets/home/p2.png';
import P3 from '@/assets/home/p3.jpg';
import P4 from '@/assets/home/p4.jpg';

import maskDemo from '@/components/maskDemo/index.vue';
import societiesShow from '@/views/societiesShow/index.vue';
import MyTable from '@/components/table/index.vue';

import { login, registered } from '@/api/user';
import { querySocietiesType, createSocieties, querySocietiesByAll } from '@/api/societies';
import { queryActivityByAll, addActivityPeople } from '@/api/activity';
import * as checkRules from '@/utils/InfoRules';

export default {
  inject: ['reload'],
  name: 'Home',
  components: {
    maskDemo,
    societiesShow,
    MyTable,
  },
  data() {
    return {
      isShow: false,
      isRouterShow: false,
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
        },
      ],
      // 社团数据
      league: [],
      // 登录信息
      loginInfo: {
        number: null,
        password: null,
      },
      // 注册信息
      registeredInfo: {
        number: null,
        password: null,
        name: null,
        phone: null,
        classname: null,
      },
      // 社团创建信息
      societiesInfo: {
        sname: '',
        association: '',
        founder: this.$store.state.userInfo.number,
        instructor: '', // 指导老师
        introduction: '', // 简历
      },
      // 社团类型
      societiesType: [{
        typename: '',
      }],
      LoginToRegistered: false,
      registeredRules: {
        number: [
          {
            validator: checkRules.checkNumber,
            trigger: 'blur',
          },
        ],
        password: [
          {
            validator: checkRules.checkPassword,
            trigger: 'blur',
          },
        ],
        name: [
          {
            validator: checkRules.checkName,
            trigger: 'blur',
          },
        ],
        phone: [
          {
            validator: checkRules.checkPhone,
            trigger: 'blur',
          },
        ],
        classname: [
          {
            validator: checkRules.checkClassName,
            trigger: 'blur',
          },
        ],
      },

      // 活动列表
      tableProp: [
        {
          prop: 'name',
          label: '活动名字',
        },
        {
          prop: 'type',
          label: '活动类型',
        },
        {
          prop: 'principal',
          label: '负责人',
        },
        {
          prop: 'location',
          label: '活动地点',
        },
        {
          prop: 'introduction',
          label: '活动简介',
        },
        {
          prop: 'starttime',
          label: '开始时间',
        },
        {
          prop: 'endtime',
          label: '结束时间',
        },
      ],
      tableData: [],
      tableHeight: '500',
      societiesShowId: 0,
    };
  },
  created() {
    if (sessionStorage.getItem('user')) {
      this.entrance.push(
        {
          name: '后台管理',
          router: '',
          img: P4,
        },
      );
    } else {
      this.entrance.push(
        {
          name: '登录注册',
          router: '',
          img: P4,
        },
      );
    }
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
      if (index === 1 || index === 2) {
        this.querySocieties();
      }
      if (index === 2 && sessionStorage.getItem('user') == null) {
        this.event = 0;
        this.$message({
          message: '请先登录',
          type: 'warning',
        });
      } else {
        this.event = index;
      }
      this.LoginToRegistered = false;// 恢复登录窗口

      if (index === 3) {
        this.queryActivity();
      }

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

    /**
     * 登录
     */
    login() {
      login(this.loginInfo)
        .then((res) => {
          if (res.code === 200) {
            this.$store.commit('saveUserInfo', res.data);
            sessionStorage.setItem('user', res.data.number);
            this.$message({
              message: '登录成功',
              type: 'success',
            });
            // this.$router.push('/backHome');
            this.reload();
          } else {
            this.$message.error('用户名或密码错误');
          }
        });
    },
    /**
     * 注册
     */
    registered() {
      registered(this.registeredInfo)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '注册成功',
              type: 'success',
            });
            this.loginToRegistered(5);
          } else {
            this.$message.error('用户名或密码错误');
          }
        });
    },

    /**
     * 创建社团
     */
    createSocieties() {
      createSocieties({
        ...this.societiesInfo,
        uId: this.$store.state.userInfo.id,
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '创建成功',
              type: 'success',
            });
            this.$refs.maskDemo.close();
          } else {
            this.$message.error('创建失败');
          }
        });
    },

    /**
     * 查看社团类型
     */
    async querySocieties() {
      await querySocietiesType()
        .then((res) => {
          const nData = res.data.map((item) => ({
            ...item,
            children: [],
          }));
          this.societiesType = nData;
        });
      await querySocietiesByAll()
        .then((res) => {
          // eslint-disable-next-line array-callback-return
          res.data.map((item) => {
            // eslint-disable-next-line array-callback-return
            this.societiesType.map((societiesType) => {
              if (item.association === societiesType.id) {
                societiesType.children.push(item);
              }
            });
          });
        });
    },

    /**
     * 重置表单
     * @param formName
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * 社团详情
     */
    toDetail(index) {
      this.$refs.maskDemo.close();
      this.isRouterShow = true;
      this.societiesShowId = index;

      const main = document.getElementsByTagName('main')[0];
      const header = document.getElementsByTagName('header')[0];
      this.$nextTick()
        .then(() => {
          window.scrollTo({
            top: header.clientHeight + main.clientHeight,
            behavior: 'smooth',
          });
        });
    },

    /**
     * 查询活动列表
     */
    queryActivity() {
      queryActivityByAll()
        .then((res) => {
          this.tableData = res.data.map((item) => {
            const data = {
              id: item.id,
              name: '',
              type: '',
              principal: '',
              location: '',
              introduction: '',
              starttime: '',
              endtime: '',
            };
            data.name = item.name;
            // eslint-disable-next-line array-callback-return,consistent-return
            data.type = this.$store.state.activityType.filter((type) => {
              if (type.id === item.type) {
                return type;
              }
            })[0].typename;
            data.principal = item.userinfo.name;
            data.location = item.location;
            data.introduction = item.introduction;
            // eslint-disable-next-line prefer-destructuring
            data.starttime = item.starttime.split(' ')[0];
            // eslint-disable-next-line prefer-destructuring
            data.endtime = item.endtime.split(' ')[0];
            return data;
          });
        });
    },

    /**
     * 参加活动
     */
    addActivityPeople(row) {
      console.log(row);
      if (this.$store.state.userInfo.id == null) {
        this.$message({
          message: '请先登录',
          type: 'warning',
        });
      } else {
        const data = {
          id: row.id,
          uid: this.$store.state.userInfo.id,
          name: this.$store.state.userInfo.name,
        };
        addActivityPeople(data)
          .then((res) => {
            if (res.code === 200) {
              this.$message({
                message: '报名参加活动成功',
                type: 'success',
              });
            } else {
              this.$message({
                message: '已报名参加活动',
                type: 'warning',
              });
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
