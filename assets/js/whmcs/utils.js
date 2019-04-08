/**
 * General utilities module
 *
 * @copyright Copyright (c) WHMCS Limited 2005-2017
 * @license http://www.whmcs.com/license/ WHMCS Eula
 */
(function(module) {
    if (!WHMCS.hasModule('utils')) {
        WHMCS.loadModule('utils', module);
    }
})(
function () {
    /**
     * Not crypto strong; server-side must discard for
     * something with more entropy; the value is sufficient
     * for strong client-side validation check
     */
    this.simpleRNG = function () {
        var chars = './$_-#!,^*()|';
        var r = 0;
        for (var i = 0; r < 3; i++) {
            r += Math.floor((Math.random() * 10) / 2);
        }
        r = Math.floor(r);
        var s = '';
        for (var x = 0; x < r; x++) {
            v = (Math.random() + 1).toString(24).split('.')[1];
            if ((Math.random()) > 0.5) {
                s += btoa(v).substr(0,4)
            } else {
                s += v
            }

            if ((Math.random()) > 0.5) {
                s += chars.substr(
                    Math.floor(Math.random() * 13),
                    1
                );
            }
        }

        return s;
    };

    this.getRouteUrl = function (path) {
        return whmcsBaseUrl + "/index.php?rp=" + path;
    };

    this.validateBaseUrl = function() {
        if (typeof window.whmcsBaseUrl === 'undefined') {
            console.log('Warning: The WHMCS Base URL definition is missing '
                + 'from your active template. Please refer to '
                + 'https://docs.whmcs.com/WHMCS_Base_URL_Template_Variable '
                + 'for more information and details of how to resolve this '
                + 'warning.');
            window.whmcsBaseUrl = this.autoDetermineBaseUrl();
            window.whmcsBaseUrlAutoSet = true;
        } else if (window.whmcsBaseUrl === ''
            && typeof window.whmcsBaseUrlAutoSet !== 'undefined'
            && window.whmcsBaseUrlAutoSet === true
        ) {
            window.whmcsBaseUrl = this.autoDetermineBaseUrl();
        }
    };

    this.autoDetermineBaseUrl = function() {
        var windowLocation = window.location.href;
        var phpExtensionLocation = -1;

        if (typeof windowLocation !== 'undefined') {
            phpExtensionLocation = windowLocation.indexOf('.php');
        }

        if (phpExtensionLocation === -1) {
            windowLocation = jQuery('#Primary_Navbar-Home a').attr('href');
            if (typeof windowLocation !== 'undefined') {
                phpExtensionLocation = windowLocation.indexOf('.php');
            }
        }

        if (phpExtensionLocation !== -1) {
            windowLocation = windowLocation.substring(0, phpExtensionLocation);
            var lastTrailingSlash = windowLocation.lastIndexOf('/');
            if (lastTrailingSlash !== false) {
                return windowLocation.substring(0, lastTrailingSlash);
            }
        }

        return '';
    };

    return this;
});

WHMCS.utils.validateBaseUrl();
