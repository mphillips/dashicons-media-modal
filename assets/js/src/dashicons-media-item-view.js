/**
 * View to represent a Dashicon in the media modal.
 */
var DashiconsMediaItemView = Backbone.View.extend({
	tagName: 'li',
	template: JST['dashicons-list-item-view'],

	initialize: function( options ) {
		//_.bindAll( this, 'render' );

 		this.model.bind( 'change', this.render );
	},

	/**
	 * Render the view.
	 *
	 * @return {Backbone.View} The view object.
	 */
	render: function() {
		var data = {
			id: this.model.get( 'id' ),
			name: this.model.get( 'name' ),
			className: this.model.get( 'class' ),
		};

		this.$el.html( this.template( data ) );

		// Return the view so we can chain functions calls together.
		return this;
	},
});
