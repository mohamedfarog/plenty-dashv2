import { getFirebaseBackend } from '../../helpers/firebase/authUtils'
import { adminSignIn } from "@/services/api/auth"
import { setItem, getItem, removeItem } from "@/utils/localStorage"


export const state = {
    user: getItem('user'),
    token: getItem('token'),


}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.user = newValue.user
        state.token = newValue.token
        setItem('user', newValue.user)
        setItem('token', newValue.token)
    },
    DELETE_CURRENT_USER(state) {
        state.user = null
        state.token = null
        removeItem('user')
        removeItem('token')
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    init({ state, dispatch }) {
        dispatch('validate')
    },

    //Save the User in the state and local storage
    saveUser(commit, {data}){
        commit('SET_CURRENT_USER', data) 
    },

    // Logs in the current user.
    async logIn({ commit }, { email, password } = {}) {



        const data = {
            "email": email,
            "password": password
        }


            return await adminSignIn(data).then((response) => {
                if (response.data.isAuth) {
                    commit('SET_CURRENT_USER', response.data)      
                    return response.data
                }
                else {
                    return response.data
                }
            });

        },
        
        

    

    // Logs out the current user.
    logOut({ commit }) {
        // eslint-disable-next-line no-unused-vars
       
        commit('DELETE_CURRENT_USER')

    },
    // register the user
    register({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().registerUser(email, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return user
        });
    },

    // register the user
    // eslint-disable-next-line no-unused-vars
    resetPassword({ commit, dispatch, getters }, { email } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().forgetPassword(email).then((response) => {
            const message = response.data
            return message
        });
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    validate({ commit, state }) {
        if (!state.currentUser) return Promise.resolve(null)
        const user = getFirebaseBackend().getAuthenticatedUser();
        commit('SET_CURRENT_USER', user)
        return user;
    },
}
