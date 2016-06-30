<?php
namespace DashiconsMediaModal\Core;

use DashiconsMediaModal\Tabs\DashiconsTab as DashiconsTab;

/**
 * Default setup routine
 *
 * @uses add_action()
 * @uses do_action()
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	// Add the Dashicons media modal tab.
	$dashicons_tab = new DashiconsTab();
	$dashicons_tab->setup();

	add_action( 'init', $n( 'i18n' ) );
	add_action( 'init', $n( 'init' ) );

	do_action( 'dashicons_mm_loaded' );
}

/**
 * Registers the default textdomain.
 *
 * @uses apply_filters()
 * @uses get_locale()
 * @uses load_textdomain()
 * @uses load_plugin_textdomain()
 * @uses plugin_basename()
 *
 * @return void
 */
function i18n() {
	$locale = apply_filters( 'plugin_locale', get_locale(), 'dashicons_mm' );
	load_textdomain( 'dashicons_mm', WP_LANG_DIR . '/dashicons_mm/dashicons_mm-' . $locale . '.mo' );
	load_plugin_textdomain( 'dashicons_mm', false, plugin_basename( DASHICONS_MM_PATH ) . '/languages/' );
}

/**
 * Initializes the plugin and fires an action other plugins can hook into.
 *
 * @uses do_action()
 *
 * @return void
 */
function init() {
	do_action( 'dashicons_mm_init' );
}

/**
 * Activate the plugin
 *
 * @uses init()
 * @uses flush_rewrite_rules()
 *
 * @return void
 */
function activate() {
	// First load the init scripts in case any rewrite functionality is being loaded
	init();
	flush_rewrite_rules();
}

/**
 * Deactivate the plugin
 *
 * Uninstall routines should be in uninstall.php
 *
 * @return void
 */
function deactivate() {

}
