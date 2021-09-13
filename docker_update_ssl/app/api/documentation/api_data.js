define({ "api": [
  {
    "type": "get",
    "url": "/api/user/:username",
    "title": "User",
    "name": "GetUser",
    "description": "<p>Check if is present an User by his username (surname + student id)</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "User",
            "description": "<p>Unique username of the student (surname + student id).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>Surname of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"Dario\",\n  \"surname\": \"Basile\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UsernameFound",
            "description": "<p>The username User of the student was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantReachTheServer",
            "description": "<p>The database you are searching in was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UsernameNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"CantReachTheServer\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./apiServer.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/user/:username"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/activities/:username",
    "title": "Activities",
    "name": "GetUser/activities",
    "description": "<p>Request a summary of activities of the user using his username (surname + student id)</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "User",
            "description": "<p>Unique username of the student (surname + student id).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>Surname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "post",
            "description": "<p>Number of the post by the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "CFU",
            "description": "<p>Number of CFU assigned to this user by others.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last",
            "description": "<p>Date of the last post of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "average",
            "description": "<p>Averege of CFU for each Post.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"Dario\",\n  \"surname\": \"Basile\",\n  \"post\":12,\n  \"cfu\":24,\n  \"last\":\"07/07/2021\",\n  \"average\":2\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UsernameFound",
            "description": "<p>The username User of the student was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantReachTheServer",
            "description": "<p>The database you are searching in was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UsernameNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"CantReachTheServer\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./apiServer.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/user/activities/:username"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/info/:username",
    "title": "Info",
    "name": "GetUser/info",
    "description": "<p>Request description of the user using his username (surname + student id)</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "User",
            "description": "<p>Unique username of the student (surname + student id).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>Surname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email the user used during registration.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description shown in the user profile page.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date of registration of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"Dario\",\n  \"surname\": \"Basile\",\n  \"email\":\"basile.1845116@studenti.uniroma1.it\",\n  \"description\":\"this is my profile description\",\n  \"date\":\"1/1/2021\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UsernameFound",
            "description": "<p>The username User of the student was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantReachTheServer",
            "description": "<p>The database you are searching in was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UsernameNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"CantReachTheServer\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./apiServer.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/user/info/:username"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/social/:username",
    "title": "Social",
    "name": "GetUser/social",
    "description": "<p>Request a summary of social interaction of the user using his username (surname + student id)</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "User",
            "description": "<p>Unique username of the student (surname + student id).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>Surname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "chat",
            "description": "<p>Number of the chat the user is in.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "following",
            "description": "<p>Number of user followed by this user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"Dario\",\n  \"surname\": \"Basile\",\n  \"chat\":2,\n  \"following\":5\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UsernameFound",
            "description": "<p>The username User of the student was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantReachTheServer",
            "description": "<p>The database you are searching in was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UsernameNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"CantReachTheServer\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./apiServer.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/user/social/:username"
      }
    ]
  }
] });
