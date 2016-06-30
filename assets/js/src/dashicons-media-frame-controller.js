/**
 * Class to represent the state controller for the Dashicons media modal tab. This extends the wp.media.controller.State object provided by WordPress.
 */
var DashiconsMediaFrameController = wp.media.controller.State.extend({
	/**
	 * Collection to hold the selected items in the media modal.
	 *
	 * @type {Backbone.Collection}
	 */
	selection: new Backbone.Collection(),

	initialize: function(opts) {
		this.selection.on( 'change', this.refresh, this );
	},

	/**
	 * Refresh the media frame.
	 */
	refresh: function() {
		this.frame.toolbar.get().refresh();
	},

	/**
	 * Get the contents of the media frame.
	 *
	 * @return {[type]} [description]
	 */
	getFrameContent: function() {
		return this.frame.content.get();
	},

	/**
	 * Get the selected items in the media modal.
	 *
	 * @return {Backbone.Collection} The selected items.
	 */
	getSelection: function() {
		if ( 0 === this.selection.length ) {
			return this.getFrameContent().getSelection();
		} else {
			return this.selection;
		}
	},

	/**
	 * Send the selected items to the editor.
	 */
	sendToEditor: function() {
		var selection = this.getSelection();

		if ( this.isTinymce() ) {
			this.insertHTML( selection );
		} else {
			this.insertPlainText( selection );
		}

		this.selection.reset();
		this.frame.close();
	},

	/**
	 * Insert content appropriate for the TinyMCE editor.
	 *
	 * @param  {Backbone.Collecion} icons The icons to insert
	 */
	insertHTML: function( icons ) {
		wp.media.editor.insert( this.getHTMLContent( icons ) );
	},

	/**
	 * Insert content appropriate for the plain text editor.
	 *
	 * @param  {Backbone.Collecion} icons The icons to insert
	 */
	insertPlainText: function( icons ) {
		// In this case, we always want to insert HTML.
		wp.media.editor.insert( this.getHTMLContent( icons ) );
	},

	/**
	 * Get the HTML content for the selected items.
	 *
	 * @param  {Backbone.Collecion} icons The icons to insert
	 * @return {String} The HTML string.
	 */
	getHTMLContent: function( icons ) {
		var html = '';

		icons.each( function( icon ) {
			var view = new DashiconView({
				model: icon,
			});

			html += view.getHTML();
		}, this );

		return html;
	},

	/**
	 * Determine if a TinyMCE editor is ready and available.
	 *
	 * @return {Boolean}
	 */
	isTinymce: function() {
		if (
			typeof( tinymce ) === 'undefined' ||
			tinymce.activeEditor === null ||
			tinymce.activeEditor.isHidden()
		) {
			return false;
		} else {
			return true;
		}
	},
});
