/**
 * Wrapper for localStorage
 * @type {{store: Function, restore: Function, clear: Function}}
 */
var Storage = {


	/**
	 * Restores an object from a stored array by
	 *
	 * @param key
	 * @param property
	 * @param identifier
	 */
	removeEntityObject: function(key, property, object){
		var result = 0;
		var storedArray = Storage.restore(key);
		if(typeof storedArray !== "undefined" && storedArray instanceof Array){
			for(var i=0; i < storedArray.length; i++){
				var storedElement = storedArray[i];
				if(storedElement[property] == object[property]){
					storedArray.splice(i, 1);
					result = 1;
				}
			}
			Storage.store(key, storedArray);
		}
	},

	/**
	 * Restores an object from a stored array by
	 *
	 * @param key
	 * @param property
	 * @param identifier
	 */
	restoreEntityObjectByIdentifier: function(key, property, identifier){
		var object = null;
		var storedArray = Storage.restore(key);
		if(typeof storedArray !== "undefined" && storedArray instanceof Array){
			for(var i=0; i < storedArray.length; i++){
				var storedElement = storedArray[i];
				if(storedElement[property] == identifier){
					object = storedElement;
				}
			}
		}
		return object;
	},

	/**
	 * Stores an object in an array, if element is found by property's identifier, given object will
	 * replace old element in array
	 *
	 * @param key
	 * @param property
	 * @param object
	 */
	storeEntityObject: function(key, property, object){
		var result = 0;
		var storedArray = Storage.restore(key);
		if(typeof storedArray !== "undefined" && storedArray instanceof Array){
			for(var i=0; i < storedArray.length; i++){
				var storedElement = storedArray[i];
				if(storedElement[property] == object[property]){
					// ad object to original array
					storedArray[i] = object;
					result = 1;
				}
			}
			if(result == 0){
				storedArray.push(object);
			}
		}else{
			storedArray = new Array();
			storedArray.push(object);
		}
		Storage.store(key, storedArray);
	},

	/**
	 * Stores data into the browser storage by key
	 * @param key
	 * @param data
	 */
	store: function (key, data){
		localStorage[key] = JSON.stringify(data);
	},

	/**
	 * Restores data from the browser storage by key
	 * @param key
	 * @param data
	 */
	restore: function(key){
		if(typeof localStorage[key] !== "undefined"){
			return JSON.parse(localStorage[key]);
		}else{
			return null;
		}
	},

	/**
	 * Clears the browser storage
	 */
	clear: function (){
		localStorage.clear();
	}
}