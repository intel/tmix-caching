'use strict';

//This is the main test covering sorting, paging, filtering, and grouping
describe('Service: tmixCaching', function () {

    //Declare variables
    var tmixCaching;
    var CacheName = 'myCache';
    var BadCacheName = 'badName';
    var CacheTimeout = 500;
    var Clock;

    //Object to put into cache
    var CacheTest = {
        name: 'Test 1',
        value: 'Value 1'
    };




    //Do setup
    beforeEach(function () {
        //Create the module
        module('tmixCaching');


        inject(function (_tmixCaching_, $cacheFactory) {
            tmixCaching = _tmixCaching_;
        });

        Clock = sinon.useFakeTimers();
    });



    //Clean up
    afterEach(function () {
        Clock.restore();
    });







    it('should should put an item into cache and return it', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest);

        //Get it from cache
        var returnCache = tmixCaching.get(CacheName);

        //Should be the same object
        expect(returnCache).toBe(CacheTest);
    });




    it('should put a copy of an item into cache and then return the copy', function () {
        //Put it into cache as a copy
        tmixCaching.putAsCopy(CacheName, CacheTest);

        //Get it from cache
        var returnCache = tmixCaching.get(CacheName);

        //Should not be the same object
        expect(returnCache).not.toBe(CacheTest);

        //Test that the objects are equal
        var objectsEqual = angular.equals(CacheTest, returnCache);
        expect(objectsEqual).toBe(true);
    });




    it('should put an item into cache and then return a copy of it', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest);

        //Get it from cache as a copy
        var returnCache = tmixCaching.getAsCopy(CacheName);

        //Should not be the same object
        expect(returnCache).not.toBe(CacheTest);

        //Test that the objects are equal
        var objectsEqual = angular.equals(CacheTest, returnCache);
        expect(objectsEqual).toBe(true);
    });




    it('should should put an item into cache and destroy it', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest);

        //Get it from cache
        var returnCache = tmixCaching.get(CacheName);

        //Should be the same object
        expect(returnCache).toBe(CacheTest);

        //Destroy the object in cache
        tmixCaching.destroy(CacheName);

        //The object should no longer be found in cache
        returnCache = tmixCaching.get(CacheName);
        expect(returnCache).toBe(null);
    });




    it('should should put an item into cache and time it out after the timeout value passes', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest, CacheTimeout);

        //Get it from cache
        var returnCache = tmixCaching.get(CacheName);

        //Should be the same object
        expect(returnCache).toBe(CacheTest);

        //Move the clock past the timeout
        Clock.tick(CacheTimeout + 1);

        //The object should no longer be in cache
        returnCache = tmixCaching.get(CacheName);
        expect(returnCache).toBe(null);
    });




    it('should should put an item into cache and return its timeout value', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest, CacheTimeout);

        //Get it from cache
        var returnCache = tmixCaching.get(CacheName);

        //Should be the same object
        expect(returnCache).toBe(CacheTest);

        //Make sure its timeout value is the same
        var timeout = tmixCaching.getTimeout(CacheName);
        expect(timeout).toBe(CacheTimeout);
    });




    it('should should put an item into cache and return its time remaining until it expires', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest, CacheTimeout);

        //Get it from cache
        var returnCache = tmixCaching.get(CacheName);

        //Should be the same object
        expect(returnCache).toBe(CacheTest);

        //Move the clock forward 100 milliseconds
        Clock.tick(100);

        //The time remaining should be the cache timeout minus the clock forward
        var timeRemaining = tmixCaching.getTimeRemaining(CacheName);
        expect(timeRemaining).toBe(CacheTimeout - 100);
    });




    it('should should put an item into cache and return its timestamp ', function () {
        //Move the clock forward 100 milliseconds
        Clock.tick(100);

        //Put it into cache
        tmixCaching.put(CacheName, CacheTest, CacheTimeout);

        //Get it from cache
        var returnCache = tmixCaching.get(CacheName);

        //Should be the same object
        expect(returnCache).toBe(CacheTest);

        //Move the clock forward another 100 milliseconds
        Clock.tick(100);

        //The object was put in cache in at 100 milliseconds
        var timestamp = tmixCaching.getTimeStamp(CacheName).getTime();
        expect(timestamp).toBe(100);
    });




    it('should should put an item into cache and return a null when the wrong name is used to get it', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest);

        //Get it from cache
        var returnCache = tmixCaching.get(CacheName);

        //Attempt to get it from cache using the wrong name
        var badReturnCache = tmixCaching.get(BadCacheName);

        //The right name should be the same object
        expect(returnCache).toBe(CacheTest);

        //The wrong name should null
        expect(badReturnCache).toBe(null);
    });




    it('should should put an item into cache and return a null when the wrong name is used to get it as a copy', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest);

        //Get it from cache as a copy
        var returnCache = tmixCaching.getAsCopy(CacheName);

        //Attempt to get it from cache using the wrong name
        var badReturnCache = tmixCaching.getAsCopy(BadCacheName);

        //Test that the right name returned an equal object
        var objectsEqual = angular.equals(CacheTest, returnCache);
        expect(objectsEqual).toBe(true);

        //The wrong name should be null
        expect(badReturnCache).toBe(null);
    });




    it('should should put an item into cache and return a null for its timestamp when the wrong name is used to get it', function () {
        //Move the clock forward 100 milliseconds
        Clock.tick(100);

        //Put it into cache
        tmixCaching.put(CacheName, CacheTest, CacheTimeout);

        //Its timestamp should match the 100 milliseconds
        var timeout = tmixCaching.getTimeStamp(CacheName).getTime();
        expect(timeout).toBe(100);

        //The wrong name should be null
        var badTimeout = tmixCaching.getTimeStamp(BadCacheName);
        expect(badTimeout).toBe(null);
    });




    it('should should put an item into cache and return a null for its time remaining when the wrong name is used to get it', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest, CacheTimeout);

        //Move the clock forward 100 milliseconds
        Clock.tick(100);

        //Get the time remaining when the right name was used
        var timeout = tmixCaching.getTimeRemaining(CacheName);
        expect(timeout).toBe(CacheTimeout - 100);

        //The wrong name should be null
        var badTimeout = tmixCaching.getTimeRemaining(BadCacheName);
        expect(badTimeout).toBe(null);
    });




    it('should should put an item into cache and return a null for its timeout  when the wrong name is used to get it', function () {
        //Put it into cache
        tmixCaching.put(CacheName, CacheTest, CacheTimeout);

        //Its timeout should match what was sent in
        var timeout = tmixCaching.getTimeout(CacheName);
        expect(timeout).toBe(CacheTimeout);

        //The wrong name should be null
        var badTimeout = tmixCaching.getTimeout(BadCacheName);
        expect(badTimeout).toBe(null);
    });
});