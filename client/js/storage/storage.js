/**
 * Created by horacio on 07/09/2016.
 */

define([], function () {
    class Storage {
        constructor() {
            this.cache = {};
            this.available = typeof(Storage) !== "undefined";
        }
    
        isAvailable() {
            return this.available;
        }
    
        // devuelve los valores defaults cambiando a (o sumandole) los que esten el storage
        getItem(key, defaultValue) {
            let userData;
            if (!this.cache.hasOwnProperty(key) && this.available) {
                if (localStorage.getItem(key)) {
                    this.cache[key] = JSON.parse(localStorage.getItem(key));
                    userData = this.cache[key];
                }
            }
            return Object.assign({}, defaultValue, userData);
        }
    
        setItem(key, value) {
            value = value || {};
            this.cache[key] = Object.assign({}, value);
            if (this.available) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                } catch (e) {
                    console.log("localStorage is full", e);
                }
            }
        }
    
        removeItem(key) {
            if (this.cache.hasOwnProperty(key))
                delete this.cache[key];
            if (this.available) {
                localStorage.removeItem(key);
            }
        }
    
    }    

    return Storage;
});