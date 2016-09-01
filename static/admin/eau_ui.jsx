var CalculateurDiagramme = (function() {

    return {
        mesureVersPosition: function(mesure, valeur) {
            return 216;
        }
    }

})();

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
    render: function() {
        return (
            <form role="form">
                <label htmlFor="indicateurSelect">Indicateur</label>
                <select className="form-control" id="indicateurSelector">
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
    mesureLocationX : function () {
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
                    <rect x={CalculateurDiagramme.mesureVersPosition(this.props.mesure, this.props.valeur)} y="50" height="10" width="10" fill="rgb(255,255,0)"/>
                </g>

                <g className="legende">

                    <text x="50" y="55" fill="black" textAnchor="middle">Ultra-
                        <tspan x="50" y="75" textAnchor="middle">oligotrophe</tspan>
                    </text>
                    <text x="133" y="65" fill="black" textAnchor="middle">Oligotrophe</text>
                    <path id="oligo-vs-meso" d="M 216 80 L 216 180 Z" stroke="black" strokeWidth="2" fill="none"/>
                    <text x="216" y="205" textAnchor="middle">10</text>
                    <text x="300" y="65" fill="black" textAnchor="middle">Mésotrophe</text>
                    <path id="meso-vs-eu" d="M 382 80 L 382 180 Z" stroke="black" strokeWidth="2" fill="none"/>
                    <text x="382" y="205" textAnchor="middle">30</text>
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
        var diagramme = ReactDOMServer.renderToStaticMarkup(<Diagramme mesure="phosphoreTotal" valeur="12"/>);
        var result = [diagramme,]
        var blob = new Blob(result, {type: "image/svg+xml;charset=utf-8"});
        saveAs(blob, "qualite_eau.svg");
    },

    render: function() {
        return (
            <div className="exporter">
                <form role="form" onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-default">Générer le diagramme</button>
                </form>
            </div>
        );
    }
});

var QualiteEauWidget = React.createClass({
    render: function() {
        return (
            <div id="qualiteEauWidget">
                <BassinSelect />
                <IndicateurSelect />
                <label>Date de l'acquisition</label>
                <input type="date" className="form-control" placeholder="Date de l'acquisition"/>
                <label>Mesure</label>
                <input type="text" className="form-control" placeholder="Mesure"/>
                <button type="submit" className="btn btn-default">Soumettre</button>
                <GenererDiagramme />
            </div>
        );
    }
});

ReactDOM.render(
    <QualiteEauWidget />,
    document.getElementById('eauContainer')
);
