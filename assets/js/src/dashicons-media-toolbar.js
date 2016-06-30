/**
 * The toolbar used on the Dashicons media modal tab.
 */
var DashiconsMediaToolbar = wp.media.view.Toolbar.extend({
	initialize: function() {
		_.defaults( this.options, {
			//event: 'insert',
			close: false,
			items: {
				insertButton: {
					text: 'Insert into post',
					style: 'primary',
					priority: 80,
					requires: false,
					click: this.sendToEditor
				}
			}
		});

		wp.media.view.Toolbar.prototype.initialize.apply( this, arguments );
	},

	/**
	 * Refresh the toolbar view.
	 */
	refresh: function() {
		// Call the parent's refresh
		wp.media.view.Toolbar.prototype.refresh.apply( this, arguments );

		this.refreshButtons();
	},

	/**
	 * Refresh the toolar's buttons.
	 */
	refreshButtons: function() {
		var selection = this.controller.state().selection;

		// Set the disabled status of the button if there are no items in the collection.
		this.getInsertButtonModel().set( 'disabled', ! selection.length );
	},

	/**
	 * Get the insert button model.
	 *
	 * @return {Backbone.model} The model representing the insert button.
	 */
	getInsertButtonModel: function() {
		return this.get( 'insertButton' ).model;
	},

	/**
	 * Send the selected items to the editor.
	 */
	sendToEditor: function() {
		this.controller.state().sendToEditor();
	}
});
