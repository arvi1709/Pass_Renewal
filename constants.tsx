
import React from 'react';
import { 
  Heart, 
  User, 
  Users, 
  Sparkles, 
  GraduationCap, 
  UserPlus, 
  Smile, 
  Coffee 
} from 'lucide-react';
import { BondCategory, Mood } from './types';

export const CATEGORIES: { label: BondCategory; icon: React.ReactNode; color: string }[] = [
  { label: 'Friend', icon: <User className="w-6 h-6" />, color: 'bg-yellow-100 text-yellow-600' },
  { label: 'Best Friend', icon: <Sparkles className="w-6 h-6" />, color: 'bg-pink-100 text-pink-600' },
  { label: 'Love', icon: <Heart className="w-6 h-6" />, color: 'bg-red-100 text-red-600' },
  { label: 'Classmate', icon: <Users className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
  { label: 'Bestie', icon: <Smile className="w-6 h-6" />, color: 'bg-orange-100 text-orange-600' },
  { label: 'College Buddy', icon: <GraduationCap className="w-6 h-6" />, color: 'bg-green-100 text-green-600' },
  { label: 'Custom', icon: <UserPlus className="w-6 h-6" />, color: 'bg-gray-100 text-gray-600' },
];

export const MOODS: { label: Mood; emoji: string }[] = [
  { label: 'Cute', emoji: '🥰' },
  { label: 'Funny', emoji: '😂' },
  { label: 'Emotional', emoji: '🥹' },
  { label: 'Romantic', emoji: '❤️' },
];

export const DURATIONS = ['1 Year', '3 Years', 'Forever'];

export const LOVELY_QUOTES = [
  "2026 is looking brighter with you by my side. ✨",
  "A friend is someone who knows all about you and still loves you.",
  "True friendship comes when the silence between two people is comfortable.",
  "New year, same bond, better memories. 🥂",
  "Friendship is the only cement that will ever hold the world together.",
  "A single rose can be my garden... a single friend, my world.",
  "Life was meant for good friends and great adventures.",
];
