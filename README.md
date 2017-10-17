Easy translations for your react apps.

### Getting started is pretty easy.
Just think of it in these steps:

1. Define your translation directory
1. Define the current user locale code, e.g. 'en', 'de', 'fr' and so on.
1. Optionally use a fallback language code. Usually 'en'.

Then, use the thin, built-in component, to translate your strings.

#### Example
The following examples are based on `create-react-app` results.

```json
// This is our json file, with translations
{
  "HELLO": "Hi {{user}}!",
  "PAGES": {
    "HOME": {
      "TITLE": "Home Page Title"
    }
  }
}
```

```js
// This is usually our index.js
import React from 'react';
import ReactDOM from 'react-dom';
// Import the setConfig function to provide the service with your settings
import { setConfig } from 'react-translate-json';
import App from './App';

setConfig({
    pathPrefix: '/translations', // Path to your translations
    locale: 'en', // User current locale
    fallbackLocale: 'en' // Fallback locale
});

// That's it! You are all set!

ReactDOM.render(<App />, document.getElementById('root'));
```

Now, you can easily add in your translations by importing the component.

```js
// App.js
import React, { Component } from 'react';
import { TranslateComponent } from './lib';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          {/* Regular component usage */}
          <h1 className="App-title">
              <TranslateComponent label="HELLO" params={{user: 'John'}}/>
          </h1>

          {/* Render-prop based */}
          <TranslateComponent label="HELLO" params={{user: 'John'}} render={(res) => (
            <h1 className="App-title">{res}</h1>
          )}/>

        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```