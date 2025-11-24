import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Contacts = () => {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center gradient-text animate-fade-in">
            Контакты
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-12 animate-fade-in">
            Мы всегда на связи и готовы помочь
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-8 animate-fade-in hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Email</h3>
              </div>
              <p className="text-muted-foreground mb-2">Напишите нам на почту</p>
              <a href="mailto:support@applegiftcards.ru" className="text-primary hover:underline">
                support@applegiftcards.ru
              </a>
            </Card>

            <Card className="p-8 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <Icon name="MessageCircle" size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Telegram</h3>
              </div>
              <p className="text-muted-foreground mb-2">Быстрая поддержка в мессенджере</p>
              <a href="https://t.me/applegiftcards_support" className="text-primary hover:underline">
                @applegiftcards_support
              </a>
            </Card>

            <Card className="p-8 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Icon name="Phone" size={24} className="text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">Телефон</h3>
              </div>
              <p className="text-muted-foreground mb-2">Звонок бесплатный по России</p>
              <a href="tel:+78001234567" className="text-primary hover:underline text-lg">
                8 (800) 123-45-67
              </a>
            </Card>

            <Card className="p-8 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-destructive/20 rounded-full">
                  <Icon name="Clock" size={24} className="text-destructive" />
                </div>
                <h3 className="text-xl font-semibold">Время работы</h3>
              </div>
              <p className="text-muted-foreground">Поддержка работает круглосуточно</p>
              <p className="text-lg font-semibold mt-2">24/7</p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-start gap-4">
              <Icon name="HelpCircle" size={32} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-4">Часто задаваемые вопросы</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Как быстро я получу код?</h4>
                    <p className="text-muted-foreground">
                      Код выдаётся мгновенно после оплаты. Вы увидите его на экране и получите на email.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Где использовать код?</h4>
                    <p className="text-muted-foreground">
                      Код можно использовать в App Store, iTunes, Apple Music и других сервисах Apple.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Что делать, если код не работает?</h4>
                    <p className="text-muted-foreground">
                      Свяжитесь с нашей поддержкой любым удобным способом — мы поможем решить проблему.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

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

export default Contacts;
