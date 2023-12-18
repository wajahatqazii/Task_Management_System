function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER_DETAIL": {
      return {
        ...state,
        userDetail: action?.user
          ? {
              ...action.user,
              profile: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
            }
          : null,
      };
    }
    case "TOGGLE_PROFILE_MODAL": {
      return {
        ...state,
        profileModal: !state.profileModal,
      };
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        openModal: !state.openModal,
      };
    }
    case "SELECTED_TASK": {
      return {
        ...state,
        selectedTask: action.task,
      };
    }
    case "UPDATE_LIST": {
      return {
        ...state,
        isListUpdate: !state.isListUpdate,
      };
    }
    default: {
      return { ...state };
    }
  }
}
export default appReducer;
