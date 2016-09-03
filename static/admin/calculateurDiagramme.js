/**
 * Created by jdgiguere on 16-09-03.
 */
var CalculateurDiagramme = (function() {

    var scaleLength = 500;

    var niveauTrophique = {
        phosphore: {
            ultraOligotrophe: 0,
            oligotropheMin: 4,
            oligoMesotropheMin: 7,
            oligotropheMax: 10,
            oligoMesotropheMax: 13,
            mesoEutropheMin: 20,
        },

        pixel: {
            ultraOligotrophe: 0,
            oligotropheMin: 20,
            oligoMesotropheMin: 126,
            oligotropheMax: 180,
            oligoMesotropheMax: 238,
            mesoEutropheMin: 298,
        }
    };

    function interpollePixel(valeur, valeurMin, valeurMax, pixelMin, pixelMax) {
        var proportion;
        proportion = (valeur - valeurMin) / (valeurMax - valeurMin);
        return pixelMin + proportion * (pixelMax - pixelMin);
    }


    return {
        niveauTrophique: Object.freeze(niveauTrophique),

        mesureVersPosition: function(mesure, valeur) {
            var pixel, proportion;
            if (valeur < niveauTrophique[mesure].ultraOligotrophe) {
                throw {
                    name: "Erreur",
                    message: "Valeur plus petite que la plus petite valeur acceptée"
                };
            }
            else if (valeur >= niveauTrophique[mesure].ultraOligotrophe &&
                valeur < niveauTrophique[mesure].oligotropheMin) {
                pixel = interpollePixel(valeur,
                    niveauTrophique[mesure].ultraOligotrophe,
                    niveauTrophique[mesure].oligotropheMin,
                    niveauTrophique.pixel.ultraOligotrophe,
                    niveauTrophique.pixel.oligotropheMin);
            } else if (valeur >= niveauTrophique[mesure].oligotropheMin &&
                valeur < niveauTrophique[mesure].oligoMesotropheMin) {
                pixel = interpollePixel(valeur,
                    niveauTrophique[mesure].oligotropheMin,
                    niveauTrophique[mesure].oligoMesotropheMin,
                    niveauTrophique.pixel.oligotropheMin,
                    niveauTrophique.pixel.oligoMesotropheMin);
            } else if (valeur >= niveauTrophique[mesure].oligoMesotropheMin &&
                valeur < niveauTrophique[mesure].oligotropheMax) {
                pixel = interpollePixel(valeur,
                    niveauTrophique[mesure].oligoMesotropheMin,
                    niveauTrophique[mesure].oligotropheMax,
                    niveauTrophique.pixel.oligoMesotropheMin,
                    niveauTrophique.pixel.oligotropheMax);
            } else if (valeur >= niveauTrophique[mesure].oligotropheMax &&
                valeur < niveauTrophique[mesure].oligoMesotropheMax) {
                pixel = interpollePixel(valeur,
                    niveauTrophique[mesure].oligotropheMax,
                    niveauTrophique[mesure].oligoMesotropheMax,
                    niveauTrophique.pixel.oligotropheMax,
                    niveauTrophique.pixel.oligoMesotropheMax);

            } else if (valeur >= niveauTrophique[mesure].oligoMesotropheMax &&
                valeur < niveauTrophique[mesure].mesoEutropheMin) {
                pixel = interpollePixel(valeur,
                    niveauTrophique[mesure].oligoMesotropheMax,
                    niveauTrophique[mesure].mesoEutropheMin,
                    niveauTrophique.pixel.oligoMesotropheMax,
                    niveauTrophique.pixel.mesoEutropheMin
                );

            }
            return pixel;
        }
    }

})();

try {
    module.exports = CalculateurDiagramme;
} catch (err) {
    console.log(err.message);
}
