define({ "api": [
  {
    "type": "get",
    "url": "/api/user/activities/:username",
    "title": "Activities",
    "name": "Activities",
    "group": "User",
    "description": "<p>Request a summary of activities of the user using his username (surname + student id)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
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
            "field": "username",
            "description": "<p>Username of the User.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"basile.1845115\",\n  \"post\":12,\n  \"cfu\":24,\n  \"last\":\"07/07/2021\",\n  \"average\":2\n}",
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
            "field": "UsernameNotFound",
            "description": "<p>The username User of the student was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantReachTheServer",
            "description": "<p>Unable to reach the server.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UsernameNotFound\"\n}",
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
    "url": "/api/user/:username",
    "title": "User",
    "name": "GetUser",
    "group": "User",
    "description": "<p>Check if is present an User by his username (surname + student id)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
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
            "field": "Username",
            "description": "<p>Username of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"username\":\"basile.1845115\"\n}",
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
            "field": "UsernameNotFound",
            "description": "<p>The username User of the student was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantReachTheServer",
            "description": "<p>Unable to reach the server.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UsernameNotFound\"\n}",
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
    "url": "/api/user/info/:username",
    "title": "Info",
    "name": "Info",
    "group": "User",
    "description": "<p>Request description of the user using his username (surname + student id)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
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
            "field": "username",
            "description": "<p>Username of the User.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"basile.1845115\",\n  \"description\":\"this is my profile description\",\n  \"date\":\"1/1/2021\"\n}",
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
            "field": "UsernameNotFound",
            "description": "<p>The username User of the student was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantReachTheServer",
            "description": "<p>Unable to reach the server.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UsernameNotFound\"\n}",
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
    "name": "Social",
    "group": "User",
    "description": "<p>Request a summary of social interaction of the user using his username (surname + student id)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
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
            "field": "username",
            "description": "<p>Username of the User.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  \"username\":\"basile.1845115\"\n  \"chat\":2,\n  \"following\":5\n}",
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
            "field": "UsernameNotFound",
            "description": "<p>The username User of the student was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantReachTheServer",
            "description": "<p>Unable to reach the server.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UsernameNotFound\"\n}",
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
  },
  {
    "type": "get",
    "url": "/api/user/number",
    "title": "UserNumber",
    "name": "UserNumber",
    "group": "User",
    "description": "<p>Returns the number of users</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "number",
            "description": "<p>Number of users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"number\" : 10\n}",
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
            "field": "CantReachTheServer",
            "description": "<p>Unable to reach the server.</p>"
          }
        ]
      },
      "examples": [
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
        "url": "http://localhost:8080/api/user/number"
      }
    ]
  }
] });
