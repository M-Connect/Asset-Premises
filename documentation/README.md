# Asset-Premises Documentation Index

Welcome to the Asset-Premises documentation! This index provides an overview of all available documentation and guides to help you get started.

## Quick Links

| Document | Description | When to Use |
|----------|-------------|-------------|
| [README.md](../README.md) | Project overview and quick start | First-time users |
| [FEATURES.md](./FEATURES.md) | Detailed feature documentation | Understanding new capabilities |
| [API.md](./API.md) | Complete API reference | API integration and development |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deployment and configuration guide | Setting up the application |
| [DEVELOPER.md](./DEVELOPER.md) | Developer setup and contribution | Contributing to the project |

## Getting Started

### For End Users

1. **Start Here**: Read the [README.md](../README.md) for an overview
2. **Learn Features**: Review [FEATURES.md](./FEATURES.md) to understand warranty management and property manager roles
3. **Deploy**: Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide to set up your instance

### For Developers

1. **Environment Setup**: Follow [DEVELOPER.md](./DEVELOPER.md) to set up your development environment
2. **API Integration**: Reference [API.md](./API.md) for building integrations
3. **Feature Development**: Review [FEATURES.md](./FEATURES.md) for implementation details

### For API Users

1. **Authentication**: See [API.md - Authentication](./API.md#authentication)
2. **Warranty API**: Check [API.md - Warranty Management](./API.md#warranty-management-api)
3. **Examples**: Review [API.md - Examples](./API.md#examples)

## Documentation Structure

### README.md
- Project introduction
- Key features overview
- Quick start guide
- Basic deployment instructions

### FEATURES.md
- Warranty Management System
  - Overview and benefits
  - User interface guide
  - Data tracking details
- Property Manager Role
  - Access control explanation
  - Assignment workflows
  - Security considerations
- Database schemas
- Implementation file references

### API.md
- Authentication methods
- Warranty management endpoints
  - List warranties
  - Create warranty
  - Update warranty
  - Delete warranty
- Property manager role endpoints
- Error handling
- Rate limiting
- Complete code examples (cURL, JavaScript, Python)
- Postman collection

### DEPLOYMENT.md
- Prerequisites and requirements
- Quick start deployment
- Environment configuration
- Database setup
- Production deployment
- SSL/TLS configuration
- Post-deployment verification
- Troubleshooting guide
- Backup and maintenance

### DEVELOPER.md
- Development environment setup
- Build and test instructions
- Contributing guidelines
- Code style and standards

## Feature Highlights

### Warranty Management System

**What it does**: Centralized tracking of warranties for property components

**Key capabilities**:
- CRUD operations for warranties
- Support for 7 warranty types
- Property association
- Expiration tracking
- Coverage amount monitoring

**Where to learn more**: [FEATURES.md - Warranty Management](./FEATURES.md#warranty-management-system)

**API Reference**: [API.md - Warranty Endpoints](./API.md#warranty-management-api)

### Property Manager Role

**What it does**: Role-based access control for property managers

**Key capabilities**:
- Assign specific properties to managers
- Automatic data filtering
- API-level security
- Dashboard customization
- Multi-manager support

**Where to learn more**: [FEATURES.md - Property Manager Role](./FEATURES.md#property-manager-role)

**API Reference**: [API.md - Property Manager API](./API.md#property-manager-role-api)

## Common Use Cases

### Use Case 1: Setting Up Warranty Tracking

**Goal**: Track all property warranties in one place

**Steps**:
1. Deploy Asset-Premises ([DEPLOYMENT.md](./DEPLOYMENT.md))
2. Login as administrator
3. Navigate to a property
4. Add warranties using the warranty form
5. Monitor expiration dates

**Reference**: [FEATURES.md - Warranty Management](./FEATURES.md#warranty-management-system)

### Use Case 2: Delegating Property Management

**Goal**: Allow a property manager to manage specific properties

**Steps**:
1. Create a new user with "property manager" role
2. Assign properties to the manager
3. Manager logs in and sees only assigned properties
4. Verify access control works correctly

**Reference**: [FEATURES.md - Property Manager Role](./FEATURES.md#property-manager-role)

### Use Case 3: API Integration

**Goal**: Integrate warranty data with external systems

**Steps**:
1. Obtain API authentication token
2. Use warranty endpoints to create/read/update data
3. Implement error handling
4. Set up automated workflows

**Reference**: [API.md - Warranty Management API](./API.md#warranty-management-api)

## Troubleshooting

### Can't find warranty features
- Check `ENABLE_WARRANTY_MANAGEMENT=true` in `.env`
- Restart the application
- Clear browser cache
- See [DEPLOYMENT.md - Troubleshooting](./DEPLOYMENT.md#troubleshooting)

### Property manager sees all properties
- Verify role is "property manager" not "administrator"
- Check properties are assigned
- Logout and login again
- See [API.md - Property Manager Role](./API.md#property-manager-role-api)

### API authentication fails
- Check token is valid and not expired
- Verify Authorization header format
- See [API.md - Authentication](./API.md#authentication)

### Deployment issues
- Review prerequisites in [DEPLOYMENT.md](./DEPLOYMENT.md#prerequisites)
- Check Docker and Docker Compose versions
- Verify environment configuration
- See [DEPLOYMENT.md - Troubleshooting](./DEPLOYMENT.md#troubleshooting)

## Version Information

This documentation is for Asset-Premises, based on MicroRealEstate.

**Features added**:
- Warranty Management System (v1.0)
- Property Manager Role (v1.0)

**Base version**: MicroRealEstate master branch (as of commit 102c127)

## Contributing

Want to improve the documentation?

1. Fork the repository
2. Make your changes
3. Submit a pull request
4. See [DEVELOPER.md](./DEVELOPER.md) for guidelines

## Support

- **GitHub Issues**: [M-Connect/Asset-Premises/issues](https://github.com/M-Connect/Asset-Premises/issues)
- **Feature Requests**: Create an issue with the "enhancement" label
- **Bug Reports**: Create an issue with the "bug" label

## License

All documentation is licensed under MIT License, consistent with the parent project.

---

**Last Updated**: October 2025

**Documentation Version**: 1.0

**Maintainers**: M-Connect Team
