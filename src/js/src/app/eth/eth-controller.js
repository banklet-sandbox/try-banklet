module.exports = function ($scope, ethereumService, afpTableModelService, afpCommons) {
    console.log("eth controller");
    var _ = afpCommons.lodash,
        fieldNames = [["TokenShortName", "TokenAddress", "Balance"]];

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });


    $scope.currencies = [];
    $scope.ethAccount = "0xfE9e8709d3215310075d67E3ed32A380CCf451C8";
    $scope.tableModel = getTableModel();
    $scope.actionBarModel = [{
        'icon': 'chevron-right',
        'label': 'View Balance',
        'action': refreshBalanceSheet
    }]

    extractErc20Tokens();

    function getTableModel() {
        return afpTableModelService()
            .setCaption("Ethereum Based Assets")
            .setHeaders(fieldNames)
            .setConfiguration({ rows: [] })
            .setRows($scope.currencies)
            .build();
    }

    function extractErc20Tokens() {
        ethereumService.getBalanceSheet($scope.ethAccount)
            .then(function (res) {
                _.forEach(res, function (tokenObj) {
                    var row = [tokenObj.name, tokenObj.address, formatter.format(tokenObj.balance)];
                    $scope.currencies.push(row);
                })
            });
    }

    function refreshBalanceSheet() {
        while ($scope.currencies.length > 0) {
            $scope.currencies.pop();
        }
        extractErc20Tokens();
    }
};