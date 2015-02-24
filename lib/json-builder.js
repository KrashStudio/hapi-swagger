
'use strict';
var Hoek        = require('hoek'),
    Boom        = require('boom'),
    Joi         = require('joi'),
    Path        = require('path'),
    schemas     = require('../lib/schemas');


var builder = module.exports = {};


// builds swagger JSON
builder.getSwaggerJSON = function( options ){
    //return {test:'test'}

    return {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Swagger Petstore",
        "description": "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
        "termsOfService": "http://helloreverb.com/terms/",
        "contact": {
            "name": "Wordnik API Team"
        },
        "license": {
            "name": "MIT"
        }
    },
    "host": "petstore.swagger.wordnik.com",
    "basePath": "/api",
    "schemes": [
        "http"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/pets": {
            "get": {
                "description": "Returns all pets from the system that the user has access to",
                "operationId": "findPets",
                "produces": [
                    "application/json",
                    "application/xml",
                    "text/xml",
                    "text/html"
                ],
                "parameters": [
                    {
                        "name": "tags",
                        "in": "query",
                        "description": "tags to filter by",
                        "required": false,
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "collectionFormat": "csv"
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "description": "maximum number of results to return",
                        "required": false,
                        "type": "integer",
                        "format": "int32"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "pet response",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/pet"
                            }
                        }
                    },
                    "default": {
                        "description": "unexpected error",
                        "schema": {
                            "$ref": "#/definitions/errorModel"
                        }
                    }
                }
            },
            "post": {
                "description": "Creates a new pet in the store.  Duplicates are allowed",
                "operationId": "addPet",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "pet",
                        "in": "body",
                        "description": "Pet to add to the store",
                        "schema": {
                            "items": {
                                "id": {
                                    "type": "integer",
                                    "format": "int64"
                                },
                                "name": {
                                    "type": "string"
                                },
                                "tag": {
                                    "type": "string"
                                }
                            }
                        }
                            
                        
                    }
                ],
                "responses": {
                    "200": {
                        "description": "pet response",
                        "schema": {
                            "$ref": "#/definitions/pet"
                        }
                    },
                    "default": {
                        "description": "unexpected error",
                        "schema": {
                            "$ref": "#/definitions/errorModel"
                        }
                    }
                }
            }
        },
        "/pets/{id}": {
            "get": {
                "description": "Returns a user based on a single ID, if the user does not have access to the pet",
                "operationId": "findPetById",
                "produces": [
                    "application/json",
                    "application/xml",
                    "text/xml",
                    "text/html"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of pet to fetch",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "pet response",
                        "schema": {
                            "$ref": "#/definitions/pet"
                        }
                    },
                    "default": {
                        "description": "unexpected error",
                        "schema": {
                            "$ref": "#/definitions/errorModel"
                        }
                    }
                }
            },
            "delete": {
                "description": "deletes a single pet based on the ID supplied",
                "operationId": "deletePet",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of pet to delete",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "204": {
                        "description": "pet deleted"
                    },
                    "default": {
                        "description": "unexpected error",
                        "schema": {
                            "$ref": "#/definitions/errorModel"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "pet": {
            "title": "petx",
            "required": [
                "id",
                "name"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "name": {
                    "type": "string"
                },
                "tag": {
                    "type": "string"
                }
            }
        },
        "petInput": {
            "allOf": [
                {
                    "$ref": "pet"
                },
                {
                    "required": [
                        "name"
                    ],
                    "properties": {
                        "id": {
                            "type": "integer",
                            "format": "int64"
                        }
                    }
                }
            ]
        },
        "errorModel": {
            "required": [
                "code",
                "message"
            ],
            "properties": {
                "code": {
                    "type": "integer",
                    "format": "int32"
                },
                "message": {
                    "type": "string"
                }
            }
        }
    }
}

}


// checks the format of options.info
builder.getInfo = function( options ){
    var info;
    if( options.info ){
      Joi.assert(options.info, schemas.info, 'Error with swagger option.info');  
    }
    return info;
}