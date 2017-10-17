import path from 'path';
import test from 'ava';
import './utilities/fetchify';
import is from './utilities/is';
import { setConfig, setJson, translate } from '../index';

setConfig({
    pathPrefix: path.resolve(__dirname, './utilities'),
    locale: 'somethingThatDoesNotExists',
    fallbackLocale: 'en',
    extension: '.json'
});

test('Setup the services and see if it works', t => {
    let promise = translate('HELLO').then(res => {
        t.is(res, 'Hi!');
    });

    t.is(is(promise), 'promise', '"translate" returned something that is not a promise');

    return promise;
});

test('Setup the services with invalid fallback', t => {
    setConfig({
        pathPrefix: path.resolve(__dirname, './utilities'),
        locale: 'somethingThatDoesNotExists',
        fallbackLocale: 'ensemble!',
        extension: '.json'
    });
});

test('Setup the services via setJson', t => {
    setJson({
        KEY: "Another {{key}}"
    });

    return translate('KEY', { key: 1 })
        .then(res => t.is(res, 'Another 1'));
});