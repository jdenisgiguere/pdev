var ActionLine = React.createClass({
    handleClick: function() {
        this.props.onLineRemoval(this.props._id);
    },

    render: function() {
        return (
            <tr>
                <td>{this.props.description}</td>
                <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" style={{color:"black"}} /></td>
                <td><a href="#" onClick={this.handleClick}><span className="glyphicon glyphicon-remove" aria-hidden="true" style={{color:"red"}} /></a></td>
            </tr>
        );
    }
});

var ActionList = React.createClass({

    handleActionRemoval: function(action_id) {
        this.props.onActionRemoval(action_id);
    },

    render: function() {
        var me = this;
        var actionsLines = this.props.data.map(function(action) {
            return (
                <ActionLine onLineRemoval={me.handleActionRemoval} description={action.description} key={action._id}
                            _id={action._id}/>
            );
        });

        return (
            <div className="actionList">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {actionsLines}
                    </tbody>
                </table>
            </div>
        );
    }
});

var ActionBox = React.createClass({
    loadActionsFromDatabase: function() {
        loadAllActions(this);
    },

    handleActionSubmit: function(action) {
        var actions = this.state.data;
        var newActions = actions.concat([action]);
        this.setState({data: newActions});

        addActions(action._id, action.description);
    },

    handleActionRemoval: function(action_id) {
        var actions = this.state.data;
        var newActions = actions.filter(function(elem) {
            return elem._id !== action_id;
        });
        this.setState({data: newActions});
        deleteAction(action_id);
    },

    getInitialState: function() {
        return {data: []}
    },

    componentDidMount: function() {
        this.loadActionsFromDatabase()
    },

    render: function() {
        return (
            <div id="actionBox">
                <h2>Actions</h2>
                <ActionList data={this.state.data} onActionRemoval={this.handleActionRemoval}/>
                <ActionDetail onActionSubmit={this.handleActionSubmit}/>
                <GenererHtml data={this.state.data}/>
            </div>
        );
    }
});

var ActionDetail = React.createClass({
    getInitialState: function() {
        return {description: 'ABC'};
    },

    handleDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var description = this.state.description.trim();
        if (!description) {
            return;
        }
        //TODO do not encode criteria name
        var _id = ['bandes_riveraines', description].join(" ");
        this.props.onActionSubmit({_id: _id, description: description});
        this.setState({description: ''});
    },

    render: function() {
        return (
            <div className="actionDetail">
                <h3>Édition d'une ation</h3>
                <form role="form" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="actionDescription">Description de l'action</label>
                        <input type="text" className="form-control" placeholder="Description de l'action"
                               value={this.state.description} onChange={this.handleDescriptionChange}
                               id="actionDescription"/>
                    </div>
                    <button type="submit" className="btn btn-default">Soumettre</button>
                </form>


            </div>
        );
    }

});

var GenererHtml = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var a = 0;
        var htmlParts = ReactDOMServer.renderToStaticMarkup(<ActionList data={this.props.data}/>);
        var blob = new Blob([htmlParts], {type: "text/html;charset=utf-8"});
        saveAs(blob, "pdaction.html");
    },

    render: function() {
        return (
            <div className="generationHtml">
                <form role="form" onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-default">Générer HTML</button>
                </form>
            </div>
        );
    }
});


ReactDOM.render(
    <ActionBox />,
    document.getElementById('actionContainer')
);