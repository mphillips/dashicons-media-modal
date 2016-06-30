<?php

namespace DashiconsMediaModal\Tabs;

/**
 * Abstract class to add a new tab to the media modal.
 */
abstract class AbstractTab {

	/**
	 * Set up the class.
	 */
	function setup() {
		add_action(
			'wp_enqueue_media',
			array( $this, 'load_media_scripts' )
		);

		add_action(
			'wp_enqueue_media',
			array( $this, 'load_media_styles' )
		);

		add_action(
			'wp_enqueue_scripts',
			array( $this, 'load_public_styles' )
		);
	}

	/**
	 * Load scripts for the tab.
	 */
	public function load_media_scripts() {

	}

	/**
	 * Load styles for the tab.
	 */
	public function load_media_styles() {

	}

	/**
	 * Load styles for the front-end.
	 */
	public function load_public_styles() {

	}

	/**
	 * Get the path for javascript assets.
	 *
	 * @return string
	 */
	function get_js_path() {
		return trailingslashit( DASHICONS_MM_URL ) . 'assets/js';
	}

	/**
	 * Get the path for sytle assets.
	 *
	 * @return string
	 */
	function get_css_path() {
		return trailingslashit( DASHICONS_MM_URL ) . 'assets/css';
	}

}
