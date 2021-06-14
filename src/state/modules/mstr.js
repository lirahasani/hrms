// Important imports that always should be present
import {
  API_CONFIG
} from '@utils/server.js';
const state = {
  notification_visible: false,
  notification_type: '',
  notification_icon: '',
  notification_title: '',
  notification_desc: '',
};
const mutations = {
  SHOW_NOTIFICATION(state, data) {
    state.notification_visible = true
    state.notification_type = data.notification_type
    state.notification_icon = data.notification_icon
    state.notification_title = data.notification_title
    state.notification_desc = data.notification_desc
  },
  HIDE_NOTIFICATION(state) {
    state.notification_visible = false
    state.notification_type = ''
    state.notification_icon = ''
    state.notification_title = ''
    state.notification_desc = ''
  }
};


const actions = {


  SHOW_NOTIFICATION({
    commit
  }, notification_details) {
    let type = notification_details.type
    let icon = notification_details.icon
    let title = notification_details.title
    let desc = notification_details.desc
    let notification_data = {
      "notification_type": type,
      "notification_icon": icon,
      "notification_title": title,
      "notification_desc": desc,
    }
    commit('SHOW_NOTIFICATION', notification_data)

    let timeout = ''
    if (notification_details.timeout == '' || notification_details.timeout == undefined) {
      timeout = 1500
    } else {
      timeout = notification_details.timeout
    }
    if (timeout !== 'infinite') {
      setTimeout(() => {
        commit('HIDE_NOTIFICATION')
      }, timeout);
    }

  },

  CLOSE_NOTIFICATION({
    commit
  }) {
    commit('HIDE_NOTIFICATION')
  },

};

const getters = {
  get_notification_data(state) {
    let notification_data = {
      notification_visible: state.notification_visible,
      notification_type: state.notification_type,
      notification_icon: state.notification_icon,
      notification_title: state.notification_title,
      notification_desc: state.notification_desc,
    }
    return notification_data;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
