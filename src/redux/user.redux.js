import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  user: '',
  pwd: '',
  isAuto: false,
  type: '',
  msg: ''
}

export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, msg: '', isAuto: true, ...action.paylod }
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
          dispatch(registerSuccess(res.data));
        } else {
          dispatch(errormsg(res.data.msg));
        }
      })
  }
}