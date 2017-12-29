import { translate } from './index';

export const withComponent = (Component, framework) => (
    class TranslateComponent extends Component {

        constructor(props) {
            super(props);

            this.state = {
                text: ''
            };

            this.setTranslatedValue(props);
        }

        /**
         * Requests the translate value, and the sets the state
         */
        setTranslatedValue(props) {
            let { label, params } = props || this.props;

            return translate(label, params || null)
                .then(text => {
                    this.setState({ text });
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

            return framework.createElement('span', null, this.state.text);
        }

    }
);