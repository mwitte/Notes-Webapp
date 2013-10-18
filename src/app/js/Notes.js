var bert = null;

/**
 * Notes application
 * @type {{bindEvents: Function, init: Function}}
 */
var Notes = {
	// some static vars
	vars: {
		notesStorageKey: 'notes',
		identifier: 'id'
	},

	/**
	 * UNDER CONSTRUCTION, it's not working until now
	 */
	Api: {
		sync: function(){
			$.ajax({
				type: "POST",
				url: "/Api.php",
				data: JSON.stringify({notes: Storage.restore(Notes.vars.notesStorageKey)}),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					console.log('success');
					console.log(data);
				},
				error: function(errMsg) {
					console.log('failed');
					console.log(errMsg.responseText);
				}
			});
		}
	},

	/**
	 * Creates a note object
	 *
	 * @param formData
	 * @returns {} note object
	 */
	createNoteFromFormData: function(formData){
		var newNote = {};
		$.each(formData, function( key, value ) {
			newNote[key.name] = value.value;
		});
		newNote.changed = new Date().getTime();
		// set an identifier if there isn't one
		if(typeof newNote[Notes.vars.identifier] === "undefined" || newNote[Notes.vars.identifier].length == 0){
			newNote[Notes.vars.identifier] = new Date().getTime();
		}
		return newNote;
	},

	/**
	 * Builds the notes list from storage
	 */
	buildNotesList: function(){
		$('.notesList').empty();
		var storedNotes = Storage.restore(Notes.vars.notesStorageKey);
		if(storedNotes){
			$.each(storedNotes, function( key, storedNote ) {
				var item = $("<a>", {'class': "list-group-item note"}).attr('data-content', storedNote[Notes.vars.identifier]);
				var badge = $("<span>", {'class': "badge"}).append(new Date(storedNote.changed).toLocaleString());
				if(typeof storedNote.title === "undefined" || storedNote.title.length == 0){
					if(typeof storedNote.content !== "undefined" && storedNote.content.length == 0){
						item.append(storedNote.content.substring(0,15));
					}
				}else{
					item.append(storedNote.title);
				}
				item.append(badge);
				$('.notesList').append(item);
			});
		}
		Notes.bindEvents();
	},

	/**
	 * Shows the form for editing the given note
	 *
	 * @param note
	 */
	editNote: function(note){
		$('div.notes').fadeOut(300);
		$('.editNoteContent').empty().append($('.newNote form').clone());
		// iterate over note properties
		for (var property in note) {
			if (note.hasOwnProperty(property)) {
				$('.editNoteContent form [name="'+ property +'"]').val(note[property]);
			}
		}
		var deleteButton = $("<a>", {'href': "#", 'class': "btn btn-danger pull-right deleteNote"})
			.attr('data-content', note[Notes.vars.identifier])
			.append('Delete');
		deleteButton.insertAfter($('.editNoteContent form [type="submit"]'));
		Notes.bindEvents();
		$('.editNote').delay(300).fadeIn(300);
	},

	bindEvents: function(){
		$('.newNote form, .editNote form').unbind();
		$('.newNote form, .editNote form').submit(function(){
			var newNote = Notes.createNoteFromFormData($(this).serializeArray().toObject());
			Storage.storeEntityObject(Notes.vars.notesStorageKey, Notes.vars.identifier, newNote);
			Notes.buildNotesList();
			var form = $(this);
			Navigation.showFirstContent(function(){
				form.find('input, textarea').val('');
			});
			return false;
		});

		$('.notes .note').unbind();
		$('.notes .note').click(function(){
			var restoredNote = Storage.restoreEntityObjectByIdentifier(Notes.vars.notesStorageKey, Notes.vars.identifier, $(this).attr('data-content'));
			if(restoredNote){
				Notes.editNote(restoredNote);
			}
			return false;
		});

		$('.deleteNote').unbind();
		$('.deleteNote').click(function(){
			var storedNote = Storage.restoreEntityObjectByIdentifier(Notes.vars.notesStorageKey, Notes.vars.identifier, $(this).attr('data-content'));
			if(storedNote){
				Storage.removeEntityObject(Notes.vars.notesStorageKey, Notes.vars.identifier, storedNote);
			}
			Notes.buildNotesList();
			Navigation.showFirstContent();
			return false;
		});
	},
	init: function(){
		Notes.buildNotesList();
		Notes.bindEvents();
		Notes.Api.sync();
	}
}