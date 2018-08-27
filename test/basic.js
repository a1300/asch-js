var Buffer = require("buffer/").Buffer;
var crypto_lib = require("crypto-browserify");
var should = require("should");
var asch = require("../index.js");

describe("basic.js", () => {
  var basic = asch.basic;

  it("should be ok", () => {
    (basic).should.be.ok;
  });

  it("should be object", () => {
    (basic).should.be.type("object");
  });

  it("should have property setName", () => {
    (basic).should.have.property("setName");
  });

  describe("#setName", () => {
    var setName = basic.setName;
    var snTrs = null;

    beforeEach("setup #setName", () => {
      snTrs = setName("secret", "second secret");
    });

    afterEach("cleanup #setName", () => {
      snTrs = null;
    });



    it("should be function", () => {
      (setName).should.be.type("function");
    });

    it("should create setName transaction", () => {
      (snTrs).should.be.ok;
      (snTrs).should.be.type("object");
    });

    describe('returned setName transaction', () => {
      it("should have id as string", () => {
        (snTrs.id).should.be.type("string");
      });

      it('should have type as number and equal 2', () => {
        (snTrs.type).should.be.type("number").and.equal(2);
      });

      describe("fee calculation", () => {
        it('fee for two charcter nickname is 200 XAS', () => {
          snTrs = setName("aa", "secret", "second secret")
          (snTrs.fee).should.be.type("number").and.equal(200 * 1e8);
        });

      });

    });
  });
});