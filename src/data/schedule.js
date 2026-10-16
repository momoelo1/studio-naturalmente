// Calendario corsi 2026-2027
export const days = [
  {
    id: 'lun',
    short: 'Lun',
    name: 'Lunedì',
    classes: [
      { time: '12:45 – 14:00', name: 'Hatha Vinyasa Yoga', teacher: 'Diana' },
      { time: '14:30 – 15:30', name: 'Pilates Mat', teacher: 'Paola' },
      { time: '18:00 – 19:15', name: 'Ratna Yoga', teacher: 'Daniela', online: true },
      { time: '19:30 – 20:30', name: 'Tai Chi', teacher: 'Francesco' },
      { time: '20:45 – 22:00', name: 'Meditazione consapevole', teacher: 'Loris' },
    ],
  },
  {
    id: 'mar',
    short: 'Mar',
    name: 'Martedì',
    classes: [
      { time: '07:15 – 08:15', name: 'Morning Yoga', teacher: 'Federica', online: true },
      { time: '12:45 – 13:45', name: 'Vinyasa Yoga', teacher: 'Maria', online: true },
      { time: '14:00 – 15:00', name: 'Yoga & Pilates', teacher: 'Maria' },
      { time: '19:00 – 20:00', name: 'Vinyasa Yoga', teacher: 'Federica', note: 'a Montanaso Lombardo' },
      { time: '19:30 – 20:30', name: 'Vinyasa Flow Yoga', teacher: 'Angelo' },
      { time: '20:45 – 22:15', name: 'Mindfulness e benessere', teacher: 'Eki' },
    ],
  },
  {
    id: 'mer',
    short: 'Mer',
    name: 'Mercoledì',
    classes: [
      { time: '09:20 – 10:20', name: 'Yoga gentile', teacher: 'Elena' },
      { time: '12:45 – 13:45', name: 'Hatha Yoga', teacher: 'Elena', online: true },
      { time: '18:00 – 19:00', name: 'Tai Chi', teacher: 'Francesco' },
      { time: '19:15 – 20:15', name: 'Hatha Yoga', teacher: 'Giulia', online: true },
      { time: '20:30 – 21:30', name: 'Vinyasa Yoga', teacher: 'Linda' },
    ],
  },
  {
    id: 'gio',
    short: 'Gio',
    name: 'Giovedì',
    classes: [
      { time: '14:30 – 15:30', name: 'Pilates Mat', teacher: 'Paola' },
      { time: '18:30 – 19:45', name: 'Ananda Hatha Yoga', teacher: 'Elena', online: true },
      { time: '20:00 – 21:00', name: 'Vinyasa Flow Yoga', teacher: 'Angelo' },
      { time: '21:10 – 22:10', name: 'Yoga della risata', teacher: 'Luisa' },
    ],
  },
  {
    id: 'ven',
    short: 'Ven',
    name: 'Venerdì',
    classes: [
      { time: '09:30 – 10:30', name: 'Yoga in gravidanza', teacher: 'Maria', note: 'gruppi in base alle esigenze' },
      { time: '10:45 – 11:45', name: 'Yoga Mamma & Baby', teacher: 'Maria', note: 'gruppi in base alle esigenze' },
      { time: '12:45 – 13:45', name: 'Vinyasa Yoga', teacher: 'Maria', online: true },
      { time: '17:30 – 18:30', name: 'Hatha Yoga', teacher: 'Giulia', online: true },
      { time: '18:45 – 19:45', name: 'Vinyasa Yoga', teacher: 'Linda' },
      { time: '20:00 – 21:00', name: 'Pilates Mat', teacher: 'Paola' },
    ],
  },
  {
    id: 'sab',
    short: 'Sab',
    name: 'Sabato',
    classes: [
      { time: '08:30 – 10:00', name: 'Rocket Yoga', teacher: 'Linda', note: 'ogni secondo sabato del mese' },
      { time: '08:45 – 09:45', name: 'Vinyasa Yoga', teacher: 'Emma e Alba', note: 'in alternanza' },
      { time: '18:30 – 19:30', name: 'Vinyasa Yoga', teacher: 'Emma e Alba', note: 'in alternanza' },
    ],
  },
  {
    id: 'dom',
    short: 'Dom',
    name: 'Domenica',
    classes: [],
    empty: 'La domenica è dedicata a masterclass, workshop ed eventi.',
  },
]
