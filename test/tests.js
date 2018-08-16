var Buffer = require("buffer/").Buffer;
var crypto_lib = require("crypto-browserify");
var should = require("should");
var asch = require("../index.js");

describe("Asch JS", function () {

	it("should be ok", function () {
		(asch).should.be.ok;
	});

	it("should be object", function () {
		(asch).should.be.type("object");
	});

	it("should have properties", function () {
		var properties = ["transaction", "signature", "vote", "delegate", "dapp", "crypto"];

		properties.forEach(function (property) {
			(asch).should.have.property(property);
		});
	});

	describe("crypto.js", function () {
		var crypto = asch.crypto;

		it("should be ok", function () {
			(crypto).should.be.ok;
		});

		it("should be object", function () {
			(crypto).should.be.type("object");
		});

		it("should has properties", function () {
			var properties = ["getBytes", "getHash", "getId", "getFee", "sign", "secondSign", "getKeys", "getAddress", "verify", "verifySecondSignature", "fixedPoint"];
			properties.forEach(function (property) {
				(crypto).should.have.property(property);
			});
		});

		describe("#getBytes", function () {
			var getBytes = crypto.getBytes;
			var bytes = null;

			it("should be ok", function () {
				(getBytes).should.be.ok;
			});

			it("should be a function", function () {
				(getBytes).should.be.type("function");
			});

			it("should return Buffer of simply transaction and buffer most be 101 length", function () {
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

			it("should return Buffer of transaction with second signature and buffer most be 164 length", function () {
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

		describe("#getHash", function () {
			var getHash = crypto.getHash;

			it("should be ok", function () {
				(getHash).should.be.ok;
			});

			it("should be a function", function () {
				(getHash).should.be.type("function");
			})

			it("should return Buffer and Buffer must be 32 bytes length", function () {
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

		describe("#getId", function () {
			var getId = crypto.getId;

			it("should be ok", function () {
				(getId).should.be.ok;
			});

			it("should be a function", function () {
				(getId).should.be.type("function");
			});

			it.skip("should return string id and be equal to 13987348420913138422", function () {
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

		describe("#getFee", function () {
			var getFee = crypto.getFee;

			it("should be ok", function () {
				(getFee).should.be.ok;
			})

			it("should be a function", function () {
				(getFee).should.be.type("function");
			});

			it("should return number", function () {
				var fee = getFee({ amount: 100000, type: 0 });
				(fee).should.be.type("number");
				(fee).should.be.not.NaN;
			});

			it("should return 10000000", function () {
				var fee = getFee({ amount: 100000, type: 0 });
				(fee).should.be.type("number").and.equal(10000000);
			});

			it("should return 10000000000", function () {
				var fee = getFee({ type: 1 });
				(fee).should.be.type("number").and.equal(10000000000);
			});

			it("should be equal 1000000000000", function () {
				var fee = getFee({ type: 2 });
				(fee).should.be.type("number").and.equal(1000000000000);
			});

			it("should be equal 100000000", function () {
				var fee = getFee({ type: 3 });
				(fee).should.be.type("number").and.equal(100000000);
			});
		});

		describe("fixedPoint", function () {
			var fixedPoint = crypto.fixedPoint;

			it("should be ok", function () {
				(fixedPoint).should.be.ok;
			})

			it("should be number", function () {
				(fixedPoint).should.be.type("number").and.not.NaN;
			});

			it("should be equal 100000000", function () {
				(fixedPoint).should.be.equal(100000000);
			});
		});

		describe("#sign", function () {
			var sign = crypto.sign;

			it("should be ok", function () {
				(sign).should.be.ok;
			});

			it("should be a function", function () {
				(sign).should.be.type("function");
			});
		});

		describe("#secondSign", function () {
			var secondSign = crypto.secondSign;

			it("should be ok", function () {
				(secondSign).should.be.ok;
			});

			it("should be a function", function () {
				(secondSign).should.be.type("function");
			});
		});

		describe("#getKeys", function () {
			var getKeys = crypto.getKeys;

			it("should be ok", function () {
				(getKeys).should.be.ok;
			});

			it("should be a function", function () {
				(getKeys).should.be.type("function");
			});

			it("should return two keys in hex", function () {
				var keys = getKeys("secret");

				(keys).should.be.ok;
				(keys).should.be.type("object");
				(keys).should.have.property("publicKey");
				(keys).should.have.property("privateKey");
				(keys.publicKey).should.be.type("string").and.match(function () {
					try {
						new Buffer(keys.publicKey, "hex");
					} catch (e) {
						return false;
					}

					return true;
				});
				(keys.privateKey).should.be.type("string").and.match(function () {
					try {
						new Buffer(keys.privateKey, "hex");
					} catch (e) {
						return false;
					}

					return true;
				});
			});
		});

		describe("#getAddress", function () {
			var getAddress = crypto.getAddress;

			it("should be ok", function () {
				(getAddress).should.be.ok;
			})

			it("should be a function", function () {
				(getAddress).should.be.type("function");
			});

			it("should generate address by publicKey", function () {
				var keys = crypto.getKeys("secret");
				var address = getAddress(keys.publicKey);

				(address).should.be.ok;
				(address).should.be.type("string");
				(address).should.be.equal("AFkctfgZFkaATGRhGbj72wzJqACvMyzQ1U");
			});
		});

		describe("#verify", function () {
			var verify = crypto.verify;

			it("should be ok", function () {
				(verify).should.be.ok;
			})

			it("should be function", function () {
				(verify).should.be.type("function");
			});
		});

		describe("#verifySecondSignature", function () {
			var verifySecondSignature = crypto.verifySecondSignature;

			it("should be ok", function () {
				(verifySecondSignature).should.be.ok;
			});

			it("should be function", function () {
				(verifySecondSignature).should.be.type("function");
			});
		});
	});

	describe("dapp.js", function () {
		var dapp = asch.dapp;


		it("should be object", function () {
			(dapp).should.be.type("object");
		});

		it("should have properties", function () {
			(dapp).should.have.property("createDApp");
		})

		describe("#createDApp", function () {
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

			beforeEach('setup dapp.js', function () {
				trs = createDApp(options, "secret", null);
			})
	
			afterEach('cleanup dapp.js', function () {
				trs = null;
			})




			it("should be a function", function () {
				(createDApp).should.be.type("function");
			});

			it("should create dapp without second signature", function () {
				trs = createDApp(options, "secret", null);
				(trs).should.be.ok;
			});

			it("should create dapp with second signature", function () {
				trs = createDApp(options, "secret", "secret 2");
				(trs).should.be.ok;
			});

			describe("returned dapp", function () {
				var keys = asch.crypto.getKeys("secret");
				var secondKeys = asch.crypto.getKeys("secret 2");

				it("should be object", function () {
					(trs).should.be.type("object");
				});

				it("should have id as string", function () {
					(trs.id).should.be.type("string");
				});

				it("should have type as number and equal 200", function () {
					(trs.type).should.be.type("number").and.equal(200);
				});

				it("should have fee as number and equal 10000000000", function () {
					(trs.fee).should.be.type("number").and.equal(10000000000);
				});

				it.skip("should have senderPublicKey as hex string", function () {
					(trs.senderPublicKey).should.be.type("string").and.match(function (given) {
						try {
							new Buffer("hex");
						} catch (e) {
							return false;
						}

						return true;
					})
				});

				it("should have timestamp as number", function () {
					(trs.timestamp).should.be.type("number").and.not.NaN;
				});

				it("should have args as array", function () {
					(trs.args).should.be.an.Array();
				});

				describe("dapp args", function () {
					it("should be ok", function () {
						(trs.args).should.be.ok;
					})

					it("should be an array", function () {
						(trs.args).should.be.an.Array()
					});

					// options.name,
					// options.description,
					// options.link,
					// options.icon,
					// options.delegates,
					// options.unlockDelegates

					it("should have name item", function () {
						(trs.args[0]).should.be.type("string").and.equal(options.name);
					});

					it("should have description item", function () {
						(trs.args[1]).should.be.type("string").and.equal(options.description)
					})

					it("should have link item", function () {
						(trs.args[2]).should.be.type("string").and.equal(options.link);
					});

					it("should have icon item", function () {
						(trs.args[3]).should.be.type("string").and.equal(options.icon);
					});

					it("should have delegates item", function () {
						(trs.args[4]).should.be.an.Array().and.equal(options.delegates)
					})

					it("should have unlockDelegates item", function () {
						(trs.args[5]).should.be.type("number").and.equal(options.unlockDelegates);
					});
				});

				it("should have signature as hex string in signatures array", function () {
					(trs.signatures[0]).should.be.type("string").and.match(function () {
						try {
							new Buffer(trs.signatures[0], "hex")
						} catch (e) {
							return false;
						}

						return true;
					})
				});

				it("should have second signature in hex", function () {
					trs = createDApp(options, "secret", "secret 2");
					(trs).should.have.property("secondSignature").and.type("string").and.match(function () {
						try {
							new Buffer(trs.secondSignature, "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it.skip("should be signed correctly", function () {
					var result = asch.crypto.verify(trs);
					(result).should.be.ok;
				});

				it.skip("should not be signed correctly now", function () {
					trs.amount = 10000;
					var result = asch.crypto.verify(trs);
					(result).should.be.not.ok;
				});

				it.skip("should be second signed correctly", function () {
					trs.amount = 0;
					var result = asch.crypto.verifySecondSignature(trs, secondKeys.publicKey);
					(result).should.be.ok;
				});

				it.skip("should not be second signed correctly now", function () {
					trs.amount = 10000;
					var result = asch.crypto.verifySecondSignature(trs, secondKeys.publicKey);
					(result).should.be.not.ok;
				});

				it("should be ok to verify bytes", function () {
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

	describe("delegate.js", function () {
		var delegate = asch.delegate;

		it("should be ok", function () {
			(delegate).should.be.ok;
		});

		it("should be function", function () {
			(delegate).should.be.type("object");
		});

		it("should have property createDelegate", function () {
			(delegate).should.have.property("createDelegate");
		});

		describe("#createDelegate", function () {
			var createDelegate = delegate.createDelegate;


			it("should be ok", function () {
				(createDelegate).should.be.ok;
			});

			it("should be function", function () {
				(createDelegate).should.be.type("function");
			});

			it("should create delegate", function () {
				delegateTrs = createDelegate("secret", "secret 2");
			});

			describe("returned delegate", function () {
				var keys = asch.crypto.getKeys("secret");
				var secondKeys = asch.crypto.getKeys("secret 2");
				var delegateTrs = null;
	
				beforeEach('setup delegate.js', function () {
					delegateTrs = createDelegate("secret", "secret 2");
				})
	
				afterEach('clenup delegate.js', function () {
					delegateTrs = null;
				})
	
				it("should be ok", function () {
					(delegateTrs).should.be.ok;
				});

				it("should be object", function () {
					(delegateTrs).should.be.type("object");
				});

				it("should have type equal 10", function () {
					(delegateTrs).should.have.property("type").and.type("number").and.equal(10);
				});

				it("should have timestamp number", function () {
					(delegateTrs).should.have.property("timestamp").and.type("number");
				});

				it("should have senderPublicKey in hex", function () {
					(delegateTrs).should.have.property("senderPublicKey").and.type("string").and.match(function () {
						try {
							new Buffer(delegateTrs.senderPublicKey, "hex");
						} catch (e) {
							return false;
						}

						return true;
					}).and.equal(keys.publicKey);
				});

				it("should have signature in hex in signatures array", function () {
					(delegateTrs).should.have.property("signatures").and.be.an.Array().and.match(function () {
						try {
							new Buffer(delegateTrs.signatures[0], "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it("should have second signature in hex", function () {
					(delegateTrs).should.have.property("secondSignature").and.match(function () {
						try {
							new Buffer(delegateTrs.secondSignature, "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it("should have args array", function () {
					(delegateTrs).should.have.property("args").and.be.an.Array();
					(delegateTrs.args.length).should.equal(0);
				})

				it.skip("should be signed correctly", function () {
					var result = asch.crypto.verify(delegateTrs, keys.publicKey);
					(result).should.be.ok;
				});

				it.skip("should be second signed correctly", function () {
					var result = asch.crypto.verifySecondSignature(delegateTrs, secondKeys.publicKey);
					(result).should.be.ok;
				});

				it.skip("should not be signed correctly now", function () {
					delegateTrs.amount = 100;
					var result = asch.crypto.verify(delegateTrs, keys.publicKey);
					(result).should.be.not.ok;
				});

				it.skip("should not be second signed correctly now", function () {
					delegateTrs.amount = 100;
					var result = asch.crypto.verify(delegateTrs, secondKeys.publicKey);
					(result).should.be.not.ok;
				});
			});
		});
	});



	describe.skip("signature.js", function () {
		var signature = asch.signature;
		it("should be ok", function () {
			(signature).should.be.ok;
		});

		it("should be object", function () {
			(signature).should.be.type("object");
		});

		it("should have properties", function () {
			(signature).should.have.property("createSignature");
		});

		describe("#createSignature", function () {
			var createSignature = signature.createSignature;
			var sgn = null;

			it("should be function", function () {
				(createSignature).should.be.type("function");
			});

			it("should create signature transaction", function () {
				sgn = createSignature("secret", "second secret");
				(sgn).should.be.ok;
				(sgn).should.be.type("object");
			});

			describe("returned signature transaction", function () {
				it("should have empty recipientId", function () {
					(sgn).should.have.property("recipientId").equal(null);
				});

				it("should have amount equal 0", function () {
					(sgn.amount).should.be.type("number").equal(0);
				});

				it("should have asset", function () {
					(sgn.asset).should.be.type("object");
					(sgn.asset).should.be.not.empty;
				});

				it("should have signature inside asset", function () {
					(sgn.asset).should.have.property("signature");
				});

				describe("signature asset", function () {
					it("should be ok", function () {
						(sgn.asset.signature).should.be.ok;
					})

					it("should be object", function () {
						(sgn.asset.signature).should.be.type("object");
					});

					it("should have publicKey property", function () {
						(sgn.asset.signature).should.have.property("publicKey");
					});

					it("should have publicKey in hex", function () {
						(sgn.asset.signature.publicKey).should.be.type("string").and.match(function () {
							try {
								new Buffer(sgn.asset.signature.publicKey);
							} catch (e) {
								return false;
							}

							return true;
						});
					});

					it("should have publicKey in 32 bytes", function () {
						var publicKey = new Buffer(sgn.asset.signature.publicKey, "hex");
						(publicKey.length).should.be.equal(32);
					});
				});
			});
		});
	});

	describe("slots.js", function () {
		var slots = require("../lib/time/slots.js");

		it("should be ok", function () {
			(slots).should.be.ok;
		});

		it("should be object", function () {
			(slots).should.be.type("object");
		});

		it("should have properties", function () {
			var properties = ["interval", "delegates", "getTime", "getRealTime", "getSlotNumber", "getSlotTime", "getNextSlot", "getLastSlot"];
			properties.forEach(function (property) {
				(slots).should.have.property(property);
			});
		});

		describe(".interval", function () {
			var interval = slots.interval;

			it("should be ok", function () {
				(interval).should.be.ok;
			});

			it("should be number and not NaN", function () {
				(interval).should.be.type("number").and.not.NaN;
			});
		});

		describe(".delegates", function () {
			var delegates = slots.delegates;

			it("should be ok", function () {
				(delegates).should.be.ok;
			});

			it("should be number and not NaN", function () {
				(delegates).should.be.type("number").and.not.NaN;
			});
		});

		describe("#getTime", function () {
			var getTime = slots.getTime;

			it("should be ok", function () {
				(getTime).should.be.ok;
			});

			it("should be a function", function () {
				(getTime).should.be.type("function");
			});

			it("should return epoch time as number, equal to 2764800", function () {
				var d = 1469822400000;
				var time = getTime(d);
				(time).should.be.ok;
				(time).should.be.type("number").and.equal(2764800);
			});
		});

		describe("#getRealTime", function () {
			var getRealTime = slots.getRealTime;

			it("should be ok", function () {
				(getRealTime).should.be.ok;
			});

			it("should be a function", function () {
				(getRealTime).should.be.type("function");
			});

			it("should return return real time, convert 196144 to 1467253744000", function () {
				var d = 196144;
				var real = getRealTime(d);
				(real).should.be.ok;
				(real).should.be.type("number").and.equal(1467253744000);
			});
		});

		describe("#getSlotNumber", function () {
			var getSlotNumber = slots.getSlotNumber;

			it("should be ok", function () {
				(getSlotNumber).should.be.ok;
			});

			it("should be a function", function () {
				(getSlotNumber).should.be.type("function");
			});

			it("should return slot number, equal to 19614", function () {
				var d = 196144;
				var slot = getSlotNumber(d);
				(slot).should.be.ok;
				(slot).should.be.type("number").and.equal(19614);
			});
		});

		describe("#getSlotTime", function () {
			var getSlotTime = slots.getSlotTime;

			it("should be ok", function () {
				(getSlotTime).should.be.ok;
			});

			it("should be function", function () {
				(getSlotTime).should.be.type("function");
			});

			it("should return slot time number, equal to ", function () {
				var slot = 19614;
				var slotTime = getSlotTime(19614);
				(slotTime).should.be.ok;
				(slotTime).should.be.type("number").and.equal(196140);
			});
		});

		describe("#getNextSlot", function () {
			var getNextSlot = slots.getNextSlot;

			it("should be ok", function () {
				(getNextSlot).should.be.ok;
			});

			it("should be function", function () {
				(getNextSlot).should.be.type("function");
			});

			it("should return next slot number", function () {
				var nextSlot = getNextSlot();
				(nextSlot).should.be.ok;
				(nextSlot).should.be.type("number").and.not.NaN;
			});
		});

		describe("#getLastSlot", function () {
			var getLastSlot = slots.getLastSlot;

			it("should be ok", function () {
				(getLastSlot).should.be.ok;
			});

			it("should be function", function () {
				(getLastSlot).should.be.type("function");
			});

			it("should return last slot number", function () {
				var lastSlot = getLastSlot(slots.getNextSlot());
				(lastSlot).should.be.ok;
				(lastSlot).should.be.type("number").and.not.NaN;
			});
		});
	});

	describe.skip("transaction.js", function () {
		var transaction = asch.transaction;

		it("should be object", function () {
			(transaction).should.be.type("object");
		});

		it("should have properties", function () {
			(transaction).should.have.property("createTransaction");
		})

		describe("#createTransaction", function () {
			var createTransaction = transaction.createTransaction;
			var trs = null;

			beforeEach('setup #createTransaction', function () {

			})


			it("should be a function", function () {
				(createTransaction).should.be.type("function");
			});

			it("should create transaction without second signature", function () {
				trs = createTransaction("58191285901858109", 1000, "", "secret");
				(trs).should.be.ok;
			});

			describe("returned transaction", function () {
				it("should be object", function () {
					(trs).should.be.type("object");
				});

				it("should have id as string", function () {
					(trs.id).should.be.type("string");
				});

				it("should have type as number and eqaul 1", function () {
					(trs.type).should.be.type("number").and.equal(1);
				});

				it("should have timestamp as number", function () {
					(trs.timestamp).should.be.type("number").and.not.NaN;
				});

				it("should have senderPublicKey as hex string", function () {
					(trs.senderPublicKey).should.be.type("string").and.match(function () {
						try {
							new Buffer(trs.senderPublicKey, "hex")
						} catch (e) {
							return false;
						}

						return true;
					})
				});



				it("should have amount as number and eqaul to 1000", function () {
					(trs.amount).should.be.type("number").and.equal(1000);
				});

				it("should have empty asset object", function () {
					(trs.asset).should.be.type("object").and.empty;
				});

				it("should does not have second signature", function () {
					(trs).should.not.have.property("signSignature");
				});

				it("should have signature as hex string", function () {
					(trs.signature).should.be.type("string").and.match(function () {
						try {
							new Buffer(trs.signature, "hex")
						} catch (e) {
							return false;
						}

						return true;
					})
				});

				it("should be signed correctly", function () {
					var result = asch.crypto.verify(trs);
					(result).should.be.ok;
				});

				it("should not be signed correctly now", function () {
					trs.amount = 10000;
					var result = asch.crypto.verify(trs);
					(result).should.be.not.ok;
				});
			});
		});

		describe("#createTransaction with second secret", function () {
			var createTransaction = transaction.createTransaction;
			var trs = null;
			var secondSecret = "second secret";
			var keys = asch.crypto.getKeys(secondSecret);

			it("should be a function", function () {
				(createTransaction).should.be.type("function");
			});

			it("should create transaction without second signature", function () {
				trs = createTransaction("58191285901858109", 1000, "", "secret", secondSecret);
				(trs).should.be.ok;
			});

			describe("returned transaction", function () {
				it("should be object", function () {
					(trs).should.be.type("object");
				});

				it("should have id as string", function () {
					(trs.id).should.be.type("string");
				});

				it("should have type as number and eqaul 0", function () {
					(trs.type).should.be.type("number").and.equal(0);
				});

				it("should have timestamp as number", function () {
					(trs.timestamp).should.be.type("number").and.not.NaN;
				});

				it("should have senderPublicKey as hex string", function () {
					(trs.senderPublicKey).should.be.type("string").and.match(function () {
						try {
							new Buffer(trs.senderPublicKey, "hex")
						} catch (e) {
							return false;
						}

						return true;
					})
				});

				it("should have recipientId as string and to be equal 58191285901858109", function () {
					(trs.recipientId).should.be.type("string").and.equal("58191285901858109");
				});

				it("should have amount as number and eqaul to 1000", function () {
					(trs.amount).should.be.type("number").and.equal(1000);
				});

				it("should have empty asset object", function () {
					(trs.asset).should.be.type("object").and.empty;
				});

				it("should have second signature", function () {
					(trs).should.have.property("signSignature");
				});

				it("should have signature as hex string", function () {
					(trs.signature).should.be.type("string").and.match(function () {
						try {
							new Buffer(trs.signature, "hex")
						} catch (e) {
							return false;
						}

						return true;
					})
				});

				it("should have signSignature as hex string", function () {
					(trs.signSignature).should.be.type("string").and.match(function () {
						try {
							new Buffer(trs.signSignature, "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it("should be signed correctly", function () {
					var result = asch.crypto.verify(trs);
					(result).should.be.ok;
				});

				it("should be second signed correctly", function () {
					var result = asch.crypto.verifySecondSignature(trs, keys.publicKey);
					(result).should.be.ok;
				});

				it("should not be signed correctly now", function () {
					trs.amount = 10000;
					var result = asch.crypto.verify(trs);
					(result).should.be.not.ok;
				});

				it("should not be second signed correctly now", function () {
					trs.amount = 10000;
					var result = asch.crypto.verifySecondSignature(trs, keys.publicKey);
					(result).should.be.not.ok;
				});
			});
		});
	});

	describe("transfer.js", function () {
	});

	describe("vote.js", function () {
		var vote = asch.vote;

		it("should be ok", function () {
			(vote).should.be.ok;
		});

		it("should be object", function () {
			(vote).should.be.type("object");
		});

		it("should have createVote property", function () {
			(vote).should.have.property("createVote");
		});

		it("should have deleteVote property", function () {
			(vote).should.have.property("deleteVote");
		})

		describe("#createVote", function () {
			var createVote = vote.createVote,
				vt = null,
				publicKey = asch.crypto.getKeys("secret").publicKey,
				publicKeys = ["+" + publicKey];

			it("should be ok", function () {
				(createVote).should.be.ok;
			});

			it("should be function", function () {
				(createVote).should.be.type("function");
			});

			it("should create vote", function () {
				vt = createVote(publicKeys, "secret", "second secret");
				vt.should.be.ok;
			});

			describe("returned vote", function () {
				it("should be ok", function () {
					(vt).should.be.ok;
				});

				it("should be object", function () {
					(vt).should.be.type("object");
				});

				it("should have type number equal to 11", function () {
					(vt).should.have.property("type").and.be.type("number").and.equal(11);
				});

				it("should have timestamp number", function () {
					(vt).should.have.property("timestamp").and.be.type("number");
				});

				it("should have senderPublicKey hex string equal to sender public key", function () {
					(vt).should.have.property("senderPublicKey").and.be.type("string").and.match(function () {
						try {
							new Buffer(vt.senderPublicKey, "hex");
						} catch (e) {
							return false;
						}

						return true;
					}).and.equal(publicKey);
				});

				it("should have signatures array with hex string", function () {
					(vt).should.have.property("signatures").and.be.an.Array().and.match(function () {
						try {
							new Buffer(vt.signatures[0], "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it("should have secondSignature as hex string", function () {
					(vt).should.have.property("secondSignature").and.be.type("string").and.match(function () {
						try {
							new Buffer(vt.secondSignature, "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it.skip("should be signed correctly", function () {
					var result = asch.crypto.verify(vt);
					(result).should.be.ok;
				});

				it.skip("should be second signed correctly", function () {
					var result = asch.crypto.verifySecondSignature(vt, asch.crypto.getKeys("second secret").publicKey);
					(result).should.be.ok;
				});

				it.skip("should not be signed correctly now", function () {
					vt.amount = 100;
					var result = asch.crypto.verify(vt);
					(result).should.be.not.ok;
				});

				it.skip("should not be second signed correctly now", function () {
					vt.amount = 100;
					var result = asch.crypto.verifySecondSignature(vt, asch.crypto.getKeys("second secret").publicKey);
					(result).should.be.not.ok;
				});

				it("should have args", function () {
					(vt).should.have.property("args").and.not.empty;
				});

				describe("vote args", function () {
					it("should be ok", function () {
						(vt.args).should.be.ok;
					});

					it("should be array", function () {
						(vt.args).should.be.an.Array();
					});

					it("should be not empty", function () {
						(vt.args).should.be.not.empty;
					});

					it("should contain one element", function () {
						(vt.args.length).should.be.equal(1);
					});

					it("should have public keys in hex", function () {
						vt.args.forEach(function (v) {
							(v).should.be.type("string").startWith("+").and.match(function () {
								try {
									new Buffer(v.substring(1, v.length), "hex");
								} catch (e) {
									return false;
								}

								return true;
							});
						});
					});

					it("should be equal to sender public key", function () {
						var v = vt.args[0];
						(v.substring(1, v.length)).should.be.equal(publicKey);
					});
				})
			});
		});

		describe('#deleteVote', function () {
			var deleteVote = vote.deleteVote,
			vt = null,
			publicKey = asch.crypto.getKeys("secret").publicKey,
			publicKeys = ["+" + publicKey];

			it('should be ok', function () {
				(deleteVote).should.be.ok;
			});

			it('should be function', function () {
				(deleteVote).should.be.type("function");
			});

			it('should delete vote', function () {
				vt = deleteVote(publicKeys, "secret", "second secret");
				vt.should.be.ok;
			});

			describe('returned deleted vote', function () {
				it("should be ok", function () {
					(vt).should.be.ok;
				});

				it("should be object", function () {
					(vt).should.be.type("object");
				});

				it("should have type number equal to 12", function () {
					(vt).should.have.property("type").and.be.type("number").and.equal(12);
				});

				it("should have timestamp number", function () {
					(vt).should.have.property("timestamp").and.be.type("number");
				});

				it("should have senderPublicKey hex string equal to sender public key", function () {
					(vt).should.have.property("senderPublicKey").and.be.type("string").and.match(function () {
						try {
							new Buffer(vt.senderPublicKey, "hex");
						} catch (e) {
							return false;
						}

						return true;
					}).and.equal(publicKey)
				});

				it("should have signatures array with hex string", function () {
					(vt).should.have.property("signatures").and.be.an.Array().and.match(function () {
						try {
							new Buffer(vt.signatures[0], "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it("should have secondSignature as hex string", function () {
					(vt).should.have.property("secondSignature").and.be.type("string").and.match(function () {
						try {
							new Buffer(vt.secondSignature, "hex");
						} catch (e) {
							return false;
						}

						return true;
					});
				});

				it("should have args", function () {
					(vt).should.have.property("args").and.not.empty;
				});

				describe("deleted vote args", function () {
					it("should be ok", function () {
						(vt.args).should.be.ok;
					});

					it("should be array", function () {
						(vt.args).should.be.an.Array();
					});

					it("should be not empty", function () {
						(vt.args).should.be.not.empty;
					});

					it("should contain one element", function () {
						(vt.args.length).should.be.equal(1);
					});

					it("should have public keys in hex", function () {
						vt.args.forEach(function (v) {
							(v).should.be.type("string").startWith("-").and.match(function () {
								try {
									new Buffer(v.substring(1, v.length), "hex");
								} catch (e) {
									return false;
								}

								return true;
							});
						});
					});

					it("should be equal to sender public key", function () {
						var v = vt.args[0];
						(v.substring(1, v.length)).should.be.equal(publicKey);
					});

				});

			})
		})
	});

	describe('crypto sha256 and address', function () {
		it('should be equal to the expected address', function () {
			asch.crypto.getAddress('7a91b9bfc0ea185bf3ade9d264da273f7fe19bf71008210b1d7239c82dd3ad20').should.be.equal('AFbYJhiJb3DXzHy5ZP24mKw21M2dCBJCXP')
			var publicKeyBuffer = new Buffer('7a91b9bfc0ea185bf3ade9d264da273f7fe19bf71008210b1d7239c82dd3ad20', 'hex')
			asch.crypto.getAddress(publicKeyBuffer).should.be.equal('AFbYJhiJb3DXzHy5ZP24mKw21M2dCBJCXP')
		})
	})

});
