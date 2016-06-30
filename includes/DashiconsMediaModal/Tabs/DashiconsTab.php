<?php

namespace DashiconsMediaModal\Tabs;

class DashiconsTab extends AbstractTab {

	/**
	 * Load styles for the tab.
	 */
	public function load_media_styles() {
		parent::load_media_scripts();

		$ext = \DashiconsMediaModal\Helpers\get_style_extension();

		wp_enqueue_style(
			'dashicons-media-modal-tab',
			trailingslashit( $this->get_css_path() ) . '/dashicons-media-modal' . $ext,
			array(),
			DASHICONS_MM_VERSION
		);
	}

	/**
	 * Load scripts for the tab.
	 */
	public function load_media_scripts() {
		parent::load_media_scripts();

		$ext = \DashiconsMediaModal\Helpers\get_script_extension();

		wp_enqueue_script(
			'dashicons-media-modal-tab',
			trailingslashit( $this->get_js_path() ) . '/dashicons-media-modal' . $ext,
			array( 'jquery', 'backbone', 'underscore' ),
			DASHICONS_MM_VERSION,
			true
		);
	}

	/**
	 * Load styles for the front-end.
	 */
	public function load_public_styles() {
		// Load WordPress' dashicons stylesheet.
		wp_enqueue_style( 'dashicons' );
	}
}
