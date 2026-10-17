import { days } from './schedule'

export const courseGroups = [
  {
    id: 'yoga',
    title: 'Yoga',
    motif: 'breath',
    courses: [
      'Hatha Yoga',
      'Vinyasa Yoga',
      'Hatha Vinyasa Krama',
      'Ananda Yoga',
      'Ratna Yoga',
      'Rocket Yoga',
      'Yoga gentile',
      'Yoga posturale',
    ],
  },
  {
    id: 'maternita',
    title: 'Maternità',
    motif: 'duo',
    courses: ['Yoga in gravidanza', 'Yoga Mamma & Baby'],
  },
  {
    id: 'movimento',
    title: 'Movimento',
    motif: 'wave',
    courses: ['Pilates Mat', 'Yoga & Pilates', 'Tai Chi'],
  },
  {
    id: 'mente',
    title: 'Mente e respiro',
    motif: 'rings',
    courses: ['Meditazione consapevole', 'Mindfulness e benessere', 'Yoga della risata'],
  },
]

// Times of day the courses page can filter by, from each class's start time
export const timeBands = [
  { id: 'mattina', label: 'Mattina', from: 0, to: 12 },
  { id: 'pranzo', label: 'Pausa pranzo', from: 12, to: 15 },
  { id: 'pomeriggio', label: 'Pomeriggio', from: 15, to: 18 },
  { id: 'sera', label: 'Sera', from: 18, to: 24 },
]

// Timetable names that differ from the course list. These are a best guess, still to be
// confirmed by the studio. "Morning Yoga" (Tuesday) matches no course.
const timetableAliases = {
  'Hatha Vinyasa Yoga': 'Hatha Vinyasa Krama',
  'Ananda Hatha Yoga': 'Ananda Yoga',
  'Vinyasa Flow Yoga': 'Vinyasa Yoga',
}

function bandsOf(course) {
  const hours = days
    .flatMap(({ classes }) => classes)
    .filter(({ name }) => (timetableAliases[name] ?? name) === course)
    .map(({ time }) => parseInt(time, 10))
  return timeBands.filter(({ from, to }) => hours.some((hour) => hour >= from && hour < to)).map(({ id }) => id)
}

// Every course on its own, with an id (e.g. "corso-yoga-mamma-baby"), its family and the
// times of day it runs
export const courses = courseGroups.flatMap(({ id, courses: names }) =>
  names.map((name) => ({
    id: `corso-${name.toLowerCase().replace(/[^a-z]+/g, '-')}`,
    name,
    group: id,
    bands: bandsOf(name),
  })),
)
