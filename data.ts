export type Fabric = 'Kora' | 'Katan';
export type Occasion = 'Wedding' | 'Festival' | 'Gifting' | 'Party';

export interface Product {
  id: string;
  name: string;
  fabric: Fabric;
  occasion: Occasion[];
  price: number;
  image: string;
  description: string;
  isNew?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Royal Crimson Katan Silk Saree',
    fabric: 'Katan',
    occasion: ['Wedding', 'Festival'],
    price: 34500,
    image: 'https://images.unsplash.com/photo-1583391733959-f183063e527f?auto=format&fit=crop&q=80&w=800',
    description: 'An exquisitely handwoven Katan silk saree from the ghats of Banaras, featuring dense gold zari brocade work. Perfect for the traditional Indian bride.',
  },
  {
    id: 'p3',
    name: 'Ivory Gold Kora Banarasi Saree',
    fabric: 'Kora',
    occasion: ['Gifting', 'Festival'],
    price: 18500,
    image: 'https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?auto=format&fit=crop&q=80&w=800',
    description: 'Lightweight Kora silk woven with subtle gold threads. A pristine ivory hue making it an ideal sophisticated gift or morning puja attire.',
  },
  {
    id: 'p4',
    name: 'Midnight Blue Katan Brocade',
    fabric: 'Katan',
    occasion: ['Wedding', 'Party'],
    price: 38000,
    image: 'https://images.unsplash.com/photo-1584286595398-a59f21d02a11?auto=format&fit=crop&q=80&w=800',
    description: 'A masterpiece created over 40 days by master weavers. The midnight blue provides a striking canvas for the intricate floral gold zari.',
  },
  {
    id: 'p6',
    name: 'Antique Gold Kora Tissue',
    fabric: 'Kora',
    occasion: ['Wedding'],
    price: 27000,
    image: 'https://images.unsplash.com/photo-1621272036047-bc0bf1d8be89?auto=format&fit=crop&q=80&w=800',
    description: 'Woven with metallic tissue yarns, this Kora saree shines resplendently, making it a luxurious vintage-inspired choice.',
  }
];

