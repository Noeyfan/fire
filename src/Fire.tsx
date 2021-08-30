import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Form, Container, Row, Col } from 'react-bootstrap';
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
      grid: {
        containerLabel: true,
      },
      xAxis: {
        type: 'category',
        data: this.buildxaxis()
      },
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value}k'
          },
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
        result.push(Math.round(-cashFlow/1000));
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
    for (let i = 0; i <= Fire.YEARS; i++) {
      investmentGain = investmentFunds * (Fire.INVEST_YOY * (1 - Fire.TAX));
      houseFunds += houseFunds * Fire.HOUSE_YOY;
      investmentFunds += investmentGain + yearlyContribution;
      totalMortgage -= form.mortgage * 12;
      result.push(Math.round((investmentFunds + houseFunds - totalMortgage)/1000));
    }

    return result;
  }

  addForm(label: string, defaultValue: any, name: string) {
    return (
      <Col>
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <Form.Control type="number" defaultValue={defaultValue} name={name}/>
        </Form.Group>
      </Col>
    );
  }

  render() {
    return (
      <Container>
        <ReactECharts option={(this.state as any).cashFlowGraph} />
        <ReactECharts option={(this.state as any).networthGraph} />
        <Form onChange={this.handleChange}>
          <Row>
          {this.addForm('Spending (per month)', Fire.DEFAULT_FORM.spending, 'spending')}
          {this.addForm('Mortgage (per month)', Fire.DEFAULT_FORM.mortgage, 'mortgage')}
          </Row>
          <Row>
          {this.addForm('Salary (per month)', Fire.DEFAULT_FORM.salary, 'salary')}
          {this.addForm('House Value (total market value)', Fire.DEFAULT_FORM.hvalue, 'hvalue')}
          </Row>
          <Row>
          {this.addForm('Investment Starting fund', Fire.DEFAULT_FORM.funds, 'funds')}
          </Row>
          <Form.Text className="text-muted">
            * Investment return YOY: 6% * House return YOY: 3.5% * Inflation not counted
          </Form.Text>
        </Form>
      </Container>
    );
  }
}

export default Fire;
