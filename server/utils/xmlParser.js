
// // utils/xmlParser.js
// const xml2js = require("xml2js");

// const parseXML = async (xmlData) => {
//   const parser = new xml2js.Parser({ explicitArray: false });

//   try {
//     const result = await parser.parseStringPromise(xmlData);
//     return result;
//   } catch (err) {
//     console.error("XML Parse Error:", err.message);
//     return {};
//   }
// };

// module.exports = parseXML;

const xml2js = require('xml2js');

const parseXML = async (xmlData) => {
  const parser = new xml2js.Parser({ explicitArray: true });
  const result = await parser.parseStringPromise(xmlData);
  return result;
};

module.exports = parseXML;

