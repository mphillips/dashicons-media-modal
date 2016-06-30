/**
 * The view used for the frame on the Dashicons media modal tab. This extends the wp.media.View object provided by WordPress.
 */
var DashiconsMediaFrameView = wp.media.View.extend({
	tagName: 'ul',
	className: 'media-dashicons attachments clearfix',

	events: {
		'click .dashicons.item'  : 'toggleSelection',
		'click .dashicon .check' : 'removeSelection',
	},

	initialize: function( opts ) {
		this.collection = opts.collection;
	},

	/**
	 * Render the view.
	 *
	 * @return {Backbone.View} The view object.
	 */
	render: function() {
		var frame = this;

		this.collection.forEach( function( item ) {
			var itemView = new DashiconsMediaItemView({
				model: item,
			});

			frame.$el.append( itemView.render().el );
		});

		// Return the view so we can chain functions calls together.
		return this;
	},

	/**
	 * Get the selected items in the media modal.
	 *
	 * @return {Backbone.Collection} The selected items.
	 */
	getSelection : function() {
		return this.controller.state().selection;
	},

	/**
	 * Add an item to the selected collection.
	 *
	 * @param {JQuery} target The HTML element the user clicked on.
	 * @param {String} id The ID of the item the user selected.
	 */
	addToSelection: function( target, id ) {
		// Add the selected classes to indicate the item was selected.
		target.closest( '.dashicons.item' ).addClass( 'selected details' );

		// Add the item to the selected.
		this.getSelection().add( this.collection._byId[id] );

		// Trigger the change event on the collection.
		// @todo This should be triggered automatically.
		this.controller.state().selection.trigger( 'change' );
	},

	/**
	 * Remove an item from the selected collection.
	 *
	 * @param  {JQuery} target The HTML element the user clicked on.
	 * @param  {String} id The ID of the item the user selected.
	 */
	removeFromSelection: function( target, id ) {
		// Add the selected classes to indicate the item was de-selected.
		target.closest( '.dashicons.item' ).removeClass( 'selected details' );

		// Remove the item to the selected.
		this.getSelection().remove( this.collection._byId[id] );

		// Trigger the change event on the collection.
		// @todo This should be triggered automatically.
		this.controller.state().selection.trigger( 'change' );

	},

	/**
	 * Reset the selected collection.
	 */
	resetSelection: function() {
		this.getSelection().reset();
	},

	/**
	 * Toggle the selected status of an item in the media modal.
	 *
	 * @param  {MouseEvent} event The event triggered by the user.
	 */
	toggleSelection: function( event ) {
		var target = $( event.currentTarget );
		var id = target.attr( 'data-id' );

		if ( this.getSelection().get( id ) ) {
			this.removeFromSelection( target, id );
		} else {
			this.addToSelection( target, id );
		}
	},
});
