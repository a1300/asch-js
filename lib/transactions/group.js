var transaction = require('./transaction.js')

function register(options, secret, secondSecret) {
	return transaction.createTransactionEx({
		type: 6,
		fee: 5 * 1e8,
		secret: secret,
		secondSecret: secondSecret,
		args: [
			options.groupName,
			options.members,
			options.min,
			options.max,
			options.m,
			options.updateInterval
		]
	})
}

function voteGroupTrs(targetId, secret, secondSecret) {
	return transaction.createTransactionEx({
		type: 500,
		fee: 0,
		secret: secret,
		secondSecret: secondSecret,
		args: [targetId]
	})
}

function activateGroupTrs(targetId, secret, secondSecret) {
	return transaction.createTransactionEx({
		type: 501,
		fee: 0,
		secret: secret,
		secondSecret: secondSecret,
		args: [targetId]
	})
}

function addMember(address, weight, m, secret, secondSecret) {
	return transaction.createMultiSigTransaction({
		type: 502,
		fee: 1 * 1e8,
		secret: secret,
		secondSecret: secondSecret,
		args: [address, weight, m]
	})
}

function removeMember(address, m, secret, secondSecret) {
	return transaction.createTransactionEx({
		type: 503,
		fee: 1 * 1e8,
		secret: secret,
		secondSecret: secondSecret,
		args: [address, m]
	})
}

module.exports = {
	register: register,
	voteGroupTrs: voteGroupTrs,
	activateGroupTrs: activateGroupTrs,
	addMember: addMember,
	removeMember: removeMember
}
