import { GET_USERS_REQUEST, GET_USERS_RESPONSE, GET_USERS_FAIL, ADD_USER, GET_USER, GET_USER_FAILURE, ADD_USER_STATUS_FAILURE, ADD_USER_STATUS_SUCCESS } from '../constants/actionTypes';
import axios from 'axios';

function getUsersRequest() {
    return {
        type: GET_USERS_REQUEST,
        payload: {}
    }
}

function getUsersResponse(data) {
    return {
        type: GET_USERS_RESPONSE,
        payload: {
            users: data,
            failure: false
        }
    }
}

function getUsersFailure() {
    return {
        type: GET_USERS_FAIL,
        payload: {
            failure: true
        }
    }
}

export function getUsers(name, start=0, limit=50) {
    return dispatch => {
        dispatch(getUsersRequest());
		axios.get('http://api.demo.lakmus.org/api/clients/', {
                params: {
                    _start: start,
                    _limit: limit,
                    name: name
                }
            })
            .then((response) => {
				return response.data;
            })
            .then((data) => {
                dispatch(getUsersResponse(data));
            })
            .catch((error) => {
		        dispatch(getUsersFailure());
            })
    }
}

function getUserResponse(data) {
    return {
        type: GET_USER,
        payload: {
            user: data,
            failure: null
        }
    }
}

function getUserFailure() {
    return {
        type: GET_USER_FAILURE,
        payload: {
            failure: true
        }
    }
}

export function getUser(userId) {
    return dispatch => {
        axios.get('http://api.demo.lakmus.org/api/clients/' + userId)
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                dispatch(getUserResponse(data));
            })
            .catch((error) => {
                dispatch(getUserFailure("Клиент не найден!!!"));
            })

    }
}

export function setUser(newUser) {
    return {
        type: ADD_USER,
        payload: {
            newUser: newUser
        }
    }
}

function addUserStatusFailure(text) {
    return {
        type: ADD_USER_STATUS_FAILURE,
        payload: {
            success: '',
            error: text
        }
    }
}

function addUserStatusSuccess(text) {
    return {
        type: ADD_USER_STATUS_SUCCESS,
        payload: {
            success: text,
            error: ''
        }
    }
}

export function addUser(newUser) {
    return dispatch => {
        axios.post('http://api.demo.lakmus.org/api/clients/', {
                params: {
                    name: newUser.name,
                    gender: newUser.gender,
                    birthYear: newUser.birthYear,
                    birthMonth: newUser.birthMonth,
                    birthDay: newUser.birthDay,
                    phone: newUser.phone,
                    email: newUser.email,
                    address: newUser.address,
                    description: newUser.description,
                }
            })
            .then((response) => {
				return response.data;
            })
            .then((data) => {
                dispatch(setUser(data));
                dispatch(addUserStatusSuccess(data.name + ' успешно добавлен'));
            })
			.catch((error) => {
				dispatch(addUserStatusFailure("Упсс...! Возникла ошибка"));
            })
    }
}
