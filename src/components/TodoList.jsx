import React, { Component } from 'react';
import Board from './Board';
class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: "",
            todolist: []
        };
        this.textInput = React.createRef();
    }

    onChange = e => {
        this.setState({
            "item": e.target.value
        });
    }

    componentWillMount(){
        if (localStorage.todoList) {
            let todolist = JSON.parse(localStorage.todoList);
            this.setState({ todolist: todolist })
        }
    }

    addToList = () => {
        if(this.state.item) {
            var { todolist } = this.state;
            todolist.unshift( {
                item: this.state.item,
                finished: false
            });
            this.setState({ todolist: todolist });
            this.setState({
                "item": ""
            });

            localStorage.setItem("todoList", JSON.stringify(todolist));
            this.textInput.current.focus();
        }
    }

    addToListBykeyPress = e => {
        if(e.key === 'Enter'){
            this.addToList();
        }
    }

    removeItem = index => {
        var { todolist } = this.state;
        todolist.splice(index, 1);
        this.setState({todolist: todolist});
        localStorage.setItem("todoList", JSON.stringify(todolist));
    }

    markAsDone = index => {
        var { todolist } = this.state;
        let theTask = todolist[index];
        let newState = theTask.finished === 'underline' ? '' : 'underline'
        todolist[index].finished = newState
        this.setState({todolist: todolist});
        localStorage.setItem("todoList", JSON.stringify(todolist));
    }

    render() {
        var { todolist } = this.state;

        var liste = todolist.map((item, index) => {
            return (
                <Board key={index} item={item} index={index} editItem={this.editItem} removeItem={this.removeItem} markAsDone={this.markAsDone} />
            );
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="offset-md-2 col-md-3 col-12">
                        <div className="form-group row">
                            <label htmlFor="item" className="col-md-12 control-label col-form-label text-left"><b>Entrez votre Tâche</b></label>
                            <div className="col-md-9 pt-3">
                                <input ref={this.textInput} type="text" id="item" onKeyPress={this.addToListBykeyPress} onChange={this.onChange} value={this.state.item} className='form-control'/>
                            </div>
                            <div className="col-md-3 pt-3">
                                <button type="button" className="btn btn-success" onClick={this.addToList}>Valider</button>
                            </div>
                        </div>
                    </div>
                    <div className="offset-md-1 col-md-4 col-12 card p-0">
                        <div className="card-header">
                            Mes Tâches
                        </div>
                        <div className="card-body">
                            { liste }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList;