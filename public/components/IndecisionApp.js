import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        subtitle: 'For when you are like, "ehhhh no" about making decisions!',
        options: [],
        selectedOption: undefined
    };

    render() {
        return (
            <main className="main">
                <Header subtitle={this.state.subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handleSelection={this.handleSelection}
                />
                <section className="widget-container">
                    <Options
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOption handleAddOption={this.handleAddOption} />
                    <OptionModal
                        selectedOption={this.state.selectedOption}
                        handleClearSelectedOption={this.handleClearSelectedOption}
                    />
                </section>
            </main>
        )
    }

    
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    
    handleDeleteOption = (option) => {
        this.setState((prev) => ({options: prev.options.filter(item => item !== option)}))
    };
    
    handleAddOption = (option) => {
        if(!option) {
            return 'Enter a value to add item';
        } else if (this.state.options.indexOf(option) != -1) {
            return 'Enter a unique value to add item';
        }
        
        this.setState((prev) => ({ options: prev.options.concat(option) }));
    };
    
    handleSelection = () => {
        if (this.state.options && this.state.options.length > 0) {
            const rand = Math.floor(Math.random() * this.state.options.length);

            this.setState(() => ({ selectedOption: this.state.options[rand] }));
        }
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    componentDidMount = () => {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
    
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch(error) {}
    };
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    };
};