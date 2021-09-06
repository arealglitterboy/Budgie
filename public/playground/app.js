class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleSelection = this.handleSelection.bind(this);

        this.state = {
            subtitle: 'For when you are like, "ehhhh no" about making decisions!',
            options: []
        }
    }

    render() {
        return (
            <main>
                <Header subtitle={this.state.subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handleSelection={this.handleSelection}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleAddOption={this.handleAddOption}/>
            </main>
        )
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
    
            if (options){
                this.setState(() => ({ options }));
            }
        } catch(error) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnMount() {
        console.log('Indecision will be unmounted');
    }

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption(option) {
        this.setState((prev) => ({options: prev.options.filter(item => item !== option)}))
    }

    handleAddOption(option) {
        if(!option) {
            return 'Enter a value to add item';
        } else if (this.state.options.indexOf(option) != -1) {
            return 'Enter a unique value to add item';
        }

        this.setState((prev) => ({ options: prev.options.concat(option) }));
    }

    handleSelection() {
        if (this.state.options && this.state.options.length > 0){
            const rand = Math.floor(Math.random() * this.state.options.length);
            const option = this.state.options[rand];
            alert(option);
        }
    }
}

function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </header>
    );
}

Header.defaultProps = {
    title: 'Indecision'
};

function Action(props) {
    return (
        <div className="what-to-do">
            <button disabled={!props.hasOptions} onClick={props.handleSelection}>
                What Will You Do?
            </button>
        </div>
    );
}

function Options(props) {
    const hasOptions = props.options && props.options.length > 0;

    return (
        <section>
            <h4>{(hasOptions) ? 'Here are your options' : 'Enter an option'}</h4>
            {
                (hasOptions) &&
                <div>
                    <button onClick={props.handleDeleteOptions}>Remove All</button>
                    <ol className="options">
                        {
                            props.options.map((option, index) => (
                                <Option 
                                    key={option}
                                    option={option} 
                                    handleDeleteOption={props.handleDeleteOption}
                                />
                            )
                            )
                        }
                    </ol>
                </div>
            }
        </section>
    );
}

function Option(props) {
    return (
        <li>
            <div className="option">
                <p>{props.option}</p>
                <button onClick={(e) => {props.handleDeleteOption(props.option)}}>Remove</button>
            </div>
        </li>
    );
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
        
        this.setState(() => ({ error }));
        
        if(!error) {
            e.target.elements.option.value = '';
        }
    }
}

window.onload = function() {
    ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
}