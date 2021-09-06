class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlusOne = this.handlePlusOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <main>
                <h1>Count: {this.state.count}</h1>
                <div>
                    <button onClick={this.handlePlusOne}>+1</button>
                    <button onClick={this.handleMinusOne}>-1</button>
                    <button onClick={this.handleReset}>reset</button>
                </div>
            </main>
        );
    }

    componentDidMount() {
        const local = localStorage.getItem('count');
        const count = parseInt(local, 10);

        if (!isNaN(count)) {
            this.setState(() => ({ count }));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            const count = JSON.stringify(this.state.count);
            localStorage.setItem('count', count);
        }
    }

    handlePlusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            };
        });
    }

    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }

    handleReset() {
        this.setState(() => {
            return {
                count: 0
            };
        });
    }
}

window.onload = function() {
    ReactDOM.render(<Counter />, document.getElementById('app'));
}