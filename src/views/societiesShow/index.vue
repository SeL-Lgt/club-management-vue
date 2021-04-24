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
        <MyTable :tableProp="tableProp" :tableData="tableData"/>
      </el-card>
    </div>
    <div class="left">
      <el-card class="carousel">
        <el-carousel :interval="4000" type="card" height="25vh">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
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
        <el-button v-else disabled class="button">已加入</el-button>
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
          label: '活动类别',
        },
        {
          prop: 'test',
          label: '活动简介',
        },
        {
          prop: 'time',
          label: '活动时间',
        },
      ],
      tableData: [{
        name: 'xxx',
        type: 'xxx',
        test: 'xxx',
        time: 'xxx-xxx-xx',
      }],
      returnActive: false,
      joined: false,
      quit: false,
    };
  },
  created() {
    this.getSocieties();
  },
  watch: {
    id: {
      handler() {
        this.$nextTick(() => {
          this.getSocieties();
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
      console.log(this.$store.state.userInfo);
      if (this.$store.state.userInfo.id != null) {
        const data = {
          sid: this.id,
          uid: this.$store.state.userInfo.id,
        };
        querySocietiesPersonnelByOne(data)
          .then((res) => {
            if (res.data.length !== 0 && res.code === 200) {
              console.log(200);
              this.joined = true;
              this.quit = true;
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
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
