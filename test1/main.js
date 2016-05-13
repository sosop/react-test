// es5
// let React = require('react');
// let ReactDOM = require('react-dom');

// es6
import React from 'react'
import ReactDOM from 'react-dom'
class Comment extends React.Component {
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        let comments = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {comments}
            </div>
        );
    }
}

class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this._bind("handleSubmit");
    }

    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
    }

    handleSubmit(e) {
        e.preventDefault();
        let id = this.refs.id.value.trim();
        let author = this.refs.author.value.trim();
        let text = this.refs.text.value.trim();
        if (!author || !text) {
            return;
        }
        // TODO
        let commit = this.props.onCommit;
        commit({id: id, author: author, text: text});
        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    }

    render() {
        return (
            <div className="commentForm">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="id" ref="id" /><br />
                    <input type="text" placeholder="author" ref="author" /><br />
                    <input type="text" placeholder="say ..." ref="text" /><br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
}

class CommentBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
        this._bind("handleSubmit");
    }

    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
    }

    componentWillMount() {
        this.loadComments();
    }

    loadComments() {
        let data = [
            {id: 1, author: "sosop1", text: "good"},
            {id: 2, author: "sosop2", text: "ok"},
            {id: 3, author: "sosop3", text: "yes"}
        ];
        this.setState({data: data});
    }

    handleSubmit(comment) {
        // TODO send data to server
        let comments = this.state.data;
        let newComments = comments.concat([comment]);
        this.setState({data: newComments})
    }

    render() {
        return (
            <div className="commentBox">
                <h1>commnets</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommit={this.handleSubmit} />
            </div>
        );
    }
}


ReactDOM.render(<CommentBox />, document.getElementById("content"));
