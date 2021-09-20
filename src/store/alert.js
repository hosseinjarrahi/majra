const state = () => ({
    openAlert: false,
    text: '',
    color: 'green'
})

const getters = {
    openAlert(state) {
        return state.openAlert;
    },
    text(state) {
        return state.text;
    },
    color(state) {
        return state.color;
    },
}

const mutations = {
    setOpenAlert(state, payload) {
        state.openAlert = payload;
    },
    setText(state, payload) {
        state.text = payload;
    },
    setColor(state, payload) {
        state.color = payload;
    },
}

const actions = {
    alert({commit}, payload = {text: '', color: 'green'}) {
        commit('setOpenAlert', true);
        commit('setText', payload.text);
        commit('setColor', payload.color);
    }
}

export default {
    namespaced: true,
    name: "global",
    actions,
    mutations,
    getters,
    state
}



