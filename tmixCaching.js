'use strict';

angular.module('tmixCaching', [])
    .factory('tmixCaching', ['$cacheFactory', function ($cacheFactory) {
        //*********
        // PURPOSE: Extends angular's $cacheFactory with time based functionality.  Allows the
        //          user to set a timeout on cache objects.
        //*********






        /****************** Functions *****************************/
        /**
         * Removes the specified item from cache.
         *
         * @param {string} name The name of the item to remove.
         */
        var destroy = function (name) {
            //Get the item and destroy it
            var cache = $cacheFactory.get(name);
            cache.destroy();
        };





        /**
         * Gets an item from cache and returns it.
         *
         * @param {string} name The name of the item to get from cache.
         * @return {object} The object that was put into cache.
         */
        var get = function (name) {
            //Attempt to get the item from cache
            var cache = $cacheFactory.get(name);

            //Check if the item is still valid (has not timed out)
            if (isValid(name)) {
                //It is valid so return the item
                return cache.get('_object');
            } else {
                //It is not valid so check if it actually exists
                if (cache) {
                    //It exists so it timed out.  Destroy it.
                    cache.destroy();
                }
                return null;
            }
        };





        /**
         * Gets a copy of an item from cache and returns it.
         *
         * @param {string} name The name of the item to get from cache.
         * @return {object} A copy of the object that was put into cache.
         */
        var getAsCopy = function (name) {
            //Attempt to get the item from cache
            var cacheItem = get(name);

            //Check if the item was in cache
            if (cacheItem) {
                //Yes so return a copy of it
                return angular.copy(cacheItem);
            } else {
                //Object doesn't exist in cache
                return null;
            }
        };






        /**
         * Gets the timeout value for an item in cache.
         *
         * @param {string} name The name of the item in cache.
         * @return {integer} The number of milliseconds the object can be in cache before timing out.
         */
        var getTimeout = function (name) {
            //Get the item from cache
            var cache = $cacheFactory.get(name);
            //Check if the item was found in cache
            if (cache) {
                //It does so return its timeout value
                return cache.get('_timeout');
            } else {
                //Object doesn't exist in cache
                return null;
            }
        };





        /**
         * Gets the time remaining before a cache item times out.
         *
         * @param {string} name The name of the item in cache.
         * @return {integer} The number of milliseconds remaining before the object's cache times out.
         */
        var getTimeRemaining = function (name) {
            //Get the item from cache
            var cache = $cacheFactory.get(name);
            //Check if the item was found in cache
            if (cache) {
                //It does so return its timeout value
                return cache.get('_timeout') - (new Date().getTime() - cache.get('_timeStamp'));
            } else {
                //Object doesn't exist in cache
                return null;
            }
        };





        /**
         * Gets the timestamp for when the item was put into cache.
         *
         * @param {string} name The name of the item in cache.
         * @return {date} The datetime when the object was put into cache.
         */
        var getTimeStamp = function (name) {
            //Get the item from cache
            var cache = $cacheFactory.get(name);
            //Check if the item was found in cache
            if (cache) {
                //It exists so return the timestamp
                return cache.get('_timeStamp');
            } else {
                //Object doesn't exist in cache
                return null;
            }
        };





        /**
         * Checks if an item in cache has not timed out.
         *
         * @param {string} name The name of the item in cache.
         */
        var isValid = function (name) {
            //Get the item from cache
            var cache = $cacheFactory.get(name);
            //Check if the item was not in cache
            if (!cache) {
                //Not in cache so not valid
                return false;
            }

            //It was in cache so get the item's timestamp
            var cacheTimeStamp = cache.get('_timeStamp');

            //Check to make sure a timestamp was found
            if (cacheTimeStamp) {
                //Timestamp found so get the timeout value
                var timeout = cache.get('_timeout');

                //Check if a timeout was set
                if (timeout) {
                    //A timeout was set so get current time
                    var currentDate = new Date();

                    //Check if the item has not timed out
                    if (currentDate.getTime() - cacheTimeStamp.getTime() < timeout) {
                        //Not timed out yet so is valid
                        return true;
                    }
                } else {
                    //No timeout so is valid
                    return true;
                }
            }
        };





        /**
         * Adds an item to cache.
         *
         * @param {string} name The name of the item in cache.
         * @param {object} value The item to put into cache.
         * @param {integer} milliseconds The amount of milliseconds until the cache times out.  If null, the item does not time out.
         */
        var put = function (name, value, milliseconds) {
            //Get the item from cache
            var cache = $cacheFactory.get(name);
            //Check if the item was not found
            if (!cache) {
                //Not found so add the item to cache
                cache = $cacheFactory(name);
            }

            //Add the object value to cache
            cache.put('_object', value);

            //Add the current timestamp to cache
            cache.put('_timeStamp', new Date());

            //Check if milliseconds were sent to the function
            if (milliseconds) {
                //Milliseconds found so add it to cache
                cache.put('_timeout', milliseconds);
            }
        };





        /**
         * Adds a copy of an item to cache.
         *
         * @param {string} name The name of the item in cache.
         * @param {object} value The item to put into cache.
         * @param {integer} milliseconds The amount of milliseconds until the cache times out.  If null, the item does not time out.
         */
        var putAsCopy = function (name, value, milliseconds) {
            //Create a copy of the object
            var valueCopy = angular.copy(value);

            //Call the function to add it to cache
            put(name, valueCopy, milliseconds);
        };







        //Make methods public
        return {
          destroy: destroy,
          get: get,
          getAsCopy: getAsCopy,
          getTimeout: getTimeout,
          getTimeRemaining: getTimeRemaining,
          getTimeStamp: getTimeStamp,
          isValid : isValid,
          put: put,
          putAsCopy: putAsCopy
        }

    }]
);
