'use strict'
const fs = require('fs');
const stringify = require('csv-stringify');

exports.getData = function (salaryString, jobString, file) {
  const getUSAData = require('./DataCollection/GetUSAData')
  const getNYCData = require('./DataCollection/GetNYCData')
  const getLAData = require('./DataCollection/GetLAData')
  const getChicagoData = require('./DataCollection/GetChicagoData')
  const getDallasData = require('./DataCollection/GetDallasData')
  const getPhillyData = require('./DataCollection/GetPhillyData')
  const getHoustonData = require('./DataCollection/GetHoustonData')
  const getDCData = require('./DataCollection/GetDCData')
  const getMiamiData = require('./DataCollection/GetMiamiData')
  const getAtlantaData = require('./DataCollection/GetAtlantaData')
  const getBostonData = require('./DataCollection/GetBostonData')
  const getSFData = require('./DataCollection/GetSFData')
  const getDetroitData = require('./DataCollection/GetDetroitData')
  const getRiversideData = require('./DataCollection/GetRiversideData')
  const getPhoenixData = require('./DataCollection/GetPhoenixData')
  const getSeattleData = require('./DataCollection/GetSeattleData')
  const getMinneapolisData = require('./DataCollection/GetMinneapolisData')
  const getSanDiegoData = require('./DataCollection/GetSanDiegoData')
  const getStLouisData = require('./DataCollection/GetStLouisData')
  const getTampaData = require('./DataCollection/GetTampaData')
  const getBaltimoreData = require('./DataCollection/GetBaltimoreData')
  const getDenverData = require('./DataCollection/GetDenverData')
  const getPittsburghData = require('./DataCollection/GetPittsburghData')
  const getPortlandData = require('./DataCollection/GetPortlandData')
  const getCharlotteData = require('./DataCollection/GetCharlotteData')
  const getSacramentoData = require('./DataCollection/GetSacramentoData')
  const getSanAntonioData = require('./DataCollection/GetSanAntonioData')
  const getOrlandoData = require('./DataCollection/GetOrlandoData')
  const getCincinnatiData = require('./DataCollection/GetCincinnatiData')
  const getClevelandData = require('./DataCollection/GetClevelandData')
  const getKCData = require('./DataCollection/GetKCData')
  const getLasVegasData = require('./DataCollection/GetLasVegasData')
  const getColumbusData = require('./DataCollection/GetColumbusData')
  const getIndianapolisData = require('./DataCollection/GetIndianapolisData')
  const getSanJoseData = require('./DataCollection/GetSanJoseData')
  const getAustinData = require('./DataCollection/GetAustinData')
  const getVirginiaBeachData = require('./DataCollection/GetVirginiaBeachData')
  const getNashvilleData = require('./DataCollection/GetNashvilleData')
  const getProvidenceData = require('./DataCollection/GetProvidenceData')
  const getMilwaukeeData = require('./DataCollection/GetMilwaukeeData')
  const getJacksonvilleData = require('./DataCollection/GetJacksonvilleData')
  const getMemphisData = require('./DataCollection/GetMemphisData')
  const getOklahomaCityData = require('./DataCollection/GetOklahomaCityData')
  const getLouisvilleData = require('./DataCollection/GetLouisvilleData')
  const getHartfordData = require('./DataCollection/GetHartfordData')
  const getRichmondData = require('./DataCollection/GetRichmondData')
  const getBuffaloData = require('./DataCollection/GetBuffaloData')
  const getRaleighData = require('./DataCollection/GetRaleighData')
  const getBirminghamData = require('./DataCollection/GetBirminghamData')
  const getSaltLakeCityData = require('./DataCollection/GetSaltLakeCityData')

  fs.truncate(file, 0, function(){console.log('')})
  let firstRow = 'Metro, Salary (Indeed.com), Sample Set, Jobs, Population Rank' + '\n'

  fs.appendFile(file, firstRow, function (err) {
    if (err) throw err;
  });

  getUSAData.getUSAData(salaryString, jobString, file)
  getNYCData.getNYCData(salaryString, jobString, file)
  getLAData.getLAData(salaryString, jobString, file)
  getChicagoData.getChicagoData(salaryString, jobString, file)
  getDallasData.getDallasData(salaryString, jobString, file)
  getPhillyData.getPhillyData(salaryString, jobString, file)
  getHoustonData.getHoustonData(salaryString, jobString, file)
  getDCData.getDCData(salaryString, jobString, file)
  getMiamiData.getMiamiData(salaryString, jobString, file)
  getAtlantaData.getAtlantaData(salaryString, jobString, file)
  getBostonData.getBostonData(salaryString, jobString, file)
  getSFData.getSFData(salaryString, jobString, file)
  getDetroitData.getDetroitData(salaryString, jobString, file)
  getRiversideData.getRiversideData(salaryString, jobString, file)
  getPhoenixData.getPhoenixData(salaryString, jobString, file)
  getSeattleData.getSeattleData(salaryString, jobString, file)
  getMinneapolisData.getMinneapolisData(salaryString, jobString, file)
  getSanDiegoData.getSanDiegoData(salaryString, jobString, file)
  getStLouisData.getStLouisData(salaryString, jobString, file)
  getTampaData.getTampaData(salaryString, jobString, file)
  getBaltimoreData.getBaltimoreData(salaryString, jobString, file)
  getDenverData.getDenverData(salaryString, jobString, file)
  getPittsburghData.getPittsburghData(salaryString, jobString, file)
  getPortlandData.getPortlandData(salaryString, jobString, file)
  getCharlotteData.getCharlotteData(salaryString, jobString, file)
  getSacramentoData.getSacramentoData(salaryString, jobString, file)
  getSanAntonioData.getSanAntonioData(salaryString, jobString, file)
  getOrlandoData.getOrlandoData(salaryString, jobString, file)
  getCincinnatiData.getCincinnatiData(salaryString, jobString, file)
  getClevelandData.getClevelandData(salaryString, jobString, file)
  getKCData.getKCData(salaryString, jobString, file)
  getLasVegasData.getLasVegasData(salaryString, jobString, file)
  getColumbusData.getColumbusData(salaryString, jobString, file)
  getIndianapolisData.getIndianapolisData(salaryString, jobString, file)
  getSanJoseData.getSanJoseData(salaryString, jobString, file)
  getAustinData.getAustinData(salaryString, jobString, file)
  getVirginiaBeachData.getVirginiaBeachData(salaryString, jobString, file)
  getNashvilleData.getNashvilleData(salaryString, jobString, file)
  getProvidenceData.getProvidenceData(salaryString, jobString, file)
  getMilwaukeeData.getMilwaukeeData(salaryString, jobString, file)
  getJacksonvilleData.getJacksonvilleData(salaryString, jobString, file)
  getMemphisData.getMemphisData(salaryString, jobString, file)
  getOklahomaCityData.getOklahomaCityData(salaryString, jobString, file)
  getLouisvilleData.getLouisvilleData(salaryString, jobString, file)
  getHartfordData.getHartfordData(salaryString, jobString, file)
  getRichmondData.getRichmondData(salaryString, jobString, file)
  getBuffaloData.getBuffaloData(salaryString, jobString, file)
  getRaleighData.getRaleighData(salaryString, jobString, file)
  getBirminghamData.getBirminghamData(salaryString, jobString, file)
  getSaltLakeCityData.getSaltLakeCityData(salaryString, jobString, file)
}
