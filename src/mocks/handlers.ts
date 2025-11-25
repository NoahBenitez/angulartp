// ============================================
import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET /api/products/:id/
  http.get('/api/products/:id', ({ params }) => {
    const { id } = params;
    
    const products = [
      { 
        id: 1, 
        name: 'Laptop Pro', 
        price: 1299, 
        image: '💻', 
        description: 'Ordinateur portable haute performance', 
        stock: 5,
        specs: ['Intel i7 12th Gen', '16GB RAM', '512GB SSD', 'RTX 3060'],
        category: 'Computing',
        warranty: '2 ans'
      },
      { 
        id: 2, 
        name: 'Smartphone X', 
        price: 899, 
        image: '📱', 
        description: 'Dernier smartphone avec écran OLED', 
        stock: 12,
        specs: ['5G', 'OLED 6.5"', '128GB', '50MP Camera'],
        category: 'Mobile',
        warranty: '1 an'
      },
      { 
        id: 3, 
        name: 'Casque Audio', 
        price: 299, 
        image: '🎧', 
        description: 'Réduction de bruit active', 
        stock: 8,
        specs: ['ANC', 'Bluetooth 5.2', '30h autonomie', 'USB-C'],
        category: 'Audio',
        warranty: '1 an'
      },
      { 
        id: 4, 
        name: 'Montre Connectée', 
        price: 399, 
        image: '⌚', 
        description: 'Suivi santé et fitness', 
        stock: 15,
        specs: ['GPS', 'Cardio', 'SpO2', 'Étanche 50m'],
        category: 'Wearables',
        warranty: '2 ans'
      },
      { 
        id: 5, 
        name: 'Tablette', 
        price: 599, 
        image: '📲', 
        description: 'Écran 11 pouces, stylet inclus', 
        stock: 0,
        specs: ['11" LCD', 'WiFi 6', '128GB', 'Stylet inclus'],
        category: 'Computing',
        warranty: '1 an'
      },
      { 
        id: 6, 
        name: 'Clavier Mécanique', 
        price: 149, 
        image: '⌨️', 
        description: 'RGB, switches mécaniques', 
        stock: 20,
        specs: ['Switches Cherry MX', 'RGB', 'USB-C', 'AZERTY'],
        category: 'Accessories',
        warranty: '2 ans'
      }
    ];

    const product = products.find(p => p.id === Number(id));
    
    if (product) {
      return HttpResponse.json(product);
    }
    
    return new HttpResponse(null, { status: 404 });
  }),

  // POST /api/cart/validate/
  http.post('/api/cart/validate', async ({ request }) => {
    const body = await request.json();
    const items = (body as any).items || [];

    const subtotal = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    );
    
    const tax = subtotal * 0.2; // TVA 20%
    const shipping = subtotal > 100 ? 0 : 9.99;
    const discount = (body as any).couponCode === 'SAVE10' ? subtotal * 0.1 : 0;
    const total = subtotal + tax + shipping - discount;

    return HttpResponse.json({
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
      currency: 'EUR'
    });
  }),

  // POST /api/order/
  http.post('/api/order', async ({ request }) => {
    const body = await request.json();
    const orderData = body as any;

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    return HttpResponse.json({
      orderNumber,
      status: 'confirmed',
      estimatedDelivery: deliveryDate.toLocaleDateString('fr-FR'),
      items: orderData.items,
      shippingAddress: orderData.address,
      total: orderData.total,
      trackingNumber: 'TRK-' + Math.random().toString(36).substr(2, 12).toUpperCase()
    }, { status: 201 });
  })
];