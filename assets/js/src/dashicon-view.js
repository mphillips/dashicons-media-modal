/**
 * View to represent a Dashicon.
 */
var DashiconView = Backbone.View.extend({
	template: JST['dashicon-view'],

	initialize: function( options ) {
		this.model.bind( 'change', this.render );
	},

	/**
	 * Render the view.
	 *
	 * @return {Backbone.View} The view object.
	 */
	render: function() {
		this.$el.html( this.getHTML() );

		// Return the view so we can chain functions calls together.
		return this;
	},

	/**
	 * Get the HTML for this view.
	 *
	 * @return {string} The view html.
	 */
	getHTML: function() {
		var data = {
			className: this.model.get( 'class' ),
		};

		return this.template( data );
	}
});
