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
