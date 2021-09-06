window.onload = function() {
    const appRoot = document.getElementById('app');
    let count = 0;

    function addOne() {
        ++count;
        renderCounterApp();
    }

    function minOne() {
        --count;
        renderCounterApp();
    }

    function reset() {
        count = 0;
        renderCounterApp();
    }

    function renderCounterApp() {
        const template2 = (
            <div>
                <h1>Count: {count}</h1>
                <button id="plus-one" className="button" onClick={addOne}>+1</button>
                <button id="plus-one" className="button" onClick={minOne}>-1</button>
                <button id="plus-one" className="button" onClick={reset}>reset</button>
            </div>
        );
        ReactDOM.render(template2, appRoot);
    }   

    renderCounterApp();
}