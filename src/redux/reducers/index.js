import {
  ADD_USER,
  ADD_SUBSCRIPTIONS,
  SET_EPISODE_DOWNLOAD_PROGRESS,
  ADD_USER_INFO,
  ADD_NOTIFICATION_LIST,
  ADD_NOTIFICATION_BADGE,
} from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.data };
    case ADD_SUBSCRIPTIONS:
      return { ...state, subscriptions: action.data };
    case SET_EPISODE_DOWNLOAD_PROGRESS: {
      const downloads = state.downloads || {};
      return {
        ...state,
        downloads: {
          ...downloads,
          [action.data.fileId]: action.data.setter,
        },
      };
    }
    case ADD_USER_INFO:
      return { ...state, userInfo: action.data };
    case ADD_NOTIFICATION_LIST:
      return { ...state, notification: action.data };
    case ADD_NOTIFICATION_BADGE:
      return { ...state, badgeNotificationIcon: action.data };

    default:
      return null;
  }
}
