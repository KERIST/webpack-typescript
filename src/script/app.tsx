import * as React from "react";
import * as ReactDOM from "react-dom";


import '../style/styles';

interface HelloProps { compiler: string; framework: string; }

class App extends React.Component {
    render() {
        return <h1>My first react app with ts.</h1>
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#app')
);