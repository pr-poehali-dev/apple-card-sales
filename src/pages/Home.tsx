import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import PhotoGallery from '@/components/PhotoGallery';
import { useState, useEffect } from 'react';

interface CardProduct {
  id: number;
  amount: number;
  price: number;
  description: string;
  available_count: number;
}

const cardProducts: CardProduct[] = [
  {
    id: 1,
    amount: 500,
    price: 500,
    description: 'Apple Gift Card на 500 рублей',
    available_count: 12,
  },
  {
    id: 2,
    amount: 1000,
    price: 1000,
    description: 'Apple Gift Card на 1000 рублей',
    available_count: 18,
  },
  {
    id: 3,
    amount: 3000,
    price: 3000,
    description: 'Apple Gift Card на 3000 рублей',
    available_count: 9,
  },
  {
    id: 4,
    amount: 5000,
    price: 5000,
    description: 'Apple Gift Card на 5000 рублей',
    available_count: 6,
  },
];

const RandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomNumber = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/6a21acd4-58ed-4aae-9a54-57c22e0efee6');
      const data = await response.json();
      setRandomNumber(data.number);
    } catch (error) {
      console.error('Ошибка загрузки случайного числа:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomNumber();
  }, []);

  return (
    <div className="mb-6 p-4 bg-card rounded-lg shadow-sm">
      <p className="text-lg text-muted-foreground mb-2">
        Случайное число дня:
      </p>
      <p className="text-4xl font-bold text-primary">
        {loading ? '...' : randomNumber}
      </p>
      <Button 
        onClick={fetchRandomNumber} 
        disabled={loading}
        variant="outline"
        size="sm"
        className="mt-3"
      >
        Получить новое
      </Button>
    </div>
  );
};

const Home = () => {
  const floatingIcons = [
    { name: 'Smartphone', delay: '0s', top: '20%', left: '15%' },
    { name: 'Headphones', delay: '1s', top: '30%', right: '20%' },
    { name: 'Laptop', delay: '0.5s', top: '60%', left: '10%' },
    { name: 'Watch', delay: '1.5s', top: '70%', right: '15%' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Apple" size={28} className="text-foreground" />
              <span className="text-xl font-semibold">Apple Gift Cards</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/payment" className="text-sm hover:text-primary transition-colors">
                Оплата
              </Link>
              <Link to="/contacts" className="text-sm hover:text-primary transition-colors">
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-destructive/20 opacity-30" />
        
        {floatingIcons.map((icon, i) => (
          <div
            key={i}
            className="absolute text-primary/30 animate-float"
            style={{
              top: icon.top,
              left: icon.left,
              right: icon.right,
              animationDelay: icon.delay,
            }}
          >
            <Icon name={icon.name} size={48} />
          </div>
        ))}

        <div className="container mx-auto text-center relative z-10 animate-fade-in">
          <img
            src="https://cdn.poehali.dev/projects/c7f22410-1cee-431a-a4c7-72eab64ec77f/files/b8de9db8-60b1-461e-92db-dfc91ff28603.jpg"
            alt="Динозавр в рождественском колпаке"
            className="w-64 h-64 mx-auto mb-8 object-cover rounded-full"
          />
          <RandomNumber />
          <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
            Apple Gift Cards
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Пополните баланс Apple и получите доступ ко всему контенту
          </p>
          <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90">
            Купить сейчас
          </Button>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
            Выберите номинал
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardProducts.map((card, index) => (
              <Link
                key={card.id}
                to={`/payment?cardId=${card.id}`}
                className="block animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="gradient-border hover:scale-105 transition-transform duration-300">
                  <Card className="gradient-border-inner p-8 text-center">
                    <div className="mb-4">
                      <Icon name="Gift" size={48} className="mx-auto text-primary animate-pulse-glow" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{card.amount}₽</h3>
                    <p className="text-muted-foreground text-sm mb-4">{card.description}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                      <Icon name="CheckCircle" size={16} className="text-green-500" />
                      <span>В наличии: {card.available_count}</span>
                    </div>
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
                      Купить за {card.price}₽
                    </Button>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-secondary/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'ShoppingCart', title: 'Выберите номинал', text: 'Выберите подходящую карту' },
              { icon: 'CreditCard', title: 'Оплатите', text: 'Безопасная оплата онлайн' },
              { icon: 'Zap', title: 'Получите код', text: 'Мгновенная выдача после оплаты' },
            ].map((step, i) => (
              <Card key={i} className="p-8 text-center animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="mb-4">
                  <Icon name={step.icon} size={48} className="mx-auto text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PhotoGallery />

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Apple" size={24} />
            <span className="font-semibold">Apple Gift Cards</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Все права защищены. Быстрая и безопасная покупка Apple карт.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;