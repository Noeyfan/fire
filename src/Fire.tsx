import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import './App.css';

class Fire extends React.Component {
  private static YEARS = 30;
  private static INVEST_YOY = 0.06;
  private static HOUSE_YOY = 0.035;
  private static TAX = 0.3;

  private static DEFAULT_FORM = {
    years: 30,
    spending: 1000,
    mortgage: 1000,
    salary: 5000,
    hvalue: 470000,
    funds: 30000
  }

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      ...this.buildAllGraphs(Fire.DEFAULT_FORM),
      form: Fire.DEFAULT_FORM,
    };
  }

  handleChange(event: any) {
    const newForm = {
      ...(this.state as any).form,
      [event.target.name]: parseInt(event.target.value),
    };
    this.setState({
      ...this.buildAllGraphs(newForm),
      form: newForm,
    });
  }

  getState() {
    return this.state as any;
  }

  buildxaxis(form: any) {
    let year = (new Date()).getFullYear();
    const result = [];
    for (let i = 0; i <= form.years; ++i) {
      result.push(year + i);
    }
    return result;
  }

  buildAllGraphs(form: any) {
    return {
      cashFlowGraph: this.buildGraph(
        form,
        (form) => this.calculateCashflow(form),
        'Cash Flow Needed',
        'Lower means closer to financial freedom'
      ),
      networthGraph: this.buildGraph(
        form,
        (form) => this.calculateNetworth(form),
        'Net Worth',
        ''
      )
    };
  }

  buildGraph(
    form: any,
    builder: (form: any) => any,
    title: string,
    subtitle: string,
  ) {
    const graph = {
      title: {
        text: title,
        subtext: subtitle,
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: this.buildxaxis(form)
      },
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: (value: number) => {
              if (value >= 1000000) {
                return value/1000000 + 'm';
              } else if (value >= 1000){
                return value/1000 + 'k';
              } else {
                return value;
              }
            }
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
    for (let i = 0; i <= form.years; i++) {
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
    for (let i = 0; i <= form.years; i++) {
      investmentGain = investmentFunds * (Fire.INVEST_YOY * (1 - Fire.TAX));
      houseFunds += houseFunds * Fire.HOUSE_YOY;
      investmentFunds += investmentGain + yearlyContribution;
      totalMortgage -= form.mortgage * 12;
      result.push(Math.round(investmentFunds + houseFunds - totalMortgage));
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

  addSlider(label: string, defaultValue: any, name: string) {
    return (
      <Col>
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <Form.Range defaultValue={defaultValue} name={name}/>
        </Form.Group>
      </Col>
    );
  }

  render() {
    return (
      <Container>
        <ReactECharts option={this.getState().cashFlowGraph} />
        <ReactECharts option={this.getState().networthGraph} />
        <Form onChange={this.handleChange}>
          <Row>
          {this.addSlider(`Calculate for ${this.getState().form.years} years`, Fire.DEFAULT_FORM.years, 'years')}
          {this.addForm('Spending (per month)', Fire.DEFAULT_FORM.spending, 'spending')}
          </Row>
          <Row>
          {this.addForm('Mortgage (per month)', Fire.DEFAULT_FORM.mortgage, 'mortgage')}
          {this.addForm('Salary (per month)', Fire.DEFAULT_FORM.salary, 'salary')}
          </Row>
          <Row>
          {this.addForm('House Value', Fire.DEFAULT_FORM.hvalue, 'hvalue')}
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
