# API Documentation - Asset-Premises

This document provides detailed API documentation for the warranty management and property manager role features in Asset-Premises.

## Table of Contents

1. [Authentication](#authentication)
2. [Warranty Management API](#warranty-management-api)
3. [Property Manager Role API](#property-manager-role-api)
4. [Error Handling](#error-handling)
5. [Rate Limiting](#rate-limiting)
6. [Examples](#examples)

## Authentication

All API endpoints require authentication using JWT tokens.

### Obtaining a Token

```bash
POST /api/v2/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "administrator"
  }
}
```

### Using the Token

Include the token in the Authorization header for all subsequent requests:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Warranty Management API

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v2/warranties/:propId` | List all warranties for a property |
| GET | `/api/v2/warranty/:id` | Get a specific warranty |
| POST | `/api/v2/warranty` | Create a new warranty |
| PATCH | `/api/v2/warranty/:id` | Update a warranty |
| DELETE | `/api/v2/warranties/:ids` | Delete one or more warranties |

### List Warranties for a Property

Retrieve all warranties associated with a specific property.

```http
GET /api/v2/warranties/:propId
Authorization: Bearer {token}
```

**Parameters:**
- `propId` (path, required): The property ID

**Example Request:**
```bash
curl -X GET \
  http://localhost:8080/api/v2/warranties/property_123 \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**Example Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "warranty_001",
      "name": "HVAC System Warranty",
      "description": "Comprehensive 5-year warranty covering all HVAC components including compressor, condenser, and air handler",
      "propertyId": "property_123",
      "startDate": "2024-01-15T00:00:00.000Z",
      "endDate": "2029-01-15T00:00:00.000Z",
      "amount": 5000,
      "provider": "HVAC Pro Warranties Inc.",
      "type": "hvac",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "warranty_002",
      "name": "Roof Warranty",
      "description": "20-year manufacturer warranty on shingles and installation",
      "propertyId": "property_123",
      "startDate": "2023-06-01T00:00:00.000Z",
      "endDate": "2043-06-01T00:00:00.000Z",
      "amount": 15000,
      "provider": "Premium Roofing Systems",
      "type": "roofing",
      "createdAt": "2023-06-01T14:20:00.000Z",
      "updatedAt": "2023-06-01T14:20:00.000Z"
    }
  ]
}
```

### Get Warranty Details

Retrieve details of a specific warranty.

```http
GET /api/v2/warranty/:id
Authorization: Bearer {token}
```

**Parameters:**
- `id` (path, required): The warranty ID

**Example Request:**
```bash
curl -X GET \
  http://localhost:8080/api/v2/warranty/warranty_001 \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**Example Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "warranty_001",
    "name": "HVAC System Warranty",
    "description": "Comprehensive 5-year warranty covering all HVAC components",
    "propertyId": "property_123",
    "startDate": "2024-01-15T00:00:00.000Z",
    "endDate": "2029-01-15T00:00:00.000Z",
    "amount": 5000,
    "provider": "HVAC Pro Warranties Inc.",
    "type": "hvac",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Create New Warranty

Create a new warranty record for a property.

```http
POST /api/v2/warranty
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Water Heater Warranty",
  "description": "10-year manufacturer warranty covering tank and heating elements",
  "propertyId": "property_123",
  "startDate": "2024-03-01",
  "endDate": "2034-03-01",
  "amount": 1200,
  "provider": "ABC Appliances & Water Heaters",
  "type": "appliances"
}
```

**Field Descriptions:**
- `name` (string, required): Descriptive name for the warranty
- `description` (string, optional): Detailed description of coverage
- `propertyId` (string, required): ID of the associated property
- `startDate` (date, required): When warranty coverage begins
- `endDate` (date, required): When warranty coverage expires
- `amount` (number, optional): Coverage amount or replacement value
- `provider` (string, optional): Warranty provider or company name
- `type` (string, required): One of: `electrical`, `plumbing`, `structural`, `appliances`, `hvac`, `roofing`, `other`

**Example Request:**
```bash
curl -X POST \
  http://localhost:8080/api/v2/warranty \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Water Heater Warranty",
    "description": "10-year manufacturer warranty",
    "propertyId": "property_123",
    "startDate": "2024-03-01",
    "endDate": "2034-03-01",
    "amount": 1200,
    "provider": "ABC Appliances",
    "type": "appliances"
  }'
```

**Example Response:**
```json
{
  "status": "success",
  "message": "Warranty created successfully",
  "data": {
    "_id": "warranty_003",
    "name": "Water Heater Warranty",
    "description": "10-year manufacturer warranty",
    "propertyId": "property_123",
    "startDate": "2024-03-01T00:00:00.000Z",
    "endDate": "2034-03-01T00:00:00.000Z",
    "amount": 1200,
    "provider": "ABC Appliances",
    "type": "appliances",
    "createdAt": "2024-03-05T09:15:00.000Z",
    "updatedAt": "2024-03-05T09:15:00.000Z"
  }
}
```

### Update Warranty

Update an existing warranty. Supports partial updates.

```http
PATCH /api/v2/warranty/:id
Authorization: Bearer {token}
Content-Type: application/json
```

**Parameters:**
- `id` (path, required): The warranty ID

**Request Body:** (all fields optional)
```json
{
  "endDate": "2035-03-01",
  "amount": 1500,
  "description": "Extended 11-year warranty with additional coverage"
}
```

**Example Request:**
```bash
curl -X PATCH \
  http://localhost:8080/api/v2/warranty/warranty_003 \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Content-Type: application/json' \
  -d '{
    "endDate": "2035-03-01",
    "amount": 1500
  }'
```

**Example Response:**
```json
{
  "status": "success",
  "message": "Warranty updated successfully",
  "data": {
    "_id": "warranty_003",
    "name": "Water Heater Warranty",
    "description": "10-year manufacturer warranty",
    "propertyId": "property_123",
    "startDate": "2024-03-01T00:00:00.000Z",
    "endDate": "2035-03-01T00:00:00.000Z",
    "amount": 1500,
    "provider": "ABC Appliances",
    "type": "appliances",
    "createdAt": "2024-03-05T09:15:00.000Z",
    "updatedAt": "2024-03-05T14:22:00.000Z"
  }
}
```

### Delete Warranties

Delete one or more warranties.

```http
DELETE /api/v2/warranties/:ids
Authorization: Bearer {token}
```

**Parameters:**
- `ids` (path, required): Comma-separated list of warranty IDs

**Example Request (Single):**
```bash
curl -X DELETE \
  http://localhost:8080/api/v2/warranties/warranty_003 \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**Example Request (Multiple):**
```bash
curl -X DELETE \
  http://localhost:8080/api/v2/warranties/warranty_001,warranty_002,warranty_003 \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**Example Response:**
```json
{
  "status": "success",
  "message": "3 warranty(ies) deleted successfully",
  "data": {
    "deletedCount": 3,
    "deletedIds": ["warranty_001", "warranty_002", "warranty_003"]
  }
}
```

## Property Manager Role API

The property manager role functionality extends existing endpoints with automatic filtering. No new endpoints are required.

### How Role-Based Filtering Works

When a user with the "property manager" role makes API requests, responses are automatically filtered to include only their assigned properties.

**User Roles:**
- `administrator`: Full access to all properties
- `property manager`: Access only to assigned properties

### Affected Endpoints

All property-related endpoints respect role-based filtering:

#### Get Properties

```http
GET /api/v2/properties
Authorization: Bearer {token}
```

**Administrator Response:** Returns all properties
**Property Manager Response:** Returns only assigned properties

**Example Response (Property Manager):**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "property_123",
      "name": "Sunset Apartments",
      "address": "123 Main St",
      "managerId": "manager_001"
    },
    {
      "_id": "property_456",
      "name": "Riverside Condos",
      "address": "456 River Rd",
      "managerId": "manager_001"
    }
  ]
}
```

#### Get Tenants/Occupants

```http
GET /api/v2/occupants
Authorization: Bearer {token}
```

**Property Manager Response:** Returns only tenants from assigned properties

**Example Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "tenant_001",
      "name": "John Doe",
      "email": "john@example.com",
      "propertyId": "property_123"
    }
  ]
}
```

#### Get Rent Records

```http
GET /api/v2/rents
Authorization: Bearer {token}
```

**Property Manager Response:** Returns only rent records for assigned properties

#### Get Dashboard

```http
GET /api/v2/dashboard
Authorization: Bearer {token}
```

**Property Manager Response:** Dashboard metrics filtered to assigned properties only

### Managing Property Assignments

Property assignments are managed through the organization members API.

#### Get Member Details (with property assignments)

```http
GET /api/v2/organization/members/:memberId
Authorization: Bearer {token}
```

**Example Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "member_001",
    "email": "manager@example.com",
    "role": "property manager",
    "properties": ["property_123", "property_456", "property_789"],
    "createdAt": "2024-01-10T08:00:00.000Z"
  }
}
```

#### Update Member Property Assignments

```http
PATCH /api/v2/organization/members/:memberId
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "properties": ["property_123", "property_456", "property_101"]
}
```

**Example Request:**
```bash
curl -X PATCH \
  http://localhost:8080/api/v2/organization/members/member_001 \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": ["property_123", "property_456", "property_101"]
  }'
```

**Example Response:**
```json
{
  "status": "success",
  "message": "Member updated successfully",
  "data": {
    "_id": "member_001",
    "email": "manager@example.com",
    "role": "property manager",
    "properties": ["property_123", "property_456", "property_101"],
    "updatedAt": "2024-03-05T10:30:00.000Z"
  }
}
```

## Error Handling

The API uses standard HTTP status codes and returns consistent error responses.

### Error Response Format

```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Common Error Codes

| Status Code | Description | Example |
|-------------|-------------|---------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable Entity | Validation errors |
| 500 | Internal Server Error | Server-side error |

### Example Error Responses

**Validation Error (400):**
```json
{
  "status": "error",
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "fields": {
      "startDate": "Start date is required",
      "type": "Invalid warranty type"
    }
  }
}
```

**Unauthorized (401):**
```json
{
  "status": "error",
  "message": "Authentication required",
  "code": "UNAUTHORIZED"
}
```

**Forbidden (403):**
```json
{
  "status": "error",
  "message": "You don't have permission to access this property",
  "code": "FORBIDDEN"
}
```

**Not Found (404):**
```json
{
  "status": "error",
  "message": "Warranty not found",
  "code": "NOT_FOUND"
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse.

**Limits:**
- 100 requests per minute per user
- 1000 requests per hour per user

**Rate Limit Headers:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1710234567
```

**Rate Limit Exceeded Response:**
```json
{
  "status": "error",
  "message": "Rate limit exceeded. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED",
  "details": {
    "retryAfter": 60
  }
}
```

## Examples

### Complete Workflow: Managing Warranties

#### 1. Login and Get Token

```bash
TOKEN=$(curl -X POST http://localhost:8080/api/v2/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"password"}' \
  | jq -r '.token')
```

#### 2. Get All Properties

```bash
curl -X GET http://localhost:8080/api/v2/properties \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.data[] | {id: ._id, name: .name}'
```

#### 3. Create a Warranty

```bash
curl -X POST http://localhost:8080/api/v2/warranty \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Electrical Panel Warranty",
    "description": "15-year warranty on main electrical panel",
    "propertyId": "property_123",
    "startDate": "2024-01-01",
    "endDate": "2039-01-01",
    "amount": 3000,
    "provider": "Electrical Solutions Inc.",
    "type": "electrical"
  }' | jq '.'
```

#### 4. List Property Warranties

```bash
curl -X GET http://localhost:8080/api/v2/warranties/property_123 \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.data[] | {name: .name, expires: .endDate}'
```

#### 5. Update a Warranty

```bash
curl -X PATCH http://localhost:8080/api/v2/warranty/warranty_004 \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "amount": 3500,
    "description": "Extended warranty with additional coverage"
  }' | jq '.'
```

### Complete Workflow: Property Manager Setup

#### 1. Create Property Manager User

```bash
curl -X POST http://localhost:8080/api/v2/organization/members \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "manager@example.com",
    "password": "securepassword",
    "role": "property manager",
    "properties": ["property_123", "property_456"]
  }' | jq '.'
```

#### 2. Assign Additional Properties

```bash
curl -X PATCH http://localhost:8080/api/v2/organization/members/member_001 \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": ["property_123", "property_456", "property_789"]
  }' | jq '.'
```

#### 3. Login as Property Manager

```bash
MANAGER_TOKEN=$(curl -X POST http://localhost:8080/api/v2/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"manager@example.com","password":"securepassword"}' \
  | jq -r '.token')
```

#### 4. Verify Filtered Access

```bash
# This will only return assigned properties
curl -X GET http://localhost:8080/api/v2/properties \
  -H "Authorization: Bearer $MANAGER_TOKEN" \
  | jq '.data | length'
```

### Batch Operations

#### Create Multiple Warranties

```bash
for type in hvac plumbing electrical; do
  curl -X POST http://localhost:8080/api/v2/warranty \
    -H "Authorization: Bearer $TOKEN" \
    -H 'Content-Type: application/json' \
    -d "{
      \"name\": \"${type^} System Warranty\",
      \"propertyId\": \"property_123\",
      \"startDate\": \"2024-01-01\",
      \"endDate\": \"2029-01-01\",
      \"type\": \"$type\"
    }"
done
```

#### Delete Multiple Warranties

```bash
# Get warranty IDs
WARR_IDS=$(curl -X GET http://localhost:8080/api/v2/warranties/property_123 \
  -H "Authorization: Bearer $TOKEN" \
  | jq -r '.data[].\_id' | tr '\n' ',' | sed 's/,$//')

# Delete all warranties
curl -X DELETE "http://localhost:8080/api/v2/warranties/$WARR_IDS" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

class AssetPremisesClient {
  constructor(baseURL, token) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async createWarranty(warrantyData) {
    const response = await this.client.post('/api/v2/warranty', warrantyData);
    return response.data;
  }

  async getWarranties(propertyId) {
    const response = await this.client.get(`/api/v2/warranties/${propertyId}`);
    return response.data;
  }

  async updateWarranty(warrantyId, updates) {
    const response = await this.client.patch(`/api/v2/warranty/${warrantyId}`, updates);
    return response.data;
  }

  async deleteWarranties(warrantyIds) {
    const ids = Array.isArray(warrantyIds) ? warrantyIds.join(',') : warrantyIds;
    const response = await this.client.delete(`/api/v2/warranties/${ids}`);
    return response.data;
  }
}

// Usage
const client = new AssetPremisesClient('http://localhost:8080', 'your_token');

await client.createWarranty({
  name: 'HVAC Warranty',
  propertyId: 'property_123',
  startDate: '2024-01-01',
  endDate: '2029-01-01',
  type: 'hvac'
});
```

### Python

```python
import requests

class AssetPremisesClient:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    
    def create_warranty(self, warranty_data):
        response = requests.post(
            f'{self.base_url}/api/v2/warranty',
            json=warranty_data,
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def get_warranties(self, property_id):
        response = requests.get(
            f'{self.base_url}/api/v2/warranties/{property_id}',
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()

# Usage
client = AssetPremisesClient('http://localhost:8080', 'your_token')

warranty = client.create_warranty({
    'name': 'HVAC Warranty',
    'propertyId': 'property_123',
    'startDate': '2024-01-01',
    'endDate': '2029-01-01',
    'type': 'hvac'
})
```

## Testing

### Using Postman

Import this collection to test the API:

```json
{
  "info": {
    "name": "Asset-Premises API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"{{email}}\",\n  \"password\": \"{{password}}\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/api/v2/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v2", "auth", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Warranties",
      "item": [
        {
          "name": "Create Warranty",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test Warranty\",\n  \"propertyId\": \"{{propertyId}}\",\n  \"startDate\": \"2024-01-01\",\n  \"endDate\": \"2029-01-01\",\n  \"type\": \"hvac\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/api/v2/warranty",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v2", "warranty"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:8080"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

## Support

For API-related questions or issues:
- Check [GitHub Issues](https://github.com/M-Connect/Asset-Premises/issues)
- Review [Feature Documentation](./FEATURES.md)
- Consult [Deployment Guide](./DEPLOYMENT.md)

## License

This API documentation is part of Asset-Premises, licensed under MIT License.
