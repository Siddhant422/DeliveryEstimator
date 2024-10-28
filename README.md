# Delivery Estimation App

A React Native application for managing product delivery estimates across different logistics providers. The app handles 5000 products and 25000 pincodes, providing real-time delivery date estimates based on logistics provider rules and current time.

## 🌟 Live Demo

The application is hosted on Firebase and can be accessed at:
https://appdistribution.firebase.dev/i/dfe2eaeb955b3c69

## ✨ Features

- **Product Management**
  - Browse through 5000 products
  - Real-time stock availability checking
  - User-friendly product selection interface

- **Pincode System**
  - Support for 25000 pincodes
  - Automatic logistics provider assignment
  - Pincode validation

- **Delivery Estimation**
  - Three-tier delivery system:
    1. Provider A: Same-day delivery (Orders before 5 PM)
    2. Provider B: Same-day delivery (Orders before 9 AM)
    3. General Partners: 2-5 days delivery
  - Real-time countdown timer for same-day delivery
  - Dynamic delivery date calculation

## 🛠️ Technical Architecture

### Tech Stack
- React Native
- Firebase (Hosting)
- React Navigation for navigating between the screens

## Key Design Decisions

### Component Architecture
- Modular component-based approach for better code organization and reusability
- Reusable UI components for consistent design patterns
- Props validation and TypeScript interfaces for type safety

### UI/UX Design
- Clean and intuitive user interface
- Consistent styling across components
- Loading states and error handling with user-friendly messages
- Modern design elements with attention to accessibility

### Code Quality
- Well-documented code with clear comments explaining complex logic
- Consistent coding style following React Native best practices
- Proper error handling and edge case management
- Clean and maintainable code structure
- Meaningful variable and function naming conventions
- Efficient state management patterns

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- React Native development environment setup
- Android Studio/Xcode for emulators

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd delivery-estimation-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Run on Android/iOS
```bash
# For Android
npm run android
# For iOS
npm run ios
```

## 📱 Usage

1. Select a product from the catalogue
2. Enter your pincode
3. View estimated delivery date and countdown timer (if applicable)
4. Check stock availability and delivery provider details

## Testing the Application
### Accessing the Firebase App Distribution
1. **Download Link**
   - Access the app via Firebase App Distribution: **https://appdistribution.firebase.dev/i/dfe2eaeb955b3c69**
     
2. **Installation Steps**
   - Click on the Firebase App Distribution link
   - Sign in with your Google account if prompted
   - Accept the invitation to become a tester
   - Download the APK file for Android or TestFlight link for iOS
   - Install the application on your device
     
3. **Testing Account**
   - No special testing account is required
   - The app can be used immediately after installation
     
4. **Troubleshooting**
   - If you encounter installation issues:
        - Ensure you have enabled installation from unknown sources (Android)
        - Check if you have accepted the TestFlight invitation (iOS)
        - Clear browser cache and retry if the download link doesn't work
          
For any other issues, please contact siddhant.work76@gmail.com

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Assumptions

1. **Network Connectivity**
   - Stable internet connection is available
   - Basic error handling for network issues

2. **Business Rules**
   - Working hours: 9 AM to 5 PM
   - Business days: Monday to Friday
   - Holidays are not considered in delivery calculations

3. **Data Management**
   - Product data is relatively static
   - Pincode-provider mapping doesn't change frequently
   
## 📱 App Screenshots

### Featured Products Page
<p align="center">
    <img src="https://github.com/user-attachments/assets/66c7a10a-2c1c-4130-8f62-6c621fb77520" alt="Featured Products" height="400"/>
</p>

### Product Details Page
  
<p align = "center">
  <img src = "https://github.com/user-attachments/assets/02dcf634-d86e-4877-afdf-4beff38ec92e"  alt="Featured Products" height="400"/>
<p/>




## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Clinikally for providing the coding challenge
- React Native community for excellent documentation
- Firebase team for hosting solutions
