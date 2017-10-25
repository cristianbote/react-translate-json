import { translate } from './index';
import React, { Component } from 'react';

export class TranslateComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.setTranslatedValue();
    }

    /**
     * Requests the translate value, and the sets the state
     */
    setTranslatedValue(props) {
        let { label, params } = props || this.props;

        return translate(label, params || null)
            .then(text => {
                return new Promise(resolve => {
                    this.setState({ text }, resolve);
                })
            });
    }

    componentWillReceiveProps(props) {
        this.setTranslatedValue(props);
    }

    render() {
        // If there's a render-prop
        if (this.props.render) {
            return this.props.render(this.state.text);
        }

        return <span>{this.state.text}</span>
    }

}