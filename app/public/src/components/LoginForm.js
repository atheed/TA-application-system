import React, {Component} from 'react'

class LoginForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <form action="/login" method="post">
                    <div>
                        <label>Student Number</label>
                        <input type="text" class="form-control" name="studentnumber"></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" class="form-control" name="password"></input>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;