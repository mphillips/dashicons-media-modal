/**
 * Class to represent the frame used for the Dashicons media modal tab.
 */
var DashiconsMediaFrame = function( opts ) {
	this.initialize( opts );
};

DashiconsMediaFrame.prototype = {
	container: null,

	initialize: function( opts ) {
		this.container = opts.container;
		this.setMediaFrame();
	},

	/**
	 * Set up the customized media frame. In order to add new media frames, we have to override the wp.media.view.MediaFrame.Post object provided by WordPress.
	 */
	setMediaFrame: function() {
		// Save the current post media frame so we can reference it.
		var oldPostMediaFrame = wp.media.view.MediaFrame.Post;

		// Override the current post media frame with our customized version.
		wp.media.view.MediaFrame.Post = oldPostMediaFrame.extend({
			initialize: function() {
				// Call the old media frame's initialize method. This is important.
				oldPostMediaFrame.prototype.initialize.apply( this, arguments );

				this.on( 'content:render:dashicons', this.setDashiconsContent, this );
				this.on( 'toolbar:create:dashicons', this.setDashiconsToolbar, this );
			},

			/**
			 * Create the states for the media frame.
			 */
			createStates: function() {
				// Call the old media frame's createStates method.
				oldPostMediaFrame.prototype.createStates.call( this );

				// Add our custom state.
				this.states.add([
					new DashiconsMediaFrameController({
						id:         'dashicons',
						menu:       'default',
						content:    'dashicons',
						title:      'Insert Dashicon',
						priority:   200,
						toolbar:    'dashicons',
						type:       'link'
					})
				]);
			},

			/**
			 * Create the toolbar for our custom media frame.
			 */
			setDashiconsToolbar: function( toolbar ){
				toolbar.view = new DashiconsMediaToolbar({
					controller: this
				});
			},

			/**
			 * Create the content for our custom media frame.
			 */
			setDashiconsContent: function() {
				// This view has no router.
				this.$el.addClass( 'hide-router' );

				var collection = this.getDashiconsData();

				// Create the frame's view.
				var view = new DashiconsMediaFrameView({
					controller: this,
					collection: collection,
				});

				this.content.set( view );
			},

			/**
			 * Get the Dashicons to populate the media modal tab.
			 *
			 * @return {Backbone.Collection}
			 */
			getDashiconsData: function() {
				// Ideally, this data would be requested dynamically, but it's hard-coded for this example.
				return new DashiconCollection([
					{
						id: 'dashicons-yes',
						class: 'dashicons-yes',
						name: "Yes",
					},
					{
						id: 'dashicons-no',
						class: 'dashicons-no',
						name: "No",
					},
					{
						id: 'dashicons-plus',
						class: 'dashicons-plus',
						name: "Plus",
					},
					{
						id: 'dashicons-minus',
						class: 'dashicons-minus',
						name: "Minus",
					},
					{
						id: 'dashicons-star-filled',
						class: 'dashicons-star-filled',
						name: "Star",
					},
					{
						id: 'dashicons-star-half',
						class: 'dashicons-star-half',
						name: "Half Star",
					},
					{
						id: 'dashicons-star-empty',
						class: 'dashicons-star-empty',
						name: "Empty Star",
					},
					{
						id: 'dashicons-flag',
						class: 'dashicons-flag',
						name: "Flag",
					},
					{
						id: 'dashicons-warning',
						class: 'dashicons-warning',
						name: "Warning",
					},
					{
						id: 'dashicons-download',
						class: 'dashicons-download',
						name: "Download",
					},
					{
						id: 'dashicons-upload',
						class: 'dashicons-upload',
						name: "Upload",
					},
					{
						id: 'dashicons-lightbulb',
						class: 'dashicons-lightbulb',
						name: "Lightbulb",
					},
					{
						id: 'dashicons-phone',
						class: 'dashicons-phone',
						name: "Phone",
					},
					{
						id: 'dashicons-thumbs-up',
						class: 'dashicons-thumbs-up',
						name: "Thumbs Up",
					},
					{
						id: 'dashicons-thumbs-down',
						class: 'dashicons-thumbs-down',
						name: "Thumbs Down",
					},
					{
						id: 'dashicons-paperclip',
						class: 'dashicons-paperclip',
						name: "Paperclip",
					},
					{
						id: 'dashicons-chart-pie',
						class: 'dashicons-chart-pie',
						name: "Pie Chart",
					},
					{
						id: 'dashicons-chart-bar',
						class: 'dashicons-chart-bar',
						name: "Bar Chart",
					},
				]);
			}
		});
	},
};
