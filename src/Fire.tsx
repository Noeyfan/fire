import React from 'react';
import ReactECharts from 'echarts-for-react';
import './App.css';

class Fire extends React.Component {
  private static YEARS = 30;
  private static INVEST_YOY = 0.06;
  private static HOUSE_YOY = 0.035;
  private static TAX = 0.3;
  private static HOUSE_DOWN_PAY = 0.2;

  private static DEFAULT_FORM = {
    spending: 1000,
    mortgage: 1000,
    salary: 5000,
    hvalue: 470000,
    funds: 300000
  }

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      form: Fire.DEFAULT_FORM,
      cashFlowGraph: this.buildGraph(
        Fire.DEFAULT_FORM,
        (form) => this.calculateCashflow(form),
        'Cash Flow Needed'
      ),
      networthGraph: this.buildGraph(
        Fire.DEFAULT_FORM,
        (form) => this.calculateNetworth(form),
        'Net Worth'
      ),
    };
  }

  handleChange(event: any) {
    const newForm = {
      ...(this.state as any).form,
      [event.target.name]: parseInt(event.target.value),
    };
    this.setState({
      form: newForm,
      cashFlowGraph: this.buildGraph(
        newForm,
        (form) => this.calculateCashflow(form),
        'Cash Flow Needed'
      ),
      networthGraph: this.buildGraph(
        newForm,
        (form) => this.calculateNetworth(form),
        'Net Worth'
      )
    });
  }

  buildxaxis() {
    let year = (new Date()).getFullYear();
    const result = [];
    for (let i = 0; i <= 30; ++i) {
      result.push(year + i);
    }
    return result;
  }

  buildGraph(form: any, builder: (form: any) => any, title: string) {
    const graph = {
      title: {
        text: title,
      },
      xAxis: {
        type: 'category',
        data: this.buildxaxis()
      },
      yAxis: [
             {
                type: 'value',
             }
      ],
      tooltip: {
        trigger: 'axis',
      },
      series: [
        {
          data: builder(form),
          type: 'line',
          smooth: true,
          emphasis: {
            focus: 'series'
          },
        },
      ],
    }

    return graph;
  }

  calculateCashflow(form: any): number[] {
    let investmentGain = 0;
    let investmentFunds = form.funds;
    const yearlySpending = (form.spending + form.mortgage) * 12;
    const yearlyContribution = form.salary * 12 - yearlySpending;
    const result = [];
    for (let i = 0; i <= Fire.YEARS; i++) {
      investmentGain = investmentFunds * (Fire.INVEST_YOY * (1 - Fire.TAX));
      investmentFunds += investmentGain + yearlyContribution;
      const cashFlow = investmentGain - yearlySpending;
      if (cashFlow <= 0) {
        result.push(Math.round(-cashFlow));
      }
    }

    return result;
  }

  calculateNetworth(form: any): number[] {
    let investmentGain = 0;
    let investmentFunds = form.funds;
    let houseFunds = form.hvalue;
    let totalMortgage = form.mortgage * 12 * Fire.YEARS;
    const yearlySpending = (form.spending + form.mortgage) * 12;
    const yearlyContribution = form.salary * 12 - yearlySpending;
    const result = [];
    result.push(houseFunds + investmentFunds - totalMortgage);
    for (let i = 1; i <= Fire.YEARS; i++) {
      investmentGain = investmentFunds * (Fire.INVEST_YOY * (1 - Fire.TAX));
      houseFunds += houseFunds * Fire.HOUSE_YOY;
      investmentFunds += investmentGain + yearlyContribution;
      totalMortgage -= form.mortgage * 12;
      result.push(Math.round(investmentFunds + houseFunds - totalMortgage));
    }

    return result;
  }

  render() {
    return (
      <div>
        <ReactECharts option={(this.state as any).cashFlowGraph} />
        <ReactECharts option={(this.state as any).networthGraph} />
        <div>
        * Investment return YOY: 6%
        * House return YOY: 3.5%
        * Inflation not counted
        </div>
        <div>
          <form onChange={this.handleChange}>
            Spending (per month): <input type="number" defaultValue={Fire.DEFAULT_FORM.spending} name="spending" />
            Mortgage (per month): <input type="number" defaultValue={Fire.DEFAULT_FORM.mortgage} name="mortgage" />
            Salary (per month): <input type="number" defaultValue={Fire.DEFAULT_FORM.salary} name="salary" />
            House Value (total market value): <input defaultValue={Fire.DEFAULT_FORM.hvalue} type="number" name="hvalue" />
            Investment Starting funds: <input type="number" defaultValue={Fire.DEFAULT_FORM.funds} name="funds" />
          </form>
        </div>
      </div>
    );
  }
}

export default Fire;
