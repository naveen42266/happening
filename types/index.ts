// types.ts
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Events: { categoryId: string }; // Add categoryId as a parameter
  EventDetails: { eventId: string }; // Add eventId as a parameter
  SelectSeats: undefined;
  Settings: undefined;
  EditProfile: undefined;
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
  Notification: undefined;
  OrderConfirmation: undefined
};