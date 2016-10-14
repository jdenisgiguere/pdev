requirejs(['calculateurDiagramme.js']);


var BassinSelect = React.createClass({
    render: function() {
        return (
            <div>
                <form role="form">
                    <label htmlFor="bassinSelector">Bassin versant</label>
                    <select className="form-control" id="bassinSelector">
                        <option value="D'Alembert">lac D'Alembert</option>
                        <option value="ajouter_un_lac">Ajouter un bassin versant</option>
                    </select>
                </form>
            </div>

        );
    }
});

var IndicateurSelect = React.createClass({
    updateIndicateur: function() {
        this.props.onIndicateurUpdated(this.refs.indicateur);
    },

    render: function() {
        return (
            <form role="form">
                <label htmlFor="indicateurSelect">Indicateur</label>
                <select className="form-control" id="indicateurSelector" ref="indicateur"
                        onChange={this.updateIndicateur}>
                    <option value="phosphore">Phospore total (μg/l)</option>
                    <option value="chlorophylle">Chlorophylle a (μg/l)</option>
                    <option value="carbone_organique_dissous">Carbone organique dissous (mg/l)</option>
                    <option value="transparence">Transparence de l'eau (m)</option>
                </select>
            </form>
        );
    }
});

var Diagramme = React.createClass({
    mesureLocationX: function() {
        return 216;
    },

    render: function() {
        return (
            <svg height="220" width="600">
                <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: "#6985FB", stopOpacity: 1}}/>
                        <stop offset="100%" style={{stopColor: "#006500", stopOpacity: 1}}/>
                    </linearGradient>
                </defs>


                <g className="echelle" transform="translate(50,80)">
                    <rect width="500" height="100" fill="url(#grad2)"/>
                </g>

                <g className="mesure" transform="translate(50,80)">
                    <rect x={CalculateurDiagramme.mesureVersPosition(this.props.mesure, this.props.valeur)} y="50"
                          height="10" width="10" fill="rgb(255,255,0)"/>
                </g>

                <g className="legende">

                    <text x="50" y="55" fill="black" textAnchor="middle">Ultra-
                        <tspan x="50" y="75" textAnchor="middle">oligotrophe</tspan>
                    </text>
                    <text x="133" y="65" fill="black" textAnchor="middle">Oligotrophe</text>
                    <path id="oligo-vs-meso" d="M 216 80 L 216 180 Z" stroke="black" strokeWidth="2" fill="none"/>
                    <text x="216" y="205"
                          textAnchor="middle">{CalculateurDiagramme.niveauTrophique[this.props.mesure].oligotropheMax}</text>
                    <text x="300" y="65" fill="black" textAnchor="middle">Mésotrophe</text>
                    <path id="meso-vs-eu" d="M 382 80 L 382 180 Z" stroke="black" strokeWidth="2" fill="none"/>
                    <text x="382" y="205"
                          textAnchor="middle">{CalculateurDiagramme.niveauTrophique[this.props.mesure].mesotropheMax}</text>
                    <text x="466" y="65" fill="black" textAnchor="middle">Eutrophe</text>
                    <text x="550" y="55" fill="black" textAnchor="middle">Hyper-
                        <tspan x="550" y="75" textAnchor="middle">eutrophe</tspan>
                    </text>
                </g>

            </svg>
        );
    }
});

var GenererDiagramme = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var diagramme = ReactDOMServer.renderToStaticMarkup(<Diagramme mesure={this.props.mesure}
                                                                       valeur={this.props.valeur}/>);
        var result = [diagramme,];
        var blob = new Blob(result, {type: "image/svg+xml;charset=utf-8"});
        saveAs(blob, "qualite_eau.svg");
    },

    render: function() {
        return (
            <div className="exporter">
                <form role="form" onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-default">Générer les diagrammes</button>
                </form>
            </div>
        );
    }
});

var QualiteEauWidget = React.createClass({
    getInitialState: function() {
        return {
            mesure: null,
            indicateur: "phosphore",
            date: null
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();
        if (!this.state.mesure || !this.state.date) {
            alert("Veuillez complétez les champs obligatoires")
            return;
        }
        var mesure = {
            mesure: this.state.mesure,
            indicateur: this.state.indicateur,
            date: this.state.date
        };
        mesure._id = [mesure.indicateur, mesure.date].join("_");

        rsvlDB.get(mesure._id).then(function(doc) {
            mesure._rev = doc._rev;
            //TODO: put if doc exist
            return rsvlDB.put(mesure);
        }).then(function(response) {
            console.log("mesure updated!");
        }).catch(function(err) {
            console.log(err);
        });

        //TODO: put only if get doesn't work...
        rsvlDB.put(mesure, function callback(err, result) {
            if (!err) {
                console.log("Mesure ajoutée!");
            } else {
                console.error(err);
            }
        });
    },

    handleExport: function(e) {
        var rows = [];
        rows.push("date, indicateur, mesure");
        e.preventDefault();
        rsvlDB.allDocs({include_docs: true, descending: true}).then(function(resp) {
            var row;
            resp.rows.forEach(function(element) {
                row = [element.doc.date, element.doc.indicateur, element.doc.mesure].join(", ");
                rows.push(row)
            });
            console.log("Getting mesure from database... done!")
        }).then(
            function(res) {
                var csvContent, blob;
                csvContent = rows.join("\n");
                blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
                console.log("Saving CSV...");
                saveAs(blob, "rsvl.csv");
            }
        ).catch(function(err) {
            console.error(err);
        });

    },

    handleImport: function(e) {
        e.preventDefault();
        PromiseFileReader.readAsText(this.refs.fichier.files[0]).then(function(importText) {
                var lines, entry, entries, values;
                entries = [];
                lines = [];

                lines = importText.split('\n');
                //Remove header
                lines.shift();
                lines.forEach(function(line) {
                    values = line.split(",");
                    values = values.map(function(val) {
                        return val.trim();
                    });
                    entry = {date: values[0], indicateur: values[1], mesure: values[2]}
                    entries.push(entry);
                });

                return entries;
            }
        ).then(function(entries) {
                rsvlDB.bulkDocs(entries);
            }
        ).catch(
            function(err) {
                console.log(err)
            }
        );

    },

    handleDeleteAll: function(e) {
        e.preventDefault();
        rsvlDB.allDocs({include_docs: true, descending: true}).then(function(resp) {
            var row;
            resp.rows.forEach(function(element) {
                rsvlDB.remove(element.doc);
            });
            console.log("All measure are del from database... done!")
        })
    },

    updateIndicateur: function(indicateurRef) {
        var state = this.state;
        state.indicateur = indicateurRef.value;
        this.setState(state);
    },

    handleChange: function() {
        var state = this.state;
        state.mesure = this.refs.mesure.value;
        state.date = this.refs.date.value;
        this.setState(state);
    },

    render: function() {
        return (
            <div id="qualiteEauWidget">
                <BassinSelect />
                <IndicateurSelect onIndicateurUpdated={this.updateIndicateur}/>
                <label>Date de l'acquisition</label>
                <input type="date" className="form-control" placeholder="Date de l'acquisition" ref="date"
                       onChange={this.handleChange}/>
                <label>Mesure</label>
                <input type="text" className="form-control" placeholder="Mesure" ref="mesure"
                       onChange={this.handleChange}/>
                <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Soumettre</button>
                <div className="input-group">
                    <input type="file" className="form-control" ref="fichier" placeholder="Fichier de mesures"/>
                    <span className="input-group-btn">
                            <button type="submit" className="btn btn-default"
                                    onClick={this.handleImport}>Importer</button>
                        </span>

                </div>
                <button type="submit" className="btn btn-default" onClick={this.handleExport}>Exporter</button>
                <GenererDiagramme mesure={this.state.indicateur} valeur={this.state.mesure}/>
                <button type="submit" className="btn btn-danger" onClick={this.handleDeleteAll}>Supprimer toutes les
                    mesures
                </button>
            </div>
        );
    }
});

ReactDOM.render(
    <QualiteEauWidget/>,
    document.getElementById('eauContainer')
);
