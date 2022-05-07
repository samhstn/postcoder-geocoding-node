"use strict";

var assert = require('assert');

describe('AlliesGeocoding', function() {

    describe('.init()',function() {

        it("Should default to the test key, when no key passed", function() {

            var geocoding = require("../");
            geocoding.init();

            assert.equal("PCW45-12345-12345-1234X", geocoding.config.apiKey);

        });

        it("Should default to the test key, when non string passed", function() {

            var geocoding = require("../");
            geocoding.init(3);

            assert.equal(geocoding.config.apiKey, "PCW45-12345-12345-1234X");

        });

        it("Should use the key passed when is string", function() {

            var geocoding = require("../");
            geocoding.init("ABC45-56789-12345-1234X");

            assert.equal(geocoding.config.apiKey, "ABC45-56789-12345-1234X");

        });

        it("Should use the default this.config.options object", function() {

            var geocoding = require("../");

            geocoding.init("ABC45-56789-12345-1234X");

            assert.equal(geocoding.config.options.category, "places");

        });

        it("Should overwrite this.config.options object when one supplied", function() {

            var geocoding = require("../");

            var options = {
                category: "streets"
            }

            geocoding.init("ABC45-56789-12345-1234X", options);

            assert.equal(geocoding.config.options.category, "streets");

        });

        it("Should console.log info about apiKey being used when passing true in third parameter");

    });

    describe('.setOptions()',function() {

        it("Should overwrite this.config.options object when one supplied", function() {

            var geocoding = require("../");

            var options = {
                lines: 4,
                addtags: "udprn"
            }

            geocoding.init();

            geocoding.setOptions(options);

            assert.equal(geocoding.config.options.lines, 4);
            assert.equal(geocoding.config.options.addtags, "udprn");

        });

    });

    describe('.setPageNum()',function() {

        it("Should NOT overwrite this.config.pageNum value when non number supplied", function() {

            var geocoding = require("../");

            geocoding.init();

            geocoding.setPageNum("garbage");

            assert.equal(geocoding.config.pageNum, 0);

        });

        it("Should overwrite this.config.pageNum value when integer supplied", function() {

            var geocoding = require("../");

            geocoding.init();

            geocoding.setPageNum(1);

            assert.equal(geocoding.config.pageNum, 1);

        });

        it("Should overwrite this.config.pageNum value when non integer number supplied (converts using parseint)", function() {

            var geocoding = require("../");

            geocoding.init();

            geocoding.setPageNum(1.3);

            assert.equal(geocoding.config.pageNum, 1);

        });

        it("Should overwrite this.config.pageNum value when 0 supplied", function() {

            var geocoding = require("../");

            geocoding.init();

            geocoding.setPageNum(0);

            assert.equal(geocoding.config.pageNum, 0);

        });

    });

    describe('.checkStatus()',function() {

        it("Should return result object and false for error.", function(done) {

            var geocoding = require("../");

            geocoding.init();

            geocoding.checkStatus( function(error, result) {

                assert.equal(typeof result, "object");
                assert.equal(error, false);

                done();

            });

        });

        it("Should fail when can't reach API, needs way of simulating broken connection");

        it("Should inform you when using test key", function(done) {

            var geocoding = require("../");

            geocoding.init();

            geocoding.checkStatus( function(error, result) {

                assert.equal(result.state, "Test Key");
                assert.equal(result.correctsearchkey, true);

                done();

            });

        });

        it("Should inform you when using incorrect key", function(done) {

            var geocoding = require("../");

            geocoding.init("rsetghtdejgkfk");

            geocoding.checkStatus( function(error, result) {

                assert.equal(result.state, "Incorrect Search Key");
                assert.equal(result.correctsearchkey, false);

                done();

            });

        });

    });

    describe('.geoFromPostcode()',function() {

        it("Should return result array with one record with latitude and longitude fields for NR14 7PZ", function(done) {

            var geocoding = require("../");

            geocoding.init();

            geocoding.geoFromPostcode("NR14 7PZ", function(error, result) {

                assert.equal(Array.isArray(result), true);
                assert.equal(result.length == 1, true);
                assert.equal(result[0].latitude != 'undefined', true);
                assert.equal(result[0].longitude != 'undefined', true);

                done();

            });

        });

        it("Should return empty array with blank search parameter", function(done) {

            var geocoding = require("../");

            geocoding.init();

            geocoding.geoFromPostcode("", function(error, result) {

                assert.equal(Array.isArray(result), true);
                assert.equal(result.length, 0);

                done();

            });

        });

    });

    describe('.searchStreetGeo()',function() {

        it("Should return result array with one record for NR14 7PZ", function(done) {

            var geocoding = require("../");

            geocoding.init();

            geocoding.searchStreetGeo("NR14 7PZ", function(error, result) {

                assert.equal(Array.isArray(result), true);
                assert.equal(result.length == 1, true);

                done();

            });

        });

        it("Should return empty array with blank search parameter", function(done) {

            var geocoding = require("../");

            geocoding.init();

            geocoding.searchStreetGeo("", function(error, result) {

                assert.equal(Array.isArray(result), true);
                assert.equal(result.length, 0);

                done();

            });

        });

        it("Should include latitude and longitude fields in first record", function(done) {

            var geocoding = require("../");

            geocoding.init();

            geocoding.searchStreetGeo("NR14 7PZ", function(error, result) {

                assert.equal(Array.isArray(result), true);
                assert.equal(result.length == 1, true);
                assert.equal(result[0].latitude != 'undefined', true);
                assert.equal(result[0].longitude != 'undefined', true);

                done();

            });

        });
    });

    describe('.streetFromGeo()',function() {

    });

});
