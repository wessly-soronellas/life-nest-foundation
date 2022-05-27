module.exports = {
    "name": "LifeNestFoundation",
    "publisher": "Sample",
    "cards": [{
        "type": "LifeNestFoundationCard",
        "source": "./src/cards/LifeNestFoundationCard",
        "title": "LifeNestFoundation Card",
        "displayCardType": "LifeNestFoundation Card",
        "description": "This is an introductory card to the Ellucian Experience SDK",
        "pageRoute": {
            "route": "/",
            "excludeClickSelectors": ['a']
        }
    }],
    "page": {
        "source": "./src/page/router.jsx"
    }
}