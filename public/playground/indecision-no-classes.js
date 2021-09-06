window.onload = function(){
    const appRoot = document.getElementById('app');

    const app = {
        title: 'Indecision',
        subtitle: 'For when you are like, "ehhhh no" about making decisions!',
        options: []
    };

    function onFormSubmit(e) {
        e.preventDefault();
        
        const option = e.target.elements.option.value;

        if (option && option.length > 0) {
            app.options.push(option);
            e.target.elements.option.value = '';
            renderIndecision();
        }
    }

    function remove() {
        app.options = [];
        renderIndecision();
    }

    function onMakeDecision() {
        if (app.options && app.options.length > 0){
            const rand = Math.floor(Math.random()*app.options.length);
            const option = app.options[rand];
            alert(option);
        }
    }

    function hasOptions() {
        return app.options && app.options.length > 0;
    }

    function renderIndecision() {
        const template = (
            <header>
                <h1>{app.title}</h1>
                {(app.subtitle) && <p>{app.subtitle}</p>}
                <p>{(hasOptions()) ? "Here are your options" : "No options"}</p>
                <button disabled={!hasOptions()} onClick={onMakeDecision}>What Will You Do?</button>
                <button onClick={remove}>Remove All</button>
                {
                    (hasOptions()) &&
                    <ol>
                        {app.options.map((option, index) => <li key={index}>{option}</li>)}
                    </ol>
                }
                <form onSubmit={onFormSubmit}>
                    <input type="text" name="option"/>
                    <button>Add</button>
                </form>
            </header>
        );
    
        ReactDOM.render(template, appRoot);
    }

    renderIndecision();
}