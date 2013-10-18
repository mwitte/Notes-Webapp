function SimpleStorage(storageKey){
	this.storageKey = storageKey;

	/**
	 * Stores data
	 * @param data
	 */
	this.store = function (data){
		localStorage[this.storageKey] = JSON.stringify(data);
	}

	/**
	 * Restores data
	 * @returns {*}
	 */
	this.restore = function (){
		if(typeof localStorage[this.storageKey] !== "undefined"){
			return JSON.parse(localStorage[this.storageKey]);
		}else{
			return null;
		}
	}

	/**
	 * Clears the storage
	 */
	this.clear = function (){
		localStorage.clear();
	}
}