import React, {Component} from 'react';

class Form extends Component {
    constructor() {
        super();
    }

    render() {
        const { action, type } = this.props;
        return (
            <form action={action} method="post">
                <div>
                    <label>{type == "student" ? "Student Number" : "Admin Username"}</label>
                    <input type="text" className="form-control" name="studentnumber"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" className="form-control" name="password"></input>
                </div>
                <div>
                    <input type="hidden" className="form-control" name="type" value={type}></input>
                </div>
                <button type="submit">Enter</button>
            </form>
        );
    }
}

export default Form;