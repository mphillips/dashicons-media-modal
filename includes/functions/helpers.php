<?php
namespace DashiconsMediaModal\Helpers;

/**
 * Get the filename extension for scripts. This changes depending on if SCRIPT_DEBUG is turned on or off.
 *
 * @return string The script filename extension.
 */
function get_script_extension() {
	if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
		return '.js';
	}

	return '.min.js';
}

/**
 * Get the filename extension for styles. This changes depending on if SCRIPT_DEBUG is turned on or off.
 *
 * @return string The script filename extension.
 */
function get_style_extension() {
	if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
		return '.css';
	}

	return '.min.css';
}
