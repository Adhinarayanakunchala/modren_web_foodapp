# 🥗 FreshStore - Modern Food Store Application

A modern, responsive food store web application built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components. Features beautiful animations, comprehensive product management, and a scalable architecture.

## ✨ Features

- **Modern Design**: Clean, professional UI with smooth animations using Framer Motion
- **Responsive Layout**: Fully responsive design that works on all devices
- **Product Management**: Comprehensive product catalog with categories, search, and filtering
- **Type Safety**: Built with TypeScript for enhanced development experience
- **Performance**: Optimized for fast loading and smooth interactions
- **Accessibility**: Built with accessibility best practices
- **Scalable Architecture**: Well-organized code structure for easy maintenance

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Development**: ESLint for code quality

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foodstore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
foodstore/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── products/           # Products pages
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Hero section
│   │   └── ProductCard.tsx     # Product card component
│   ├── data/                   # Mock data and constants
│   │   └── products.ts         # Product and category data
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Common utilities
│   └── types/                  # TypeScript type definitions
│       └── index.ts            # Application types
├── public/                     # Static assets
├── package.json                # Project configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Green (#22c55e) - Fresh and natural
- **Secondary**: Blue accents for highlights
- **Neutral**: Gray shades for text and backgrounds
- **Error**: Red for alerts and errors

### Typography
- **Font**: Inter - Clean, modern, and highly readable
- **Hierarchy**: Clear heading sizes and weights
- **Spacing**: Consistent spacing throughout

### Animations
- **Page Transitions**: Smooth fade-in effects
- **Hover Effects**: Subtle hover animations
- **Loading States**: Skeleton loaders for better UX
- **Micro-interactions**: Button clicks and form interactions

## 🔧 Key Components

### ProductCard
- Displays product information with image, price, and rating
- Interactive hover effects
- Add to cart functionality
- Responsive design

### Header
- Navigation with search functionality
- Shopping cart indicator
- Mobile-responsive menu
- Sticky positioning

### Hero Section
- Eye-catching banner with call-to-action
- Animated statistics
- Gradient background with patterns

## 📱 Responsive Design

The application is fully responsive and tested on:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🎯 Performance Optimizations

- **Next.js Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: Efficient caching strategies
- **Bundle Analysis**: Optimized bundle sizes

## 🔒 Type Safety

Full TypeScript implementation with:
- Interface definitions for all data structures
- Type-safe API calls
- Component prop validation
- Enum definitions for constants

## 🧪 Testing

Run the linter to check code quality:
```bash
npm run lint
```

Build the application for production:
```bash
npm run build
```

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** containers

### Environment Variables
Create a `.env.local` file for environment-specific configurations:
```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first styling
- **shadcn/ui** for the beautiful component library
- **Framer Motion** for smooth animations
- **Lucide** for the icon library

---

Built with ❤️ by the FreshStore team
