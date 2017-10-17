import path from 'path';
import test from 'ava';
import './utilities/fetchify';
import is from './utilities/is';
import { setConfig, setJson, translate } from '../index';

test('Check the types', t => {
    t.is(is(setConfig), 'function', '"setConfig" should not a function');
    t.is(is(setJson), 'function', '"setJson" should be a function');
    t.is(is(translate), 'function', '"translate" should be a function');
});

test('Setup the services and see if it works', t => {
    let promise = translate('HELLO').then(res => {
        t.is(res, 'Hi!');
    });

    t.is(is(promise), 'promise', '"translate" returned something that is not a promise');

    setConfig({
        pathPrefix: path.resolve(__dirname, './utilities'),
        locale: 'en',
        extension: 'json',
        fallbackLocale: 'en'
    });

    return promise;
});

test('Works with params', t => {
    return translate('USER', { user: 'John' })
        .then(res => {
            t.is(res, 'Hi John!', 'That was unexpected!');
        });
});

test('Works with chained references', t => {
    return translate('PAGE.HOME.TITLE')
        .then(res => {
            t.is(res, 'Homepage title', 'Didnt work, try again');
        });
});