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
            </div>
        );
    }
});

ReactDOM.render(
    <QualiteEauWidget />,
    document.getElementById('eauContainer')
);