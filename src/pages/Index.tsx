import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/6adee1cd-5caa-4d4a-96ad-0526c2884609/files/d6a47f04-6536-456d-a638-511929f72904.jpg';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const plans = [
  {
    kcal: 1500,
    name: 'Сушка и рельеф',
    meals: '3 блюда в день',
    desc: '',
    old: '9 100',
    price: '7 735',
    popular: false,
  },
  {
    kcal: 2000,
    name: 'Баланс и форма',
    meals: '4 блюда в день',
    desc: '',
    old: '11 500',
    price: '9 775',
    popular: true,
  },
  {
    kcal: 2500,
    name: 'Набор массы',
    meals: '5 блюд в день',
    desc: '',
    old: '14 000',
    price: '11 900',
    popular: false,
  },
];

const problems = [
  {
    icon: 'ChefHat',
    title: 'Кухонное рабство',
    text: 'Готовка сжирает до 5 часов выходных. К среде грудка сухая, и вы срываетесь на фастфуд.',
  },
  {
    icon: 'Droplet',
    title: 'Скрытый жир',
    text: 'Еда из супермаркетов перенасыщена дешёвым маслом и соусами. Вы перебираете по жирам и топчетесь на месте.',
  },
  {
    icon: 'Truck',
    title: 'Логистический хаос',
    text: 'Fresh-доставки привязывают к курьерам в 7 утра. Уехали на выходные — еда киснет, деньги сгорают.',
  },
];

const steps = [
  { icon: 'PackageCheck', title: 'Доставка 1 раз в неделю', text: 'Принимаете коробку в удобное время — без ежедневной гонки.' },
  { icon: 'Snowflake', title: 'Одна полка морозилки', text: 'Компактная коробка на 21 лоток занимает всего одну полку.' },
  { icon: 'Microwave', title: '3 минуты до готовности', text: 'Разогрели в микроволновке — ресторанный вкус и сочность.' },
];

const faq = [
  { q: 'Как еда сохраняет вкус после заморозки?', a: 'Шок −40°C замораживает блюдо за минуты. Вода превращается в микрокристаллы, которые не повреждают клетки. После разогрева сок остаётся внутри, а 95% витаминов сохраняются.' },
  { q: 'Насколько точный КБЖУ?', a: 'Меню разработано спортивным технологом по ГОСТу и рекомендовано фитнес-тренерами. Честный КБЖУ без сахара, жирных соусов и лишнего масла.' },
  { q: 'Что если планы изменились?', a: 'Еда хранится в морозилке и не испортится. Достаёте нужное блюдо тогда, когда удобно — ничего не киснет.' },
  { q: 'Сколько блюд в коробке?', a: 'Коробка на 21 лоток — это полноценное питание на неделю вперёд по выбранному тарифу.' },
];

const Index = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(28);
  const [weight, setWeight] = useState(75);
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState<'cut' | 'balance' | 'gain'>('balance');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);

  const result = useMemo(() => {
    // Формула Миффлина-Сан Жеора
    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * 175 - 5 * age + 5
      : 10 * weight + 6.25 * 163 - 5 * age - 161;
    const base = bmr * activity;
    const factor = goal === 'cut' ? 0.8 : goal === 'gain' ? 1.15 : 1;
    const kcal = Math.round((base * factor) / 50) * 50;
    const protein = Math.round(weight * (goal === 'gain' ? 2.2 : 2));
    const fat = Math.round((kcal * 0.25) / 9);
    const carbs = Math.round((kcal - protein * 4 - fat * 9) / 4);
    const plan = plans.reduce((a, b) =>
      Math.abs(b.kcal - kcal) < Math.abs(a.kcal - kcal) ? b : a
    );
    return { kcal, protein, fat, carbs, plan };
  }, [gender, age, weight, activity, goal]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-display font-bold text-xl tracking-wide">
            <Icon name="Snowflake" className="text-primary" size={22} />
            FROST<span className="text-primary">FUEL</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <button onClick={() => scrollTo('calc')} className="hover:text-primary transition-colors">Калькулятор</button>
            <button onClick={() => scrollTo('compare')} className="hover:text-primary transition-colors">Сравнение</button>
            <button onClick={() => scrollTo('plans')} className="hover:text-primary transition-colors">Тарифы</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-primary transition-colors">FAQ</button>
          </nav>
          <Button onClick={() => scrollTo('form')} className="font-semibold">
            Забронировать
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center clip-slant">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Фитнес-рацион" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="container relative pt-24 pb-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6 animate-fade-up">
              <Icon name="Zap" size={15} /> Шоковая заморозка −40°C
            </div>
            <h1 className="font-display font-bold uppercase leading-[0.95] text-5xl md:text-7xl mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Следишь за фигурой,<br />
              <span className="text-primary">но устал от готовки?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Готовые фитнес-рационы шоковой заморозки с честным КБЖУ. Доставим еду на неделю вперёд и гарантируем улучшение качества тела.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" onClick={() => scrollTo('plans')} className="text-base font-semibold glow h-13 px-7">
                Выбрать рацион под мою цель
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('calc')} className="text-base h-13 px-7 border-primary/40">
                Рассчитать КБЖУ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden whitespace-nowrap font-display font-semibold uppercase tracking-wider">
        <div className="animate-marquee inline-flex gap-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="inline-flex gap-8">
              <span>Честный КБЖУ</span><span>•</span>
              <span>Без сахара и лишнего масла</span><span>•</span>
              <span>95% витаминов сохранены</span><span>•</span>
              <span>Доставка 1 раз в неделю</span><span>•</span>
              <span>Готово за 3 минуты</span><span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section className="container py-24">
        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Проблема</p>
        <h2 className="font-display font-bold uppercase text-3xl md:text-5xl max-w-3xl mb-14 leading-tight">
          Почему обычное питание ломает ваш спортивный результат?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-destructive/15 text-destructive flex items-center justify-center mb-5">
                <Icon name={p.icon} size={24} />
              </div>
              <h3 className="font-display font-semibold text-xl uppercase mb-3">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="relative py-24 grid-bg border-y border-border">
        <div className="container">
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">Решение</p>
          <h2 className="font-display font-bold uppercase text-3xl md:text-5xl max-w-3xl mb-6 leading-tight">
            Сбалансированное питание на неделю в одной коробке
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-14 text-lg">
            Мы убрали ежедневную курьерскую гонку и скрытые калории. Повар готовит рационы по фитнес-стандартам, после чего еда отправляется в шкаф промышленной шоковой заморозки −40°C.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-border bg-card/80 backdrop-blur p-8">
                <span className="absolute top-6 right-6 font-display font-bold text-5xl text-primary/15">0{i + 1}</span>
                <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="font-display font-semibold text-xl uppercase mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="container py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Калькулятор КБЖУ</p>
          <h2 className="font-display font-bold uppercase text-3xl md:text-5xl leading-tight">
            Подбери тариф под свою цель
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-8">
            <div>
              <p className="font-semibold mb-3">Ваш пол</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: 'male', l: 'Мужской', i: 'Mars' },
                  { v: 'female', l: 'Женский', i: 'Venus' },
                ].map((g) => (
                  <button key={g.v} onClick={() => setGender(g.v as typeof gender)}
                    className={`rounded-xl border py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${gender === g.v ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                    <Icon name={g.i} size={18} /> {g.l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex justify-between font-semibold mb-3">
                <span>Ваш возраст</span><span className="text-primary">{age} лет</span>
              </label>
              <input type="range" min={16} max={70} value={age}
                onChange={(e) => setAge(+e.target.value)}
                className="w-full accent-primary cursor-pointer" />
            </div>
            <div>
              <label className="flex justify-between font-semibold mb-3">
                <span>Ваш вес</span><span className="text-primary">{weight} кг</span>
              </label>
              <input type="range" min={45} max={130} value={weight}
                onChange={(e) => setWeight(+e.target.value)}
                className="w-full accent-primary cursor-pointer" />
            </div>
            <div>
              <p className="font-semibold mb-3">Уровень активности</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: 1.2, l: 'Низкий' },
                  { v: 1.55, l: 'Средний' },
                  { v: 1.9, l: 'Высокий' },
                ].map((a) => (
                  <button key={a.v} onClick={() => setActivity(a.v)}
                    className={`rounded-xl border py-3 text-sm font-medium transition-colors ${activity === a.v ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                    {a.l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold mb-3">Спортивная цель</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: 'cut', l: 'Сушка', i: 'Flame' },
                  { v: 'balance', l: 'Форма', i: 'Activity' },
                  { v: 'gain', l: 'Масса', i: 'Dumbbell' },
                ].map((g) => (
                  <button key={g.v} onClick={() => setGoal(g.v as typeof goal)}
                    className={`rounded-xl border py-3 flex flex-col items-center gap-1.5 text-sm font-medium transition-colors ${goal === g.v ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                    <Icon name={g.i} size={20} /> {g.l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-primary/5 p-8 flex flex-col glow">
            <p className="text-muted-foreground text-sm mb-1">Ваша дневная норма</p>
            <div className="font-display font-bold text-6xl text-primary mb-6">
              {result.kcal} <span className="text-2xl text-foreground">ккал</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { l: 'Белки', v: result.protein },
                { l: 'Жиры', v: result.fat },
                { l: 'Углеводы', v: result.carbs },
              ].map((m) => (
                <div key={m.l} className="rounded-xl bg-background/60 border border-border p-4 text-center">
                  <div className="font-display font-bold text-2xl">{m.v}<span className="text-sm text-muted-foreground">г</span></div>
                  <div className="text-xs text-muted-foreground mt-1">{m.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-auto rounded-xl bg-primary/10 border border-primary/30 p-5">
              <p className="text-sm text-muted-foreground mb-1">Рекомендуем тариф</p>
              <p className="font-display font-bold text-2xl uppercase mb-1">{result.plan.kcal} ккал · {result.plan.name}</p>
              <p className="text-sm text-muted-foreground">{result.plan.meals}</p>
            </div>
            <Button onClick={() => scrollTo('form')} className="mt-6 h-12 font-semibold">
              Забронировать этот тариф
              <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="relative py-24 grid-bg border-y border-border">
        <div className="container">
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">Сравнение</p>
          <h2 className="font-display font-bold uppercase text-3xl md:text-5xl max-w-3xl mb-14 leading-tight">
            В чём отличие от привычных альтернатив?
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Обычная кулинария', text: 'Мало белка, много скрытых жиров, размытый КБЖУ', bad: true },
              { name: 'Fresh-доставки каждые 2 дня', text: 'Дорого, привязка к курьерам, еда быстро киснет', bad: true },
              { name: 'FROST FUEL', text: 'Честный КБЖУ, доставка 1 раз в неделю, выгоднее, хранится без риска испортиться', bad: false },
            ].map((r) => (
              <div key={r.name}
                className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-6 rounded-2xl border p-6 ${r.bad ? 'border-border bg-card' : 'border-primary/50 bg-primary/10 glow'}`}>
                <div className={`flex items-center gap-3 md:w-72 shrink-0 font-display font-semibold text-lg uppercase ${r.bad ? '' : 'text-primary'}`}>
                  <Icon name={r.bad ? 'X' : 'Star'} size={22} className={r.bad ? 'text-destructive' : 'text-primary'} />
                  {r.name}
                </div>
                <p className={r.bad ? 'text-muted-foreground' : 'text-foreground'}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="container py-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Тарифы</p>
          <h2 className="font-display font-bold uppercase text-3xl md:text-5xl leading-tight mb-4">
            Меню высокой точности
          </h2>
          <p className="text-muted-foreground">
            Разработано спортивным технологом по ГОСТу и рекомендовано фитнес-тренерами. Скидка 15% на старте.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((p) => (
            <div key={p.kcal}
              className={`relative rounded-2xl border p-8 flex flex-col ${p.popular ? 'border-primary bg-gradient-to-b from-primary/10 to-card glow md:-translate-y-4' : 'border-border bg-card'}`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  Выбор тренеров
                </span>
              )}
              <div className="font-display font-bold text-4xl uppercase mb-1">{p.kcal} <span className="text-lg text-muted-foreground">ккал</span></div>
              <p className="font-semibold text-primary mb-1">{p.name}</p>
              <p className="text-sm text-muted-foreground mb-6">{p.meals}{p.desc ? ` · ${p.desc}` : ''}</p>
              <div className="mb-6">
                <span className="text-muted-foreground line-through mr-2">{p.old} ₽</span>
                <span className="font-display font-bold text-3xl">{p.price} ₽</span>
                <span className="text-sm text-muted-foreground"> / 7 дней</span>
              </div>
              <Button onClick={() => scrollTo('form')} variant={p.popular ? 'default' : 'outline'}
                className={`mt-auto h-12 font-semibold ${p.popular ? '' : 'border-primary/40'}`}>
                Выбрать тариф
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="relative py-24 grid-bg border-t border-border">
        <div className="container max-w-2xl">
          <div className="rounded-3xl border border-primary/40 bg-card p-8 md:p-12 glow">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Icon name="Lock" size={15} /> Осталось 5 слотов
            </div>
            <h2 className="font-display font-bold uppercase text-3xl md:text-4xl leading-tight mb-4">
              Закрытый тест-драйв первой партии по себестоимости
            </h2>
            <p className="text-muted-foreground mb-8">
              Оставьте заявку — бесплатно поможем рассчитать КБЖУ под вашу цель с технологом и забронируем один из 5 слотов на тестовую неделю со скидкой.
            </p>
            {sent ? (
              <div className="rounded-2xl bg-primary/15 border border-primary/40 p-8 text-center">
                <Icon name="CircleCheck" size={44} className="text-primary mx-auto mb-3" />
                <p className="font-display font-semibold text-xl uppercase">Заявка принята!</p>
                <p className="text-muted-foreground mt-1">Мы свяжемся с вами и забронируем слот.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-4">
                <Input required placeholder="Ваше имя" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-13 bg-background border-border" />
                <Input required placeholder="Телефон или ссылка на Telegram" value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="h-13 bg-background border-border" />
                <Button type="submit" size="lg" className="w-full h-14 font-semibold text-base glow">
                  Забронировать тестовую неделю по себестоимости
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">FAQ</p>
          <h2 className="font-display font-bold uppercase text-3xl md:text-5xl leading-tight">
            Частые вопросы
          </h2>
        </div>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display font-semibold text-lg uppercase hover:text-primary hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-foreground">
            <Icon name="Snowflake" className="text-primary" size={20} />
            FROST<span className="text-primary">FUEL</span>
          </div>
          <p>© 2026 FROST FUEL. Фитнес-рационы шоковой заморозки.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;