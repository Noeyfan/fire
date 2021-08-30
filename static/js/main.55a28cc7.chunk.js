(this.webpackJsonpfire=this.webpackJsonpfire||[]).push([[0],{21:function(e,t,a){},28:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),u=a(12),s=a.n(u),i=(a(21),a(8),a(2)),o=a(5),l=a(13),c=a(14),h=a(3),d=a(16),p=a(15),f=a(7),O=a(0),g=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleChange=n.handleChange.bind(Object(h.a)(n)),n.state={form:a.DEFAULT_FORM,cashFlowGraph:n.buildGraph(a.DEFAULT_FORM,(function(e){return n.calculateCashflow(e)}),"Cash Flow Needed"),networthGraph:n.buildGraph(a.DEFAULT_FORM,(function(e){return n.calculateNetworth(e)}),"Net Worth")},n}return Object(c.a)(a,[{key:"handleChange",value:function(e){var t=this,a=Object(o.a)(Object(o.a)({},this.state.form),{},Object(i.a)({},e.target.name,parseInt(e.target.value)));this.setState({form:a,cashFlowGraph:this.buildGraph(a,(function(e){return t.calculateCashflow(e)}),"Cash Flow Needed"),networthGraph:this.buildGraph(a,(function(e){return t.calculateNetworth(e)}),"Net Worth")})}},{key:"buildxaxis",value:function(){for(var e=(new Date).getFullYear(),t=[],a=0;a<=30;++a)t.push(e+a);return t}},{key:"buildGraph",value:function(e,t,a){return{title:{text:a},xAxis:{type:"category",data:this.buildxaxis()},yAxis:[{type:"value"}],tooltip:{trigger:"axis"},series:[{data:t(e),type:"line",smooth:!0,emphasis:{focus:"series"}}]}}},{key:"calculateCashflow",value:function(e){for(var t=0,n=e.funds,r=12*(e.spending+e.mortgage),u=12*e.salary-r,s=[],i=0;i<=a.YEARS;i++){n+=(t=n*(a.INVEST_YOY*(1-a.TAX)))+u;var o=t-r;o<=0&&s.push(Math.round(-o))}return s}},{key:"calculateNetworth",value:function(e){var t=0,n=e.funds,r=e.hvalue,u=12*e.mortgage*a.YEARS,s=12*(e.spending+e.mortgage),i=12*e.salary-s,o=[];o.push(r+n-u);for(var l=1;l<=a.YEARS;l++)t=n*(a.INVEST_YOY*(1-a.TAX)),r+=r*a.HOUSE_YOY,n+=t+i,u-=12*e.mortgage,o.push(Math.round(n+r-u));return o}},{key:"render",value:function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)(f.a,{option:this.state.cashFlowGraph}),Object(O.jsx)(f.a,{option:this.state.networthGraph}),Object(O.jsx)("div",{children:"* Investment return YOY: 6% * House return YOY: 3.5% * Inflation not counted"}),Object(O.jsx)("div",{children:Object(O.jsxs)("form",{onChange:this.handleChange,children:["Spending (per month): ",Object(O.jsx)("input",{type:"number",defaultValue:a.DEFAULT_FORM.spending,name:"spending"}),"Mortgage (per month): ",Object(O.jsx)("input",{type:"number",defaultValue:a.DEFAULT_FORM.mortgage,name:"mortgage"}),"Salary (per month): ",Object(O.jsx)("input",{type:"number",defaultValue:a.DEFAULT_FORM.salary,name:"salary"}),"House Value (total market value): ",Object(O.jsx)("input",{defaultValue:a.DEFAULT_FORM.hvalue,type:"number",name:"hvalue"}),"Investment Starting funds: ",Object(O.jsx)("input",{type:"number",defaultValue:a.DEFAULT_FORM.funds,name:"funds"})]})})]})}}]),a}(r.a.Component);g.YEARS=30,g.INVEST_YOY=.06,g.HOUSE_YOY=.035,g.TAX=.3,g.HOUSE_DOWN_PAY=.2,g.DEFAULT_FORM={spending:1e3,mortgage:1e3,salary:5e3,hvalue:47e4,funds:3e5};var b=g;var j=function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsx)(b,{})})},m=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,32)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,u=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),u(e),s(e)}))};s.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(j,{})}),document.getElementById("root")),m()},8:function(e,t,a){}},[[28,1,2]]]);
//# sourceMappingURL=main.55a28cc7.chunk.js.map