import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import type { Feature, Geometry } from 'geojson';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const img = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const sections = [
  ['about', 'О компании'], ['attractions', 'Аттракционы'], ['news', 'Новости'],
  ['geography', 'География проектов'], ['production', 'Производство'],
  ['partners', 'Партнёры'], ['parks', 'Парковые проекты'], ['contacts', 'Контакты'],
] as const;
const headerSections = [sections[0], sections[1], sections[4], sections[7]] as const;

const attractions = [
  { title: 'Колесо обозрения', kind: 'Семейные аттракционы', image: 'колесо-обозрения.jpg', note: 'Архитектурная доминанта и панорамный маршрут для гостей парка.' },
  { title: 'Гигантские качели 360°', kind: 'Экстремальные аттракционы', image: 'качели-с-переворотом-360.jpg', note: 'Маятниковая конструкция с полным переворотом и выразительным силуэтом.' },
  { title: 'Обзорная башня', kind: 'Семейные аттракционы', image: 'обзорная-башня.jpg', note: 'Вертикальное путешествие с видом на территорию и окрестности.' },
  { title: 'Автодром', kind: 'Семейные аттракционы', image: 'автодром.jpg', note: 'Классический формат для совместного отдыха и повторных заездов.' },
  { title: 'Цепочная карусель', kind: 'Экстремальные аттракционы', image: 'цепочная-карусель.jpg', note: 'Динамика, высота и узнаваемое движение в небе.' },
  { title: 'Тарелка', kind: 'Семейные аттракционы', image: 'тарелка.jpg', note: 'Энергичный аттракцион с круговым движением и эффектным обзором.' },
];

const news = [
  { date: '30 октября 2026', title: 'Гигантские качели 360 отправились в парк Кирова', text: 'Аттракцион изготовлен и направляется к месту установки; впереди монтаж, испытания и подготовка к запуску.', image: 'качели-с-переворотом-360.jpg', url: 'https://gorkiland.ru/novosti' },
  { date: '12 августа 2026', title: 'В парке «Сказочный бор» открылся «Колобок»', text: 'В Химках состоялось открытие экстремального аттракциона производства ГоркиLand.', image: 'news-boys.jpg', url: 'https://gorkiland.ru/novosti' },
  { date: '20 июня 2026', title: 'В парке «Орион» на ВДНХ открылись новые аттракционы', text: 'Команда ГоркиLand произвела и установила новые аттракционы для тематического парка.', image: 'news-event.png', url: 'https://gorkiland.ru/novosti' },
];

const projects = [
  { city: 'Владивосток', park: 'Минный городок', detail: 'Колесо обозрения · 55 м · открыто в 2026', coords: [131.8855, 43.1155] },
  { city: 'Москва', park: 'Орион · ВДНХ', detail: 'Гигантские качели 360° · Цепочная карусель', coords: [37.64, 55.83] },
  { city: 'Химки', park: 'Сказочный бор', detail: 'Семейный аттракцион «Колобок»', coords: [37.43, 55.89] },
  { city: 'Москва', park: 'Парк «Сказка»', detail: 'Колесо обозрения · 50 м', coords: [37.41, 55.69] },
  { city: 'Киров', park: 'Новый проект', detail: 'Гигантские качели 360° · готов к установке', coords: [49.66, 58.60] },
  { city: 'Губаха', park: 'Кластер Губаха', detail: 'Обзорная башня · проект', coords: [57.55, 58.84] },
];

const partners = ['ParkSeason Expo', 'Парк «Орион», ВДНХ', 'Парк «Сказочный бор»', 'Парк «Минный городок»', 'РАППА', 'САПИР', 'Парки Ижевска', 'Парк «Сказка»', 'Парк Горького', 'Сити Молл', 'Парковая инфраструктура', '«Седьмое небо»'];

function Icon({ name }: { name: 'arrow' | 'search' | 'menu' | 'close' | 'pin' }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  if (name === 'arrow') return <svg {...common}><path d="M4 12h15M13 5l7 7-7 7" /></svg>;
  if (name === 'search') return <svg {...common}><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4 4"/></svg>;
  if (name === 'pin') return <svg {...common}><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></svg>;
  if (name === 'close') return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>;
  return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');
  const submitSearch = (e: React.FormEvent) => { e.preventDefault(); const match = sections.find(([, label]) => label.toLowerCase().includes(query.toLowerCase())); if (match) document.getElementById(match[0])?.scrollIntoView({ behavior: 'smooth' }); };
  return <header className="site-header"><a className="skip-link" href="#main">Перейти к содержанию</a><nav className="nav-pill" aria-label="Основная навигация">
    <a className="nav-logo" href="#top" aria-label="ГоркиLand — на главную"><img src={img('gorkiland-logo.svg')} alt="ГоркиLand" /></a>
    <div className="nav-tools"><button className="icon-button search-button" aria-label="Поиск по сайту" aria-expanded={search} onClick={() => setSearch(current => { if (!current) setOpen(false); return !current; })}><Icon name="search" /></button><button className="icon-button mobile-menu" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} onClick={() => setOpen(current => { if (!current) setSearch(false); return !current; })}><Icon name={open ? 'close' : 'menu'} /></button><span className="nav-divider"/><div className="language-switch" aria-label="Выбор языка"><button className={`lang-button ${lang === 'RU' ? 'active' : ''}`} aria-pressed={lang === 'RU'} onClick={() => setLang('RU')}>RU</button><span aria-hidden="true">/</span><button className={`lang-button ${lang === 'EN' ? 'active' : ''}`} aria-label="English version coming soon" aria-pressed={lang === 'EN'} onClick={() => setLang('EN')}>EN</button></div></div>
    <div className={`nav-links ${open ? 'is-open' : ''}`} aria-hidden={!open}>{headerSections.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{label}</a>)}</div>
  </nav>{search && <form className="search-popover" onSubmit={submitSearch}><label htmlFor="site-search">Найти раздел</label><div><input id="site-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Например, производство" autoFocus/><button aria-label="Искать"><Icon name="search"/></button></div><small>{lang === 'EN' ? 'English version coming soon' : 'Поиск по разделам страницы'}</small></form>}{lang === 'EN' && <div className="language-note" role="status">Английская версия скоро появится</div>}</header>;
}

function Hero() {
  const title = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;
      gsap.from('.hero-title-line', { y: 34, opacity: 0, duration: 1.05, stagger: 0.16, ease: 'power3.out', delay: 0.25 });
      gsap.from('.hero-copy-left p, .hero-copy-right .button', { y: 18, opacity: 0, duration: 0.75, stagger: 0.12, delay: 0.75 });
      gsap.fromTo('.hero-image', { scale: 1.055 }, { scale: 1, duration: 2.4, ease: 'power2.out' });
    }, title);
    return () => ctx.revert();
  }, []);
  return <section className="hero" id="top" ref={title} aria-labelledby="hero-title"><div className="hero-image" style={{ backgroundImage: `url("${img('hero-wide.jpg')}")` }} role="img" aria-label="Аттракцион ГоркиLand на фоне голубого неба"/><div className="hero-wash"/><div className="hero-layout"><div className="hero-copy hero-copy-left"><h1 id="hero-title" className="hero-title"><span className="hero-title-line hero-left">От замысла</span><span className="sr-only"> до запуска</span></h1><p>Инженерно-производственная компания</p></div><div className="hero-copy hero-copy-right"><span className="hero-title-line hero-right" aria-hidden="true">до запуска</span><a className="button button-orange" href="#contacts">Рассчитать проект <Icon name="arrow"/></a></div></div></section>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: ReactNode; description?: ReactNode }) { return <div className="section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>{description && <p>{description}</p>}</div>; }

function BrandStatement() { return <section className="brand-statement" aria-label="Создаём аттракционы, которые становятся центром парка"><h2>Создаём<br/>аттракционы,<br/>которые<br/>становятся<br/>центром парка</h2></section>; }

function About() { return <section className="section about-section" id="about"><div className="section-wrap"><div className="about-grid"><div className="about-copy"><p className="large-copy">От первых эскизов<br className="about-and-break"/> и расчётов до монтажа<br className="about-and-break"/> и пусконаладки — команда проходит вместе с заказчиком весь путь.</p><p>Компания «ГоркиLand» развивает производство<br className="about-and-break"/> и инженерную экспертизу, чтобы создавать решения для парков разного масштаба<br className="about-and-break"/> и характера.</p><a className="text-link" href="https://gorkiland.ru/okompanii" target="_blank" rel="noreferrer">Подробнее о компании <Icon name="arrow"/></a><div className="about-fact"><span>01</span><p>Проектирование<br/>и конструкторская проработка</p><span>02</span><p>Изготовление<br/>и контрольная сборка</p><span>03</span><p>Монтаж<br/>и запуск на площадке</p></div></div><figure className="about-photo"><img src={img('производство-3.jpg')} alt="Специалист ГоркиLand работает на производстве" loading="lazy"/><figcaption>Производственная площадка ГоркиLand</figcaption></figure></div></div></section>; }

function Attractions() {
  const [active, setActive] = useState<number | null>(null);
  return <section className="section attractions-section" id="attractions"><div className="section-wrap"><SectionHeading eyebrow="Каталог решений" title="Аттракционы" description={<>Форматы, которые задают характер парка и работают<br/>на впечатление гостей.</>}/><div className="attraction-grid">{attractions.map((a, i) => <button className={`attraction-card ${active === i ? 'selected' : ''}`} key={a.title} onClick={() => setActive(active === i ? null : i)} aria-expanded={active === i}><span className="attraction-image"><img src={img(a.image)} alt="" loading="lazy"/><span className="card-index">0{i + 1}</span><span className="card-open">{active === i ? <Icon name="close"/> : <Icon name="arrow"/>}</span></span><span className="attraction-meta">{a.kind}</span><span className="attraction-title">{a.title}</span>{active === i && <span className="attraction-note">{a.note}<span className="text-link">Обсудить проект <Icon name="arrow"/></span></span>}</button>)}</div><div className="catalog-foot"><span>Выберите аттракцион, чтобы узнать больше</span><a className="text-link" href="#contacts">Запросить каталог <Icon name="arrow"/></a></div></div></section>;
}

function News() { return <section className="section news-section" id="news"><div className="section-wrap"><SectionHeading eyebrow="События и проекты" title="Новости производства и парков" description="Что происходит на площадках и в парках, где работают аттракционы ГоркиLand."/><div className="news-grid">{news.map((item, i) => <article className={`news-card news-${i + 1}`} key={item.title}><a href={item.url} target="_blank" rel="noreferrer" className="news-image" aria-label={`Открыть новость: ${item.title}`}><img src={img(item.image)} alt="" loading="lazy"/><span className="card-open"><Icon name="arrow"/></span></a><time>{item.date}</time><h3>{item.title}</h3><p>{item.text}</p><a className="text-link" href={item.url} target="_blank" rel="noreferrer">Читать новость <Icon name="arrow"/></a></article>)}</div><a className="button button-outline" href="https://gorkiland.ru/novosti" target="_blank" rel="noreferrer">Все новости <Icon name="arrow"/></a></div></section>; }

type Topology = { objects: { countries: { type: string; geometries: unknown[] } } };
function Geography() {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState('Все проекты');
  const russia = useMemo(() => {
    const topo = world as unknown as Topology;
    const collection = feature(topo as never, topo.objects.countries as never) as unknown as { features: Feature<Geometry>[] };
    return collection.features.find(f => String((f as Feature & { id?: string | number }).id) === '643');
  }, []);
  const projection = useMemo(() => geoMercator().center([93, 61]).scale(162).translate([490, 300]), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const filtered = filter === 'Все проекты' ? projects : projects.filter(p => p.detail.toLowerCase().includes(filter.toLowerCase()));
  return <section className="section geography-section" id="geography"><div className="section-wrap"><SectionHeading title="География проектов" description="Проекты ГоркиLand в городах России"/><div className="geo-layout"><div className="map-panel"><div className="map-controls"><span>Карта проектов</span><select aria-label="Фильтр проектов" value={filter} onChange={e => setFilter(e.target.value)}><option>Все проекты</option><option>открыто</option><option>установке</option></select></div><svg className="russia-map" viewBox="0 0 1000 520" role="group" aria-label="Интерактивная карта России"><defs><pattern id="mapdots" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#d4d4d4"/></pattern></defs>{russia && <path d={path(russia) || ''} fill="url(#mapdots)" stroke="#b8b8b8" strokeWidth="1.4" aria-hidden="true"/>}{filtered.map(p => { const xy = projection(p.coords as [number, number]); if (!xy) return null; const originalIndex = projects.indexOf(p); return <g key={p.park} className={`map-pin ${selected === originalIndex ? 'active' : ''}`} transform={`translate(${xy[0]},${xy[1]})`} onClick={() => setSelected(originalIndex)} role="button" tabIndex={0} aria-pressed={selected === originalIndex} aria-label={`${p.city}: ${p.park}`} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(originalIndex); }}><circle className="pin-halo" r="14"/><circle className="pin-dot" r="5"/></g>; })}</svg><div className="map-caption"><span><i/> Проекты ГоркиLand</span><span>Показаны отдельные объекты из публикаций компании</span></div></div><div className="project-list"><div className="project-list-top"><span>Города и проекты</span><span>0{filtered.length}</span></div>{filtered.map(p => { const idx = projects.indexOf(p); return <button key={p.park} onClick={() => setSelected(idx)} className={`project-row ${idx === selected ? 'active' : ''}`} aria-pressed={idx === selected}><span className="project-city">{p.city}</span><span className="project-place">{p.park}<small>{p.detail}</small></span><Icon name="arrow"/></button>; })}<a className="text-link" href="https://gorkiland.ru/novosti" target="_blank" rel="noreferrer">Подробнее о проектах <Icon name="arrow"/></a></div></div></div></section>;
}

function Production() { return <section className="production-section" id="production"><div className="production-image"><img src={img('laser-cutting.jpg')} alt="Лазерная резка металлической детали на производстве ГоркиLand" loading="lazy"/></div><div className="production-overlay"/><div className="production-content"><h2>Каждая деталь<br/>работает на<br/>впечатление</h2><p>Покажем, как идея проходит путь до готовой конструкции.</p><a className="button button-orange" href="#contacts">Записаться на экскурсию <Icon name="arrow"/></a></div></section>; }

function Partners() { const images=['parkseason-expo','orion','skazochnyi-bor','minny-gorodok','raappa','sapir','parki-izhevska','skazka','park-gorkogo','city-mall','park-infrastructure','sedmoe-nebo']; return <section className="section partners-section" id="partners"><div className="section-wrap"><SectionHeading title={<>Нас объединяет<br/>индустрия<br/>впечатлений</>} description="Наши партнёры"/><div className="partner-grid">{partners.map((name, i) => <div className={`partner-tile partner-${i + 1}`} key={name}><img src={img(`partner-${images[i]}.jpg`)} alt={name} loading="lazy"/></div>)}</div></div></section>; }

function Parks() { return <section className="section parks-section" id="parks"><div className="section-wrap"><div className="park-feature"><div className="park-image"><img src={img('park-concept.jpg')} alt="Концептуальная визуализация паркового пространства" loading="lazy"/></div><div className="park-copy"><h2>Пространство,<br/>в котором<br/>хочется<br/>остаться</h2><p>Объединяем аттракционы, маршруты и визуальные акценты в целостную идею парка.</p><a className="button button-orange" href="#contacts">Обсудить проект <Icon name="arrow"/></a><span className="park-caption">От идеи — к месту встреч и новых впечатлений</span></div></div></div></section>; }

function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState('');
  const submit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); const consent = e.currentTarget.elements.namedItem('consent') as HTMLInputElement | null; if (!name.trim() || phone.replace(/\D/g, '').length < 10) { setError('Укажите имя и корректный номер телефона.'); return; } if (!consent?.checked) { setError('Подтвердите согласие на обработку данных.'); return; } setError(''); setSubmitted(true); };
  return <section className="contacts-section" id="contacts"><div className="section-wrap"><div className="contacts-top"><div><h2>Создадим<br/>впечатление<br/>вместе?</h2></div><div className="contact-details"><span>Связаться напрямую</span><a href="tel:+78005059980">8 800 505-99-80</a><a href="mailto:sales@gorkiland.ru">sales@gorkiland.ru</a><address><Icon name="pin"/> Московская область, Истра,<br/>Красная Горка, ул. Заводская, 14</address></div></div><div className="contact-form-wrap"><form className="contact-form" onSubmit={submit} noValidate><label>Ваше имя<input required value={name} onChange={e => setName(e.target.value)} placeholder="Как к вам обращаться" autoComplete="name"/></label><label>Телефон<input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" inputMode="tel" autoComplete="tel"/></label><label className="form-project">Что планируете?<input value={project} onChange={e => setProject(e.target.value)} placeholder="Аттракцион, парк или расчёт проекта"/></label><label className="consent"><input type="checkbox" name="consent" required/> <span>Нажимая кнопку, вы соглашаетесь на обработку персональных данных для ответа на обращение.</span></label><button className="button button-orange" type="submit">Подготовить заявку <Icon name="arrow"/></button>{error && <p className="form-message error" role="alert">{error}</p>}{submitted && <p className="form-message" role="status">Данные проверены. Форма пока не подключена к отправке; позвоните нам по номеру <a href="tel:+78005059980">8 800 505-99-80</a> или напишите на <a href="mailto:sales@gorkiland.ru">sales@gorkiland.ru</a>.{project && <span className="sr-only"> Описание: {project}</span>}</p>}</form><div className="form-aside"><span className="form-number">01 / 03</span><p>Расскажите о площадке, сроках и задаче. Это поможет быстрее перейти к предметному разговору.</p><span className="form-motif" aria-hidden="true"/></div></div><footer className="site-footer"><a href="#top" className="footer-logo"><img src={img('gorkiland-logo-white.svg')} alt="ГоркиLand"/></a><span>© ГоркиLand · Инженерно-производственная компания</span><div><a href="https://gorkiland.ru/" target="_blank" rel="noreferrer">Официальный сайт</a><a href="tel:+78005059980">8 800 505-99-80</a></div></footer></div></section>;
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section-heading, .about-copy, .about-photo, .news-card, .project-list, .partner-tile, .park-copy').forEach(el => gsap.from(el, { y: 34, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
    });
    return () => ctx.revert();
  }, []);
  return <><Header/><main id="main"><Hero/><BrandStatement/><About/><Attractions/><News/><Geography/><Production/><Partners/><Parks/><Contacts/></main></>;
}
