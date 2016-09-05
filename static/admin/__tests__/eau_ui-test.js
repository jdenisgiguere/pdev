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

it('sets position to 407 for phosphore value of 35', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 35)).toBe(407);
});

it('sets position to 483 for phosphore value of 100', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 100)).toBe(483);
});

it('sets position to 500 for phosphore value of 300', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 300)).toBe(500);
});

it('sets position to 500 for phosphore value of 301', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("phosphore", 301)).toBe(500);
});

/**
 * Chlorophylle
 */

it('sets position to 0 for chlorophylle value of 0', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 0)).toBe(0);
});

it('sets position to 19 for chlorophylle value of 1', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 1)).toBe(19);
});


it('sets position to 122 for chlorophylle value of 2.5', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 2.5)).toBe(122);
});

it('sets position to 174 for chlorophylle value of 3', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 3)).toBe(174);
});

it('sets position to 230 for chlorophylle value of 3.5', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 3.5)).toBe(230);
});

it('sets position to 288 for chlorophylle value of 6.5', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 6.5)).toBe(288);
});

it('sets position to 346 for chlorophylle value of 8', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 8)).toBe(346);
});

it('sets position to 407 for chlorophylle value of 10', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 10)).toBe(407);
});

it('sets position to 483 for chlorophylle value of 25', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 25)).toBe(483);
});

it('sets position to 500 for chlorophylle value of 100', () => {
    const CalculateurDiagramme = require("../calculateurDiagramme");
    expect(CalculateurDiagramme.mesureVersPosition("chlorophylle", 100)).toBe(500);
});