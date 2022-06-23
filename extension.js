module.exports = {
    "name": "LifeNestFoundation",
    "publisher": "WesslySoronellas",
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
            }]
        },
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
        }
    }],
    "page": {
        "source": "./src/index.jsx"
    }
}