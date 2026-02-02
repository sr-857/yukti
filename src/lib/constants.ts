export interface House {
  id: string;
  address: string;
  lat: number;
  lng: number;
  wastePattern: string;
  status: 'pending' | 'picked';
  type: string[];
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
}

export const HOUSES: House[] = [
  { id: 'G-101', address: 'Bhetapara Main Rd', lat: 26.1264, lng: 91.7915, wastePattern: 'High Wet', status: 'pending', type: ['Wet'], timeSlot: 'Morning' },
  { id: 'G-102', address: 'Beltola Market', lat: 26.1215, lng: 91.7950, wastePattern: 'Mix', status: 'pending', type: ['Wet', 'Dry'], timeSlot: 'Morning' },
  { id: 'G-103', address: 'Hatigaon Rd', lat: 26.1305, lng: 91.7890, wastePattern: 'Dry Only', status: 'pending', type: ['Dry'], timeSlot: 'Afternoon' },
  { id: 'G-104', address: 'Basistha Mandir Rd', lat: 26.1150, lng: 91.7850, wastePattern: 'E-Waste', status: 'pending', type: ['E-Waste', 'Wet'], timeSlot: 'Evening' },
  { id: 'G-105', address: 'Survey Bus Stop', lat: 26.1280, lng: 91.7980, wastePattern: 'Wet Only', status: 'pending', type: ['Wet'], timeSlot: 'Morning' },
  { id: 'G-106', address: 'Six Mile Flyover', lat: 26.1350, lng: 91.8050, wastePattern: 'Mix', status: 'pending', type: ['Wet', 'Dry'], timeSlot: 'Afternoon' },
];

export const REWARDS = [
  { id: 1, title: '10% Grocery Discount', points: 20, icon: '🛒', merchant: 'Big Bazaar' },
  { id: 2, title: 'Free Compost Bag', points: 50, icon: '🌱', merchant: 'GMC' },
  { id: 3, title: 'Municipal Tax Rebate', points: 100, icon: '🏛️', merchant: 'Guwahati Govt' },
];
