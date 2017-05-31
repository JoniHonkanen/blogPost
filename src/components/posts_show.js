import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {

    componentDidMount() {
        // this.props.match.params.id;
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        //Eka tarkistetaan onko data tullu vielä perille
        if (!this.props.post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/" className="btn btn-primary"> Back to main site </Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{this.props.post.title}</h3>
                <h6>Categories: {this.props.post.categories}</h6>
                <p>{this.props.post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    //   console.log(state);
    console.log(ownProps);
    return { post: state.posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);