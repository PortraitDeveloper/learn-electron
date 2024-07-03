const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  createNotes: (title, description) => {
    ipcRenderer.send("create-notes", title, description);
  },
  updateNotes: (id, title, description) => {
    ipcRenderer.send("update-notes", id, title, description);
  },
  deleteNotes: (id) => {
    ipcRenderer.send("delete-notes", id);
  },
  fetchNotes: () => ipcRenderer.send("fetch-notes"),
  readNotesUI: (callback) =>
    ipcRenderer.on("read-notes-ui", (_event, rows) => callback(rows)),
});
