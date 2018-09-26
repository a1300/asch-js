var transaction = require('./transaction.js')

function registerGroup(options, secret, secondSecret) {
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

function voteGroup(targetId, secret, secondSecret){
  return transaction.createTransactionEx({
		type: 500,
		fee: 0,
		secret: secret,
		secondSecret: secondSecret,
    args: [targetId]
  })  
}

function activateGroup(targetId, secret, secondSecret){
  return transaction.createTransactionEx({
		type: 501,
		fee: 0,
		secret: secret,
		secondSecret: secondSecret,
    args: [targetId]
  })  
}

function addMember(groupAddress, address, weight, m){
  return transaction.createMultiSigTransaction({
		type: 502,
		fee: 1 * 1e8,
		senderId: groupAddress,
		args: [address, weight, m]
  })  
}

function removeMember(address, m){
  return transaction.createMultiSigTransaction({
		type: 503,
		fee: 1 * 1e8,
    args: [address, m]
  })  
}

/*function replaceMember(oldMember,newMember){
  return transaction.createTransactionEx({
		type: 504,
		fee: 1 * 1e8,
		secret: secret,
		secondSecret: secondSecret,
    args: [oldMember,newMember]
  })  
}*/

module.exports = {
  registerGroup: registerGroup,
  voteGroup: voteGroup,
  activateGroup: activateGroup,
  addMember: addMember,
  removeMember: removeMember//,
  //replaceMember: replaceMember
}