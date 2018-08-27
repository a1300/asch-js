var Buffer = require("buffer/").Buffer;
var crypto_lib = require("crypto-browserify");
var should = require("should");
var asch = require("../index.js");

describe("Asch JS", () => {

	it("should be ok", () => {
		(asch).should.be.ok;
	});

	it("should be object", () => {
		(asch).should.be.type("object");
	});

	it("should have properties", () => {
		var properties = ["transaction", "signature", "vote", "delegate", "dapp", "crypto"];

		properties.forEach(function (property) {
			(asch).should.have.property(property);
		});
	});



	describe("dapp.js", () => {
		var dapp = asch.dapp;


		it("should be object", () => {
			(dapp).should.be.type("object");
		});

		it("should have properties", () => {
			(dapp).should.have.property("createDApp");
		})

		describe("#createDApp", () => {
			var createDApp = dapp.createDApp;
			var trs = null;

			var options = {
				"name": "asch-dapp-cctime",
				"link": "https://github.com/AschPlatform/asch-dapp-cctime/archive/master.zip",
				"category": 1,
				"description": "Decentralized news channel",
				"tags": "asch,dapp,demo,cctime",
				"icon": "http://o7dyh3w0x.bkt.clouddn.com/hello.png",
				"type": 0,
				"delegates": [
					"8b1c24a0b9ba9b9ccf5e35d0c848d582a2a22cca54d42de8ac7b2412e7dc63d4",
					"aa7dcc3afd151a549e826753b0547c90e61b022adb26938177904a73fc4fee36",
					"e29c75979ac834b871ce58dc52a6f604f8f565dea2b8925705883b8c001fe8ce",
					"55ad778a8ff0ce4c25cb7a45735c9e55cf1daca110cfddee30e789cb07c8c9f3",
					"982076258caab20f06feddc94b95ace89a2862f36fea73fa007916ab97e5946a"
				],
				"unlockDelegates": 3
			}

			beforeEach('setup dapp.js', () => {
				trs = createDApp(options, "secret", null);
			})
	
			afterEach('cleanup dapp.js', () => {
				trs = null;
			})




			it("should be a function", () => {
				(createDApp).should.be.type("function");
			});

			it("should create dapp without second signature", () => {
				trs = createDApp(options, "secret", null);
				(trs).should.be.ok;
			});

			it("should create dapp with second signature", () => {
				trs = createDApp(options, "secret", "secret 2");
				(trs).should.be.ok;
			});

			describe("returned dapp", () => {
				var keys = asch.crypto.getKeys("secret");
				var secondKeys = asch.crypto.getKeys("secret 2");

				it("should be object", () => {
					(trs).should.be.type("object");
				});

				it("should have id as string", () => {
					(trs.id).should.be.type("string");
				});

				it("should have type as number and equal 200", () => {
					(trs.type).should.be.type("number").and.equal(200);
				});

				it("should have fee as number and equal 10000000000", () => {
					(trs.fee).should.be.type("number").and.equal(10000000000);
				});

				it.skip("should have senderPublicKey as hex string", () => {
					(trs.senderPublicKey).should.be.type("string").and.match(function (given) {
						try {
							new Buffer("hex");
						} catch (e) {
							return false;
						}

						return true;
					})
				});

				it("should have timestamp as number", () => {
					(trs.timestamp).should.be.type("number").and.not.NaN;
				});

				it("should have args as array", () => {
					(trs.args).should.be.an.Array();
				});

				describe("dapp args", () => {
					it("should be ok", () => {
						(trs.args).should.be.ok;
					})

					it("should be an array", () => {
						(trs.args).should.be.an.Array()
					});

					// options.name,
					// options.description,
					// options.link,
					// options.icon,
					// options.delegates,
					// options.unlockDelegates

					it("should have name item", () => {
						(trs.args[0]).should.be.type("string").and.equal(options.name);
					});

					it("should have description item", () => {
						(trs.args[1]).should.be.type("string").and.equal(options.description)
					})

					it("should have link item", () => {
						(trs.args[2]).should.be.type("string").and.equal(options.link);
					});

					it("should have icon item", () => {
						(trs.args[3]).should.be.type("string").and.equal(options.icon);
					});

					it("should have delegates item", () => {
						(trs.args[4]).should.be.an.Array().and.equal(options.delegates)
					})

					it("should have unlockDelegates item", () => {
						(trs.args[5]).should.be.type("number").and.equal(options.unlockDelegates);
					});
				});

				it("should have signature as hex string in signatures array", () => {
					(trs.signatures[0]).should.be.type("string").and.match(() => {
						try {
							new Buffer(trs.signatures[0], "hex")
						} catch (e) {
							return false;
						}

						return true;
					})
				});

				it("should have second signature in hex", () => {
					trs = createDApp(options, "secret", "secret 2");
					(trs).should.have.property("secondSignature").and.type("string").and.match(() => {
						try {
							new Buffer(trs.secondSignature, "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it.skip("should be signed correctly", () => {
					var result = asch.crypto.verify(trs);
					(result).should.be.ok;
				});

				it.skip("should not be signed correctly now", () => {
					trs.amount = 10000;
					var result = asch.crypto.verify(trs);
					(result).should.be.not.ok;
				});

				it.skip("should be second signed correctly", () => {
					trs.amount = 0;
					var result = asch.crypto.verifySecondSignature(trs, secondKeys.publicKey);
					(result).should.be.ok;
				});

				it.skip("should not be second signed correctly now", () => {
					trs.amount = 10000;
					var result = asch.crypto.verifySecondSignature(trs, secondKeys.publicKey);
					(result).should.be.not.ok;
				});

				it("should be ok to verify bytes", () => {
					var data1 = 'a1b2c3d4'
					var secret = 'secret1'
					var keys = asch.crypto.getKeys(secret)
					var signature = asch.crypto.signBytes(data1, keys)
					var result = asch.crypto.verifyBytes(data1, signature, keys.publicKey)
					result.should.be.ok

					var data2 = new Buffer('a1b2c3d4', 'hex')
					signature = asch.crypto.signBytes(data2, keys)
					result = asch.crypto.verifyBytes(data2, signature, keys.publicKey)
					result.should.be.ok
				})
			});
		});
	});

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

	describe.skip("signature.js", () => {
		var signature = asch.signature;
		it("should be ok", () => {
			(signature).should.be.ok;
		});

		it("should be object", () => {
			(signature).should.be.type("object");
		});

		it("should have properties", () => {
			(signature).should.have.property("createSignature");
		});

		describe("#createSignature", () => {
			var createSignature = signature.createSignature;
			var sgn = null;

			it("should be function", () => {
				(createSignature).should.be.type("function");
			});

			it("should create signature transaction", () => {
				sgn = createSignature("secret", "second secret");
				(sgn).should.be.ok;
				(sgn).should.be.type("object");
			});

			describe("returned signature transaction", () => {
				it("should have empty recipientId", () => {
					(sgn).should.have.property("recipientId").equal(null);
				});

				it("should have amount equal 0", () => {
					(sgn.amount).should.be.type("number").equal(0);
				});

				it("should have asset", () => {
					(sgn.asset).should.be.type("object");
					(sgn.asset).should.be.not.empty;
				});

				it("should have signature inside asset", () => {
					(sgn.asset).should.have.property("signature");
				});

				describe("signature asset", () => {
					it("should be ok", () => {
						(sgn.asset.signature).should.be.ok;
					})

					it("should be object", () => {
						(sgn.asset.signature).should.be.type("object");
					});

					it("should have publicKey property", () => {
						(sgn.asset.signature).should.have.property("publicKey");
					});

					it("should have publicKey in hex", () => {
						(sgn.asset.signature.publicKey).should.be.type("string").and.match(() => {
							try {
								new Buffer(sgn.asset.signature.publicKey);
							} catch (e) {
								return false;
							}

							return true;
						});
					});

					it("should have publicKey in 32 bytes", () => {
						var publicKey = new Buffer(sgn.asset.signature.publicKey, "hex");
						(publicKey.length).should.be.equal(32);
					});
				});
			});
		});
	});

	describe("slots.js", () => {
		var slots = require("../lib/time/slots.js");

		it("should be ok", () => {
			(slots).should.be.ok;
		});

		it("should be object", () => {
			(slots).should.be.type("object");
		});

		it("should have properties", () => {
			var properties = ["interval", "delegates", "getTime", "getRealTime", "getSlotNumber", "getSlotTime", "getNextSlot", "getLastSlot"];
			properties.forEach(function (property) {
				(slots).should.have.property(property);
			});
		});

		describe(".interval", () => {
			var interval = slots.interval;

			it("should be ok", () => {
				(interval).should.be.ok;
			});

			it("should be number and not NaN", () => {
				(interval).should.be.type("number").and.not.NaN;
			});
		});

		describe(".delegates", () => {
			var delegates = slots.delegates;

			it("should be ok", () => {
				(delegates).should.be.ok;
			});

			it("should be number and not NaN", () => {
				(delegates).should.be.type("number").and.not.NaN;
			});
		});

		describe("#getTime", () => {
			var getTime = slots.getTime;

			it("should be ok", () => {
				(getTime).should.be.ok;
			});

			it("should be a function", () => {
				(getTime).should.be.type("function");
			});

			it("should return epoch time as number, equal to 2764800", () => {
				var d = 1469822400000;
				var time = getTime(d);
				(time).should.be.ok;
				(time).should.be.type("number").and.equal(2764800);
			});
		});

		describe("#getRealTime", () => {
			var getRealTime = slots.getRealTime;

			it("should be ok", () => {
				(getRealTime).should.be.ok;
			});

			it("should be a function", () => {
				(getRealTime).should.be.type("function");
			});

			it("should return return real time, convert 196144 to 1467253744000", () => {
				var d = 196144;
				var real = getRealTime(d);
				(real).should.be.ok;
				(real).should.be.type("number").and.equal(1467253744000);
			});
		});

		describe("#getSlotNumber", () => {
			var getSlotNumber = slots.getSlotNumber;

			it("should be ok", () => {
				(getSlotNumber).should.be.ok;
			});

			it("should be a function", () => {
				(getSlotNumber).should.be.type("function");
			});

			it("should return slot number, equal to 19614", () => {
				var d = 196144;
				var slot = getSlotNumber(d);
				(slot).should.be.ok;
				(slot).should.be.type("number").and.equal(19614);
			});
		});

		describe("#getSlotTime", () => {
			var getSlotTime = slots.getSlotTime;

			it("should be ok", () => {
				(getSlotTime).should.be.ok;
			});

			it("should be function", () => {
				(getSlotTime).should.be.type("function");
			});

			it("should return slot time number, equal to ", () => {
				var slot = 19614;
				var slotTime = getSlotTime(19614);
				(slotTime).should.be.ok;
				(slotTime).should.be.type("number").and.equal(196140);
			});
		});

		describe("#getNextSlot", () => {
			var getNextSlot = slots.getNextSlot;

			it("should be ok", () => {
				(getNextSlot).should.be.ok;
			});

			it("should be function", () => {
				(getNextSlot).should.be.type("function");
			});

			it("should return next slot number", () => {
				var nextSlot = getNextSlot();
				(nextSlot).should.be.ok;
				(nextSlot).should.be.type("number").and.not.NaN;
			});
		});

		describe("#getLastSlot", () => {
			var getLastSlot = slots.getLastSlot;

			it("should be ok", () => {
				(getLastSlot).should.be.ok;
			});

			it("should be function", () => {
				(getLastSlot).should.be.type("function");
			});

			it("should return last slot number", () => {
				var lastSlot = getLastSlot(slots.getNextSlot());
				(lastSlot).should.be.ok;
				(lastSlot).should.be.type("number").and.not.NaN;
			});
		});
	});

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

	describe("transfer.js", () => {
	});

	describe("vote.js", () => {
		var vote = asch.vote;

		it("should be ok", () => {
			(vote).should.be.ok;
		});

		it("should be object", () => {
			(vote).should.be.type("object");
		});

		it("should have createVote property", () => {
			(vote).should.have.property("createVote");
		});

		it("should have deleteVote property", () => {
			(vote).should.have.property("deleteVote");
		})

		describe("#createVote", () => {
			var createVote = vote.createVote,
				vt = null,
				publicKey = asch.crypto.getKeys("secret").publicKey,
				publicKeys = ["+" + publicKey];

			it("should be ok", () => {
				(createVote).should.be.ok;
			});

			it("should be function", () => {
				(createVote).should.be.type("function");
			});

			it("should create vote", () => {
				vt = createVote(publicKeys, "secret", "second secret");
				vt.should.be.ok;
			});

			describe("returned vote", () => {
				it("should be ok", () => {
					(vt).should.be.ok;
				});

				it("should be object", () => {
					(vt).should.be.type("object");
				});

				it("should have type number equal to 11", () => {
					(vt).should.have.property("type").and.be.type("number").and.equal(11);
				});

				it("should have timestamp number", () => {
					(vt).should.have.property("timestamp").and.be.type("number");
				});

				it("should have senderPublicKey hex string equal to sender public key", () => {
					(vt).should.have.property("senderPublicKey").and.be.type("string").and.match(() => {
						try {
							new Buffer(vt.senderPublicKey, "hex");
						} catch (e) {
							return false;
						}

						return true;
					}).and.equal(publicKey);
				});

				it("should have signatures array with hex string", () => {
					(vt).should.have.property("signatures").and.be.an.Array().and.match(() => {
						try {
							new Buffer(vt.signatures[0], "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it("should have secondSignature as hex string", () => {
					(vt).should.have.property("secondSignature").and.be.type("string").and.match(() => {
						try {
							new Buffer(vt.secondSignature, "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it.skip("should be signed correctly", () => {
					var result = asch.crypto.verify(vt);
					(result).should.be.ok;
				});

				it.skip("should be second signed correctly", () => {
					var result = asch.crypto.verifySecondSignature(vt, asch.crypto.getKeys("second secret").publicKey);
					(result).should.be.ok;
				});

				it.skip("should not be signed correctly now", () => {
					vt.amount = 100;
					var result = asch.crypto.verify(vt);
					(result).should.be.not.ok;
				});

				it.skip("should not be second signed correctly now", () => {
					vt.amount = 100;
					var result = asch.crypto.verifySecondSignature(vt, asch.crypto.getKeys("second secret").publicKey);
					(result).should.be.not.ok;
				});

				it("should have args", () => {
					(vt).should.have.property("args").and.not.empty;
				});

				describe("vote args", () => {
					it("should be ok", () => {
						(vt.args).should.be.ok;
					});

					it("should be array", () => {
						(vt.args).should.be.an.Array();
					});

					it("should be not empty", () => {
						(vt.args).should.be.not.empty;
					});

					it("should contain one element", () => {
						(vt.args.length).should.be.equal(1);
					});

					it("should have public keys in hex", () => {
						vt.args.forEach(function (v) {
							(v).should.be.type("string").startWith("+").and.match(() => {
								try {
									new Buffer(v.substring(1, v.length), "hex");
								} catch (e) {
									return false;
								}

								return true;
							});
						});
					});

					it("should be equal to sender public key", () => {
						var v = vt.args[0];
						(v.substring(1, v.length)).should.be.equal(publicKey);
					});
				})
			});
		});

		describe('#deleteVote', () => {
			var deleteVote = vote.deleteVote,
			vt = null,
			publicKey = asch.crypto.getKeys("secret").publicKey,
			publicKeys = ["-" + publicKey];

			it('should be ok', () => {
				(deleteVote).should.be.ok;
			});

			it('should be function', () => {
				(deleteVote).should.be.type("function");
			});

			it('should delete vote', () => {
				vt = deleteVote(publicKeys, "secret", "second secret");
				vt.should.be.ok;
			});

			describe('returned deleted vote', () => {
				it("should be ok", () => {
					(vt).should.be.ok;
				});

				it("should be object", () => {
					(vt).should.be.type("object");
				});

				it("should have type number equal to 12", () => {
					(vt).should.have.property("type").and.be.type("number").and.equal(12);
				});

				it("should have timestamp number", () => {
					(vt).should.have.property("timestamp").and.be.type("number");
				});

				it("should have senderPublicKey hex string equal to sender public key", () => {
					(vt).should.have.property("senderPublicKey").and.be.type("string").and.match(() => {
						try {
							new Buffer(vt.senderPublicKey, "hex");
						} catch (e) {
							return false;
						}

						return true;
					}).and.equal(publicKey)
				});

				it("should have signatures array with hex string", () => {
					(vt).should.have.property("signatures").and.be.an.Array().and.match(() => {
						try {
							new Buffer(vt.signatures[0], "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it("should have secondSignature as hex string", () => {
					(vt).should.have.property("secondSignature").and.be.type("string").and.match(() => {
						try {
							new Buffer(vt.secondSignature, "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it("should have args", () => {
					(vt).should.have.property("args").and.not.empty;
				});

				describe("deleted vote args", () => {
					it("should be ok", () => {
						(vt.args).should.be.ok;
					});

					it("should be array", () => {
						(vt.args).should.be.an.Array();
					});

					it("should be not empty", () => {
						(vt.args).should.be.not.empty;
					});

					it("should contain one element", () => {
						(vt.args.length).should.be.equal(1);
					});

					it("should have public keys in hex", () => {
						vt.args.forEach(function (v) {
							(v).should.be.type("string").startWith("-").and.match(() => {
								try {
									new Buffer(v.substring(1, v.length), "hex");
								} catch (e) {
									return false;
								}

								return true;
							});
						});
					});

					it("should be equal to sender public key", () => {
						var v = vt.args[0];
						(v.substring(1, v.length)).should.be.equal(publicKey);
					});

				});

			})
		})
	});

	describe('crypto sha256 and address', () => {
		it('should be equal to the expected address', () => {
			asch.crypto.getAddress('7a91b9bfc0ea185bf3ade9d264da273f7fe19bf71008210b1d7239c82dd3ad20').should.be.equal('AFbYJhiJb3DXzHy5ZP24mKw21M2dCBJCXP')
			var publicKeyBuffer = new Buffer('7a91b9bfc0ea185bf3ade9d264da273f7fe19bf71008210b1d7239c82dd3ad20', 'hex')
			asch.crypto.getAddress(publicKeyBuffer).should.be.equal('AFbYJhiJb3DXzHy5ZP24mKw21M2dCBJCXP')
		})
	})

});
