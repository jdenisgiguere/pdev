var actionDB = new PouchDB('actions');

function addActions(_id, description) {
    var action = {
        _id: _id,
        critere: 'Bandes riveraines',
        description: description
    };

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
            data.push({description: element.doc.description, _id: element.doc._id});
        })
        actionBox.setState({data: data});
    })
}

function deleteAction(_id) {
    actionDB.get(_id, function(err, doc) {
        if (err) {
            return console.log(err);
        }
        actionDB.remove(doc, function(err, resp) {
            if (err) {
                return console.log(err);
            }
        });
    });
}