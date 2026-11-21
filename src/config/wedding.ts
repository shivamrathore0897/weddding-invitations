import type { WeddingConfig } from '../types/wedding';

/**
 * =========================================================================
 * WEDDING CONFIGURATION (CENTRALIZED DATA REPOSITORY)
 * =========================================================================
 * Images are organized by section:
 * - /assets/images/hero/
 * - /assets/images/story/
 * - /assets/images/events/
 * - /assets/images/venue/
 * - /assets/images/gallery/
 * 
 * Replace images in those folders with the same filename to update instantly.
 */
export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      name: "Shivam",
      fullName: "Shivam Rathore",
      title: "Groom",
      photo: "assets/images/story/groom.jpg",
      bio: "",
      father: "Mr. Sunil Rathore",
      mother: "Mrs. Shashi Rathore"
    },
    bride: {
      name: "Muskan",
      fullName: "Muskan Gupta",
      title: "Bride",
      photo: "assets/images/story/bride.jpg",
      bio: "",
      father: "Mr. Prashant Gupta",
      mother: "Mrs. Nisha Gupta"
    },
    hashtag: "#ShivamWedsMuskan",
    initials: "S & M",
    quote: "In the gentle rhythm of fate, two souls found their sanctuary in each other."
  },

  weddingDate: {
    iso: "2026-12-12T18:30:00+05:30",
    displayDate: "12 December 2026",
    dayOfWeek: "Saturday",
    timeDisplay: "06:30 PM Onwards",
    city: "Faridabad, Delhi NCR",
    country: "India"
  },

  invitationNote: {
    intro: "Together with their loving families",
    familyGreeting: "The Rathore & Gupta Families",
    message: "Cordially invite you to celebrate the holy union of love, laughter, and lifelong friendship as their children embark on their sacred journey together.",
    shlokaSanskrit: "मंगलम् भगवान विष्णुः, मंगलम् गरुडध्वजः। मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥",
    shlokaTranslation: "May the divine presence bless this sacred journey with auspicious joy, eternal harmony, and boundless light."
  },

  venue: {
    name: "Klyde Banqueting Suite",
    tagline: "A Luxurious Sanctuary of Elegance & Grand Celebrations",
    address: "14/7, NH-19, Parmeshwari Colony, Sector 31",
    cityStateZip: "Faridabad, Haryana — 121003, India",
    // Direct Google Maps location link provided by RIOT
    googleMapsDirectionsUrl: "https://maps.app.goo.gl/6aRMAMyPZx2QpvSH8",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Klyde+Banqueting+Suite+Faridabad&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: {
      lat: 28.4428525,
      lng: 77.3091045
    },
    nearby: [
      {
        title: "Sector 28 & 31 Metro Stations",
        distance: "1.2 km (approx. 4 mins)",
        category: "Metro Transit"
      },
      {
        title: "Crown Plaza & NH-19 Corridor",
        distance: "0.8 km (approx. 3 mins)",
        category: "City Access"
      },
      {
        title: "Radisson Blu & Premium Hotels",
        distance: "2.5 km (approx. 7 mins)",
        category: "Accommodations"
      }
    ],
    image: "assets/images/venue/venue-main.jpg"
  },

  events: [
    {
      id: "jagran",
      title: "Mata Ka Jagran",
      subtitle: "An Evening of Devotion & Blessings",
      date: "Tuesday, 8 December 2026",
      time: "10:00 PM Onwards",
      venue: "Rathore Niwas Residence",
      dressCode: "Traditional Attire",
      description: "Join us for an auspicious evening of devotion, soulful bhajans and divine blessings as we celebrate together.",
      iconName: "Sparkles",
      image: "assets/images/events/sangeet.jpg",
      accentColor: "#6c2c3e"
    },
    {
      id: "haldi",
      title: "Auspicious Haldi",
      subtitle: "Sunshine Blessings, Turmeric & Floral Rain",
      date: "Thursday, 10 December 2026",
      time: "11:00 AM Onwards",
      venue: "Rathore Niwas Residence",
      dressCode: "Sunshine Yellow, Ochre & Warm Ivory",
      description: "A joyful traditional morning bathed in marigolds, holy turmeric paste blessings, rose petal showers, and soulful Shehnai music.",
      iconName: "Sun",
      image: "assets/images/events/haldi.jpg",
      accentColor: "#b2781a"
    },
    {
      id: "mehendi",
      title: "Mehendi & Folk Afternoon",
      subtitle: "Henna, Folk Rhythms & High Tea",
      date: "Friday, 11 December 2026",
      time: "03:30 PM Onwards",
      venue: "Rathore Niwas Residence",
      dressCode: "Pastel Florals, Vibrant Kurtas & Chikankari",
      description: "An afternoon steeped in intricate henna artistry, folk acoustic melodies, artisanal savouries, and joyful laughter under scented marigolds.",
      iconName: "Palette",
      image: "assets/images/events/mehendi.jpg",
      accentColor: "#3d5a45"
    },
    {
      id: "ghurchari",
      title: "Ghurchadi",
      subtitle: "A Joyful Beginning to the Wedding Celebrations",
      date: "Saturday, 12 December 2026",
      time: "04:00 PM Onwards",
      venue: "Rathore Niwas Residence",
      dressCode: "Traditional Attire",
      description: "Join us for the auspicious Ghurchadi ceremony as we begin the wedding celebrations with joy, traditions and blessings.",
      iconName: "Sparkles",
      image: "assets/images/events/sangeet.jpg",
      accentColor: "#6c2c3e"
    },
    {
      id: "baraat-varmala",
      title: "The Royal Baraat & Varmala",
      subtitle: "Grand Procession & Sacred Garland Exchange",
      date: "Saturday, 12 December 2026",
      time: "10:00 PM",
      venue: "Klyde Banqueting Suite",
      dressCode: "Traditional Attire",
      description: "Witness the grand arrival of the groom followed by the magical Varmala ceremony, as Shivam and Muskan begin their beautiful journey together amidst love, joy and blessings.",
      iconName: "Crown",
      image: "assets/images/events/varmala.jpg",
      accentColor: "#8f3434"
    }
  ],

  story: [
    {
      id: "story-1",
      year: "The Beginning",
      title: "A Serendipitous Encounter",
      subtitle: "When paths aligned softly",
      quote: "Some conversations feel like finding a corner of the world you didn't know was missing.",
      description: "What began as an effortless conversation over warm cups of artisan chai turned into hours of shared ideas, quiet understanding, and an unspoken realization that life had just subtly, beautifully changed.",
      image: "assets/images/story/story-1.jpg",
      reverse: false
    },
    {
      id: "story-2",
      year: "The Journey",
      title: "Growing Together Through Every Season",
      subtitle: "From quiet glances to unwavering support",
      quote: "In each other, we discovered our truest companion and greatest cheerleader.",
      description: "Through bustling cities, shared travel adventures, career milestones, and the quiet comfort of simple evenings, our bond deepened with every season into a profound and steadfast partnership.",
      image: "assets/images/story/story-2.jpg",
      reverse: true
    },
    {
      id: "story-3",
      year: "The Promise",
      title: "Stepping Into Forever",
      subtitle: "With our hearts full of gratitude",
      quote: "Love is not just looking at each other, but walking side-by-side in the same direction.",
      description: "Surrounded by the gentle embrace of family and the blessings of the stars, we decided on forever. We cannot wait to begin our next chapter with the people who mean the world to us.",
      image: "assets/images/story/story-3.jpg",
      reverse: false
    }
  ],

  gallery: [
    {
      id: "g1",
      title: "Eternal Moments",
      aspect: "portrait",
      src: "assets/images/gallery/gallery-1.jpg",
      caption: "Framed in the serene evening warmth of the royal courtyard."
    },
    {
      id: "g2",
      title: "Quiet Radiance",
      aspect: "landscape",
      src: "assets/images/gallery/gallery-2.jpg",
      caption: "Laughter caught unawares — the purest kind of happiness."
    },
    {
      id: "g3",
      title: "The Regal Sanctum",
      aspect: "landscape",
      src: "assets/images/gallery/gallery-3.jpg",
      caption: "The majestic arched colonnades that will bear witness to our vows."
    },
    {
      id: "g4",
      title: "Sacred Intricacies",
      aspect: "portrait",
      src: "assets/images/gallery/gallery-4.jpg",
      caption: "The delicate touch of henna carrying ancient blessings of love."
    },
    {
      id: "g5",
      title: "Golden Hour Solitude",
      aspect: "portrait",
      src: "assets/images/gallery/gallery-5.jpg",
      caption: "Bathed in the amber twilight glow before the festivities begin."
    },
    {
      id: "g6",
      title: "Token of Eternity",
      aspect: "square",
      src: "assets/images/gallery/gallery-6.jpg",
      caption: "Two bands intertwined, symbolizing an unbreakable covenant."
    },
    {
      id: "g7",
      title: "Festive Joy",
      aspect: "landscape",
      src: "assets/images/gallery/gallery-7.jpg",
      caption: "A shower of fragrant marigold and rose petals blessing the couple."
    },
    {
      id: "g8",
      title: "The Serenade",
      aspect: "portrait",
      src: "assets/images/gallery/gallery-8.jpg",
      caption: "Melodies that echo through the corridors of memory."
    }
  ],

  audio: {
    src: "assets/audio/wedding-ambient.wav",
    title: "Sacred Harmony & Sitar Serenade",
    artist: "Acoustic Wedding Ensemble"
  }
};
