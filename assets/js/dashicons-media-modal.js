( function( $, window, wp, undefined ) { 
	'use strict'; 

/**
 * Templates for the Dashicons media tab.
 */

window.JST = {};

/**
 * The view template used when displaying an icon in the media modal.
 *
 * @type {String}
 */
window.JST['dashicons-list-item-view'] = _.template(
	'<div class="dashicons item <%= className %> attachment" data-id="<%= id %>"><a href="#" id="dashicons-check-<%= id %>" data-id="<%= id %>" class="check" title="Deselect"><div class="media-modal-icon"></div></a></div>'
);

/**
 * The view template used when displaying an icon on the front-end.
 *
 * @type {String}
 */
window.JST['dashicon-view'] = _.template(
	'<i class="dashicons <%= className %>"></i>'
);

/**
 * Model to represent a Dashicon.
 */
var DashiconItem = Backbone.Model.extend({
	defaults: {
		title: '',
		class: '',
	},
});

/**
 * Collection to represent a list of Dashicons.
 */
var DashiconCollection = Backbone.Collection.extend({
	model: DashiconItem,
});

/**
 * View to represent a Dashicon in the media modal.
 */
var DashiconsMediaItemView = Backbone.View.extend({
	tagName: 'li',
	template: JST['dashicons-list-item-view'],

	initialize: function( options ) {
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

/**
 * The toolbar used on the Dashicons media modal tab.
 */
var DashiconsMediaToolbar = wp.media.view.Toolbar.extend({
	initialize: function() {
		_.defaults( this.options, {
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

/**
 * Class to represent the Dashicons media modal tab.
 */
var DashiconsMediaTabApp = function() {};

DashiconsMediaTabApp.prototype = {
	run: function() {
		this.mediaFrame = new DashiconsMediaFrame({
			container: this,
		});
	}
};

DashiconsMediaTabApp = new DashiconsMediaTabApp();
DashiconsMediaTabApp.run();

})( jQuery, window, wp );