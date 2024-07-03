function submitNotes() {
  noteId = $("#note_id").val();
  title = $("#title").val();
  description = $("#description").val();
  if (noteId === "") {
    window.electronAPI.createNotes(title, description);
  } else {
    window.electronAPI.updateNotes(noteId, title, description);
  }
}

function fetchNotes() {
  window.electronAPI.fetchNotes();
}

window.electronAPI.readNotesUI((rows) => {
  console.log(rows);
  rows.forEach((row) => {
    div = returnPanelDiv(row);
    $("#accordion").append(div);
  });
});

function returnPanelDiv(row) {
  return (
    `<div class="panel panel-default" id="panel` +
    row.id +
    `">
          <div class="panel-heading">
            <span class="panel-title">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse` +
    row.id +
    `" id="title` +
    row.id +
    `">` +
    row.title +
    `</a>
            </span>
            <button type="button" class="btn btn-info act-btns" onclick="openModal(` +
    row.id +
    `)">
              <span class="glyphicon glyphicon-pencil"></span>
            </button>
            <button type="button" class="btn btn-danger act-btns" onclick="deleteNote(` +
    row.id +
    `)">
              <span class="glyphicon glyphicon-trash"></span>
            </button>
          </div>
          <div id="collapse` +
    row.id +
    `" class="panel-collapse collapse">
            <div class="panel-body" id="description` +
    row.id +
    `">` +
    row.description +
    `
            </div>
          </div>
        </div>`
  );
}

function deleteNote(id) {
  console.log("delete");
  window.electronAPI.deleteNotes(id);
  $("#panel" + id).remove();
}
