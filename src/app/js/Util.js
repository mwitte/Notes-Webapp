/**
 * Utility class with some helpers
 */
var U = {
	log: function(text){
		$('#log').prepend(text +'\n');
	}
}

/**
 * Add to Object method to JavaScript Array class
 * @returns {{}}
 */
Array.prototype.toObject = function() {
	var object = {};
	for (var i = 0; i < this.length; ++i)
		object[i] = this[i];
	return object;
}