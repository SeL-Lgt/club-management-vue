<template>
  <el-row id="photo">
    <el-row class="top">
      <el-form>
        <el-form-item label="照片名字" prop="name">
          <el-input v-model="form.name" clearable/>
        </el-form-item>
        <el-form-item label="照片日期" prop="date">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-button type="primary" @click="dialogVisible=true">上传相册</el-button>
    </el-row>
    <div class="container">
      <el-card
        v-for="(item, index) in photoList" :key="index"
        @click.native="photoDetail(item)"
        class="box"
      >
        <img style="width: 100%" :src="url+item.path" alt="">
      </el-card>
    </div>
    <el-dialog title="上传相册"
               :visible.sync="dialogVisible"
               width="50%"
    >
      <el-form ref="dialogForm" :model="dialogForm" label-width="15%">
        <el-form-item label="照片名字" prop="name">
          <el-input v-model="dialogForm.name" clearable/>
        </el-form-item>
        <el-form-item label="归属社团" prop="name">
          {{ $store.state.nowSocieties.association[0] }}-{{ $store.state.nowSocieties.sname }}
        </el-form-item>
        <el-form-item label="上传者" prop="name">
          {{ $store.state.userInfo.name }}
        </el-form-item>
        <el-form-item label="展示社团首页" prop="name">
          <el-switch
            v-model="dialogForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="照片简介" prop="name">
          <el-input type="textarea" v-model="dialogForm.introduction" clearable/>
        </el-form-item>
        <el-form-item prop="image" label="图片附件上传">
          <el-upload
            ref="upload"
            action="#"
            multiple
            list-type="picture-card"
            :auto-upload="false"
          >
            <i slot="default" class="el-icon-plus"></i>
            <template slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <div class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createPhoto()">上传照片</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>

      <el-dialog :visible.sync="imageShow" append-to-body>
        <el-image :src="imageUrl"/>
      </el-dialog>

    </el-dialog>
    <el-dialog title="查看照片详情"
               :visible.sync="dialogDetail"
               width="50%"
    >
      <el-card>
        <el-row type="flex" justify="space-between" align="middle" :gutter="20">
          <el-col :span="12">
            <img style="width: 100%;max-height: 50vh" :src="url+dialogDetailForm.path"/>
          </el-col>
          <el-col :span="12">
            <el-form label-width="30%">
              <el-form-item label="照片名字" prop="name">
                <el-input v-model="dialogDetailForm.name" clearable/>
              </el-form-item>
              <el-form-item label="归属社团" prop="sid">
                {{ $store.state.nowSocieties.association[0] }}-{{ $store.state.nowSocieties.sname }}
              </el-form-item>
              <el-form-item label="上传者" prop="uid">
                {{ dialogDetailForm.userinfo.name }}
              </el-form-item>
              <el-form-item label="上传时间" prop="date">
                {{ dialogDetailForm.date.split(' ')[0] }}
              </el-form-item>
              <el-form-item label="展示社团首页" prop="status">
                <el-switch
                  v-model="dialogDetailForm.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="1"
                  inactive-value="0">
                </el-switch>
              </el-form-item>
              <el-form-item label="照片简介" prop="introduction">
                <el-input type="textarea" v-model="dialogDetailForm.introduction" clearable/>
              </el-form-item>
              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-button type="primary" @click="updatePhoto()">更新照片</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="danger" @click="deletePhoto()">删除照片</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-dialog>
  </el-row>
</template>

<script>
import { getBase64 } from '@/utils/ImageUtil';
import {
  saveImage, queryPhotoByAll, updatePhoto, deletePhoto, queryPhotoByExample,
} from '@/api/photo';
import * as DateUtil from '@/utils/DateUtil';

export default {
  name: 'Photo',
  inject: ['reload'],
  data() {
    return {
      url: 'http://localhost:9090/image/',
      form: {
        sid: this.$store.state.nowSocieties.sid,
        name: '',
        startTime: '',
        endTime: '',
        status: '',
      },
      societies: [],
      time: [],
      dialogVisible: false,
      dialogForm: {
        date: '',
        image: '',
        introduction: '', // 简介
        name: '', // 相册名字
        uid: this.$store.state.userInfo.id, // 上传人
        sid: this.$store.state.nowSocieties.sid, // 社团
        status: '', // 是否展示首页
      },
      fileList: [],
      imageShow: false,
      imageUrl: '',
      photoList: [],
      dialogDetail: false,
      dialogDetailForm: {
        date: '',
        image: '',
        introduction: '', // 简介
        name: '', // 相册名字
        uid: '', // 上传人
        sid: this.$store.state.nowSocieties.sid, // 社团
        status: '', // 是否展示首页
        userinfo: {
          name: '',
        },
      },
    };
  },
  mounted() {
    this.queryPhotoByAll();
  },
  methods: {
    // 预览图片
    handlePictureCardPreview(file) {
      this.imageShow = true;
      this.imageUrl = file.url;
    },
    // 移除图片
    handleRemove(file) {
      this.$refs.upload.handleRemove(file);
    },
    // 上传图片
    createPhoto() {
      const temp = this.dialogForm;

      this.$nextTick(() => {
        this.$refs.upload.uploadFiles.forEach((file) => {
          const index = file.name.lastIndexOf('.');

          getBase64(file.raw)
            .then((res) => {
              this.dialogForm.image = encodeURI(res);
              temp.type = file.name.substring(index + 1, file.name.length);
              saveImage(temp)
                .then((res2) => {
                  if (res2.code === 200) {
                    this.$message({
                      message: `${file.name}上传成功`,
                      type: 'success',
                    });
                  } else {
                    this.$message.error(`${file.name}上传失败`);
                  }
                  this.reload();
                });
            });
        });
      });
    },

    resetForm() {
      this.$refs.dialogForm.resetFields();
      this.$refs.upload.uploadFiles = [];
    },

    /**
     * 查询社团照片
     */
    queryPhotoByAll() {
      queryPhotoByAll({ sid: this.$store.state.nowSocieties.sid })
        .then((res) => {
          this.photoList = res.data;
        });
    },
    /**
     * 照片详情
     * @param item
     */
    photoDetail(item) {
      this.dialogDetail = true;
      this.dialogDetailForm = item;
    },

    /**
     * 更新照片
     */
    updatePhoto() {
      const form = {
        id: this.dialogDetailForm.id,
        date: this.dialogDetailForm.date,
        path: this.dialogDetailForm.path,
        introduction: this.dialogDetailForm.introduction, // 简介
        name: this.dialogDetailForm.name, // 相册名字
        uid: this.dialogDetailForm.uid, // 上传人
        sid: this.$store.state.nowSocieties.sid, // 社团
        status: this.dialogDetailForm.status, // 是否展示首页
      };
      updatePhoto(form)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success',
            });
            this.reload();
          } else {
            this.$message.error('更新失败');
          }
        });
    },

    /**
     * 删除照片
     */
    deletePhoto() {
      deletePhoto({ id: this.dialogDetailForm.id })
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success',
            });
            this.reload();
          } else {
            this.$message.error('删除失败');
          }
        });
    },

    /**
     * 模糊查询
     */
    onSubmit() {
      if (this.time != null && this.time.length > 0) {
        this.form.startTime = DateUtil.formatDate(this.time[0], 3);
        this.form.endTime = DateUtil.formatDate(this.time[1], 4);
      } else {
        this.form.startTime = '';
        this.form.endTime = '';
      }
      queryPhotoByExample(this.form)
        .then((res) => {
          this.photoList = res.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
