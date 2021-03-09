module.exports.validUnits = ['C', 'F', 'K'];
module.exports.celToFar = cel => cel * (9 / 5) + 32;
module.exports.farToCel = far => (far - 32) * (5 / 9);
module.exports.celToKel = cel => cel + 273.15;
module.exports.kelToCel = kel => kel - 273.15;
module.exports.farToKel = far => celToKel(farToCel(far));
module.exports.kelToFar = kel => celToFar(kelToCel(kel));
module.exports.checkIfUsesDegree = initialUnit => (initialUnit === 'K' ? '' : '°');
