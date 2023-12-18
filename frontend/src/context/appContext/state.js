const appState = {
  openModal: false,
  profileModal: false,
  selectedTask: null,
  isListUpdate: false,
  statusOptions: [
    { name: "Todo", value: "todo" },
    { name: "Pending", value: "in-pending" },
    { name: "InProcess", value: "in-process" },
    { name: "Done", value: "done" },
  ],
  userDetail: null,
};

export default appState;
