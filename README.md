tmix-caching
============

AngularJS service that extends the $cacheFactory with time out functionality.



## Usage

__Step 1: Install via Bower__
```
bower install tmix-caching --save
```
  
__Step 2: Add the script reference in Index.html (bower may do this for you already)__


```
<script src="bower_components/tmix-caching/tmixCaching.js"></script>
```

__Step 3: Add tmixCaching as a dependency in your app__

```
angular.module('MYAPPNAME', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'angulartics.google.analytics',
  'tmixCaching'
])
...
```


__Step 4: Inject the service where used__


```
// Example adding tmixCaching dependency
angular.module('myApp')
  .factory('myService', function(tmixCaching) {
    // Service logic
    // ...
  });
```


## Methods

### destroy()

__destroy(name)__

Removes an object from angular's cache.

* name (required): string

__Sample Code Snippet Using destroy()__

```
intcCaching.destroy('myCache');
```

### get()

__get(name)__

Returns the specified object from cache.  Will return a null if the object does not exist or has timed out.

* name (required): string The name of the cache object.
* _Returns the specified object from cache_

__Sample Code Snippet Using get()__

```
var myData = intcCaching.get('myCache');
```

### getAsCopy()

__getAsCopy(name)__

Returns a copy of the specified object from cache.  Will return a null if the object does not exist or has timed out.

* name (required): string The name of the cache object.
* _Returns a copy of the specified object from cache_

__Sample Code Snippet Using getAsCopy()__

```
var myData = intcCaching.getAsCopy('myCache');
```

### getTimeout()

__getTimeout(name)__

Returns the specified object's millisecond timeout value.  Will return a null if the object does not exist.

* name (required): string The name of the cache object.
* _Returns the specified object's millisecond timeout value_

__Sample Code Snippet Using getTimeout()__

```
var myDataTimeout = intcCaching.getTimeout('myCache');
```

### getTimeRemaining()

__getTimeRemaining(name)__

Returns the number of milliseconds until the object times out.  Will return a null if the object does not exist.

* name (required): string The name of the cache object. 
* _Returns the number of millseconds until the specified object times out_

__Sample Code Snippet Using getTimeStamp()__

```
var remainingTime = intcCaching.getTimeRemaining('myCache');
```

### getTimeStamp()

__getTimeStamp(name)__

Returns the specified object's timestamp from when it was put in cache.  Will return a null if the object does not exist.

* name (required): string The name of the cache object.
* _Returns the specified object's timestamp from when it was put in cache_

__Sample Code Snippet Using getTimeStamp()__

```
var myDataTimeStamp = intcCaching.getTimeStamp('myCache');
```

### isValid()

__isValid(name)__

Returns a boolean indicating if the object is in cache and is still valid (within the timeout value).

* name (required): string The name of the cache object.
* _Returns a boolean indicating if the object is valid_

__Sample Code Snippet Using isValid()__

```
var myDataValid = intcCaching.isValid('myCache');
```

### put()

__put(name, value, milliseconds)__

Puts an object into angular's cache with an optional timeout value.  If a millisecond timeout is included, the get method will test against the millisecond timeout value. If millisecond timeout value is not included, the get method will always return the value object.

* name (required): string The name of the cache object.
* value (required): primitive/object The item to put into cache.
* milliseconds (optional): integer The number of milliseconds until the item's cache expires.

__Sample Code Snippet Using put() with a one hour timeout value__

```
intcCaching.put('myCache', myObjectToPutInCache, 3600000);
```

__Sample Code Snippet Using put() with no timeout value__

```
intcCaching.put('myCache', myObjectToPutInCache);
```  
  
### putAsCopy()

__putAsCopy(name, value, milliseconds)__

Puts a copy of an object into angular's cache with an optional timeout value.  If a millisecond timeout is included, the get method will test against the millisecond timeout value. If millisecond timeout value is not included, the get method will always return the copy of the value object.

* name (required): string The name of the cache object.
* value (required): primitive/object The item to put into cache.
* milliseconds (optional): integer The number of milliseconds until the item's cache expires.

__Sample Code Snippet Using putAsCopy() with a one hour timeout value__

```
intcCaching.putAsCopy('myCache', myObjectToPutInCache, 3600000);
```

__Sample Code Snippet Using putAsCopy() with no timeout value__

```
intcCaching.putAsCopy('myCache', myObjectToPutInCache);
```


