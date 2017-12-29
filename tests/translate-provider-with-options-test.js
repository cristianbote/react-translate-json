import path from 'path';
import './utilities/fetchify';
import test from 'ava';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setJson, TranslateProvider } from '../index';
import { TranslateComponent } from '../react';

configure({ adapter: new Adapter() });

const pathPrefix = path.resolve(__dirname, './utilities');
const options = {
    pathPrefix,
    locale: "en",
    extension: "json",
    fallbackLocale: "en"
};

test("Let's test the provider with options", t => {
    const provider = shallow(<TranslateProvider {...options} />);
    const comp = shallow(<TranslateComponent label="HELLO"/>);

    return new Promise(resolve => {
        setTimeout(() => {
            comp.update();
            t.is(comp.contains(<span>Hi!</span>), true, 'Provider doesnt work');
            resolve();
        });
    });
});
