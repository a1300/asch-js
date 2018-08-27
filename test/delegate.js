var Buffer = require("buffer/").Buffer;
var crypto_lib = require("crypto-browserify");
var should = require("should");
var asch = require("../index.js");

describe("delegate.js", () => {
  var delegate = asch.delegate;

  it("should be ok", () => {
    (delegate).should.be.ok;
  });

  it("should be function", () => {
    (delegate).should.be.type("object");
  });

  it("should have property createDelegate", () => {
    (delegate).should.have.property("createDelegate");
  });

  describe("#createDelegate", () => {
    var createDelegate = delegate.createDelegate;


    it("should be ok", () => {
      (createDelegate).should.be.ok;
    });

    it("should be function", () => {
      (createDelegate).should.be.type("function");
    });

    it("should create delegate", () => {
      delegateTrs = createDelegate("secret", "secret 2");
    });

    describe("returned delegate", () => {
      var keys = asch.crypto.getKeys("secret");
      var secondKeys = asch.crypto.getKeys("secret 2");
      var delegateTrs = null;

      beforeEach('setup delegate.js', () => {
        delegateTrs = createDelegate("secret", "secret 2");
      })

      afterEach('clenup delegate.js', () => {
        delegateTrs = null;
      })

      it("should be ok", () => {
        (delegateTrs).should.be.ok;
      });

      it("should be object", () => {
        (delegateTrs).should.be.type("object");
      });

      it("should have type equal 10", () => {
        (delegateTrs).should.have.property("type").and.type("number").and.equal(10);
      });

      it("should have timestamp number", () => {
        (delegateTrs).should.have.property("timestamp").and.type("number");
      });

      it("should have senderPublicKey in hex", () => {
        (delegateTrs).should.have.property("senderPublicKey").and.type("string").and.match(() => {
          try {
            new Buffer(delegateTrs.senderPublicKey, "hex");
          } catch (e) {
            return false;
          }

          return true;
        }).and.equal(keys.publicKey);
      });

      it("should have signature in hex in signatures array", () => {
        (delegateTrs).should.have.property("signatures").and.be.an.Array().and.match(() => {
          try {
            new Buffer(delegateTrs.signatures[0], "hex");
          } catch (e) {
            return false;
          }

          return true;
        });
      });

      it("should have second signature in hex", () => {
        (delegateTrs).should.have.property("secondSignature").and.match(() => {
          try {
            new Buffer(delegateTrs.secondSignature, "hex");
          } catch (e) {
            return false;
          }

          return true;
        });
      });

      it("should have args array", () => {
        (delegateTrs).should.have.property("args").and.be.an.Array();
        (delegateTrs.args.length).should.equal(0);
      })

      it.skip("should be signed correctly", () => {
        var result = asch.crypto.verify(delegateTrs, keys.publicKey);
        (result).should.be.ok;
      });

      it.skip("should be second signed correctly", () => {
        var result = asch.crypto.verifySecondSignature(delegateTrs, secondKeys.publicKey);
        (result).should.be.ok;
      });

      it.skip("should not be signed correctly now", () => {
        delegateTrs.amount = 100;
        var result = asch.crypto.verify(delegateTrs, keys.publicKey);
        (result).should.be.not.ok;
      });

      it.skip("should not be second signed correctly now", () => {
        delegateTrs.amount = 100;
        var result = asch.crypto.verify(delegateTrs, secondKeys.publicKey);
        (result).should.be.not.ok;
      });
    });
  });
});