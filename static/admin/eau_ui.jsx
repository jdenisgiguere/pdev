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

var GenererDiagramme = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var result = [
            '<svg height="220" width="600">',
                '<defs>',
                    '<linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">',
                        '<stop offset="0%" style="stop-color:rgb(105, 133, 251);stop-opacity:1"/>',
                        '<stop offset="100%" style="stop-color:rgb(0, 101, 0);stop-opacity:1"/>',
                    '</linearGradient>',
                '</defs>',
               '<g class="echelle" transform="translate(50,80)">',
                    '<rect width="500" height="100" fill="url(#grad2)"/>',
                '</g>',
                '<g class="mesure" transform="translate(50,80)">',
                    '<rect x="216" y="50" height="10" width="10" fill="rgb(255,255,0)"/>',
                '</g>',
                '<g class="legende">',
                    '<text x="50" y="55" fill="black" text-anchor="middle">Ultra-',
                        '<tspan x="50" y="75" text-anchor="middle">oligotrophe</tspan>',
                    '</text>',
                    '<text x="133" y="65" fill="black" text-anchor="middle">Oligotrophe</text>',
                    '<path id="oligo-vs-meso" d="M 216 80 L 216 180 Z" stroke="black" stroke-width="2" fill="none"/>',
                    '<text x="216" y="205" text-anchor="middle">10</text>',
                    '<text x="300" y="65" fill="black" text-anchor="middle">Mésotrophe</text>',
                    '<path id="meso-vs-eu" d="M 382 80 L 382 180 Z" stroke="black" stroke-width="2" fill="none"/>',
                    '<text x="382" y="205" text-anchor="middle">30</text>',
                    '<text x="466" y="65" fill="black" text-anchor="middle">Eutrophe</text>',
                    '<text x="550" y="55" fill="black" text-anchor="middle">Hyper-',
                        '<tspan x="550" y="75" text-anchor="middle">eutrophe</tspan>',
                    '</text>',
                '</g>',
            '</svg>',
        ];
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