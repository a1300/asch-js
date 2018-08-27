var Buffer = require("buffer/").Buffer;
var crypto_lib = require("crypto-browserify");
var should = require("should");
var asch = require("../index.js");

describe("basic.js", () => {
  var basic = asch.basic;
  var setName;
  var trs;

  beforeEach(() => {
    setName = asch.basic.setName;
    trs = basic.setName("sqfasd", "secret", null)
  });

  afterEach(() => {
    trs = null;
  });

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
    it("should be function", () => {
      (setName).should.be.type("function");
    });

    it("should create setName transaction", () => {
      (trs).should.be.ok;
      (trs).should.be.type("object");
    });

    describe('returned setName transaction', () => {
      it("should have id as string", () => {
        (trs.id).should.be.type("string");
      });

      it('should have type as number and equal 2', () => {
        (trs.type).should.be.type("number").and.equal(2);
      });

      describe("fee calculation", () => {
        it('fee for 2 character nickname is 200 XAS', () => {
          trs = setName("a".repeat(2), "secret", "second secret");
          (trs.fee).should.be.type("number").and.equal(200 * 1e8);
        });

        it('fee for 3 character nickname is 100 XAS', () => {
          trs = setName("b".repeat(3), "secret", "second secret");
          (trs.fee).should.be.type("number").and.equal(100 * 1e8)
        });

        it('fee for 4 character nickname is 80 XAS', () => {
          trs = setName("c".repeat(4), "secret", "second secret");
          (trs.fee).should.be.type("number").and.equal(80 * 1e8)
        });

        it('fee for 5 character nickname is 40 XAS', () => {
          trs = setName("d".repeat(5), "secret", "second secret");
          (trs.fee).should.be.type("number").and.equal(40 * 1e8)
        });

        it('fee for 10 character nickname is 10 XAS', () => {
          trs = setName("e".repeat(10), "secret", "second secret");
          (trs.fee).should.be.type("number").and.equal(10 * 1e8)
        });

        it('fee for 15 character nickname is 1 XAS', () => {
          trs = setName("f".repeat(15), "secret", "second secret");
          (trs.fee).should.be.type("number").and.equal(1 * 1e8)
        });
      });
    });
  });
});
