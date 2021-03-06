/**
 * Created by bear on 2018/3/2.
 */
import  {authTypes} from '../config/constant';
import * as fetches from '../services/authService'
import {NavigationActions} from 'react-navigation';
const userResLogin = (data) => ({
    type: authTypes.USER_LOGIN, data
})

const userResSingUp = (data) => ({
    type: authTypes.USER_REG, data
})
const modify = () => ({
    type: authTypes.USER_MODIFY
})
const profile = (data) => ({
    type: authTypes.USER_PROFILE, data
})
export const userLogin = (params, navigation, socketId) => {
    return dispatch => {
        fetches.fetchUserLogin(params).then((res) => {
            if (res.data.success) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'tabs'})],
                });
                navigation.dispatch(resetAction);
                dispatch(userResLogin(res))
                if (socketId) {
                    dispatch(userModify({userId: res.data.data._id, field: 'socketId', value: socketId}))
                }
            }
        })
            .catch(error => {
                console.error(error)
            })
    }
}
export const userSingUp = (params, navigation) => {
    return dispatch => {
        fetches.fetchUserSingUp(params).then((res) => {
            if (res.data.success) {
                navigation.goBack()
                dispatch(userResSingUp(res.data.data))
            }
        })
            .catch(error => {
                console.error(error)
            })
    }
}

export const userModify = (params) => {
    return dispatch => {
        fetches.fetchUserModify(params).then((res) => {
            if (res.data.success) {
                dispatch(modify())
                dispatch(userProfile(params))
            }
        })
            .catch(error => {
                console.error(error)
            })
    }
}

export const userProfile = (params) => {
    return dispatch => {
        fetches.fetchUserProfile(params).then((res) => {
            if (res.data.success) {
                dispatch(profile(res))
            }
        })
            .catch(error => {
                console.error(error)
            })
    }
}




