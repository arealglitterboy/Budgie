class Visibility extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Toggle />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return <h1>Visibility!</h1>;
    }
}

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleToggle = this.handleToggle.bind(this);

        this.state = {
            visible: false
        };
    }

    render() {
        const isVisible = this.state.visible;
        return (
            <main>
                <button onClick={this.handleToggle}>{isVisible ? 'hide' : 'show'} details</button>
                {
                    isVisible && <aside><p>Here are the details</p></aside>
                }
            </main>
        );
    }

    handleToggle() {
        this.setState((prevState) => {
            return {
                visible: !prevState.visible
            };
        });
    }
}

window.onload = function(){
    ReactDOM.render(<Visibility />, document.getElementById('app'));
}