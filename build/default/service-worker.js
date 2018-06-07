/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/font-roboto/roboto.html","31c2e28f3f926e78961662fcfc98bd44"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","810446bf3aa4646f4a4b679ccd1a13ef"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","b216ddf5b140814ac9d79031789de423"],["bower_components/iron-a11y-keys/iron-a11y-keys.html","4eee2bfad7a7006718c2fb079f572d79"],["bower_components/iron-ajax/iron-ajax.html","9252ad906bc08605f9e46e5404d49c2b"],["bower_components/iron-ajax/iron-request.html","cbe67ba0d6274a558cd8196f2f9a5b07"],["bower_components/iron-behaviors/iron-button-state.html","2ee8b97f0dc42f816c3982c7464fa346"],["bower_components/iron-behaviors/iron-control-state.html","6143543da11673e4e614959df7ca57d4"],["bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","4c28db5d3dca57a310fc95cead5c0650"],["bower_components/iron-flex-layout/iron-flex-layout.html","b8aa79f9be851cf7ecc5a6f8c2c09d98"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","e27846dbc0f7128d6b30eeee865cb7fb"],["bower_components/iron-form/iron-form.html","4a76c86a30432d616defe4c31e6d428a"],["bower_components/iron-input/iron-input.html","c65a0093a7be6e0c735a2396cb174570"],["bower_components/iron-meta/iron-meta.html","b00996d776a98c7e895b4511609267e3"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","fc89a6d9ab09bee14ed08d515374a4be"],["bower_components/paper-behaviors/paper-button-behavior.html","a0b4157e2a9b7f45a364d3c6601b358e"],["bower_components/paper-behaviors/paper-checked-element-behavior.html","b6420568ddb56f92e2d55e1122d4284a"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","4c05d6417c14adaa64a7be4603380413"],["bower_components/paper-behaviors/paper-ripple-behavior.html","6a6b928ccf33c4dd4e290de99bd4e733"],["bower_components/paper-button/paper-button.html","827563d5281fbd9ee09e3f3fa272e710"],["bower_components/paper-checkbox/paper-checkbox.html","582c34b7715c198bb342dddf200dad67"],["bower_components/paper-input/paper-input-addon-behavior.html","66367676418505e46082a6a2020117d4"],["bower_components/paper-input/paper-input-behavior.html","14bf7a7b2fb24de7a7c0327088ba0aaa"],["bower_components/paper-input/paper-input-char-counter.html","e5d51d281f1af8713ed1b9f303e16d04"],["bower_components/paper-input/paper-input-container.html","d04ffc85683e1c5f9a9b995b00a0f572"],["bower_components/paper-input/paper-input-error.html","a427e5d4281a518b1c816b753140e50c"],["bower_components/paper-input/paper-input.html","723b3d52afed4afd3c9031fd2b73406a"],["bower_components/paper-ripple/paper-ripple.html","8853b9cea48cfefe4336fb8d6a888d05"],["bower_components/paper-styles/color.html","2b6b926e5bd4005bdbdcd15a34a50b95"],["bower_components/paper-styles/default-theme.html","9480969fcd665e90201b506a4737fa1a"],["bower_components/paper-styles/element-styles/paper-material-styles.html","b0a38bd2eb6f4c4844d4903a46268c92"],["bower_components/paper-styles/paper-styles.html","33cfef4367ded323b985916687dc51e7"],["bower_components/paper-styles/shadow.html","2fbe595f966eebe419b9b91611d6392a"],["bower_components/paper-styles/typography.html","772d86cecdd75864b7d5f6760255665c"],["bower_components/polymer/lib/elements/array-selector.html","40833bb6ccfbe066ede479e2c47a09b9"],["bower_components/polymer/lib/elements/custom-style.html","15dd9ae3b5bc087ed7cf5ac0ba160d5a"],["bower_components/polymer/lib/elements/dom-bind.html","97f984478c77a77d9ef9aeb8553e8d0d"],["bower_components/polymer/lib/elements/dom-if.html","39d613057880f151ce67b1f4591c35fb"],["bower_components/polymer/lib/elements/dom-module.html","828ff317d6741709c7b4e20a2999b1db"],["bower_components/polymer/lib/elements/dom-repeat.html","50a57435fa891744dba9cd612974da2e"],["bower_components/polymer/lib/legacy/class.html","8ae3722fbd015ebf0995350b1bdd0481"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","b9f5b2cded57fbaa6879f2522cc7a5e5"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","4df2a7f7803d35928f5e740e85443ece"],["bower_components/polymer/lib/legacy/polymer-fn.html","daea28b40e0edb539f4903526568e2bc"],["bower_components/polymer/lib/legacy/polymer.dom.html","efc7020ffbf53d8a8099f8f5b021f264"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","ca634ed594d10511c96db0ab26fe4ef3"],["bower_components/polymer/lib/mixins/dir-mixin.html","b09472ace18035afed2447f06516bcd3"],["bower_components/polymer/lib/mixins/element-mixin.html","60d3066b2f91e538ee7b73a88ad44db8"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","1f390af97c2ea2f0647980233e736fdf"],["bower_components/polymer/lib/mixins/mutable-data.html","e14f55be95ffcbb6f0ef9e4a953ac139"],["bower_components/polymer/lib/mixins/properties-changed.html","c5eddee684f3f118f0b35f13d5936160"],["bower_components/polymer/lib/mixins/properties-mixin.html","a6b644df4a2ef6103d928dd74a8e0ac6"],["bower_components/polymer/lib/mixins/property-accessors.html","11f2333699b9ae5ce9cf9bccae1c731d"],["bower_components/polymer/lib/mixins/property-effects.html","07415330cd9f9fe8b1240cf2125ca510"],["bower_components/polymer/lib/mixins/template-stamp.html","4c34b814b3578e4ac4a0b91af2e72c20"],["bower_components/polymer/lib/utils/array-splice.html","af45213e9722ac2cff72b3da989b2d35"],["bower_components/polymer/lib/utils/async.html","c8c04ca11c20e296606c0c8b5fb09ea5"],["bower_components/polymer/lib/utils/boot.html","4dfff0cf03f1b54d7bf56d878cc7a667"],["bower_components/polymer/lib/utils/case-map.html","a563011a2a9fed423f186d9162c6094e"],["bower_components/polymer/lib/utils/debounce.html","02875756776b14c3522e24be63a20310"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","7e203246cf48da2784a29e970d43482a"],["bower_components/polymer/lib/utils/flush.html","f40554cfd31416e7901d5f53bc77951e"],["bower_components/polymer/lib/utils/gestures.html","19d09d491e35214523fc1872b46fc082"],["bower_components/polymer/lib/utils/html-tag.html","40b52607129959875fd9c5758c89bf4c"],["bower_components/polymer/lib/utils/import-href.html","e044c6fe4562d8a74b95d5a1a4aa3c02"],["bower_components/polymer/lib/utils/mixin.html","c71de329b72d40b1da56fb13d0d196b7"],["bower_components/polymer/lib/utils/path.html","009e390d6f45dda28859e3fa90216e89"],["bower_components/polymer/lib/utils/render-status.html","ef95ca0eec4a9f8ed210830b6a367cec"],["bower_components/polymer/lib/utils/resolve-url.html","6bac182b4ac9ca300fe99ead2bc2ce23"],["bower_components/polymer/lib/utils/settings.html","55f3e717e0bfb2e61322d72e968969ee"],["bower_components/polymer/lib/utils/style-gather.html","a0267c1f749ae6fa8e376b6b8768dd98"],["bower_components/polymer/lib/utils/templatize.html","1c7d51843e476a2d11fb362e221e71fa"],["bower_components/polymer/lib/utils/unresolved.html","0db19a736bfeca0ea0a265784fdbc45a"],["bower_components/polymer/polymer-element.html","c9cd6da96eb2c41a553b81309fa2a57b"],["bower_components/polymer/polymer.html","b8d6e0b7108b5487c5056745d4260fee"],["bower_components/shadycss/apply-shim.html","f220299c2be1b5040111843d640b70a5"],["bower_components/shadycss/apply-shim.min.js","4a352fe7c467ea3e027a57657e92d0a0"],["bower_components/shadycss/custom-style-interface.html","0a68ea0f3af7bcb1ca6617e512f720cb"],["bower_components/shadycss/custom-style-interface.min.js","4cd4611db24160366f99ab04902f88ae"],["bower_components/webcomponentsjs/webcomponents-loader.js","f7eb9862b1725aef7e59f8584c2a2efb"],["index.html","ddf1dca6cc846890a06ca63ab78bb065"],["src/bm-abv-calculator-app/bm-abv-calculator-app.html","696ecb7ccfb7230a0dab7d763bb179a0"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







