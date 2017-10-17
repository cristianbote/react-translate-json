let cache = {};
let json = null;
let subscribers = {};
let configuration = {};

/**
 * Generate unique uid
 * @returns {string}
 */
function uid() {
    return Math.round(Math.random() * Date.now()).toString(32);
}

/**
 * Subscribe for updates
 * @param {function} fn
 * @returns {function}
 */
function subscribe(fn) {
    let id = uid();
    subscribers[id] = fn;
    return () => {
        delete subscribers[id];
    }
}

/**
 * Returns a flat key declaration with the value from a json structure
 * @param {string} key
 * @param {object} json
 * @returns {string}
 */
function getKeyValue(key, json) {
    let levels = key.split('.');
    let latest;
    let i = 0;

    latest = json[levels[i]];

    while(latest) {
        i += 1;

        if (latest[levels[i]]) {
            latest = latest[levels[i]];
        } else {
            break;
        }
    }

    cache[key] = latest;

    return latest;
}

/**
 * Compiles the value with the given params
 * @param {string} value
 * @param {object} [params]
 * @returns {string}
 */
function compile(value, params) {
    // If there's a model for translations
    if (params) {
        for (let p in params) {
            value = value.replace(new RegExp(['{{', p, '}}'].join(''), 'gm'), params[p]);
        }
    }

    return value;
}

/**
 * Translate the key
 * @param {string} key
 * @param {object} [params]
 * @returns {Promise}
 */
function translate(key, params = {}) {
    return new Promise((resolve, reject) => {

        // If there's no key
        if (!key) {
            reject(`Could not find the key '${key}' in the translation file. Make sure a key with that name exists.`);
        }

        // If the 'key' is cached
        if (cache[key]) {
            resolve(compile(cache[key], params));
            return;
        }

        // If there's a 'json' defined
        if (json) {
            resolve(compile(getKeyValue(key, json), params));
            return;
        }

        // Subscribe to updates
        let unsub = subscribe(() => {
            unsub();
            resolve(compile(getKeyValue(key, json), params));
        });
    });
}

/**
 * Consume the subscribers
 */
function consumeSubscribers() {
    Object.keys(subscribers)
        .forEach(key => {
            subscribers[key]();
        });
}

/**
 * Parse the extension to make sure we have the dot in it
 * @param {string} val
 * @returns {string}
 */
function parseExtension(val) {
    return val[0] === '.' ? val : `.${val}`;
}

/**
 * Lodas the fallback locale.
 */
function loadFallbackLocale() {
    let {
        pathPrefix,
        fallbackLocale,
        extension
    } =  configuration;

    const url = `${pathPrefix}/${fallbackLocale}${extension}`;

    !configuration.silent && console.info(`react-translate-json: Loading fallback translation file. ${url}`);

    fetch(url)
        .then(res => res.json())
        .then(res => json = res)
        .then(consumeSubscribers)
        .catch(e => {
            !configuration.silent && console.error(`react-translate-json: Loading fallback locale failed. Url ${url}`);
        });
}

/**
 * Loads the locale files and calls the fallback if this fails
 */
function loadLocale() {
    let {
        pathPrefix,
        locale,
        extension
    } =  configuration;

    const url = `${pathPrefix}/${locale}${extension}`;

    fetch(url)
        .then(res => res.json())
        .then(res => json = res)
        .then(consumeSubscribers)
        .catch(loadFallbackLocale);
}

/**
 * Set the configuration for the translation
 * @param {string} pathPrefix
 * @param {string} locale
 * @param {string} fallbackLocale
 * @param {string} [extension=.json]
 * @param {boolean} [silent=false]
 */
function setConfig({ pathPrefix, locale, fallbackLocale, extension, silent }) {
    configuration = {
        pathPrefix,
        locale,
        fallbackLocale,
        extension: extension && parseExtension(extension) || '.json',
        silent: silent || false
    };

    // Load up the translation files
    loadLocale();
}

export {
    translate,
    setConfig
}

// Export the TranslateComponent
export * from './src/translate-component';