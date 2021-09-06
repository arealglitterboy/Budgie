import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <section>
        <h2>404 Error</h2>
        <p>Apologies my guy, we recognise that URL, maybe it was removed, or maybe YOU just spelt it wrong (numnuts).</p>
        <hr />
        <Link to="/">Return Home</Link>
    </section>
);

export default NotFoundPage;