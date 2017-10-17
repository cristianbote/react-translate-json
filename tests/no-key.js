import path from 'path';
import test from 'ava';
import './utilities/fetchify';
import is from './utilities/is';
import { setConfig, translate } from '../index';

setConfig({
    pathPrefix: path.resolve(__dirname, './utilities'),
    locale: 'en'
});

test('Should throw the catch if the key is not a value', t => {
    return translate(null).then(res => {}).catch(e => {
        t.is(e, 'Looks like it\'s a no \'null\'');
    });
});

test('Should throw the catch if the key is not defined', t => {
    return translate('NO_KEY').then(res => {}).catch(e => {
        t.is(e, 'Could not find the key \'NO_KEY\' in the translation file. Make sure a key with that name exists.')
    });
});

test('Doing it once more', t => {
    return translate('HELLO').then(res => {
        t.is(res, 'Hi!');
    });
});

test('Doing it twice more', t => {
    return translate('HELLO').then(res => {
        t.is(res, 'Hi!');
    });
});