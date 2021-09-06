import React from 'react';

class MoneyInput extends React.Component {
    state = {
        number: 0
    }

    formatNumber = (number) => ((number/100).toLocaleString('en-IE', {style: 'currency', currency:'EUR'}));

    onChange = (e) => {
        e.preventDefault();
        const input = e.nativeEvent;
        const data = (input.data) ? input.data.replace(/\D/g, '') : '';
        
        switch(input.inputType) {
            case 'insertText':
                if (!isNaN(data)) {
                    const number = this.state.number*`${data}`.length + data;
                    this.setState(() => ({ number }));
                }
                break;
            case 'insertFromDrop':
            case 'insertFromPaste':
                if (input.data.search(/.+[\d\.,]+/g) >= 0 && !isNaN(data)) {
                    this.setState(() => ({ number: data }));
                }
                break;
            case 'deleteContentBackward':
                const number = Math.floor(this.state.number/10);
                this.setState({ number });
                break;
            default:
                console.log(input.inputType);
        }
    };

    onKeyDownCapture = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown'){
            e.preventDefault();
        }
    };

    onClickCapture = (e) => {
        const length = e.target.textLength;
        console.log(length);
        e.target.setSelectionRange(length, length);
    }

    render() {
        return (
            <input type="text" className={(this.state.invalidInput ? "money-input--invalid" : '')} value={this.formatNumber(this.state.number)} onChange={this.onChange} onKeyDownCapture={this.onKeyDownCapture} onClickCapture={this.onClickCapture} />
        );
    }
}

export default MoneyInput;