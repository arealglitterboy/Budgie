window.onload = function(){
    const appRoot = document.getElementById('app');
    
    let visible = false;

    function toggle() {
        visible = !visible;
        renderVisibility();
    }

    function renderVisibility() {    
        const template = (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={toggle}>{visible ? 'Hide' : 'Show'} Details</button>
                {(visible) && (<p><em>Here are my details!</em></p>)}
            </div>
        );
        ReactDOM.render(template, appRoot);
    }

    renderVisibility();
}