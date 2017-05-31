import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field) { //field argumentti pakollinen

        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onFormSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/'); // Ohjaa haluttuun sivuun, callback function
        }); // lahettaa actionille arvot
        console.log(values);
    }

    render() {

        const { handleSubmit } = this.props; //Redux formin tuoma ominaisuus joka tarkistaa
        //onko kaikki kunnossa ennen submittaamista

        return (
            <div>
                <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
                    <Field
                        label="Title"
                        name="title"
                        component={this.renderField}
                    />
                    <Field
                        label="Categories"
                        name="categories"
                        component={this.renderField}
                    />
                    <Field
                        label="Post Content"
                        name="content"
                        component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Enter some cotegories";
    }
    if (!values.content) {
        errors.content = "Enter some content";
    }
    //jos error tyhjä, formin voi lähettää
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'postsNewForm'
})(
    connect(null, { createPost })(PostsNew)
    );
