export interface EventDetail {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  description: string;
  iconName: string;
  image: string;
  accentColor?: string;
}

export interface StoryChapter {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  aspect: 'portrait' | 'landscape' | 'square';
  src: string;
  caption: string;
}

export interface NearbyPoint {
  title: string;
  distance: string;
  category: string;
}

export interface WeddingConfig {
  couple: {
    groom: {
      name: string;
      fullName: string;
      title: string;
      photo: string;
      bio: string;
      father: string;
      mother: string;
    };
    bride: {
      name: string;
      fullName: string;
      title: string;
      photo: string;
      bio: string;
      father: string;
      mother: string;
    };
    hashtag: string;
    initials: string;
    quote: string;
  };
  weddingDate: {
    iso: string;
    displayDate: string;
    dayOfWeek: string;
    timeDisplay: string;
    city: string;
    country: string;
  };
  invitationNote: {
    intro: string;
    familyGreeting: string;
    message: string;
    shlokaSanskrit: string;
    shlokaTranslation: string;
  };
  venue: {
    name: string;
    tagline: string;
    address: string;
    cityStateZip: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    nearby: NearbyPoint[];
    image: string;
  };
  events: EventDetail[];
  story: StoryChapter[];
  gallery: GalleryPhoto[];
  audio: {
    src: string;
    title: string;
    artist: string;
  };
}
