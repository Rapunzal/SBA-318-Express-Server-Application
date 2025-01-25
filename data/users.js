const users = [
    {
      id: 101,
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      password_hash: "$2b$10$e...hash...",
      phone: "+1-234-567-8901",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        postal_code: "10001",
        country: "USA",
      },
      role: "customer",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-22T09:30:00Z",
    },
    {
      id: 102,
      first_name: "Alice",
      last_name: "Smith",
      email: "alicesmith@example.com",
      password_hash: "$2b$10$e...hash...",
      phone: "+1-234-567-8902",
      address: {
        street: "456 Oak St",
        city: "Los Angeles",
        state: "CA",
        postal_code: "90001",
        country: "USA",
      },
      role: "admin",
      created_at: "2024-01-12T08:45:00Z",
      updated_at: "2024-01-20T11:00:00Z",
    },
    {
      id: 103,
      first_name: "Bob",
      last_name: "Johnson",
      email: "bobjohnson@example.com",
      password_hash: "$2b$10$e...hash...",
      phone: "+1-234-567-8903",
      address: {
        street: "789 Pine St",
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "USA",
      },
      role: "customer",
      created_at: "2024-01-14T09:30:00Z",
      updated_at: "2024-01-20T13:30:00Z",
    },
    {
      id: 104,
      first_name: "Sarah",
      last_name: "Lee",
      email: "sarahlee@example.com",
      password_hash: "$2b$10$e...hash...",
      phone: "+1-234-567-8904",
      address: {
        street: "321 Birch St",
        city: "San Francisco",
        state: "CA",
        postal_code: "94102",
        country: "USA",
      },
      role: "customer",
      created_at: "2024-01-16T10:00:00Z",
      updated_at: "2024-01-19T14:45:00Z",
    },{
      "id": 105,
      "first_name": "David",
      "last_name": "Brown",
      "email": "davidbrown@example.com",
      "password_hash": "$2b$10$e...hash...",
      "phone": "+1-234-567-8905",
      "address": {
        "street": "654 Maple St",
        "city": "Miami",
        "state": "FL",
        "postal_code": "33101",
        "country": "USA"
      },
      "role": "customer",
      "created_at": "2024-01-17T11:15:00Z",
      "updated_at": "2024-01-21T15:30:00Z"
    }
  
    {
      "id": 106,
      "first_name": "Emma",
      "last_name": "Wilson",
      "email": "emmawilson@example.com",
      "password_hash": "$2b$10$e...hash...",
      "phone": "+1-234-567-8906",
      "address": {
        "street": "987 Cedar St",
        "city": "Seattle",
        "state": "WA",
        "postal_code": "98101",
        "country": "USA"
      },
      "role": "admin",
      "created_at": "2024-01-13T08:00:00Z",
      "updated_at": "2024-01-22T16:45:00Z"
    },
    {
      "id": 107,
      "first_name": "Michael",
      "last_name": "Harris",
      "email": "michaelharris@example.com",
      "password_hash": "$2b$10$e...hash...",
      "phone": "+1-234-567-8907",
      "address": {
        "street": "112 Elm St",
        "city": "Austin",
        "state": "TX",
        "postal_code": "73301",
        "country": "USA"
      },
      "role": "customer",
      "created_at": "2024-01-18T09:15:00Z",
      "updated_at": "2024-01-21T10:00:00Z"
    },
    {
      "id": 108,
      "first_name": "Olivia",
      "last_name": "Martinez",
      "email": "oliviamartinez@example.com",
      "password_hash": "$2b$10$e...hash...",
      "phone": "+1-234-567-8908",
      "address": {
        "street": "223 Maple St",
        "city": "Phoenix",
        "state": "AZ",
        "postal_code": "85001",
        "country": "USA"
      },
      "role": "customer",
      "created_at": "2024-01-19T14:30:00Z",
      "updated_at": "2024-01-22T16:15:00Z"
    } 
  ];
  
  module.exports = users;