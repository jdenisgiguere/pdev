var actionDB = new PouchDB('actions');

function addActions (description) {
    var action = {
        critere: 'Bandes riveraines',
        description: description
    };
    action._id = [action.critere,action.description].join(" ");

    actionDB.put(action, function callback(err, result) {
        if (!err) {
            console.log('Comment successfully added');
        }
    });
}

function loadAllActions(actionBox) {
    actionDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
        var data = [];
        doc.rows.forEach(function(element) {
            data.push({description: element.doc.description, _id: element.doc.id});
        })
        actionBox.setState({data: data});
    })
}