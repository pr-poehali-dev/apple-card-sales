import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CardProduct {
  id: number;
  amount: number;
  price: number;
  description: string;
}

const Payment = () => {
  const [searchParams] = useSearchParams();
  const cardId = searchParams.get('cardId');
  const [card, setCard] = useState<CardProduct | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [purchaseCode, setPurchaseCode] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (cardId) {
      fetch(`/api/cards/${cardId}`)
        .then(res => res.json())
        .then(setCard);
    }
  }, [cardId]);

  const handlePurchase = async () => {
    if (!email || !card) return;

    setLoading(true);
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: card.id, email, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setPurchaseCode(data.code);
        toast({
          title: 'Успешно!',
          description: 'Код карты получен',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось выполнить покупку',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при покупке',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Apple" size={28} className="text-foreground" />
              <span className="text-xl font-semibold">Apple Gift Cards</span>
            </Link>
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

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center gradient-text">Оформление покупки</h1>

          {purchaseCode ? (
            <Card className="p-8 text-center animate-fade-in">
              <div className="mb-6">
                <Icon name="CheckCircle" size={64} className="mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Покупка завершена!</h2>
                <p className="text-muted-foreground">Ваш код активации</p>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg mb-6">
                <code className="text-2xl font-mono gradient-text break-all">{purchaseCode}</code>
              </div>

              <div className="space-y-4 text-left text-sm text-muted-foreground mb-6">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0" />
                  <p>Код также был отправлен на ваш email: {email}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0" />
                  <p>Используйте код в App Store, iTunes или Apple Music</p>
                </div>
              </div>

              <Link to="/">
                <Button className="w-full rounded-full">Вернуться на главную</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {card && (
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{card.description}</h3>
                      <p className="text-sm text-muted-foreground">Номинал: {card.amount}₽</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold gradient-text">{card.price}₽</p>
                    </div>
                  </div>
                </Card>
              )}

              <Card className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Контактные данные</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="mt-2"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Код будет отправлен на этот email
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон (опционально)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (900) 123-45-67"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-secondary/50">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Zap" size={24} className="text-accent" />
                  <h3 className="font-semibold">Мгновенная выдача</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  После нажатия кнопки "Купить" вы сразу получите код активации карты на экране и на email.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Shield" size={16} className="text-green-500" />
                  <span>Безопасная покупка</span>
                </div>
              </Card>

              <Button
                onClick={handlePurchase}
                disabled={!email || !card || loading}
                className="w-full py-6 text-lg rounded-full bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" />
                    Обработка...
                  </>
                ) : (
                  <>
                    <Icon name="ShoppingCart" className="mr-2" />
                    Купить за {card?.price}₽
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
