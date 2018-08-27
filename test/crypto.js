var Buffer = require("buffer/").Buffer;
var crypto_lib = require("crypto-browserify");
var should = require("should");
var asch = require("../index.js");

describe("crypto.js", () => {
  var crypto = asch.crypto;

  it("should be ok", () => {
    (crypto).should.be.ok;
  });

  it("should be object", () => {
    (crypto).should.be.type("object");
  });

  it("should has properties", () => {
    var properties = ["getBytes", "getHash", "getId", "getFee", "sign", "secondSign", "getKeys", "getAddress", "verify", "verifySecondSignature", "fixedPoint"];
    properties.forEach(function (property) {
      (crypto).should.have.property(property);
    });
  });

  describe("#getBytes", () => {
    var getBytes = crypto.getBytes;
    var bytes = null;

    it("should be ok", () => {
      (getBytes).should.be.ok;
    });

    it("should be a function", () => {
      (getBytes).should.be.type("function");
    });

    it("should return Buffer of simply transaction and buffer most be 101 length", () => {
      var transaction = {
        id: "4041142bc239ac7a25b7bfe142c3d7480d347ede08af17333d0f137e9d034b2a",
        timestamp:67290342,
        senderPublicKey:"116025d5664ce153b02c69349798ab66144edd2a395e822b13587780ac9c9c09",
        senderId:"ABuH9VHV3cFi9UKzcHXGMPGnSC4QqT2cZ5",
        message:null,
        fee:10000000,
        recipientId:"AHMCKebuL2nRYDgszf9J2KjVZzAw95WUyB",
        amount:200000000000,
        asset:{},
        type:0,signature:"b788d6365696bd9925e940b3491bac9baeac7b9ba4e59569011d17c09093b34a2f1c5be8a067b970db4fae56dec1135f1cea663fde4e7c95be96911169081408",
        signatures:null,
        args:[200000000000,"AHMCKebuL2nRYDgszf9J2KjVZzAw95WUyB"]
      }

      bytes = getBytes(transaction);
      (bytes).should.be.ok;
      (bytes).should.be.type("object");
      (bytes.length).should.be.equal(101);
    });

    it("should return Buffer of transaction with second signature and buffer most be 164 length", () => {
      var transaction = {
        id:"83d874427e4a3141ab3b43e7bbdf800ee2bd4b1d6e9ade97daf6afd8bdd468d7",
        timestamp:67291463,
        senderPublicKey:"a7cfd49d25ce247568d39b17fca221d9b2ff8402a9f6eb6346d2291a5c81374c",
        senderId:"AHMCKebuL2nRYDgszf9J2KjVZzAw95WUyB",
        secondSignature:"a231be53073cece62b1a9c373d5fd40169d7e7ea9cb0bf96ab849b9cf9992280378207fd0ec11382bbdf7e04efdd54d56ba066a531ae8c8bc2fe04ea448d5f08",
        message:null,
        fee:10000000,
        recipientId:"AGcqEW2B2WR45eDDndMq4a72k1wMSW4wsz",
        amount:10000000000,
        asset:{},
        type:0,
        signature:"bb9a543f0163a3e9fdf2b7e25aabc84e11b0250f133651459bf8f5751bcc9615d331032a141a2495f1a0bcb2bbd49e37be3b6a6cb4beb723f6ca4fcac63da802",
        signatures:null,
        args:[10000000000,"AGcqEW2B2WR45eDDndMq4a72k1wMSW4wsz"]
      }

      bytes = getBytes(transaction);
      (bytes).should.be.ok;
      (bytes).should.be.type("object");
      (bytes.length).should.be.equal(164);
    });
  });

  describe("#getHash", () => {
    var getHash = crypto.getHash;

    it("should be ok", () => {
      (getHash).should.be.ok;
    });

    it("should be a function", () => {
      (getHash).should.be.type("function");
    })

    it("should return Buffer and Buffer must be 32 bytes length", () => {
      var transaction = {
        id: "4041142bc239ac7a25b7bfe142c3d7480d347ede08af17333d0f137e9d034b2a",
        timestamp:67290342,
        senderPublicKey:"116025d5664ce153b02c69349798ab66144edd2a395e822b13587780ac9c9c09",
        senderId:"ABuH9VHV3cFi9UKzcHXGMPGnSC4QqT2cZ5",
        message:null,
        fee:10000000,
        recipientId:"AHMCKebuL2nRYDgszf9J2KjVZzAw95WUyB",
        amount:200000000000,
        asset:{},
        type:0,signature:"b788d6365696bd9925e940b3491bac9baeac7b9ba4e59569011d17c09093b34a2f1c5be8a067b970db4fae56dec1135f1cea663fde4e7c95be96911169081408",
        signatures:null,
        args:[200000000000,"AHMCKebuL2nRYDgszf9J2KjVZzAw95WUyB"]
      }

      var result = getHash(transaction);
      (result).should.be.ok;
      (result).should.be.type("object");
      (result.length).should.be.equal(32);
    });
  });

  describe("#getId", () => {
    var getId = crypto.getId;

    it("should be ok", () => {
      (getId).should.be.ok;
    });

    it("should be a function", () => {
      (getId).should.be.type("function");
    });

    it.skip("should return string id and be equal to 13987348420913138422", () => {
      var transaction = {
        id: "4041142bc239ac7a25b7bfe142c3d7480d347ede08af17333d0f137e9d034b2a",
        timestamp:67290342,
        senderPublicKey:"116025d5664ce153b02c69349798ab66144edd2a395e822b13587780ac9c9c09",
        senderId:"ABuH9VHV3cFi9UKzcHXGMPGnSC4QqT2cZ5",
        message:null,
        fee:10000000,
        recipientId:"AHMCKebuL2nRYDgszf9J2KjVZzAw95WUyB",
        amount:200000000000,
        asset:{},
        type:0,signature:"b788d6365696bd9925e940b3491bac9baeac7b9ba4e59569011d17c09093b34a2f1c5be8a067b970db4fae56dec1135f1cea663fde4e7c95be96911169081408",
        signatures:null,
        args:[200000000000,"AHMCKebuL2nRYDgszf9J2KjVZzAw95WUyB"]
      }

      var id = getId(transaction);
      (id).should.be.type("string").and.equal("f60a26da470b1dc233fd526ed7306c1d84836f9e2ecee82c9ec47319e0910474");
    });
  });

  describe("#getFee", () => {
    var getFee = crypto.getFee;

    it("should be ok", () => {
      (getFee).should.be.ok;
    })

    it("should be a function", () => {
      (getFee).should.be.type("function");
    });

    it("should return number", () => {
      var fee = getFee({ amount: 100000, type: 0 });
      (fee).should.be.type("number");
      (fee).should.be.not.NaN;
    });

    it("should return 10000000", () => {
      var fee = getFee({ amount: 100000, type: 0 });
      (fee).should.be.type("number").and.equal(10000000);
    });

    it("should return 10000000000", () => {
      var fee = getFee({ type: 1 });
      (fee).should.be.type("number").and.equal(10000000000);
    });

    it("should be equal 1000000000000", () => {
      var fee = getFee({ type: 2 });
      (fee).should.be.type("number").and.equal(1000000000000);
    });

    it("should be equal 100000000", () => {
      var fee = getFee({ type: 3 });
      (fee).should.be.type("number").and.equal(100000000);
    });
  });

  describe("fixedPoint", () => {
    var fixedPoint = crypto.fixedPoint;

    it("should be ok", () => {
      (fixedPoint).should.be.ok;
    })

    it("should be number", () => {
      (fixedPoint).should.be.type("number").and.not.NaN;
    });

    it("should be equal 100000000", () => {
      (fixedPoint).should.be.equal(100000000);
    });
  });

  describe("#sign", () => {
    var sign = crypto.sign;

    it("should be ok", () => {
      (sign).should.be.ok;
    });

    it("should be a function", () => {
      (sign).should.be.type("function");
    });
  });

  describe("#secondSign", () => {
    var secondSign = crypto.secondSign;

    it("should be ok", () => {
      (secondSign).should.be.ok;
    });

    it("should be a function", () => {
      (secondSign).should.be.type("function");
    });
  });

  describe("#getKeys", () => {
    var getKeys = crypto.getKeys;

    it("should be ok", () => {
      (getKeys).should.be.ok;
    });

    it("should be a function", () => {
      (getKeys).should.be.type("function");
    });

    it("should return two keys in hex", () => {
      var keys = getKeys("secret");

      (keys).should.be.ok;
      (keys).should.be.type("object");
      (keys).should.have.property("publicKey");
      (keys).should.have.property("privateKey");
      (keys.publicKey).should.be.type("string").and.match(() => {
        try {
          new Buffer(keys.publicKey, "hex");
        } catch (e) {
          return false;
        }

        return true;
      });
      (keys.privateKey).should.be.type("string").and.match(() => {
        try {
          new Buffer(keys.privateKey, "hex");
        } catch (e) {
          return false;
        }

        return true;
      });
    });
  });

  describe("#getAddress", () => {
    var getAddress = crypto.getAddress;

    it("should be ok", () => {
      (getAddress).should.be.ok;
    })

    it("should be a function", () => {
      (getAddress).should.be.type("function");
    });

    it("should generate address by publicKey", () => {
      var keys = crypto.getKeys("secret");
      var address = getAddress(keys.publicKey);

      (address).should.be.ok;
      (address).should.be.type("string");
      (address).should.be.equal("AFkctfgZFkaATGRhGbj72wzJqACvMyzQ1U");
    });
  });

  describe("#verify", () => {
    var verify = crypto.verify;

    it("should be ok", () => {
      (verify).should.be.ok;
    })

    it("should be function", () => {
      (verify).should.be.type("function");
    });
  });

  describe("#verifySecondSignature", () => {
    var verifySecondSignature = crypto.verifySecondSignature;

    it("should be ok", () => {
      (verifySecondSignature).should.be.ok;
    });

    it("should be function", () => {
      (verifySecondSignature).should.be.type("function");
    });
  });
});