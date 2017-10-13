import { translate } from '../index';
import { Component } from 'react';

export class TranslateComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.setTranslatedValue();
    }

    setTranslatedValue() {
        let { label, params } = this.props;

        translate(label, params || null)
            .then(text => {
                this.setState({ text })
            });
    }

    componentWillReceiveProps() {
        this.setTranslatedValue();
    }

    render() {
        return (
            <span>{this.state.text}</span>
        )
    }

}