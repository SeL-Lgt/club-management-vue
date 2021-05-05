<template>
  <div v-if="id" id="societiesShow">
    <div class="right">
      <el-card class="introduction">
        <el-row :gutter="30">
          <el-col :span="6" class="introduction_left">
            <el-image :src="Logo"/>
            <p>{{ typeName }}</p>
            <p>{{ societiesData.sname }}</p>
          </el-col>
          <el-col :span="18" class="introduction_right">
            <p>{{ societiesData.introduction || '暂无简介' }}</p>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="activity">
        <p class="title">社团活动</p>
        <MyTable :tableProp="tableProp" :tableData="tableData" table-height="40vh"/>
      </el-card>
    </div>
    <div class="left">
      <el-card class="carousel">
        <el-carousel :interval="4000" type="card" height="25vh">
          <template v-if="photoList.length>0">
            <el-carousel-item v-for="(item,index) in photoList" :key="index">
              <el-image style="height: 100%"
                        fit="contain" :src="url+item.path"
                        :preview-src-list="list"/>
            </el-carousel-item>
          </template>
          <template v-else>
            <el-carousel-item>
              <h3>暂无社团照片</h3>
            </el-carousel-item>
          </template>
        </el-carousel>
      </el-card>
      <el-card class="info">
        <div class="content">
          <div class="people">
            <p class="title">社团创始人</p>
            <p class="value">{{ societiesData.founder }}</p>
          </div>
          <div class="time">
            <p class="title">社团成立时间</p>
            <p class="value">{{ societiesData.date.split(' ')[0] }}</p>
          </div>
        </div>
      </el-card>

      <el-row style="margin-bottom: 2vh">
        <el-button v-if="!joined" type="primary" class="button" @click="join()">加入社团</el-button>
        <el-button v-else disabled class="button">{{ message }}</el-button>
      </el-row>
      <el-button v-if="quit"
                 type="danger"
                 class="button"
                 @click="quitEvent()">
        退出社团
      </el-button>

    </div>
    <div :class="{return:true,return_hover:!returnActive,return_active:returnActive}">
      <el-image @click="goMenu" :src="Rocket"/>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/logo.png';
import MyTable from '@/components/table/index.vue';
import Rocket from '@/assets/rocket.svg';

import {
  querySocietiesByCondition,
  addSocietiesPersonnel,
  querySocietiesPersonnelByOne,
  deleteSocietiesPersonnel,
} from '@/api/societies';
import * as DateUtil from '@/utils/DateUtil';
import { queryActivityByAll } from '@/api/activity';
import { queryPhotoByExample } from '@/api/photo';

export default {
  name: 'societiesShow',
  props: {
    id: {
      type: Number,
    },
    societiesType: {
      type: Array,
    },
  },
  components: {
    MyTable,
  },
  data() {
    return {
      Logo,
      Rocket,
      typeName: '',
      message: '',
      societiesData: {
        association: null,
        date: '',
        founder: '',
        id: null,
        instructor: '',
        introduction: '',
        money: null,
        sname: '',
        status: '',
      },
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
      ],
      tableData: [],
      form: {
        sid: this.id,
        name: '', // 活动名字
        type: '', // 活动类型
        location: '', // 活动地址
        starttime: '',
        endtime: '',
      },
      returnActive: false,
      joined: false,
      quit: false,
      url: 'http://localhost:9090/image/',
      photoList: [],
      list: [],
    };
  },
  created() {
    this.getSocieties();
    this.queryActivity();
    this.queryPhoto();
  },
  watch: {
    id: {
      handler() {
        this.$nextTick(() => {
          this.getSocieties();
          this.queryActivity();
          this.queryPhoto();
        });
      },
      deep: true,
    },
  },
  methods: {
    /**
     * 获取社团信息
     * 是否加入社团
     */
    getSocieties() {
      querySocietiesByCondition({
        id: this.id,
      })
        .then((res) => {
          // eslint-disable-next-line prefer-destructuring
          this.societiesData = res.data[0];
          this.typeName = this.societiesType[this.societiesData.association - 1].typename;
        });
      if (this.$store.state.userInfo.id != null) {
        const data = {
          sid: this.id,
          uid: this.$store.state.userInfo.id,
        };
        querySocietiesPersonnelByOne(data)
          .then((res) => {
            if (res.data.length !== 0 && res.code === 200) {
              this.joined = true;
              this.quit = true;
              if (res.data[0].status === 1) {
                this.message = '已加入';
              } else {
                this.message = '正在审核';
              }
            } else {
              this.joined = false;
              this.quit = false;
            }
          });
      }
    },
    /**
     * 返回选项卡
     */
    goMenu() {
      this.returnActive = true;
      const main = document.getElementsByTagName('main')[0];
      setTimeout(() => {
        window.scrollTo({
          top: main.clientHeight,
          behavior: 'smooth',
        });
      }, 400);
      setTimeout(() => {
        this.returnActive = false;
      }, 2000);
    },
    /**
     * 加入社团
     */
    join() {
      if (this.$store.state.userInfo.id == null) {
        this.$message({
          message: '请先登录',
          type: 'warning',
        });
      } else {
        const data = {
          sid: this.id,
          uid: this.$store.state.userInfo.id,
          name: this.$store.state.userInfo.name,
        };
        addSocietiesPersonnel(data)
          .then((res) => {
            if (res.code === 200) {
              this.$message({
                message: '加入成功',
                type: 'success',
              });
              this.message = '正在审核';
              this.joined = true;
              this.quit = true;
            } else {
              this.$message.error('加入失败');
            }
          });
      }
    },
    /**
     * 退出社团
     */
    quitEvent() {
      const data = {
        sid: this.id,
        uid: this.$store.state.userInfo.id,
      };
      deleteSocietiesPersonnel(data)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '退出成功',
              type: 'success',
            });
            this.joined = false;
            this.quit = false;
          } else {
            this.$message.error('退出失败');
          }
        });
    },

    /**
     * 查询活动列表
     */
    queryActivity() {
      this.form.sid = this.id;
      if (this.time != null && this.time.length > 0) {
        this.form.starttime = DateUtil.formatDate(this.time[0], 3);
        this.form.endtime = DateUtil.formatDate(this.time[1], 4);
      } else {
        this.form.starttime = '';
        this.form.endtime = '';
      }
      queryActivityByAll(this.form)
        .then((res) => {
          this.tableData = res.data.map((item) => {
            const data = {
              id: item.id,
              sName: item.societies.sname,
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
     * 查询轮播图
     */
    queryPhoto() {
      queryPhotoByExample({
        sid: this.id,
        name: '',
        startTime: '',
        endTime: '',
        status: 1,
      })
        .then((res) => {
          this.photoList = res.data.slice(0, 5);
          this.list = this.photoList.map((item) => this.url + item.path);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
