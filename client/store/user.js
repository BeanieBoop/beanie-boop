import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'
const MAKE_ADMIN = 'MAKE_ADMIN'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const removeUser = () => ({type: REMOVE_USER})
const makeAdmin = user => ({type: MAKE_ADMIN, user})

/**
 * THUNK CREATORS
 */

export const fetchUsers = () => {
  return dispatch =>
    axios.get('/api/users')
      .then(res => {
        console.log("gfdhgdhjsgfjh",res.data)
        return dispatch(getAllUsers(res.data))
      })
      .catch(err => console.log(err))
}

export const makeAdminThunk = (id) => {
  return dispatch =>
    axios.put(`/api/users/makeAdmin/${id}`)
      .then(res => {
        return dispatch(makeAdmin(res.data))
      })
      .catch(err => console.log(err))
}

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) => {
  let form = method
  return dispatch =>
    //console.log(method)
    axios.post(`/auth/${form}`, { email, password })
      .then(res => {
        console.log("action", res)
        dispatch(getUser(res.data))
        //history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
}


export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        // history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = {currentUser: defaultUser, users: []}, action) {
  console.log("action",action)
  switch (action.type) {
    case GET_USER:
      return {...state, currentUser: action.user}
    case GET_ALL_USERS:
      return {...state, users: action.users}
    case REMOVE_USER:
      return {...state, currentUser: defaultUser}
    case MAKE_ADMIN:
      const {user} = action;
      const newUsers = state.users.map(stateUser => {
        if(user.id === stateUser.id) return {...stateUser, isAdmin: user.isAdmin}
        return stateUser
      })
      return {...state, users: newUsers}
    default:
      return state
  }
}
