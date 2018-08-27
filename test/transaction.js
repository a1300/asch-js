var Buffer = require("buffer/").Buffer;
var crypto_lib = require("crypto-browserify");
var should = require("should");
var asch = require("../index.js");

describe.skip("transaction.js", () => {
  var transaction = asch.transaction;

  it("should be object", () => {
    (transaction).should.be.type("object");
  });

  it("should have properties", () => {
    (transaction).should.have.property("createTransaction");
  })

  describe("#createTransaction", () => {
    var createTransaction = transaction.createTransaction;
    var trs = null;

    beforeEach('setup #createTransaction', () => {

    })


    it("should be a function", () => {
      (createTransaction).should.be.type("function");
    });

    it("should create transaction without second signature", () => {
      trs = createTransaction("58191285901858109", 1000, "", "secret");
      (trs).should.be.ok;
    });

    describe("returned transaction", () => {
      it("should be object", () => {
        (trs).should.be.type("object");
      });

      it("should have id as string", () => {
        (trs.id).should.be.type("string");
      });

      it("should have type as number and eqaul 1", () => {
        (trs.type).should.be.type("number").and.equal(1);
      });

      it("should have timestamp as number", () => {
        (trs.timestamp).should.be.type("number").and.not.NaN;
      });

      it("should have senderPublicKey as hex string", () => {
        (trs.senderPublicKey).should.be.type("string").and.match(() => {
          try {
            new Buffer(trs.senderPublicKey, "hex")
          } catch (e) {
            return false;
          }

          return true;
        })
      });



      it("should have amount as number and eqaul to 1000", () => {
        (trs.amount).should.be.type("number").and.equal(1000);
      });

      it("should have empty asset object", () => {
        (trs.asset).should.be.type("object").and.empty;
      });

      it("should does not have second signature", () => {
        (trs).should.not.have.property("signSignature");
      });

      it("should have signature as hex string", () => {
        (trs.signature).should.be.type("string").and.match(() => {
          try {
            new Buffer(trs.signature, "hex")
          } catch (e) {
            return false;
          }

          return true;
        })
      });

      it("should be signed correctly", () => {
        var result = asch.crypto.verify(trs);
        (result).should.be.ok;
      });

      it("should not be signed correctly now", () => {
        trs.amount = 10000;
        var result = asch.crypto.verify(trs);
        (result).should.be.not.ok;
      });
    });
  });

  describe("#createTransaction with second secret", () => {
    var createTransaction = transaction.createTransaction;
    var trs = null;
    var secondSecret = "second secret";
    var keys = asch.crypto.getKeys(secondSecret);

    it("should be a function", () => {
      (createTransaction).should.be.type("function");
    });

    it("should create transaction without second signature", () => {
      trs = createTransaction("58191285901858109", 1000, "", "secret", secondSecret);
      (trs).should.be.ok;
    });

    describe("returned transaction", () => {
      it("should be object", () => {
        (trs).should.be.type("object");
      });

      it("should have id as string", () => {
        (trs.id).should.be.type("string");
      });

      it("should have type as number and eqaul 0", () => {
        (trs.type).should.be.type("number").and.equal(0);
      });

      it("should have timestamp as number", () => {
        (trs.timestamp).should.be.type("number").and.not.NaN;
      });

      it("should have senderPublicKey as hex string", () => {
        (trs.senderPublicKey).should.be.type("string").and.match(() => {
          try {
            new Buffer(trs.senderPublicKey, "hex")
          } catch (e) {
            return false;
          }

          return true;
        })
      });

      it("should have recipientId as string and to be equal 58191285901858109", () => {
        (trs.recipientId).should.be.type("string").and.equal("58191285901858109");
      });

      it("should have amount as number and eqaul to 1000", () => {
        (trs.amount).should.be.type("number").and.equal(1000);
      });

      it("should have empty asset object", () => {
        (trs.asset).should.be.type("object").and.empty;
      });

      it("should have second signature", () => {
        (trs).should.have.property("signSignature");
      });

      it("should have signature as hex string", () => {
        (trs.signature).should.be.type("string").and.match(() => {
          try {
            new Buffer(trs.signature, "hex")
          } catch (e) {
            return false;
          }

          return true;
        })
      });

      it("should have signSignature as hex string", () => {
        (trs.signSignature).should.be.type("string").and.match(() => {
          try {
            new Buffer(trs.signSignature, "hex");
          } catch (e) {
            return false;
          }

          return true;
        });
      });

      it("should be signed correctly", () => {
        var result = asch.crypto.verify(trs);
        (result).should.be.ok;
      });

      it("should be second signed correctly", () => {
        var result = asch.crypto.verifySecondSignature(trs, keys.publicKey);
        (result).should.be.ok;
      });

      it("should not be signed correctly now", () => {
        trs.amount = 10000;
        var result = asch.crypto.verify(trs);
        (result).should.be.not.ok;
      });

      it("should not be second signed correctly now", () => {
        trs.amount = 10000;
        var result = asch.crypto.verifySecondSignature(trs, keys.publicKey);
        (result).should.be.not.ok;
      });
    });
  });
});