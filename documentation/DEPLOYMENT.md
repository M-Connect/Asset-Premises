# Deployment Guide for Asset-Premises

This guide covers deploying Asset-Premises with the warranty management and property manager role features.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Configuration](#configuration)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Deployment Steps](#deployment-steps)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Upgrading from MicroRealEstate](#upgrading-from-microrealestate)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying Asset-Premises, ensure you have:

- Docker Engine 20.10.0 or higher
- Docker Compose 2.0.0 or higher
- At least 4GB of RAM available
- 10GB of free disk space
- Basic understanding of Docker and containerization

## Quick Start

The fastest way to get started with Asset-Premises:

```bash
# Clone the repository
git clone https://github.com/M-Connect/Asset-Premises.git
cd Asset-Premises

# Copy and configure environment file
cp .env.domain .env

# Update the secrets and tokens in .env file
# (See Configuration section below)

# Start all services
docker-compose up -d

# Check service status
docker-compose ps
```

Access the application at `http://localhost:8080` (or your configured domain)

## Configuration

### Environment File Setup

The `.env` file contains all configuration settings. Key settings to update:

```bash
# Application Settings
DOMAIN=localhost          # Your domain name
PORT=8080                # Application port
NODE_ENV=production      # Environment (development/production)

# Security Settings
SESSION_SECRET=your_random_secret_here     # Change this!
JWT_SECRET=your_jwt_secret_here           # Change this!
CIPHER_KEY=your_cipher_key_here           # Change this!

# Database Configuration
MONGO_URL=mongodb://mongodb:27017/mre     # MongoDB connection string
REDIS_URL=redis://redis:6379              # Redis connection string

# Email Configuration (for notifications)
EMAIL_FROM=noreply@yourdomain.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

# PDF Generation
PDF_GENERATOR_URL=http://pdfgenerator:8080

# Optional: Enable features
ENABLE_WARRANTY_MANAGEMENT=true           # Enable warranty features
ENABLE_PROPERTY_MANAGER_ROLE=true         # Enable property manager role
```

### Generating Secure Secrets

Generate secure random secrets for production:

```bash
# Generate SESSION_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32

# Generate CIPHER_KEY (must be 32 characters)
openssl rand -hex 16
```

## Database Setup

Asset-Premises uses MongoDB for data storage. The warranty collection is created automatically when the first warranty is added.

### Automatic Setup

When you start the application for the first time:

1. MongoDB container starts automatically
2. Database schemas are initialized
3. Indexes are created automatically
4. No manual database setup required

### Manual Index Creation (Optional)

For optimal performance, you can create additional indexes:

```javascript
// Connect to MongoDB
docker-compose exec mongodb mongosh mre

// Create warranty index
db.warranties.createIndex({ propertyId: 1 })

// Create realm members compound index
db.realms.createIndex({ "members.email": 1, "members.properties": 1 })
```

## Environment Variables

### Core Application Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DOMAIN` | Application domain | localhost | Yes |
| `PORT` | Application port | 8080 | Yes |
| `NODE_ENV` | Environment mode | development | Yes |
| `SESSION_SECRET` | Session encryption key | - | Yes |
| `JWT_SECRET` | JWT token secret | - | Yes |
| `CIPHER_KEY` | Data encryption key | - | Yes |

### Database Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGO_URL` | MongoDB connection string | mongodb://mongodb:27017/mre | Yes |
| `REDIS_URL` | Redis connection string | redis://redis:6379 | Yes |

### Email Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `EMAIL_FROM` | Sender email address | - | Yes |
| `SMTP_SERVER` | SMTP server hostname | - | Yes |
| `SMTP_PORT` | SMTP server port | 587 | Yes |
| `SMTP_USER` | SMTP username | - | Yes |
| `SMTP_PASS` | SMTP password | - | Yes |

### Feature Flags (Optional)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ENABLE_WARRANTY_MANAGEMENT` | Enable warranty features | true | No |
| `ENABLE_PROPERTY_MANAGER_ROLE` | Enable property manager role | true | No |

## Deployment Steps

### Development Deployment

For local development and testing:

```bash
# Start services in development mode
docker-compose -f docker-compose.yml up

# Or with custom compose file
docker-compose -f docker-compose.microservices.dev.yml up
```

### Production Deployment

For production environments:

```bash
# 1. Prepare environment file
cp .env.domain .env
nano .env  # Update all secrets and configuration

# 2. Build and start services
docker-compose -f docker-compose.microservices.prod.yml up -d

# 3. Check logs
docker-compose logs -f

# 4. Verify all services are running
docker-compose ps
```

### Using Docker Compose Profiles

Asset-Premises supports different deployment profiles:

```bash
# Minimal deployment (core services only)
docker-compose --profile minimal up -d

# Full deployment (including monitoring)
docker-compose --profile full -f docker-compose.monitoring.yml up -d

# Microservices architecture
docker-compose -f docker-compose.microservices.base.yml \
               -f docker-compose.microservices.prod.yml up -d
```

### Reverse Proxy Configuration

For production, use a reverse proxy like Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL/TLS Configuration

Enable HTTPS with Let's Encrypt:

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal is configured automatically
```

## Post-Deployment Verification

After deployment, verify the installation:

### 1. Check Service Health

```bash
# Check all containers are running
docker-compose ps

# Expected output: All services should show "Up" status
# - landlord (webapp)
# - api
# - mongodb
# - redis
# - pdfgenerator
```

### 2. Access the Application

Open your browser and navigate to:
- Development: `http://localhost:8080`
- Production: `https://yourdomain.com`

### 3. Create First User

1. Click "Sign Up" or access the signup endpoint
2. Create an administrator account
3. Login with the new credentials

### 4. Verify Warranty Management

1. Navigate to Properties
2. Select a property
3. Look for "Warranties" tab or section
4. Try creating a test warranty

### 5. Test Property Manager Role

1. Go to Organization → Members
2. Add a new member with "property manager" role
3. Assign properties to the manager
4. Login as the property manager
5. Verify limited access to assigned properties only

### 6. Check Logs

```bash
# View logs for all services
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs api
```

## Upgrading from MicroRealEstate

If you're upgrading from vanilla MicroRealEstate:

### Migration Steps

1. **Backup Your Data**
   ```bash
   # Backup MongoDB
   docker-compose exec mongodb mongodump --out /backup
   
   # Copy backup from container
   docker cp <container_id>:/backup ./mongodb-backup
   ```

2. **Stop Current Installation**
   ```bash
   docker-compose down
   ```

3. **Clone Asset-Premises**
   ```bash
   git clone https://github.com/M-Connect/Asset-Premises.git
   cd Asset-Premises
   ```

4. **Restore Configuration**
   ```bash
   # Copy your existing .env file
   cp /path/to/old/installation/.env .env
   ```

5. **Start New Installation**
   ```bash
   docker-compose up -d
   ```

6. **Verify Data**
   - Login to the application
   - Verify all properties are present
   - Check tenant and rent data
   - Test warranty creation

### Data Compatibility

- **100% Compatible**: All existing data remains intact
- **Additive Changes**: New features don't modify existing data
- **No Migration Scripts**: Automatic schema updates on startup

## Troubleshooting

### Common Issues

#### Services Won't Start

**Problem**: Containers exit immediately or won't start

**Solution**:
```bash
# Check logs
docker-compose logs

# Verify .env file
cat .env

# Ensure ports are not in use
netstat -tuln | grep :8080
```

#### Database Connection Errors

**Problem**: "Cannot connect to MongoDB"

**Solution**:
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Restart MongoDB
docker-compose restart mongodb

# Verify connection string in .env
echo $MONGO_URL
```

#### Warranty Features Not Visible

**Problem**: Warranty tab/section doesn't appear

**Solution**:
1. Check feature flag: `ENABLE_WARRANTY_MANAGEMENT=true` in `.env`
2. Clear browser cache
3. Restart application: `docker-compose restart`
4. Check browser console for errors

#### Property Manager Can See All Properties

**Problem**: Property manager role not filtering properties

**Solution**:
1. Verify role is set to "property manager" (not "administrator")
2. Check properties are assigned to the manager
3. Logout and login again
4. Check API responses (should be filtered)

#### Email Notifications Not Working

**Problem**: No warranty expiration emails

**Solution**:
1. Verify SMTP settings in `.env`
2. Test SMTP connection:
   ```bash
   docker-compose exec api npm run test:email
   ```
3. Check email logs: `docker-compose logs api | grep email`

### Performance Issues

#### Slow Warranty Queries

**Problem**: Warranty list loads slowly

**Solution**:
```javascript
// Create index on propertyId
docker-compose exec mongodb mongosh mre
db.warranties.createIndex({ propertyId: 1 })
```

#### High Memory Usage

**Problem**: Containers using excessive memory

**Solution**:
```yaml
# Add memory limits to docker-compose.yml
services:
  api:
    mem_limit: 512m
  mongodb:
    mem_limit: 1g
```

### Debug Mode

Enable debug logging:

```bash
# In .env file
NODE_ENV=development
DEBUG=*

# Restart services
docker-compose restart
```

### Getting Help

If you encounter issues:

1. Check [GitHub Issues](https://github.com/M-Connect/Asset-Premises/issues)
2. Review [main documentation](../README.md)
3. Check [MicroRealEstate documentation](https://github.com/microrealestate/microrealestate)
4. Submit a new issue with:
   - Docker version
   - OS details
   - Error logs
   - Steps to reproduce

## Maintenance

### Regular Maintenance Tasks

**Daily:**
- Monitor logs for errors
- Check disk space
- Verify backups

**Weekly:**
- Review warranty expirations
- Check user activity
- Update property manager assignments

**Monthly:**
- Update Docker images
- Review security updates
- Audit access logs
- Clean up old logs

### Backup Strategy

```bash
# Automated backup script
#!/bin/bash
BACKUP_DIR="/backup/asset-premises"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup MongoDB
docker-compose exec -T mongodb mongodump --archive > "$BACKUP_DIR/mongodb_$DATE.archive"

# Backup .env
cp .env "$BACKUP_DIR/env_$DATE.backup"

# Keep last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete
```

### Update Process

```bash
# 1. Backup data (see above)

# 2. Pull latest changes
git pull origin master

# 3. Rebuild containers
docker-compose build

# 4. Restart with new version
docker-compose up -d

# 5. Verify deployment
docker-compose ps
```

## Security Best Practices

1. **Change Default Secrets**: Never use default values in production
2. **Use HTTPS**: Always enable SSL/TLS for production
3. **Regular Updates**: Keep Docker images and system packages updated
4. **Access Control**: Use property manager role for delegation
5. **Backup Encryption**: Encrypt backup files
6. **Firewall Rules**: Restrict access to MongoDB and Redis ports
7. **Log Monitoring**: Set up log monitoring and alerting

## Performance Optimization

1. **Database Indexes**: Create recommended indexes
2. **Resource Limits**: Set appropriate memory/CPU limits
3. **Caching**: Configure Redis properly
4. **CDN**: Use CDN for static assets
5. **Compression**: Enable gzip compression in reverse proxy

## License

This deployment guide is part of Asset-Premises, licensed under MIT License.
