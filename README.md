# 🔥 Forge Finance

> **Enterprise-grade FinTech platform forging the future of finance by combining microservices architecture with blockchain technology for traditional and decentralized financial services.**

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8+-363636?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

</div>

---

## 🎯 Overview

**Forge Finance** is a comprehensive FinTech solution that bridges traditional banking services with Web3 blockchain technology. Built with a microservices architecture, this platform enables seamless financial transactions, cryptocurrency management, and decentralized payment processing through smart contracts.

### 💡 What Makes This Special

This isn't just another crypto dashboard—it's a **production-ready financial ecosystem** that demonstrates:

- ✅ **Enterprise Architecture**: Microservices-based design with FastAPI
- ✅ **Blockchain Integration**: Ethereum smart contracts with Solidity
- ✅ **DevOps Excellence**: Complete CI/CD pipeline with AWS deployment
- ✅ **Modern Frontend**: Next.js with TypeScript and Tailwind CSS
- ✅ **Security First**: OAuth2, JWT, and MetaMask integration
- ✅ **Real-time Analytics**: Interactive dashboards with live transaction monitoring

---

## 🧠 Why This Project Exists

### Business Problem

Traditional financial systems and blockchain solutions operate in silos. Users need to switch between platforms for:
- 💵 Fiat currency transactions
- 💰 Cryptocurrency management
- 📝 Smart contract interactions
- 📊 Financial analytics

### Our Solution

A **unified platform** that provides:
- **Single dashboard** for all financial operations
- **Automated payments** through smart contracts
- **Real-time monitoring** of both traditional and blockchain transactions
- **Seamless wallet integration** via MetaMask
- **Enterprise-grade security** with OAuth2/JWT

### Target Audience

- 🏦 Financial institutions exploring blockchain integration
- 🚀 FinTech startups building hybrid payment solutions
- 🏢 Enterprise clients requiring secure transaction management
- 👨‍💻 Developers learning Web3 and microservices architecture

---

## ✨ Key Features

### 🏦 Traditional FinTech Core

**Transaction Management**
- Payment processing and transfers
- Wire transfers between accounts
- Transaction history and tracking
- Multi-currency support

**Account Management**
- User authentication and authorization
- Role-based access control (RBAC)
- Profile and settings management
- KYC/AML compliance ready

**Financial Analytics**
- Real-time balance tracking
- Spending behavior analysis
- Cash flow visualization
- Custom financial reports

### ⛓️ Blockchain & Web3

**Smart Contract Integration**
- Automated payment execution
- Cryptocurrency staking mechanisms
- Token transfers and swaps
- Digital asset management

**MetaMask Wallet**
- Seamless wallet connection
- Transaction signing
- Multi-chain support preparation
- Gas fee estimation

**Blockchain Analytics**
- Real-time transaction monitoring
- Token movement tracking
- Smart contract interaction history
- On-chain data visualization

### 📊 Dashboard & Visualization

**Interactive UI**
- Modern, responsive design
- Dark mode optimized for FinTech
- Real-time data updates
- Mobile-first approach

**Data Visualization**
- Transaction volume charts
- Portfolio performance graphs
- Blockchain activity heatmaps
- Custom metric dashboards

### 🔧 DevOps & Infrastructure

**Microservices Architecture**
- Independent, scalable services
- REST API communication
- Event-driven with Kafka
- API Gateway orchestration

**Cloud Deployment**
- AWS EKS (Kubernetes orchestration)
- Docker containerization
- Terraform infrastructure as code
- Auto-scaling capabilities

**CI/CD Pipeline**
- Automated testing
- Continuous integration with Jenkins/GitLab CI
- Blue-green deployment
- Automated rollbacks

**Monitoring & Observability**
- Prometheus metrics collection
- Grafana dashboards
- AWS CloudWatch integration
- Distributed tracing

---

## 🏗️ Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  Next.js + TypeScript + Tailwind CSS + MetaMask Integration │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                     API Gateway (Kong/Nginx)                 │
│              OAuth2/JWT Authentication Layer                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼──────┐ ┌───▼────────┐ ┌─▼────────────┐
│ Transaction  │ │ Blockchain │ │    User      │
│   Service    │ │  Service   │ │  Management  │
│  (FastAPI)   │ │ (FastAPI)  │ │  (FastAPI)   │
└───────┬──────┘ └───┬────────┘ └─┬────────────┘
        │            │              │
        └────────────┼──────────────┘
                     │
        ┌────────────▼─────────────┐
        │    Message Broker        │
        │        (Kafka)           │
        └────────────┬─────────────┘
                     │
        ┌────────────┼─────────────┐
        │            │             │
┌───────▼──────┐ ┌──▼───────┐ ┌──▼──────────┐
│  PostgreSQL  │ │ Ethereum │ │   Redis     │
│     (RDS)    │ │ Blockchain│ │   Cache     │
└──────────────┘ └──────────┘ └─────────────┘
```

### Microservices Breakdown

#### 1. **Transaction Service**
- Handles traditional payment operations
- Manages transfers, payments, and wire transactions
- Validates and processes financial transactions
- Communicates with banking APIs

#### 2. **Blockchain Service**
- Interacts with Ethereum blockchain via Web3.py
- Deploys and manages smart contracts
- Processes cryptocurrency transactions
- Monitors on-chain events

#### 3. **User Management Service**
- Authentication and authorization
- User profile management
- Wallet connection and management
- Role-based permissions

#### 4. **Analytics Service**
- Aggregates transaction data
- Generates financial reports
- Machine learning for fraud detection
- Predictive analytics

### Frontend Architecture

```
src/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard routes
│   └── api/               # API routes
├── components/
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── charts/            # Data visualization components
│   ├── wallet/            # Web3 wallet components
│   └── layout/            # Layout components
├── lib/
│   ├── api/               # API client functions
│   ├── web3/              # Web3 utilities
│   └── utils/             # Helper functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
└── styles/                # Global styles
```

---

## 🛠️ Tech Stack

### Frontend
<div align="left">
  
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-181717?style=for-the-badge&logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

</div>

**Key Technologies:**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context + Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts + Chart.js
- **Animations**: Framer Motion

---

### Backend (Microservices)
<div align="left">

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=python&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

</div>

**Key Technologies:**
- **Framework**: FastAPI (Python 3.11+)
- **ORM**: SQLAlchemy
- **Database**: PostgreSQL (AWS RDS)
- **Cache**: Redis
- **Message Broker**: Apache Kafka
- **API Gateway**: Kong / Nginx

---

### Blockchain
<div align="left">

![Solidity](https://img.shields.io/badge/Solidity-0.8+-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)
![Web3.js](https://img.shields.io/badge/Web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-FFF100?style=for-the-badge&logo=hardhat&logoColor=black)
![MetaMask](https://img.shields.io/badge/MetaMask-F6851B?style=for-the-badge&logo=metamask&logoColor=white)
![Ethers.js](https://img.shields.io/badge/Ethers.js-2535A0?style=for-the-badge&logo=ethereum&logoColor=white)

</div>

**Key Technologies:**
- **Smart Contracts**: Solidity 0.8+
- **Web3 Library**: Web3.py / Ethers.js
- **Blockchain**: Ethereum (Mainnet/Testnets)
- **Wallet Integration**: MetaMask
- **Development**: Hardhat / Truffle

---

### DevOps & Infrastructure
<div align="left">

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![GitLab CI](https://img.shields.io/badge/GitLab_CI-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)

</div>

**Key Technologies:**
- **Containerization**: Docker
- **Orchestration**: Kubernetes (AWS EKS)
- **IaC**: Terraform
- **CI/CD**: Jenkins / GitLab CI
- **Cloud Provider**: AWS (EC2, RDS, S3, EKS, CloudWatch)
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

---

### Data Analysis
<div align="left">

![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)
![Apache Spark](https://img.shields.io/badge/Apache_Spark-E25A1C?style=for-the-badge&logo=apache-spark&logoColor=white)

</div>

**Key Technologies:**
- **Libraries**: pandas, numpy
- **Visualization**: Matplotlib, Seaborn, Plotly
- **Processing**: Apache Spark (for large datasets)

---

### Security
<div align="left">

![OAuth2](https://img.shields.io/badge/OAuth2-EB5424?style=for-the-badge&logo=auth0&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![AWS IAM](https://img.shields.io/badge/AWS_IAM-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Let's Encrypt](https://img.shields.io/badge/Let's_Encrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)

</div>

**Key Technologies:**
- **Authentication**: OAuth2, JWT
- **API Security**: Rate limiting, CORS, API keys
- **Cloud Security**: AWS IAM, VPC, Security Groups
- **Secrets Management**: AWS Secrets Manager
- **Wallet Security**: MetaMask signature verification

---

## 📊 Technology Overview

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js, TypeScript, React, Tailwind CSS |
| **Backend** | FastAPI, Python, PostgreSQL, Redis, Kafka |
| **Blockchain** | Solidity, Ethereum, Web3.js, Hardhat, MetaMask |
| **DevOps** | Docker, Kubernetes, Terraform, AWS, Jenkins |
| **Monitoring** | Prometheus, Grafana, ELK Stack |
| **Security** | OAuth2, JWT, AWS IAM, TLS/SSL |

</div>

---

## 🌟 Why These Technologies?

### **Frontend: Next.js + TypeScript**
- ✅ Server-side rendering for better SEO and performance
- ✅ Type safety prevents runtime errors
- ✅ Built-in API routes reduce complexity
- ✅ Excellent developer experience

### **Backend: FastAPI Microservices**
- ✅ High performance (async Python)
- ✅ Automatic API documentation (Swagger/OpenAPI)
- ✅ Type hints for better code quality
- ✅ Easy to scale horizontally

### **Blockchain: Ethereum + Solidity**
- ✅ Most mature smart contract platform
- ✅ Large developer ecosystem
- ✅ MetaMask integration for 30M+ users
- ✅ EVM compatibility for future multi-chain support

### **DevOps: Kubernetes + AWS**
- ✅ Industry-standard container orchestration
- ✅ Auto-scaling and self-healing
- ✅ Multi-cloud portability
- ✅ Robust monitoring and logging

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.11+
- Docker and Docker Compose
- MetaMask browser extension
- AWS CLI (for deployment)
- Kubernetes CLI (kubectl)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/forge-finance.git
cd forge-finance
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Configure your environment variables
npm run dev
```

Frontend runs on: `http://localhost:3000`

#### 3. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure your database and API keys
uvicorn main:app --reload
```

Backend API runs on: `http://localhost:8000`

#### 4. Smart Contracts Setup

```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat test
# Deploy to testnet
npx hardhat run scripts/deploy.js --network sepolia
```

#### 5. Docker Compose (Full Stack)

```bash
docker-compose up -d
```

This will start:
- Frontend (Next.js)
- Backend services (FastAPI)
- PostgreSQL database
- Redis cache
- Kafka message broker

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_INFURA_ID=your_infura_id
```

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/fintech
REDIS_URL=redis://localhost:6379
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
JWT_SECRET=your_jwt_secret
AWS_REGION=us-east-1
```

---

## 📁 Project Structure

```
forge-finance/
├── frontend/                   # Next.js frontend application
│   ├── src/
│   │   ├── app/               # App router pages
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities and helpers
│   │   ├── hooks/             # Custom hooks
│   │   └── types/             # TypeScript types
│   ├── public/                # Static assets
│   └── package.json
│
├── backend/                    # FastAPI microservices
│   ├── services/
│   │   ├── transaction/       # Transaction service
│   │   ├── blockchain/        # Blockchain service
│   │   ├── user/              # User management service
│   │   └── analytics/         # Analytics service
│   ├── shared/                # Shared utilities
│   ├── tests/                 # Unit and integration tests
│   └── requirements.txt
│
├── blockchain/                 # Smart contracts
│   ├── contracts/             # Solidity contracts
│   ├── scripts/               # Deployment scripts
│   ├── test/                  # Contract tests
│   └── hardhat.config.js
│
├── infrastructure/             # Infrastructure as Code
│   ├── terraform/             # Terraform configurations
│   ├── kubernetes/            # K8s manifests
│   ├── docker/                # Dockerfiles
│   └── monitoring/            # Prometheus & Grafana
│
├── docs/                       # Documentation
│   ├── api/                   # API documentation
│   ├── architecture/          # Architecture diagrams
│   ├── deployment/            # Deployment guides
│   └── blockchain/            # Smart contract docs
│
├── .github/                    # GitHub workflows
│   └── workflows/             # CI/CD pipelines
│
└── docker-compose.yml          # Local development stack
```

---

## 🔒 Security & Best Practices

### Authentication & Authorization
- ✅ JWT-based authentication with refresh tokens
- ✅ OAuth2 integration for third-party login
- ✅ Role-based access control (RBAC)
- ✅ Multi-factor authentication (MFA) support

### API Security
- ✅ Rate limiting per endpoint
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ API versioning

### Data Protection
- ✅ Encrypted data at rest (AWS RDS encryption)
- ✅ TLS/SSL for data in transit
- ✅ PII data masking in logs
- ✅ GDPR compliance ready

### Blockchain Security
- ✅ Smart contract auditing
- ✅ Reentrancy protection
- ✅ Gas optimization
- ✅ Private key management (never stored)

### Infrastructure Security
- ✅ VPC isolation
- ✅ Security groups and NACLs
- ✅ Secrets management with AWS Secrets Manager
- ✅ Regular security updates

---

## 🧪 Testing

### Unit Tests
```bash
# Backend tests
cd backend
pytest tests/unit/

# Frontend tests
cd frontend
npm run test
```

### Integration Tests
```bash
# API integration tests
cd backend
pytest tests/integration/

# E2E tests
cd frontend
npm run test:e2e
```

### Smart Contract Tests
```bash
cd blockchain
npx hardhat test
npx hardhat coverage
```

---

## 📚 Documentation

- **[API Documentation](docs/api/README.md)** - Complete API reference with Swagger/OpenAPI
- **[Architecture Guide](docs/architecture/README.md)** - System design and architecture decisions
- **[Deployment Guide](docs/deployment/README.md)** - Step-by-step deployment instructions
- **[Smart Contracts](docs/blockchain/README.md)** - Contract documentation and security audits
- **[User Guide](docs/user-guide/README.md)** - End-user documentation

---

## 🚀 Deployment

### Local Development
```bash
docker-compose up -d
```

### AWS Deployment (Kubernetes)
```bash
# Configure AWS credentials
aws configure

# Deploy infrastructure
cd infrastructure/terraform
terraform init
terraform apply

# Deploy application
kubectl apply -f infrastructure/kubernetes/
```

### CI/CD Pipeline
The project uses GitHub Actions for automated deployments:
- **Push to `develop`**: Deploy to staging
- **Push to `main`**: Deploy to production
- Automated testing on all PRs

---

## 🎯 What This Project Demonstrates

### Technical Skills
- ✅ **Full-stack development** with modern frameworks
- ✅ **Microservices architecture** design and implementation
- ✅ **Blockchain development** with Solidity and Web3
- ✅ **DevOps practices** with CI/CD and infrastructure as code
- ✅ **Cloud deployment** on AWS with Kubernetes
- ✅ **Security best practices** across all layers

### Professional Competencies
- ✅ **System design thinking** for scalable applications
- ✅ **API design** following REST principles
- ✅ **Database design** and optimization
- ✅ **Testing strategies** (unit, integration, e2e)
- ✅ **Documentation** for technical and non-technical audiences
- ✅ **Agile methodology** and project management

### Domain Expertise
- ✅ **FinTech concepts** and financial workflows
- ✅ **Blockchain technology** and smart contracts
- ✅ **Data analytics** for financial insights
- ✅ **Security and compliance** in financial systems
- ✅ **Real-time systems** and event-driven architecture

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**CHAIMAE BOUASSAB**  
*Master's Student — IT Security & Big Data*

[![GitHub](https://img.shields.io/badge/GitHub-chaimaebouassab4--boop-181717?style=for-the-badge&logo=github)](https://github.com/chaimaebouassab4-boop)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yourprofile)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

---

## 🙏 Acknowledgments

- FastAPI community for excellent documentation
- Ethereum Foundation for blockchain resources
- shadcn/ui for beautiful UI components
- AWS for cloud infrastructure
- Open source contributors

---

## 📈 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/yourusername/forge-finance?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/forge-finance?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/forge-finance?style=social)

</div>

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

Made with ❤️ and ☕ by CHAIMAE BOUASSAB

</div>
