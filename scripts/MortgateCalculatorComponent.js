export default class MortgageCalculatorComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        const form = this.#internals.shadowRoot.querySelector('form');

        this.shadowRoot.querySelectorAll('input').forEach((element) => {
            element.addEventListener('input', (event) => {
                if (form.checkValidity() == false) {
                    return;
                } else {
                    this.calculateMorgage();
                }
            })
        });
    }
    disconnectedCallback() {
    }
    calculateMorgage = () => {
        const mortgageAmount =parseFloat(this.#internals.shadowRoot.querySelector('input[id="mortgage-amount"]').value);
        const mortgageTerm = parseFloat(this.#internals.shadowRoot.querySelector('input[id="mortgage-term"]').value);
        const interestRate = parseFloat(this.#internals.shadowRoot.querySelector('input[id="interest-rate"]').value);
        const paymentsPerYear = 12;
        const mortgageTypeIsRepayment = this.#internals.shadowRoot.querySelector('input[id="mortgage-type-repayment"]').checked;
        const mortgageTypeIsInterest = this.#internals.shadowRoot.querySelector('input[id="mortgage-type-interest"]').checked;
        let monthlyRepaymentDisplay = this.#internals.shadowRoot.querySelector('p[class="monthly-repayment-number"]');
        let totalRepaymentDisplay = this.#internals.shadowRoot.querySelector('p[class="total-repayment-number"]');
        let monthlyPayment = 0
        if (mortgageTypeIsRepayment) {
            monthlyPayment = this.calculateRepaymentBasedMortgage(mortgageAmount, paymentsPerYear, interestRate, mortgageTerm);
        }
        if (mortgageTypeIsInterest) {
            monthlyPayment = this.calculateInterestBasedMortgage(mortgageAmount, interestRate, paymentsPerYear);
        }
        monthlyRepaymentDisplay.innerHTML = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(monthlyPayment);
        totalRepaymentDisplay.innerHTML = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(monthlyPayment * 12 * 25);
    }
    calculateRepaymentBasedMortgage = (mortgageAmount, paymentsPerYear, interestRate, mortgageTerm) => {
        // Mortgage Payment = P x (r / n) x [(1 + r / n)^n(t)] / [(1 + r / n)^n(t) - 1]
        // return mortgageAmount * (interestRate / paymentsPerYear) * ((1 + interestRate / mortgageTerm ) ^ (mortgageTerm * paymentsPerYear)) / ((1 + interestRate /mortgageTerm) ^ (mortgageTerm * paymentsPerYear - 1));
    }
    calculateInterestBasedMortgage = (mortgageAmount, interestRate, paymentsPerYear) => {
        // return mortgageAmount * (interestRate / paymentsPerYear);
    }


}
if (!customElements.get("mortgage-calculator-component")) {
    customElements.define("mortgage-calculator-component", MortgageCalculatorComponent);
}
