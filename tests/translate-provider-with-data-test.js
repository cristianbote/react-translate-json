import test from 'ava';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setJson, TranslateComponent, TranslateProvider } from '../index';

configure({ adapter: new Adapter() });

const json = {
    "HELLO": "yo, {{name}}!",
    "NESTED": {
        "LEVEL": "works"
    },
};

test("Let's test the provider with json", t => {
    const provider = shallow(<TranslateProvider data={json} />);
    const comp = shallow(<TranslateComponent label="HELLO" params={{name: 'Dude'}}/>);

    return new Promise(resolve => {
        setTimeout(() => {
            comp.update();
            t.is(comp.contains(<span>yo, Dude!</span>), true, 'Provider doesnt work');
            resolve();
        });
    });
});