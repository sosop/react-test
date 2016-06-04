import React from 'react'
import ReactDOM from 'react-dom'

class Box extends React.Component {
    render() {
        return (
            <div>HELLO, React!</div>
        );
    }
}

ReactDOM.render(<Box />, document.getElementById("content"));
