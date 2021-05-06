<template>
  <el-row id="backHome" :gutter="20">
    <el-col :span="16">

      <div class="top">
        <el-card class="data">
          <p class="title">社团人数</p>
          <p class="value">{{ people }}人</p>
        </el-card>
        <el-card class="data">
          <p class="title">社团相片</p>
          <p class="value">{{ photo }}张</p>
        </el-card>
        <el-card class="data">
          <p class="title">社团经费</p>
          <p class="value">{{ money }}元</p>
        </el-card>
      </div>
      <el-card class="activity">
        <p class="title">社团活动列表</p>
        <MyTable :tableProp="tableProp" :tableData="tableData" table-height="40vh"/>
      </el-card>
    </el-col>
    <el-col :span="8" class="left">
      <el-card class="affairs">
        <p class="title">我的事务处理</p>
        <div id="pie" style="height: 50vh"/>
      </el-card>
      <el-row>
        <el-button style="width: 100%" type="danger" @click="quitEvent">退出社团</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import * as DateUtil from '@/utils/DateUtil';
import { queryActivityByAll } from '@/api/activity';
import MyTable from '@/components/table/index.vue';
import * as echarts from 'echarts';
import { queryPhotoByAll } from '@/api/photo';
import { deleteSocietiesPersonnel, querySocietiesPersonnelAll, querySocietiesByCondition } from '@/api/societies';
import { queryTask } from '@/api/task';

export default {
  name: 'backHome',
  components: {
    MyTable,
  },
  data() {
    return {
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
        sid: this.$store.state.nowSocieties.sid,
        name: '', // 活动名字
        type: '', // 活动类型
        location: '', // 活动地址
        starttime: '',
        endtime: '',
      },
      pieDate: [
        {
          value: 0,
          name: '未处理',
        },
        {
          value: 0,
          name: '已处理',
        }],
      people: 0,
      photo: 0,
      money: 0,
    };
  },
  created() {
  },
  mounted() {
    this.queryActivity();
    this.getTotal();
  },
  methods: {
    /**
     * 查询社团各类数据
     */
    getTotal() {
      const { sid } = this.$store.state.nowSocieties;
      querySocietiesPersonnelAll({ sId: sid })
        .then((res) => {
          this.people = res.data.length;
        });
      queryPhotoByAll({ sid })
        .then((res) => {
          this.photo = res.data.length;
        });
      querySocietiesByCondition({ id: sid })
        .then((res) => {
          this.money = res.data[0].money;
        });

      queryTask({ sid, status: '0' }).then((res) => {
        this.pieDate[0].value = res.data.length;
      });
      queryTask({ sid, status: '2' }).then((res) => {
        this.pieDate[1].value = res.data.length;
      });
      queryTask({ sid, status: '3' }).then((res) => {
        this.pieDate[1].value += res.data.length;
      });
      setTimeout(() => {
        this.pieEcharts();
      }, 100);
    },
    /**
     * 查询活动列表
     */
    queryActivity() {
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
     * 饼图配置
     */
    pieEcharts() {
      const pieChart = echarts.init(document.getElementById('pie'), 'light');
      const data = this.pieDate;
      pieChart.setOption(
        {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: 10,
            left: 'center',
          },
          series: [
            {
              type: 'pie',
              radius: ['0%', '80%'],
              center: ['50%', '50%'], // 数字位移需要以此处为准
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
                formatter: '{b}\t{c}',
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '12',
                  color: '#000',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data,
            },
          ],
        },
      );
    },

    /**
     * 退出社团
     */
    quitEvent() {
      const data = {
        sid: this.$store.state.nowSocieties.sid,
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
