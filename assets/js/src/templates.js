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
