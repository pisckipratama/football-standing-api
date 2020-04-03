const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Football League Table API",
      version: "1.0.0",
      description: "Check your favorite team!",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "Piscki Pratama",
        url: "https://pisckipratama.github.io",
        email: "pisckipratama@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000/football/v1"
      }
    ],
    tags: [
      {
        name: "football",
        description: "Check Table League, Show List Club, and Record Game"
      }
    ],
    paths: {
      "/listClub": {
        "get": {
          "tags": [
            "football"
          ],
          "summary": "Find list clubs",
          "description": "Returns all clubs",
          "responses": {
            "200": {
              "description": "successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Pet"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid ID supplied",
              "content": {}
            },
            "404": {
              "description": "Pet not found",
              "content": {}
            }
          },
          "security": [
            {
              "api_key": []
            }
          ]
        },
        "post": {
          "tags": [
            "pet"
          ],
          "summary": "Updates a pet in the store with form data",
          "operationId": "updatePetWithForm",
          "parameters": [
            {
              "name": "petId",
              "in": "path",
              "description": "ID of pet that needs to be updated",
              "required": true,
              "schema": {
                "type": "integer",
                "format": "int64"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/x-www-form-urlencoded": {
                "schema": {
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Updated name of the pet"
                    },
                    "status": {
                      "type": "string",
                      "description": "Updated status of the pet"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "405": {
              "description": "Invalid input",
              "content": {}
            }
          },
          "security": [
            {
              "petstore_auth": [
                "write:pets",
                "read:pets"
              ]
            }
          ]
        },
        "delete": {
          "tags": [
            "pet"
          ],
          "summary": "Deletes a pet",
          "operationId": "deletePet",
          "parameters": [
            {
              "name": "api_key",
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "petId",
              "in": "path",
              "description": "Pet id to delete",
              "required": true,
              "schema": {
                "type": "integer",
                "format": "int64"
              }
            }
          ],
          "responses": {
            "400": {
              "description": "Invalid ID supplied",
              "content": {}
            },
            "404": {
              "description": "Pet not found",
              "content": {}
            }
          },
          "security": [
            {
              "petstore_auth": [
                "write:pets",
                "read:pets"
              ]
            }
          ]
        }
      },
    },
  },
  apis: []
};

module.exports = options;