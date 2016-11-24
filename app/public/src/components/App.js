import React, {Component} from 'react'
import LoginForm from './LoginForm';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
}

export default App;