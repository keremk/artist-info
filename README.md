# Artist Info service

A sample service intended to demonstrate a microservices environment. This service returns information about a given set of artists (by ids).

## REST Endpoint
This service exposes a REST endpoint:

For batched support:

``` 
  GET /artists?ids=2,3&limit=5&offset=0
```

or for single item:

```
GET /artists?id=2
```

And the response is:

``` javascript
{
    "metadata": {
        "offset": 0,
        "limit": 2,
        "total": 2
    },
    "data": [
        {
            "name": "Mark Hamill",
            "gender": 2,
            "profilePath": "https://image.tmdb.org/t/p/w185/fk8OfdReNltKZqOk2TZgkofCUFq.jpg",
            "movies": [
                11,
                181808
            ],
            "id": "2"
        },
        {
            "name": "Harrison Ford",
            "gender": 2,
            "profilePath": "https://image.tmdb.org/t/p/w185/7LOTdRfHU1H1qHBxpUv3jT04eWB.jpg",
            "movies": [
                78,
                335984,
                140607,
                11
            ],
            "id": "3"
        }
    ]
}
```

## Docker
Following ENV variables are available:

`SERVICE_NAME`: artist-info (Default)

`FAIL_PERCENT`: 0.3 (Default) - Indicates the percent of time this service will simulate a failure (500 response). This is used to simulate failures so that you can test retries, circuit breakers etc.

`MAX_ALLOWED`: 10 (Default) - Maximum number of items can be passed in ids argument for batching.


