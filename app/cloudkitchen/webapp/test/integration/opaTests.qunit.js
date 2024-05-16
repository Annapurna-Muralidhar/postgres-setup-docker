sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'cloudkitchen/test/integration/FirstJourney',
		'cloudkitchen/test/integration/pages/KitchenList',
		'cloudkitchen/test/integration/pages/KitchenObjectPage'
    ],
    function(JourneyRunner, opaJourney, KitchenList, KitchenObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('cloudkitchen') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheKitchenList: KitchenList,
					onTheKitchenObjectPage: KitchenObjectPage
                }
            },
            opaJourney.run
        );
    }
);