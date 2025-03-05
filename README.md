# Event Booking App - React Native (Frontend Only)

This is a **frontend-only** React Native application for booking events. It includes features like event browsing, seat selection, and a simulated payment process. The app uses **Razorpay** for payment integration and **Cloudinary** for asset management. No backend is included; all data is hardcoded or mocked.

---

## Features

### 1. **Login Screen**

### 2. **Initial Screen**
   - **Bottom Tabs**: Easy navigation between:
     - **Home**: Discover featured events.
     - **Booking**: View and manage bookings.
     - **Search**: Search for events by name or category.
     - **Wishlist**: Save events for later.
     - **Account**: Mock user profile and settings.
   - **Location Bottom Drawer**: Filter events by location (mock data).

### 3. **Events**
   - **Events Page**: Displays a list of events with details like name, date, and location (hardcoded data).
   - **Event Details Page**: Includes:
     - **About**: Detailed description of the event.
     - **Crew**: Information about performers, organizers, etc.

### 4. **Seat Selection & Payment**
   - **Select Seats**: Users can choose seats based on availability and pricing (Silver, Gold, Platinum).
   - **Simulated Payment Integration**: Uses **Razorpay** for a mock payment process.

### 5. **Asset Management**
   - **Cloudinary**: All assets (images, videos) are hosted on Cloudinary and fetched via URLs.

### 6. **Notifications**
   - Mock notifications for booking confirmations and event reminders.

---

## Technologies Used

- **React Native**: For building the cross-platform mobile app.
- **React Navigation**: For handling navigation (bottom tabs, drawers, stacks).
- **Razorpay**: For mock payment integration.
- **Cloudinary**: For hosting and managing assets.
- **State Management**: React's built-in `useState` and `useContext` for state management.
- **Hardcoded Data**: Mock data for events, bookings, and user profiles.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/naveen42266/happening
   cd happening
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   RAZORPAY_KEY=your_razorpay_key
   ```

4. **Run the App**:
   - For Android:
     ```bash
     npx react-native run-android
     ```
   - For iOS:
     ```bash
     npx react-native run-ios
     ```

---

## Folder Structure

```
event-booking-app/
├── assets/               # Static assets (images, icons, etc.)
├── components/           # Reusable components (e.g., FooterButton, Snackbar)
├── AppNavigator.tsx      # Navigation setup 
├── pages/                # Main app screens (e.g., Home, Events, Event Details)
├── data/                 # Hardcoded/mock data (e.g., events, bookings)
├── styles/               # Global styles and themes
├── types/                # TypeScript types and interfaces
├── App.tsx               # Main app component
├── index.js              # Entry point
└── README.md             # Project documentation
```

---

## Screenshots & Screen Recordings


Drive Link - https://drive.google.com/drive/u/0/folders/1X3mOPQtXthXaIjhkfuUN_nca8rrOrz9_


---

## Key Code Snippets

### 1. **Mock Event Data**
```typescript
// data/events.ts
export const events = [
  {
    id: "1",
    name: "Concert Night",
    date: "2023-12-25",
    location: "New York",
    image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1631234567/concert.jpg",
    about: "Join us for an unforgettable night of music and fun!",
    crew: ["Artist 1", "Artist 2"],
  },
  // Add more events...
];
```

### 2. **Razorpay Mock Payment**
```typescript
const razorPay = () => {
  const options = {
    description: 'Event Booking Payment',
    currency: 'INR',
    key: process.env.RAZORPAY_KEY,
    amount: totalPrice * 100,
    name: 'Event Booking App',
    prefill: {
      email: 'user@example.com',
      contact: '9191919191',
      name: 'User Name',
    },
    theme: { color: '#7E2CCF' },
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      Alert.alert('Success', 'Payment successful!');
    })
    .catch((error) => {
      if (error.code === 'Payment Cancelled') {
        Alert.alert('Error', 'Payment was cancelled by the user.');
      } else {
        Alert.alert('Error', `Payment failed: ${error.description}`);
      }
    });
};
```

### 3. **Bottom Tabs**

I thing bottom navigation is not needed here. 
I have handled in ternary operator

```typescript

                {
                    tab === "Home" ?
                        <HomeComponent navigation={(value: any, params) => { navigation.navigate(value, params) }} />
                        :
                        tab === "Booking" ? <BookingComponent />
                            :
                            tab === "Search" ? <SearchComponent />
                                :
                                tab === "Wishlist" ? <WishlistComponent />
                                    :
                                    tab === "Account" ? <AccountComponent navigatation={(value: string) => { navigateTo(value); }} logout={() => { handleLogout() }} /> : null
                }

```

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or feedback, please reach out:

- **Email**: vnaveenlgp2001@gmail.com
- **GitHub**: [naveen42266](https://github.com/naveen42266)

---

Enjoy building and using the Event Booking App! 🚀