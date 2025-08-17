# Grafana-Prometheus-Loki SIEM Deployment

A comprehensive Security Information and Event Management (SIEM) solution using Grafana for visualization, Prometheus for metrics collection, and Loki for log aggregation. This deployment provides real-time monitoring, alerting, and security analytics capabilities for modern infrastructure.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Security Dashboards](#security-dashboards)
- [Alerting](#alerting)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project implements a modern SIEM solution that combines the power of:

- **Grafana**: Open-source platform for monitoring and observability with rich visualization capabilities
- **Prometheus**: Time-series database and monitoring system for metrics collection
- **Loki**: Horizontally scalable, highly available log aggregation system
- **Promtail**: Agent for shipping logs to Loki
- **AlertManager**: Handles alerts from Prometheus and routes them to various notification channels

The stack provides comprehensive security monitoring, incident detection, and response capabilities suitable for enterprise environments.

##  Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Log Sources   │    │  Metric Sources │    │  Alert Sources  │
│  (Applications, │    │  (Servers, Apps,│    │ (Prometheus,    │
│   Servers, etc.)│    │   Containers)   │    │  Custom Rules)  │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Promtail     │    │   Prometheus    │    │  AlertManager   │
│  (Log Shipper)  │    │ (Metrics Store) │    │ (Alert Router)  │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          ▼                      │                      │
┌─────────────────┐              │                      │
│      Loki       │              │                      │
│  (Log Storage)  │              │                      │
└─────────┬───────┘              │                      │
          │                      │                      │
          └──────────┬───────────┴──────────────────────┘
                     ▼
           ┌─────────────────┐
           │     Grafana     │
           │  (Visualization │
           │   & Dashboards) │
           └─────────────────┘
```

##  Features

### Core Capabilities
- **Real-time Log Analysis**: Centralized log collection and analysis from multiple sources
- **Metrics Monitoring**: System and application performance monitoring
- **Security Dashboards**: Pre-built dashboards for security monitoring and threat detection
- **Alert Management**: Configurable alerts for security events and system anomalies
- **Multi-tenant Support**: Support for multiple organizations and teams
- **High Availability**: Scalable architecture supporting enterprise deployments

### Security Features
- **Threat Detection**: Automated detection of security threats and anomalies
- **Incident Response**: Streamlined incident response workflows
- **Compliance Monitoring**: Built-in compliance reporting and monitoring
- **User Activity Monitoring**: Track and analyze user behavior patterns
- **Network Security**: Monitor network traffic and detect suspicious activities

### Operational Features
- **Scalable Architecture**: Horizontal scaling support for high-volume environments
- **Data Retention**: Configurable data retention policies
- **Backup & Recovery**: Automated backup and disaster recovery capabilities
- **API Integration**: RESTful APIs for integration with external systems
- **Role-based Access Control**: Granular permissions and access control

## Prerequisites

### System Requirements
- **Operating System**: Linux (Ubuntu 20.04+ recommended), macOS, or Windows with WSL2
- **Memory**: Minimum 8GB RAM (16GB+ recommended for production)
- **Storage**: 50GB+ available disk space
- **Network**: Open ports 3000, 9090, 3100, 9093, 9080

### Software Dependencies
- Docker Engine 20.10+
- Docker Compose 2.0+
- Git
- curl or wget

### Optional Requirements
- Kubernetes cluster (for Kubernetes deployment)
- Helm 3.0+ (for Kubernetes deployment)
- SSL certificates (for HTTPS configuration)

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PauPau2024/Grafana-Prometheus-and-Loki_SIEM_Deployment.git
   cd Grafana-Prometheus-and-Loki_SIEM_Deployment
   ```

2. **Start the services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the interfaces:**
   - Grafana: http://localhost:3000 (admin/admin)
   - Prometheus: http://localhost:9090
   - AlertManager: http://localhost:9093

4. **Import security dashboards** and start monitoring!

##  Installation

### Docker Compose Deployment (Recommended)

1. **Environment Setup:**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit configuration variables
   nano .env
   ```

2. **Service Configuration:**
   ```bash
   # Review and customize docker-compose.yml
   nano docker-compose.yml
   ```

3. **Deploy Stack:**
   ```bash
   # Pull latest images
   docker-compose pull
   
   # Start services in detached mode
   docker-compose up -d
   
   # Verify deployment
   docker-compose ps
   ```

### Kubernetes Deployment

1. **Prepare namespace:**
   ```bash
   kubectl create namespace monitoring
   ```

2. **Deploy using Helm:**
   ```bash
   helm repo add grafana https://grafana.github.io/helm-charts
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo update
   
   # Deploy Prometheus
   helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring
   
   # Deploy Loki
   helm install loki grafana/loki-stack -n monitoring
   ```

3. **Apply custom configurations:**
   ```bash
   kubectl apply -f k8s/
   ```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GRAFANA_ADMIN_PASSWORD` | Grafana admin password | admin |
| `PROMETHEUS_RETENTION` | Metrics retention period | 15d |
| `LOKI_RETENTION_PERIOD` | Log retention period | 168h |
| `ALERT_MANAGER_SLACK_URL` | Slack webhook URL | - |
| `EXTERNAL_URL` | External URL for services | localhost |

### Grafana Configuration

1. **Data Sources:**
   - Prometheus: http://prometheus:9090
   - Loki: http://loki:3100
   - AlertManager: http://alertmanager:9093

2. **Dashboard Import:**
   ```bash
   # Import pre-built dashboards
   curl -X POST \
     http://admin:admin@localhost:3000/api/dashboards/db \
     -H 'Content-Type: application/json' \
     -d @dashboards/security-overview.json
   ```

### Prometheus Configuration

Key configuration files:
- `prometheus/prometheus.yml` - Main configuration
- `prometheus/rules/` - Alerting rules
- `prometheus/targets/` - Service discovery

### Loki Configuration

Key settings in `loki/local-config.yaml`:
- Storage configuration
- Retention policies
- Ingester settings
- Query limits

##  Usage

### Accessing Services

1. **Grafana Dashboard:**
   - URL: http://localhost:3000
   - Default credentials: admin/admin
   - First login will prompt for password change

2. **Prometheus Metrics:**
   - URL: http://localhost:9090
   - Use PromQL for custom queries
   - Explore targets and rules

3. **Loki Logs:**
   - Access via Grafana's Explore feature
   - Use LogQL for log queries
   - Real-time log streaming

### Basic Queries

**Prometheus (Metrics):**
```promql
# CPU usage by instance
100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory usage
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# HTTP request rate
rate(http_requests_total[5m])
```

**Loki (Logs):**
```logql
# Error logs from all services
{job="app"} |= "error"

# Failed login attempts
{job="auth"} |= "failed" |= "login"

# HTTP 5xx errors
{job="nginx"} | json | status >= 500
```

##  Security Dashboards

### Pre-built Dashboards

1. **Security Overview**
   - Failed authentication attempts
   - Suspicious network activity
   - System resource anomalies
   - Recent security events timeline

2. **Network Security**
   - Traffic patterns and anomalies
   - Port scan detection
   - Geographical access patterns
   - Blocked connections

3. **System Security**
   - File integrity monitoring
   - Process monitoring
   - User activity tracking
   - System configuration changes

4. **Application Security**
   - Application error rates
   - SQL injection attempts
   - XSS attack detection
   - API abuse monitoring

### Custom Dashboard Creation

```json
{
  "dashboard": {
    "title": "Custom Security Dashboard",
    "panels": [
      {
        "title": "Failed Logins",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(increase(failed_login_attempts[5m]))"
          }
        ]
      }
    ]
  }
}
```

##  Alerting

### Alert Rules Configuration

**Prometheus Alert Rules:**
```yaml
groups:
  - name: security.rules
    rules:
    - alert: HighFailedLoginRate
      expr: rate(failed_login_attempts[5m]) > 10
      for: 2m
      labels:
        severity: warning
      annotations:
        summary: "High failed login rate detected"
        
    - alert: SuspiciousNetworkActivity
      expr: rate(network_connections[5m]) > 1000
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "Suspicious network activity detected"
```

### Notification Channels

1. **Slack Integration:**
   ```yaml
   receivers:
   - name: 'slack-alerts'
     slack_configs:
     - api_url: 'YOUR_SLACK_WEBHOOK_URL'
       channel: '#security-alerts'
       title: 'Security Alert'
   ```

2. **Email Alerts:**
   ```yaml
   receivers:
   - name: 'email-alerts'
     email_configs:
     - to: 'security-team@company.com'
       subject: 'Security Alert: {{ .GroupLabels.alertname }}'
   ```

3. **PagerDuty Integration:**
   ```yaml
   receivers:
   - name: 'pagerduty'
     pagerduty_configs:
     - service_key: 'YOUR_PAGERDUTY_SERVICE_KEY'
   ```

### Alert Routing

```yaml
route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'
  routes:
  - match:
      severity: critical
    receiver: pagerduty
  - match:
      severity: warning
    receiver: slack-alerts
```

##  Troubleshooting

### Common Issues

1. **Services Won't Start:**
   ```bash
   # Check logs
   docker-compose logs -f [service-name]
   
   # Verify ports are available
   netstat -tlnp | grep -E ':(3000|9090|3100|9093)'
   
   # Check disk space
   df -h
   ```

2. **No Data in Grafana:**
   ```bash
   # Verify data sources
   curl http://localhost:9090/api/v1/targets
   curl http://localhost:3100/ready
   
   # Check Promtail logs
   docker-compose logs promtail
   ```

3. **High Memory Usage:**
   ```bash
   # Monitor resource usage
   docker stats
   
   # Adjust retention settings
   # Edit prometheus.yml and loki-config.yaml
   ```

### Performance Optimization

1. **Prometheus Optimization:**
   - Adjust scrape intervals
   - Optimize query performance
   - Configure proper retention

2. **Loki Optimization:**
   - Tune chunk size and flush intervals
   - Configure proper log levels
   - Implement log rotation

3. **Grafana Optimization:**
   - Limit dashboard refresh rates
   - Optimize panel queries
   - Configure caching

### Log Analysis

```bash
# Monitor service health
docker-compose logs -f --tail=100

# Check specific service
docker-compose logs grafana

# Monitor resource usage
docker exec -it monitoring_prometheus_1 df -h
```

##  Monitoring Best Practices

### Log Management
- Implement structured logging
- Use consistent log formats
- Configure appropriate log levels
- Implement log rotation and archival

### Metrics Collection
- Define meaningful SLIs and SLOs
- Implement proper labeling strategy
- Avoid high-cardinality metrics
- Regular performance reviews

### Security Monitoring
- Implement real-time alerting
- Regular security reviews
- Incident response procedures
- Compliance reporting automation

##  Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Submit a Pull Request**

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Grafana-Prometheus-and-Loki_SIEM_Deployment.git

# Install development dependencies
make dev-setup

# Run tests
make test

# Start development environment
make dev-up
```

### Code Standards
- Follow existing code formatting
- Include appropriate documentation
- Add tests for new features
- Update README for significant changes

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Support

- **Documentation**: [Wiki](../../wiki)
- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)
- **Email**: support@yourorganization.com

##  Acknowledgments

- [Grafana Labs](https://grafana.com/) for the amazing monitoring tools
- [Prometheus Community](https://prometheus.io/community/) for the metrics ecosystem
- All contributors who help improve this project

##  Additional Resources

- [Grafana Documentation](https://grafana.com/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Loki Documentation](https://grafana.com/docs/loki/)
- [SIEM Best Practices Guide](https://example.com/siem-guide)
- [Security Monitoring Playbook](https://example.com/security-playbook)

---

**⚠️ Security Notice**: This SIEM deployment contains security-sensitive configurations. Ensure proper access controls, use strong passwords, and regularly update all components. Never expose these services to the public internet without proper security measures.
