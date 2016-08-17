var actionDB = new PouchDB('actions');

function addActions(action) {
    action.critere = 'Bandes riveraines';

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
            data.push({description: element.doc.description,
                responsable: element.doc.responsable,
                partenaire: element.doc.partenaire,
                frequence: element.doc.frequence,
                echeance: element.doc.echeance,
                etat: element.doc.etat,
                _id: element.doc._id});
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