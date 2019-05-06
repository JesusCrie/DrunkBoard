# DrunkBoard - Backend

## Dependencies

- PHP `>= 7.1.3`
- Lumen Framework `= 5.8.X`

### Objects

#### Person metadata

```metadata json
{
    'id': number,
    'first_name': string,
    'last_name': string,
    'country_iso': string,
    'alcohol': number,
    'story': string,
    'votes_amount': number,
    'votes_average': number
}
```

#### Vote metadata

```metadata json
{
    'id': number,
    'person_id': number,
    'rating': number
}
```

#### BestOf metadata

```metadata json
{
    'id': number,
    'person_id': number,
    'mention': string
}
```

## API Endpoints

### GET `/person/`

- Response status 200, `Array<Person>`.

### GET `/person/paginate`

Query params:
- `page`: number.
- `amount`: number.
- `order`: string.
- `filters`: filter,...
    - Filter format: `name|arg1|arg2|...`
    - Ex: `filters=max|5,between|1|7`

### POST `/person/`

- Response status 201, `Person`.
- Response status 422, validation failed.

### GET `/person/:id`

- Response status 200, `Person`.
- Response status 404, not found.

### PUT `/person/:id`

- Response status 200, `Person`.
- Response status 404, not found.
- Response status 422, validation failed.

### DELETE `/person/:id`

- Response status 204, success.
- Response status 404, not found.

### POST `/person/restore/:id`

- Response status 204, ok or not deleted.
- Response status 404, not found.

### GET `/person/:id/vote`

- Response status 200, `number`.
- Response status 403, forbidden.
- Response status 404, not found.

### POST `/person/:id/vote/:rating`

- Response status 201, `Vote`.
- Response status 422, validation error.
- Response status 403, forbidden.
- Response status 404, not found.

### PUT `/person/:id/vote/:rating`

- Response status 201, `Vote`.
- Response status 422, validation error.
- Response status 403, forbidden.
- Response status 404, not found.

### DELETE `/person/:id/vote`

- Response status 204, ok.
- Response status 403, forbidden.
- Response status 404, not found.
