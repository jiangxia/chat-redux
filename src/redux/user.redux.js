import axios from 'axios';
import { getRedirectTo } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  redirectTo: '',
  user: '',
  isAuto: false,
  type: '',
  msg: ''
}

export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectTo(action.paylod), isAuto: true, ...action.paylod }
    case LOGIN_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectTo(action.paylod), isAuto: true, ...action.paylod }
    case LOAD_DATA:
      return { ...state, ...action.paylod }
    case ERROR_MSG:
      return { ...state, isAuto: false, msg: action.msg }
    default:
      return state;
  }
}

function errormsg(msg) {
  return { msg, type: ERROR_MSG }
}

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, paylod: data };
}

function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, paylod: data };
}

export function loadData(data) {
  return { type: LOAD_DATA, paylod: data }
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errormsg('用户名密码必须输入！');
  }

  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(loginSuccess(res.data.data));
        } else {
          dispatch(errormsg(res.data.msg));
        }
      })
  }
}

export function register({ user, pwd, repeatpwd, type }) {
  console.log(111, type);

  if (!user || !pwd || !type) {
    return errormsg('用户名密码必须输入！');
  }
  if (pwd !== repeatpwd) {
    return errormsg('两次密码输入不一致！');
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(registerSuccess({ user, type, pwd }));
        } else {
          dispatch(errormsg(res.data.msg));
        }
      })
  }
}