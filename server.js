const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = require('./db');

/* ---- Автозагрузка / генерация секрета в .env ---- */
function loadJwtSecret() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/^JWT_SECRET=(.+)$/m);
    if (match && match[1].trim()) return match[1].trim();
  }
  const generated = crypto.randomBytes(32).toString('hex');
  try {
    fs.writeFileSync(envPath, `JWT_SECRET=${generated}\n`, { flag: 'a' });
  } catch {}
  return generated;
}

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || loadJwtSecret();

/* ---- Заголовки безопасности и CORS ---- */
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

app.use(cors({
  origin(origin, cb) {
    // Разрешаем localhost, file:// и локальную Wi-Fi сеть (192.168.x.x / 10.x.x.x)
    if (!origin || origin === 'null' || /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/.test(origin)) {
      return cb(null, true);
    }
    return cb(new Error('CORS blocked'));
  }
}));

app.use(express.json({ limit: '50kb' }));

/* ---- Безопасная раздача только клиентских файлов (pulse.db и .env закрыты) ---- */
app.get(['/', '/index.html'], (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'styles.css')));
app.get('/app.js', (req, res) => res.sendFile(path.join(__dirname, 'app.js')));

/* ---- Rate Limiter (защита от брутфорса и спама) ---- */
const rateBuckets = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of rateBuckets) {
    if (v.resetAt <= now) rateBuckets.delete(k);
  }
}, 60_000).unref();

function checkRateLimit(key, maxHits, windowMs) {
  const now = Date.now();
  let entry = rateBuckets.get(key);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
    rateBuckets.set(key, entry);
  }
  entry.count++;
  return entry.count <= maxHits;
}

const uid = (p = 'id') => `${p}_${crypto.randomBytes(5).toString('hex')}`;

const CLASS_POOL = [
  { title: 'Йога & Flex', cat: 'mind', trainer: 'Елена Мартынова', room: 'Студия A', dur: 60, cap: 15 },
  { title: 'Кроссфит & Сила', cat: 'strength', trainer: 'Марат Сейтов', room: 'Зал B', dur: 50, cap: 12 },
  { title: 'Карате Do', cat: 'fight', trainer: 'Руслан Касымов', room: 'Додзё', dur: 60, cap: 14 },
  { title: 'Аэробика & Dance', cat: 'cardio', trainer: 'Алия Нурланова', room: 'Зал A', dur: 45, cap: 20 },
  { title: 'Аквафитнес', cat: 'water', trainer: 'Светлана Ким', room: 'Бассейн', dur: 45, cap: 18 }
];
const SLOT_TIMES = ['08:00', '10:00', '14:00', '18:00', '19:30', '21:00'];

const ensureScheduleTx = db.transaction((fromStr, toStr) => {
  const checkStmt = db.prepare('SELECT 1 FROM sessions WHERE date(start) = date(?) LIMIT 1');
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO sessions (id, title, cat, trainer, room, start, dur, cap)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const pad = n => String(n).padStart(2, '0');
  let cur = new Date(fromStr + 'T00:00:00');
  const end = new Date(toStr + 'T00:00:00');

  while (cur <= end) {
    const key = `${cur.getFullYear()}-${pad(cur.getMonth() + 1)}-${pad(cur.getDate())}`;
    if (!checkStmt.get(key)) {
      const daySeed = Math.floor(cur.getTime() / 864e5);
      SLOT_TIMES.forEach((time, i) => {
        const tpl = CLASS_POOL[(daySeed + i) % CLASS_POOL.length];
        insertStmt.run(`s_${key}_${i}`, tpl.title, tpl.cat, tpl.trainer, tpl.room, `${key}T${time}`, tpl.dur, tpl.cap);
      });
    }
    cur.setDate(cur.getDate() + 1);
  }
});

function seedData() {
  const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@pulse.kz');
  if (!adminExists) {
    const adminHash = bcrypt.hashSync('Admin#2026', 10);
    db.prepare(`
      INSERT INTO users (id, username, name, email, phone, role, status, membership, membership_until, salt, hash, created_at)
      VALUES ('u_admin', 'admin', 'Администратор PULSE', 'admin@pulse.kz', '+7 700 000 00 01', 'admin', 'active', 'vip', '2027-12-31', 'bcrypt', ?, ?)
    `).run(adminHash, new Date().toISOString());
  }

  const demoExists = db.prepare('SELECT id FROM users WHERE email = ?').get('demo@pulse.kz');
  if (!demoExists) {
    const demoHash = bcrypt.hashSync('Demo#2026', 10);
    db.prepare(`
      INSERT INTO users (id, username, name, email, phone, role, status, membership, membership_until, salt, hash, created_at)
      VALUES ('u_demo', 'demo', 'Алихан Сатыбалды', 'demo@pulse.kz', '+7 701 555 12 34', 'user', 'active', 'pro', '2026-12-15', 'bcrypt', ?, ?)
    `).run(demoHash, new Date().toISOString());
  }

  const revCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get().count;
  if (revCount === 0) {
    const insRev = db.prepare(`
      INSERT INTO reviews (id, user_id, user_name, rating, comment, created_at)
      VALUES (?, 'u_admin', ?, ?, ?, ?)
    `);
    insRev.run('r_seed_1', 'Даурен К.', 5, 'Удобно, что утром можно позаниматься на Бухар-Жырау без очередей к стойкам, а вечером заехать в сауну на Ерубаева.', '2026-11-10T12:00:00.000Z');
    insRev.run('r_seed_2', 'Айгерим Т.', 5, 'Чистые раздевалки, браслеты на шкафчиках и адекватная загрузка групп. Оплата через Kaspi при записи заняла 10 секунд.', '2026-11-12T18:30:00.000Z');
    insRev.run('r_seed_3', 'Максим В.', 4, 'Хороший парк тренажёров Technogym и 8 силовых рам. На кроссфите тренер Марат отлично ставит технику.', '2026-11-14T20:15:00.000Z');
  }
}
seedData();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return next();

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (!err) req.user = user;
    next();
  });
}

app.use(authenticateToken);

function formatUser(u) {
  return {
    id: u.id,
    username: u.username,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    status: u.status,
    frozen_until: u.frozen_until || null,
    membership: u.membership || 'none',
    membership_until: u.membership_until || null,
    createdAt: u.created_at
  };
}

/* ---- Атомарная транзакция бронирования (исключает овербукинг) ---- */
const createBookingTx = db.transaction(({ userId, sessionId, hall, trainer, plan, price }) => {
  const s = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  if (!s) throw { status: 404, message: 'Тренировка не найдена' };

  const booked = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE session_id = ? AND status = 'active'").get(sessionId).count;
  if (booked >= s.cap) throw { status: 409, message: 'Свободных мест не осталось' };

  const already = db.prepare("SELECT id FROM bookings WHERE session_id = ? AND user_id = ? AND status = 'active'").get(sessionId, userId);
  if (already) throw { status: 409, message: 'Вы уже записаны на эту тренировку' };

  const bookingId = uid('b');
  const finalHall = hall || 'PULSE Север (Утро)';
  const finalTrainer = trainer || s.trainer;

  db.prepare(`
    INSERT INTO bookings (id, user_id, session_id, hall, trainer, plan, price, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?)
  `).run(bookingId, userId, sessionId, finalHall, finalTrainer, plan || 'single', Number(price) || 0, new Date().toISOString());

  return {
    ...s,
    booked: booked + 1,
    mine: bookingId,
    bookedHall: finalHall,
    bookedTrainer: finalTrainer
  };
});

app.post('/api/dispatch', async (req, res) => {
  const { action, payload = {} } = req.body || {};
  const user = req.user;
  const ip = req.ip || 'local';

  // Общий лимит: 120 запросов в минуту с одного IP
  if (!checkRateLimit(`global:${ip}`, 120, 60_000)) {
    return res.status(429).json({ message: 'Слишком много запросов. Подождите минуту.' });
  }

  // Строгий лимит на вход, регистрацию и отзывы: 12 попыток за 5 минут
  if (['auth.login', 'auth.register', 'reviews.add'].includes(action)) {
    if (!checkRateLimit(`strict:${action}:${ip}`, 12, 5 * 60_000)) {
      return res.status(429).json({ message: 'Превышен лимит попыток. Повторите через 5 минут.' });
    }
  }

  try {
    switch (action) {
      case 'auth.register': {
        const { name, username, email, phone, password } = payload;
        const cleanEmail = String(email || '').trim().toLowerCase();
        const cleanUser = username ? String(username).trim().toLowerCase() : null;

        if (!cleanEmail || !password || String(password).length < 8) {
          return res.status(400).json({ message: 'Проверьте корректность e-mail и пароля' });
        }

        if (db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail)) {
          return res.status(409).json({ message: 'Этот e-mail уже зарегистрирован', field: 'email' });
        }
        if (cleanUser && db.prepare('SELECT id FROM users WHERE username = ?').get(cleanUser)) {
          return res.status(409).json({ message: 'Этот логин уже занят', field: 'username' });
        }

        const hash = await bcrypt.hash(String(password), 10);
        const userId = uid('u');

        db.prepare(`
          INSERT INTO users (id, username, name, email, phone, role, status, membership, salt, hash, created_at)
          VALUES (?, ?, ?, ?, ?, 'user', 'active', 'none', 'bcrypt', ?, ?)
        `).run(userId, cleanUser, String(name || '').trim(), cleanEmail, String(phone || '').trim(), hash, new Date().toISOString());

        const userData = formatUser(db.prepare('SELECT * FROM users WHERE id = ?').get(userId));
        const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token, user: userData });
      }

      case 'auth.login': {
        const { login, password } = payload;
        const cleanLogin = String(login || '').trim().toLowerCase();

        const u = db.prepare('SELECT * FROM users WHERE email = ? OR username = ?').get(cleanLogin, cleanLogin);
        if (!u) return res.status(401).json({ message: 'Неверный логин/e-mail или пароль' });

        const valid = await bcrypt.compare(String(password || ''), u.hash);
        if (!valid) return res.status(401).json({ message: 'Неверный логин/e-mail или пароль' });

        if (u.status === 'frozen') {
          const now = new Date().toISOString().slice(0, 10);
          if (u.frozen_until && u.frozen_until < now) {
            db.prepare("UPDATE users SET status = 'active', frozen_until = NULL WHERE id = ?").run(u.id);
            u.status = 'active';
          } else {
            return res.status(403).json({ message: `Аккаунт заморожен до ${u.frozen_until}` });
          }
        }

        if (u.status !== 'active') return res.status(403).json({ message: 'Аккаунт заблокирован' });

        const userData = formatUser(u);
        const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token, user: userData });
      }

      case 'auth.me': {
        if (!user) return res.status(401).json({ message: 'Сессия истекла' });
        const u = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
        if (!u) return res.status(401).json({ message: 'Пользователь не найден' });
        return res.json({ user: formatUser(u) });
      }

      case 'profile.update': {
        if (!user) return res.status(401).json({ message: 'Сессия истекла' });
        const { name, phone } = payload;
        db.prepare('UPDATE users SET name = ?, phone = ? WHERE id = ?').run(String(name || '').trim(), String(phone || '').trim(), user.id);
        return res.json({ user: formatUser(db.prepare('SELECT * FROM users WHERE id = ?').get(user.id)) });
      }

      case 'membership.buy': {
        if (!user) return res.status(401).json({ message: 'Войдите, чтобы оформить абонемент' });
        const { planId } = payload;
        if (!['start', 'pro', 'vip'].includes(planId)) return res.status(400).json({ message: 'Неизвестный тариф' });

        const until = new Date();
        until.setDate(until.getDate() + 30);
        const untilStr = until.toISOString().slice(0, 10);
        db.prepare('UPDATE users SET membership = ?, membership_until = ? WHERE id = ?').run(planId, untilStr, user.id);
        return res.json({ user: formatUser(db.prepare('SELECT * FROM users WHERE id = ?').get(user.id)) });
      }

      /* ---- Оптимизированный вывод расписания (3 запроса вместо N+1) ---- */
      case 'sessions.list': {
        const { from, to } = payload;
        ensureScheduleTx(from, to);

        const sessions = db.prepare(`
          SELECT * FROM sessions
          WHERE date(start) >= date(?) AND date(start) <= date(?)
          ORDER BY start ASC
        `).all(from, to);

        const countsRows = db.prepare(`
          SELECT b.session_id, COUNT(*) as count
          FROM bookings b
          JOIN sessions s ON s.id = b.session_id
          WHERE b.status = 'active' AND date(s.start) >= date(?) AND date(s.start) <= date(?)
          GROUP BY b.session_id
        `).all(from, to);
        const countsMap = new Map(countsRows.map(r => [r.session_id, r.count]));

        const mineMap = new Map();
        if (user) {
          const mineRows = db.prepare(`
            SELECT b.session_id, b.id, b.hall, b.trainer
            FROM bookings b
            JOIN sessions s ON s.id = b.session_id
            WHERE b.user_id = ? AND b.status = 'active' AND date(s.start) >= date(?) AND date(s.start) <= date(?)
          `).all(user.id, from, to);
          mineRows.forEach(r => mineMap.set(r.session_id, r));
        }

        const result = sessions.map(s => {
          const mine = mineMap.get(s.id);
          return {
            ...s,
            booked: countsMap.get(s.id) || 0,
            mine: mine ? mine.id : null,
            bookedHall: mine ? mine.hall : null,
            bookedTrainer: mine ? mine.trainer : null
          };
        });

        return res.json({ sessions: result });
      }

      case 'booking.create': {
        if (!user) return res.status(401).json({ message: 'Сессия истекла. Войдите снова' });
        const session = createBookingTx.immediate({
          userId: user.id,
          sessionId: payload.sessionId,
          hall: payload.hall,
          trainer: payload.trainer,
          plan: payload.plan,
          price: payload.price
        });
        return res.json({ session });
      }

      case 'booking.cancel': {
        if (!user) return res.status(401).json({ message: 'Сессия истекла' });
        const { bookingId } = payload;

        const b = db.prepare("SELECT * FROM bookings WHERE id = ? AND user_id = ? AND status = 'active'").get(bookingId, user.id);
        if (!b) return res.status(404).json({ message: 'Запись не найдена' });

        db.prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?").run(bookingId);
        const s = db.prepare('SELECT * FROM sessions WHERE id = ?').get(b.session_id);
        const booked = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE session_id = ? AND status = 'active'").get(s.id).count;

        return res.json({ session: { ...s, booked, mine: null, bookedHall: null, bookedTrainer: null } });
      }

      case 'bookings.mine': {
        if (!user) return res.status(401).json({ message: 'Сессия истекла' });
        const rows = db.prepare(`
          SELECT b.id as booking_id, b.hall, b.trainer as chosen_trainer, b.plan, b.price,
                 s.id, s.title, s.cat, s.trainer, s.room, s.start, s.dur, s.cap
          FROM bookings b
          JOIN sessions s ON s.id = b.session_id
          WHERE b.user_id = ? AND b.status = 'active'
          ORDER BY s.start ASC
        `).all(user.id);

        const items = rows.map(r => ({
          bookingId: r.booking_id,
          hall: r.hall,
          plan: r.plan,
          price: r.price,
          session: {
            id: r.id,
            title: r.title,
            cat: r.cat,
            trainer: r.chosen_trainer || r.trainer,
            room: r.hall ? `${r.hall} · ${r.room}` : r.room,
            start: r.start,
            dur: r.dur,
            cap: r.cap,
            mine: r.booking_id
          }
        }));
        return res.json({ items });
      }

      case 'reviews.list': {
        const reviews = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 30').all();
        return res.json({ reviews });
      }

      case 'reviews.add': {
        if (!user) return res.status(401).json({ message: 'Войдите, чтобы оставить отзыв' });
        const rNum = parseInt(payload.rating, 10);
        const text = String(payload.comment || '').trim().slice(0, 400);
        if (!rNum || rNum < 1 || rNum > 5) return res.status(400).json({ message: 'Укажите оценку от 1 до 5' });
        if (text.length < 5) return res.status(400).json({ message: 'Текст отзыва слишком короткий' });

        db.prepare(`
          INSERT INTO reviews (id, user_id, user_name, rating, comment, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(uid('r'), user.id, user.name, rNum, text, new Date().toISOString());

        const reviews = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 30').all();
        return res.json({ success: true, reviews });
      }

      case 'admin.users.freeze': {
        if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Недостаточно прав' });
        const freezeDate = new Date();
        freezeDate.setDate(freezeDate.getDate() + Math.max(1, Math.min(365, parseInt(payload.days, 10) || 7)));
        const untilStr = freezeDate.toISOString().slice(0, 10);

        db.prepare("UPDATE users SET status = 'frozen', frozen_until = ? WHERE id = ? AND role != 'admin'").run(untilStr, payload.userId);
        return res.json({ success: true, frozen_until: untilStr });
      }

      case 'admin.users.unfreeze': {
        if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Недостаточно прав' });
        db.prepare("UPDATE users SET status = 'active', frozen_until = NULL WHERE id = ?").run(payload.userId);
        return res.json({ success: true });
      }

      case 'admin.stats': {
        if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Недостаточно прав' });
        const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'user'").get().count;
        const totalBookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'active'").get().count;
        const cancelledBookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'cancelled'").get().count;
        const cancelRate = (totalBookings + cancelledBookings) > 0
          ? Math.round((cancelledBookings / (totalBookings + cancelledBookings)) * 100)
          : 0;
        return res.json({ kpi: { users: totalUsers, upcoming: totalBookings, load: Math.min(96, 64 + totalBookings * 2), cancelRate } });
      }

      case 'admin.users.list': {
        if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Недостаточно прав' });
        const users = db.prepare('SELECT id, username, name, email, phone, role, status, frozen_until, membership, membership_until, created_at as createdAt FROM users').all();
        return res.json({ users });
      }

      default:
        return res.status(404).json({ message: 'Метод не найден' });
    }
  } catch (err) {
    if (err && err.status) {
      return res.status(err.status).json({ message: err.message });
    }
    console.error('[Server Error]:', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

app.listen(PORT, () => console.log(`Сервер PULSE запущен: http://localhost:${PORT}`));