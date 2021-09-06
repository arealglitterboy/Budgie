import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/styles.scss';
import 'normalize.css';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info, please don't share.</p>}
            <WrappedComponent {...props} /> {/* Takes every key:value pair on the props object and passes them each down as props */}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentification = (WrappedComponent) => {
    return (props) => (props.isAuthenticated) ? 
        <WrappedComponent { ...props } /> 
        : <p>This content requires authentification.</p>;
};

const AuthInfo = requireAuthentification(Info);

window.onload = function() {
    // ReactDOM.render(<AdminInfo isAdmin={true} info="hello world" />, document.getElementById('app'));
    ReactDOM.render(<AuthInfo isAuthenticated={true} info="hello world" />, document.getElementById('app'));
}