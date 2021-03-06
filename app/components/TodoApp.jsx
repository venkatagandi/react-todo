var React = require('react');
var uuid = require('node-uuid');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
    getInitialState() {
        return {
            showCompleted:false,
            searchText:'',
            todos: TodoAPI.getTodos()
        }
    },
    componentDidUpdate() {
        TodoAPI.setTodos(this.state.todos);
    },
    handleAddTodo(text) {
       this.setState({
           todos:[
               ...this.state.todos,
               {
                   id: uuid(),
                   text:text,
                   completed:false
               }
           ]
       })
    },
    handleToggle(id) {
        var updatedTodos = this.state.todos.map((todo) => {
            if(todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        this.setState({
            todos:updatedTodos
        })
    },
    handleSearch(showCompleted,searchText) {
        this.setState({
            showCompleted:showCompleted,
            searchText:searchText.toLowerCase()
        });
    },
    render() {
        var { todos, showCompleted, searchText } = this.state;
        var filteredTodos = TodoAPI.filterTodos(todos,showCompleted,searchText);
        return (
            <div>
                <TodoSearch onSearch={this.handleSearch} />
                <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
                <AddTodo addTodo={this.handleAddTodo} />
            </div>
        )
    }
});

module.exports = TodoApp;

// <TodoList todos={todos}/>