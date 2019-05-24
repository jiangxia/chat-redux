import axios from 'axios';
import { getRedirectTo } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '',
  user: '',
  type: '',
  msg: ''
}

export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectTo(action.paylod), ...action.paylod }
    case LOAD_DATA:
      return { ...state, ...action.paylod }
    case ERROR_MSG:
      return { ...state, msg: action.msg }
    case LOGOUT:
      return { ...initState, redirectTo: '/login' }
    default:
      return state;
  }
}

function errormsg(msg) {
  return { msg, type: ERROR_MSG }
}


function authSuccess(obj) {
  const { pwd, ...data } = obj;
  return { type: AUTH_SUCCESS, paylod: data };
}

export function logoutSubmit() {
  return { type: LOGOUT }
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
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errormsg(res.data.msg));
        }
      })
  }
}

export function register({ user, pwd, repeatpwd, type }) {
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
          dispatch(authSuccess({ user, type, pwd }));
        } else {
          dispatch(errormsg(res.data.msg));
        }
      })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errormsg(res.data.msg));
        }
      })
  }
}