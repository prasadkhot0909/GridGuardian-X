import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
)

ChartJS.defaults.font.family = "'Inter', sans-serif"
ChartJS.defaults.color = '#9fb2d4'

export const CHART_COLORS = {
  cyan: '#22d3ee',
  blue: '#3b82f6',
  violet: '#8b5cf6',
  success: '#34d399',
  warning: '#fbbf24',
  critical: '#fb7185',
  grid: 'rgba(159, 178, 212, 0.08)',
}

export const tooltipTheme = {
  backgroundColor: 'rgba(10, 16, 32, 0.95)',
  titleColor: '#eaf2ff',
  bodyColor: '#9fb2d4',
  borderColor: 'rgba(103, 232, 249, 0.25)',
  borderWidth: 1,
  padding: 10,
  cornerRadius: 10,
  titleFont: { family: "'JetBrains Mono', monospace", size: 12 },
  bodyFont: { family: "'JetBrains Mono', monospace", size: 11.5 },
  displayColors: true,
  boxPadding: 4,
}
