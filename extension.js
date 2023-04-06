module.exports = {
    "name": "LifeNestFoundation",
    "publisher": "WesslySoronellas",
    queries: {
            "get-this-term": [
                {
                    "resourceVersions": {"academicPeriods": {min: 16}},
                    "query": `query currentTerm($current: Date) {
                        term: academicPeriods16(filter: 
                              {AND: 
                                  [
                                      {OR:
                                          [{endOn: {AFTER: $current}}, {endOn: {EQ: $current}} ]
                                      }
                                  ]
                              }) {
                          edges {
                            node{
                                id
                                code
                                startOn
                                endOn
                                title
                            }
                          }
                        }
                      }`
                }
            ]
        },
    "cards": [{
        "type": "ProfileCardMock",
        "source": "./src/cards/profileCardMock",
        "title": "Profile Dashboard Mock",
        "displayCardType": "Profile Information Mock",
        "description": "Card that provides dashboard of most relevant information for user profile",
        configuration: {
            client: [{
                key: 'baseApi',
                label: 'Base API',
                type: 'text',
                required: true
            }, {
                key: 'termFromConfig',
                label: 'Current Term',
                type: 'text',
                required: true
            }, {
                key: 'termFromConfigTitle',
                label: 'Current Term Label',
                type: 'text',
                required: true
            }]
        }
    },
    {
        "type": "ResourceCard",
        "source": "./src/cards/resourceCard",
        "title": "Resource Card",
        "displayCardType": "Rescource Card",
        "description": "Card that provides links of resources located on life.edu"
    }
],
    "page": {
        "source": "./src/index.jsx"
    }
}