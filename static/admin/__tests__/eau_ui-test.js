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

it('sets position to 20 for phosphore value of 4', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 4)).toBe(20);
});

it('sets position to 126 for phosphore value of 7', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 7)).toBe(126);
});

it('sets position to 180 for phosphore value of 10', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 10)).toBe(180);
});


it('sets position between 238 and 298 for phosphore value of 16.7', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 16.7)).toBeGreaterThan(238);
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 16.7)).toBeLessThan(298);
});

it('sets position to 268 for phosphore value of 16.5', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 16.5)).toBeCloseTo(268.0,1);
});

it('sets position to 269.7 for phosphore value of 16.7', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 16.7)).toBeCloseTo(269.7,1);
});


it('sets position to 238 for phosphore value of 13', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 13)).toBe(238);
});


