# Blogsphere Management Webapp

A comprehensive Angular-based management interface for the Blogsphere platform, providing administrators with tools to manage API products, subscriptions, clusters, and routing configurations.

## 🚀 Features

### Dashboard

- **Overview Analytics**: Central monitoring and analytics dashboard
- **System Health**: Real-time status monitoring of platform components
- **Quick Actions**: Access to frequently used management tasks

### API Product & Subscription Management

- **API Product Creation**: Create and manage API products with detailed descriptions
- **Subscription Management**: Handle user subscriptions to API products
- **Subscribed API Management**: Manage APIs that are subscribed to specific products
- **Pagination Support**: Efficient browsing through large datasets
- **Real-time Updates**: Live data updates using NgRx state management

### API Cluster Management

- **Cluster Overview**: Monitor and manage API server clusters
- **Performance Monitoring**: Track cluster health and performance metrics
- **Configuration Management**: Manage cluster configurations and settings

### API Routes Management

- **Route Configuration**: Define and manage API routing rules
- **Path Management**: Configure API endpoints and their routing behavior
- **Traffic Control**: Manage request routing and load balancing

### Authentication & Security

- **OAuth/OIDC Integration**: Secure authentication using `angular-auth-oidc-client`
- **Token Management**: Automatic token refresh and session management
- **Protected Routes**: Role-based access control for different features
- **Security Interceptors**: Automatic request authentication

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 13.x
- **UI Components**: Angular Material 13.x
- **State Management**: NgRx (Store, Effects, DevTools)
- **Authentication**: angular-auth-oidc-client
- **Styling**: SCSS with custom design system
- **Date Handling**: Moment.js
- **Breadcrumbs**: xng-breadcrumb
- **Animations**: Angular Animations with custom transitions

## 📁 Project Architecture

```
src/
├── app/
│   ├── core/                    # Core services, guards, models
│   │   ├── auth/               # Authentication services
│   │   ├── guards/             # Route guards
│   │   ├── model/              # Data models and interfaces
│   │   ├── services/           # API services
│   │   └── validators/         # Form validators
│   ├── features/               # Feature modules
│   │   ├── dashboard/          # Main dashboard
│   │   ├── api-cluster/        # Cluster management
│   │   ├── api-routes/         # Route management
│   │   └── subscription/       # Subscription management
│   ├── shared/                 # Shared components, pipes
│   │   ├── components/         # Reusable UI components
│   │   └── pipes/             # Custom pipes
│   ├── state/                  # NgRx state management
│   └── store/                  # Application state configuration
├── assets/                     # Static assets, styles, fonts
└── environments/               # Environment configurations
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn package manager
- Angular CLI 13.x

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Blogsphere.management.Webapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   - Update `src/environments/environment.ts` for development
   - Update `src/environments/environment.prod.ts` for production
   - Configure OAuth/OIDC settings in the app module

4. **Start development server**
   ```bash
   npm start
   # or
   ng serve
   ```
   Navigate to `http://localhost:4200/`

### Environment Configuration

Configure the following in your environment files:

```typescript
export const environment = {
  production: false,
  apiUrl: 'your-api-base-url',
  authConfig: {
    authority: 'your-oauth-authority',
    clientId: 'your-client-id',
    // other OIDC configuration
  },
};
```

## 🔧 Available Scripts

- **Development**: `npm start` or `ng serve`
- **Build**: `npm run build` or `ng build`
- **Test**: `npm test` or `ng test`
- **Watch Build**: `npm run watch` or `ng build --watch --configuration development`
- **Lint**: Check code quality and style

## 🏗️ Build & Deployment

### Development Build

```bash
ng build --configuration development
```

### Production Build

```bash
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

### Unit Tests

```bash
ng test
```

Executes unit tests via [Karma](https://karma-runner.github.io) and Jasmine.

### Code Coverage

```bash
ng test --code-coverage
```

## 📱 Responsive Design

The application features a fully responsive design with:

- **Mobile-first approach**: Optimized for mobile devices
- **Adaptive layouts**: Automatic layout adjustments for different screen sizes
- **Touch-friendly UI**: Optimized for touch interactions
- **Progressive disclosure**: Information hierarchy based on screen real estate

## 🎨 Design System

- **Custom SCSS architecture**: Modular styling with design tokens
- **Angular Material theming**: Consistent Material Design components
- **Custom typography**: Titillium Web font family integration
- **Animation system**: Smooth transitions and micro-interactions

## 🔐 Security Features

- **OAuth 2.0/OIDC**: Industry-standard authentication
- **JWT Token handling**: Secure token storage and refresh
- **Route protection**: Guard-based access control
- **HTTP interceptors**: Automatic request authentication
- **Error handling**: Comprehensive error management

## 🤝 Contributing

1. Follow Angular style guide and best practices
2. Use SCSS for all styling (no CSS files) [[memory:3740057]]
3. Maintain clean controller architecture with service layer delegation [[memory:3740065]]
4. Write unit tests for new features
5. Follow the established folder structure and naming conventions

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

## 🆘 Support

For support and questions:

- Check the Angular CLI documentation: `ng help`
- Visit [Angular CLI Overview and Command Reference](https://angular.io/cli)
- Review the project's issue tracker
