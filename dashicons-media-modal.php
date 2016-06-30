<?php
/**
 * Plugin Name: Dashicons Media Modal
 * Description: A sample plugin to show how to extend the WordPress Media Modal.
 * Version:     1.0.0
 * Author:      Michael Phillips
 * Text Domain: dashicons_mm
 * Domain Path: /languages
 * License:
 */

/**
 * Built using yo wp-make:plugin
 * Copyright (c) 2016 10up, LLC
 * https://github.com/10up/generator-wp-make
 */

// Useful global constants
define( 'DASHICONS_MM_VERSION', '1.0.0' );
define( 'DASHICONS_MM_URL',     plugin_dir_url( __FILE__ ) );
define( 'DASHICONS_MM_PATH',    dirname( __FILE__ ) . '/' );
define( 'DASHICONS_MM_INC',     DASHICONS_MM_PATH . 'includes/' );

// Include files
require_once DASHICONS_MM_INC . 'functions/core.php';
require_once DASHICONS_MM_INC . 'functions/helpers.php';

// Include classes (ideally, we would use an autoloader).
require_once DASHICONS_MM_INC . 'DashiconsMediaModal/Tabs/AbstractTab.php';
require_once DASHICONS_MM_INC . 'DashiconsMediaModal/Tabs/DashiconsTab.php';

// Activation/Deactivation
register_activation_hook( __FILE__, '\DashiconsMediaModal\Core\activate' );
register_deactivation_hook( __FILE__, '\DashiconsMediaModal\Core\deactivate' );

// Bootstrap
DashiconsMediaModal\Core\setup();
