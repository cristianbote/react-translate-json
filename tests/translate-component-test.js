import test from 'ava';
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setJson, TranslateComponent } from '../index';

configure({ adapter: new Adapter() });

setJson({
    "HELLO": "yo, {{name}}!",
    "NESTED": {
        "LEVEL": "works"
    },
});

test("Let's test the component", t => {
    const comp = shallow(<TranslateComponent label="NESTED.LEVEL"></TranslateComponent>);

    return new Promise(resolve => {
        setTimeout(() => {
            comp.update();
            t.is(comp.contains(<span>works</span>), true, 'Something doesnt work');
            resolve();
        })
    });
});

test("Render props", t => {
    const comp = shallow(<TranslateComponent label="NESTED.LEVEL" render={(res) => <div className="label">{res}</div>}></TranslateComponent>);

    return new Promise(resolve => {
        setTimeout(() => {
            comp.update();
            t.is(comp.contains(<div className="label">works</div>), true, 'Render props broke');
            resolve();
        })
    });
});

test("Test the willReceiveProps", t => {
    const comp = shallow(<TranslateComponent label="NESTED.LEVEL"></TranslateComponent>);
    comp.setProps({label: 'HELLO', params: { name: 'John' }});

    return new Promise(resolve => {
        setTimeout(() => {
            comp.update();
            t.is(comp.contains(<span>yo, John!</span>), true, 'Will receive props, broke');
            resolve();
        })
    });
});

test("Make sure the templating works", t => {
    const comp = shallow(<TranslateComponent label="HELLO" params={{name: 'dude'}}></TranslateComponent>);

    return new Promise(resolve => {
        setTimeout(() => {
            comp.update();
            t.is(comp.contains(<span>yo, dude!</span>), true, 'Rendering seems to not be working');
            resolve();
        })
    });
});