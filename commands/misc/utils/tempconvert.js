const validUnits = ['C', 'F', 'K'];
const celToFar = cel => cel * (9 / 5) + 32;
const farToCel = far => (far - 32) * (5 / 9);
const celToKel = cel => cel + 273.15;
const kelToCel = kel => kel - 273.15;
const farToKel = far => celToKel(farToCel(far));
const kelToFar = kel => celToFar(kelToCel(kel));
const checkIfUsesDegree = initialUnit => (initialUnit === 'K' ? '' : '°');

module.exports = { validUnits, celToFar, farToCel, celToKel, kelToCel, farToKel, kelToFar, checkIfUsesDegree };
