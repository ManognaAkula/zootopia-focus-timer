import { useState, useEffect, useCallback, useRef } from 'react';

export type NotificationSound = 'chime' | 'bell' | 'gentle' | 'none';

export interface SoundSettings {
  notificationSound: NotificationSound;
  notificationVolume: number;
  ambientEnabled: boolean;
  ambientVolume: number;
}

const STORAGE_KEY = 'zoodoro-sound-settings';

const DEFAULT_SETTINGS: SoundSettings = {
  notificationSound: 'chime',
  notificationVolume: 0.5,
  ambientEnabled: false,
  ambientVolume: 0.3,
};

// Base64 encoded short sounds
const SOUNDS: Record<NotificationSound, string> = {
  chime: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleVFIU6S8rH9nWGZ2k6msi25maHWMo6qjjn1ze4qaoaGUhoGEjZWVnJuSjY2PkJOVlZOSkJCQkJGSkZKRkJCRkJGRkZGQkJGQkJCRkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Oj4+Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKioqKioqKioqKioqKioqKioqKioqKioqKioqKiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWEhISEhISEhISEhISEhISEhISEhISEhISEhISEg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAf39/f39/f39/f39/f39/f39/f39/f39/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn59fX19fX19fX19fX19fX19fX19fX19fX19fX19fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHt7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7enp6enp6enp6enp6enp6enp6enp6enp6enp6enl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzcnJycnJycnJycnJycnJycnJycnJycnJycnJycnFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBvb29vb29vb29vb29vb29vb29vb29vb29vb29ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1sbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsa2tra2tra2tra2tra2tra2tra2tra2tra2tra2traWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWA=',
  bell: 'data:audio/wav;base64,UklGRl9vT19teleVFIU6S8rH9nWGZ2k6msi25maHWMo6qjjn1ze4qaoaGUhoGEjZWVnJuSjY2PkJOVlZOSkJCQkJGSkZKRkJCRkJGRkZGQkJGQkJCRkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Oj4+Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKioqKioqKioqKioqKioqKioqKioqKioqKioqKiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIg=',
  gentle: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
  none: '',
};

// Ambient sound URLs (using free ambient sounds)
const AMBIENT_URL = 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3';

export const useSoundSettings = () => {
  const [settings, setSettings] = useState<SoundSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });

  const notificationAudioRef = useRef<HTMLAudioElement | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Initialize notification audio
  useEffect(() => {
    if (settings.notificationSound !== 'none') {
      notificationAudioRef.current = new Audio(SOUNDS[settings.notificationSound]);
      notificationAudioRef.current.volume = settings.notificationVolume;
    }
  }, [settings.notificationSound, settings.notificationVolume]);

  // Initialize ambient audio
  useEffect(() => {
    if (!ambientAudioRef.current) {
      ambientAudioRef.current = new Audio(AMBIENT_URL);
      ambientAudioRef.current.loop = true;
    }
    ambientAudioRef.current.volume = settings.ambientVolume;
  }, [settings.ambientVolume]);

  const playNotification = useCallback(() => {
    if (settings.notificationSound !== 'none' && notificationAudioRef.current) {
      notificationAudioRef.current.currentTime = 0;
      notificationAudioRef.current.play().catch(() => {});
    }
  }, [settings.notificationSound]);

  const toggleAmbient = useCallback((enabled: boolean) => {
    setSettings(prev => ({ ...prev, ambientEnabled: enabled }));
    if (ambientAudioRef.current) {
      if (enabled) {
        ambientAudioRef.current.play().catch(() => {});
      } else {
        ambientAudioRef.current.pause();
      }
    }
  }, []);

  const updateSettings = useCallback((newSettings: Partial<SoundSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }
    };
  }, []);

  return {
    settings,
    playNotification,
    toggleAmbient,
    updateSettings,
  };
};
