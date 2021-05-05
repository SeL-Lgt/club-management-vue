<template>
  <el-header id="header" style="height: 10vh">
    <el-row class="left">
      <!--      <i class="icon el-icon-s-fold"></i>-->
      <el-dropdown v-if="show">
        <div class="name">
          <span>
            当前选择社团：
            {{ $store.state.nowSocieties.association + $store.state.nowSocieties.sname }}
          </span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in societies"
                            :key="index"
                            @click.native="nowSocieties(item,index)">
            {{ item.association + item.sname }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>

    <el-dropdown>
      <div class="name">
        <span>{{ $store.state.userInfo.name }}</span>
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="loginOut()">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>

</template>

<script>
export default {
  name: 'Header',
  inject: ['reload'],
  data() {
    return {
      sid: this.$store.state.nowSocieties.sid,
      societies: [],
      show: false,
    };
  },
  watch: {
    sid: {
      handler() {
        this.$nextTick(() => {
          this.reload();
        });
      },
    },
  },
  created() {
    if (this.$store.state.societiesPersonnel.length > 0) {
      this.show = true;
      this.getSelect();
    } else {
      this.show = false;
    }
  },
  methods: {
    /**
     * 获取所属社团
     */
    getSelect() {
      this.societies = this.$store.state.societiesPersonnel
        .filter((item) => item.status === 1)
        .map((item) => {
          const temp = {
            job: item.job,
            sid: item.sid,
            association: '',
            sname: item.societies.sname,
          };
          temp.association = this.$store.state.societiesType
            // eslint-disable-next-line no-shadow
            .filter((value) => value.id === item.societies.association)
            // eslint-disable-next-line no-shadow
            .map((item) => item.typename);
          return temp;
        });
      if (sessionStorage.getItem('index') == null) {
        this.$store.commit('saveNowSocieties', this.societies[0]);
        sessionStorage.setItem('index', '0');
      } else {
        this.$store.commit('saveNowSocieties', this.societies[sessionStorage.getItem('index')]);
      }
    },
    /**
     * 存储当前社团信息
     */
    nowSocieties(societies, index) {
      this.$store.commit('saveNowSocieties', societies);
      this.sid = societies.sid;
      sessionStorage.setItem('index', index);
      this.$router.push('/backHome');
    },
    /**
     * 退出登录
     */
    loginOut() {
      this.$message({
        message: '退出成功',
        type: 'success',
      });
      sessionStorage.clear();
      this.$store.commit('reset');
      this.$router.push('/home');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
