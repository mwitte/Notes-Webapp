EntityObjectStorage.prototype = new SimpleStorage;
function EntityObjectStorage(storageKey){
	this.storageKey = storageKey;

	/**
	 * Restores an object from a stored array by
	 *
	 * @param key
	 * @param property
	 * @param identifier
	 */
	this.remove = function (object, property){
		var result = 0;
		var storedObjects = Storage.restore(this.storageKey);
		if(typeof storedObjects !== "undefined" && storedObjects instanceof Object){
			$.each(storedObjects, function( key, storedElement ) {
				if(storedElement[property] == object[property]){
					//storedObjects.splice(key, 1);
					delete storedObjects[key];
					result = 1;
				}
			});
			Storage.store(this.storageKey, storedObjects);
		}
	}

	/**
	 * Restores an object from a stored array by
	 *
	 * @param key
	 * @param property
	 * @param identifier
	 */
	restore = function(identifier, property){
		var object = null;
		var storedObjects = Storage.restore(this.storageKey);
		if(typeof storedObjects !== "undefined" && storedObjects instanceof Object){
			$.each(storedObjects, function( key, storedElement ) {
				if(storedElement[property] == identifier){
					object = storedElement;
				}
			});
		}
		return object;
	}

	/**
	 * Stores an object in an array, if element is found by property's identifier, given object will
	 * replace old element in array
	 *
	 * @param key
	 * @param property
	 * @param object
	 */
	this.store = function(object, property){
		var result = 0;
		var storedObjects = Storage.restore(this.storageKey);
		if(typeof storedObjects !== "undefined" && storedObjects instanceof Object){
			$.each(storedObjects, function( key, storedElement ) {
				if(storedElement[property] == object[property]){
					// ad object to original array
					storedObjects[key] = object;
					result = 1;
				}
			});
			if(result == 0){
				storedObjects[Object.keys(storedObjects).length] = object;
			}
		}else{
			storedObjects = {0: object};
		}
		Storage.store(this.storageKey, storedObjects);
	}
}