module.exports = function ($scope, $q, currencyService, afpTableModelService, afpCommons) {
    console.log("currency controller");
    var _ = afpCommons.lodash,
        fieldNames = [["ISO Code", "Name","Trade Unit"]];

    $scope.currencies = [];
    $scope.tableModel = getTableModel(afpTableModelService, $scope.currencies);
    extractCurrencies($q, currencyService, $scope.currencies);

    function getTableModel(afpTableModelService, currencies) {
        console.log(afpTableModelService);
        return afpTableModelService()
            .setCaption("Currencies")
            .setHeaders(fieldNames)
            .setConfiguration({rows: []})
            .setRows(currencies)
            .setFooters(fieldNames)
            .build();
    }

    function extractCurrencies($q, currencyService, currencies) {
        return $q
            .all([currencyService.getCurrencyList()])
            .then(function (resolvedData) {
                _.forEach(resolvedData[0], function (currency) {
                    currencies.push([currency.isoCode, currency.name,currency.tradeUnit])
                });
            });
    }
};