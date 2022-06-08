module.exports = {
    "name": "LifeNestFoundation",
    "publisher": "WesslySoronellas",
    "cards": [{
        "type": "ProfileCard",
        "source": "./src/cards/profileCard",
        "title": "Profile Dashboard",
        "displayCardType": "Profile Information",
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
                                          [{startOn: {BEFORE: $current}}, {startOn: {EQ: $current}} ]
                                      }
                                      , {endOn: {AFTER: $current}}
                                  ]
                              }) {
                          edges {
                            node{
                              id
                                      code
                                      startOn
                                      endOn
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