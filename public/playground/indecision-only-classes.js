class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleSelection = this.handleSelection.bind(this);

        this.state = {
            title: 'Indecision',
            subtitle: 'For when you are like, "ehhhh no" about making decisions!',
            options: []
        }
    }

    render() {
        return (
            <main>
                <Header title={this.state.title} subtitle={this.state.subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handleSelection={this.handleSelection}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption handleAddOption={this.handleAddOption}/>
            </main>
        )
    }

    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            };
        });
    }

    handleAddOption(option) {
        if(!option) {
            return 'Enter a value to add item';
        } else if (this.state.options.indexOf(option) != -1) {
            return 'Enter a unique value to add item';
        }

        this.setState((prev) => {
            return {
                options: prev.options.concat(option)
            };
        });
    }

    handleSelection() {
        if (this.state.options && this.state.options.length > 0){
            const rand = Math.floor(Math.random() * this.state.options.length);
            const option = this.state.options[rand];
            alert(option);
        }
    }
}

class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </header>
        );
    }
}

function HeaderF(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </header>
    );
}

class Action extends React.Component {
    render() {
        return (
            <div>
                <button 
                    disabled={!this.props.hasOptions}
                    onClick={this.props.handleSelection}
                >
                    What Will You Do?
                </button>
            </div>
        );
    }
}

class Options extends React.Component {
    render() {
        const options = this.props.options;
        const hasOptions = options && options.length > 0;

        return (
            <section>
                <header className="button-header">
                    <h4>{(hasOptions) ? 'Here are your options' : 'No options'}</h4>
                    {(hasOptions) && <button onClick={this.props.handleDeleteOptions}>Remove All</button>}
                </header>
                {
                    (hasOptions) && // ? If the list is defined and it has items, then add an ordered list with all options
                        <ol>
                            {options.map((option, index) => <Option key={index} option={option} />)}
                        </ol>
                }
            </section>
        );
    }
}

class Option extends React.Component {
    render() {
        return <li key={this.props.index}>{this.props.option}</li>
    }
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            error: undefined
        };
    }

    render() {
        return (
            <div>
                {(this.state.error && <p className="error">{this.state.error}</p>)}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="option"/>
                    <button>Add</button>
                </form>
            </div>
        );
        // * input element has name 'option'
    }

    handleSubmit(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim(); // * Referencing the input element with name 'option' 
        const error = this.props.handleAddOption(option);
        e.target.elements.option.value = '';

        this.setState(() => {
            return { error };
        });
    }
}

window.onload = function() {
    ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
}