{
  "query": "je recherche un restaurant japonais pour demain",
  "intents": [
    {
      "intent": "builtin.intent.places.find_place"
    }
  ],
  "entities": [
    {
      "entity": "restaurant",
      "type": "builtin.places.place_type",
      "resolution": {
        "metadataType": "CanonicalEntity",
        "resolution_type": "metadataItems",
        "value": "restaurants"
      }
    },
    {
      "entity": "japonais",
      "type": "builtin.places.cuisine",
      "resolution": {
        "metadataType": "CanonicalEntity",
        "resolution_type": "metadataItems",
        "value": "japanese restaurants"
      }
    },
    {
      "entity": "demain",
      "type": "builtin.places.date",
      "resolution": {
        "date": "2017-02-06",
        "resolution_type": "builtin.datetime.date"
      }
    }
  ]
}