import * as userApi from '@/api/user';

export function checkNumber(rule, value, callback) {
  if (!value) {
    callback(new Error('用户名不能为空'));
  }
  userApi.queryUserByNumber({ number: value })
    .then((res) => {
      if (res.code === 200) {
        callback(new Error('用户名已存在'));
      }
      callback();
    });
}

export function checkUpdateNumber(rule, value, callback) {
  if (!value) {
    callback(new Error('用户名不能为空'));
  } else {
    callback();
  }
}

export function checkPassword(rule, value, callback) {
  if (!value || value.length < 6) {
    callback(new Error('密码长度不得小于6'));
  }
  if (value.length > 10) {
    callback(new Error('密码长度不得超过10'));
  }
  callback();
}

export function checkName(rule, value, callback) {
  const nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
  if (!value) {
    callback(new Error('姓名不能为空'));
  }
  if (!nameReg.test(value)) {
    callback('请输入真实姓名');
  }
  callback();
}

export function checkPhone(rule, value, callback) {
  const phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
  if (!value) {
    callback(new Error('电话不能为空'));
  }
  if (!phoneReg.test(value)) {
    callback('请输入正确手机号码');
  }
  callback();
}

export function checkClassName(rule, value, callback) {
  if (!value) {
    callback(new Error('所属班级不能为空'));
  }
  callback();
}
