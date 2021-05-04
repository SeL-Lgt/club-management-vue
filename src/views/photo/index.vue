<template>
  <el-row id="photo">
    <el-row class="top">
      <el-form>
        <el-form-item label="当前社团" prop="sid">
          <el-select v-model="form.sid" placeholder="所属社团">
            <el-option v-for="(item,index) in societies"
                       :key="index"
                       :label="item.association+item.sname"
                       :value="item.sid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="照片名字" prop="name">
          <el-input v-model="form.name" clearable disabled/>
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
    <el-button type="primary" @click="dialogVisible=true">上传相册</el-button>

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
          <el-input v-model="dialogForm.status" clearable/>
        </el-form-item>
        <el-form-item label="照片简介" prop="name">
          <el-input v-model="dialogForm.introduction" clearable/>
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
          <el-button type="primary" @click="createPhoto()">发布任务</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>

      <el-dialog :visible.sync="imageShow" append-to-body>
        <el-image :src="imageUrl"/>
      </el-dialog>

    </el-dialog>
  </el-row>
</template>

<script>
import { getBase64 } from '@/utils/ImageUtil';
import { saveImage } from '@/api/photo';

export default {
  name: 'Photo',
  inject: ['reload'],
  data() {
    return {
      form: {
        sid: '',
        name: '',
        starttime: '',
        endtime: '',
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
    };
  },
  created() {
    this.getSelect();
  },
  methods: {
    /**
     * 获取所属社团
     */
    getSelect() {
      this.societies = this.$store.state.societiesPersonnel.map((item) => {
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
      this.form.sid = this.societies[0].sid;
    },

    onSubmit() {
      console.log('查询照片');
    },

    handlePictureCardPreview(file) {
      this.imageShow = true;
      this.imageUrl = file.url;
    },
    handleRemove(file) {
      this.$refs.upload.handleRemove(file);
    },
    createPhoto() {
      const temp = this.dialogForm;

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
              });
          });
      });
      this.reload();
    },
    resetForm() {
      this.$refs.dialogForm.resetFields();
      this.$refs.upload.uploadFiles = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  .el-form {
    display: flex;

    ::v-deep .el-form-item {
      display: flex;
      white-space: nowrap;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }

      .el-range-editor.el-input__inner {
        width: 100%;
      }
    }
  }
}
</style>
