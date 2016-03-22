var HelloWorld = React.createClass({displayName: "HelloWorld",
  render: function(){
    return (
      React.createElement("div", null, 
        "Hello World!"
      )
    )
  }
});

ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('app'));
//# sourceMappingURL=main.js.map
