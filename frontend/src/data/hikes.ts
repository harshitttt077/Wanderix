export interface Trek {
    id: string;
    name: string;
    region: string;
    description: string;
    difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Challenging';
    durationDays: number;
    altitudeFt: number;
    price: number;
    bestMonth: string;
    imageUrl: string;
    featured?: boolean;
}

export const INDIAN_TREKS: Trek[] = [
    {
        id: 'kedarnath',
        name: 'Kedarnath Trek',
        region: 'Uttarakhand',
        description: 'A spiritual journey to the abode of Lord Shiva. This trek takes you through majestic peaks and lush green valleys, ending at the sacred Kedarnath Temple.',
        difficulty: 'Moderate',
        durationDays: 4,
        altitudeFt: 11755,
        price: 9500,
        bestMonth: 'May - Oct',
        imageUrl: '/assets/images/trek-kedarnath.png',
        featured: true
    },
    {
        id: 'valley-of-flowers',
        name: 'Valley of Flowers',
        region: 'Uttarakhand',
        description: 'A World Heritage Site known for its meadows of endemic alpine flowers and the variety of flora. A paradise for nature lovers and photographers.',
        difficulty: 'Easy',
        durationDays: 6,
        altitudeFt: 12139,
        price: 12000,
        bestMonth: 'July - Sept',
        imageUrl: '/assets/images/trek-valley.png',
        featured: true
    },
    {
        id: 'hampta-pass',
        name: 'Hampta Pass',
        region: 'Himachal Pradesh',
        description: 'A dramatic crossover trek from the lush green valleys of Kullu to the arid deserts of Spiti. Experience two diverse worlds in one trek.',
        difficulty: 'Moderate',
        durationDays: 5,
        altitudeFt: 14010,
        price: 11500,
        bestMonth: 'June - Sept',
        imageUrl: '/assets/images/trek-hampta.png',
        featured: true
    },
    {
        id: 'roopkund',
        name: 'Roopkund Trek',
        region: 'Uttarakhand',
        description: 'The mysterious Skeleton Lake. A high-altitude trek offering panoramic views of Trishul and Nanda Ghunti peaks.',
        difficulty: 'Difficult',
        durationDays: 8,
        altitudeFt: 16499,
        price: 14500,
        bestMonth: 'May - June',
        imageUrl: '/assets/images/trek-roopkund.png'
    },
    {
        id: 'kashmir-great-lakes',
        name: 'Kashmir Great Lakes',
        region: 'Kashmir',
        description: 'arguably the most beautiful trek in India. Witness seven alpine lakes, maple forests, and high-altitude passes.',
        difficulty: 'Moderate',
        durationDays: 7,
        altitudeFt: 13750,
        price: 18000,
        bestMonth: 'July - Sept',
        imageUrl: '/assets/images/trek-kashmir.png',
        featured: true
    }
];
