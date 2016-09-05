/**
 * Created by jdgiguere on 16-09-01.
 */

/**
 * Tests sur le phosphore
 */


it('raises error if phosphore is lower than 0', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(function() {
        CalculateurDiagramme.mesureVersPosition("phosphore", -1);
    }).toThrow("Valeur plus petite que la plus petite valeur acceptée");
});

it('sets position to 0 for phosphore value of 0', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 0)).toBe(0);
});

it('sets position to 19 for phosphore value of 4', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 4)).toBe(19);
});

it('sets position to 122 for phosphore value of 7', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 7)).toBe(122);
});

it('sets position to 174 for phosphore value of 10', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 10)).toBe(174);
});

it('sets position to 230 for phosphore value of 13', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 13)).toBe(230);
});

it('sets position between 230 and 298 for phosphore value of 16.7', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 16.7)).toBeGreaterThan(230);
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 16.7)).toBeLessThan(288);
});

it('sets position to 259 for phosphore value of 16.5', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 16.5)).toBeCloseTo(259.0, 1);
});

it('sets position to 288 for phosphore value of 20', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 20)).toBe(288);
});

it('sets position to 346 for phosphore value of 30', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 30)).toBe(346);
});



