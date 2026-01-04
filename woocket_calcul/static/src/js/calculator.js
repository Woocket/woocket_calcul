/** @odoo-module **/
import { registry } from '@web/core/registry';
import { Component, useState, useRef, onMounted, onWillUnmount } from '@odoo/owl';

export class SystrayCalculator extends Component {
    static template = 'SystrayCalculatorTool';

    setup() {
        this.rootRef = useRef('root');
        this.state = useState({
            visible: false,
            display: "",
            operand1: "",
            operand2: "",
            operator: ""
        });
        onMounted(() => {
            document.addEventListener('mousedown', this.handleOutsideClick);
        });
        onWillUnmount(() => {
            document.removeEventListener('mousedown', this.handleOutsideClick);
        });
    }

    toggleVisibility() {
        this.state.visible = !this.state.visible;
    }

    handleOutsideClick = (ev) => {
        if (this.state.visible && this.rootRef.el && !this.rootRef.el.contains(ev.target)) {
            this.state.visible = false;
        }
    }

    onNumberClick(ev) {
        const val = ev.target.dataset.digit;
        if (!this.state.operator) {
            if (val === '.' && this.state.operand1.includes('.')) {
                return;
            }
            this.state.operand1 += val;
            this.state.display = this.state.operand1;
        } else {
            if (val === '.' && this.state.operand2.includes('.')) {
                return;
            }
            this.state.operand2 += val;
            this.state.display = this.state.operand2;
        }
    }

    onOperatorClick(ev) {
        const op = ev.target.dataset.op;
        if (!this.state.operand1) {
            return;
        }
        if (this.state.operator && this.state.operand2) {
            this.performCalculation();
        }
        this.state.operator = op;
    }

    onEqualsClick() {
        if (this.state.operator && this.state.operand2) {
            this.performCalculation();
            this.state.operator = "";
            this.state.operand2 = "";
        }
    }

    onClearClick() {
        this.state.operand1 = "";
        this.state.operand2 = "";
        this.state.operator = "";
        this.state.display = "";
    }

    performCalculation() {
        let result;
        const num1 = parseFloat(this.state.operand1);
        const num2 = parseFloat(this.state.operand2);
        switch (this.state.operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = (num2 !== 0) ? (num1 / num2) : 'Err';
                break;
            case '%':
                result = (num1 / 100) * num2;
                break;
            default:
                return;
        }
        this.state.operand1 = result.toString();
        this.state.display = this.state.operand1;
    }
	onToggleSign() {
		if (!this.state.operator) {
			if (this.state.operand1) {
				this.state.operand1 = this.state.operand1.startsWith('-')
					? this.state.operand1.slice(1)
					: '-' + this.state.operand1;
				this.state.display = this.state.operand1;
			}
		} else {
			if (this.state.operand2) {
				this.state.operand2 = this.state.operand2.startsWith('-')
					? this.state.operand2.slice(1)
					: '-' + this.state.operand2;
				this.state.display = this.state.operand2;
			}
		}
	}
}

registry.category('systray').add('systray_calcul', { Component: SystrayCalculator });
