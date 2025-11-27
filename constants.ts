
import { Task, TaskType, Reward, Transaction } from './types';

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Survei Riset Pasar',
    description: 'Selesaikan survei singkat tentang kebiasaan belanja Anda.',
    reward: 18750,
    timeEstimate: '5 mnt',
    type: TaskType.SURVEY,
    difficulty: 'Easy',
    rating: 4.5,
    image: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: 't2',
    title: 'Instal & Buka: Raid Legends',
    description: 'Unduh aplikasi dan capai level 5 untuk mendapatkan hadiah.',
    reward: 187500,
    timeEstimate: '30 mnt',
    type: TaskType.GAME,
    difficulty: 'Medium',
    rating: 4.8,
    image: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: 't3',
    title: 'Jajak Pendapat Gadget',
    description: 'Bagikan pendapat Anda tentang smartphone terbaru.',
    reward: 12000,
    timeEstimate: '3 mnt',
    type: TaskType.SURVEY,
    difficulty: 'Easy',
    rating: 4.2,
    image: 'https://picsum.photos/100/100?random=3'
  },
  {
    id: 't4',
    title: 'Tonton Trailer Film',
    description: 'Tonton trailer 2 menit untuk film blockbuster mendatang.',
    reward: 2500,
    timeEstimate: '2 mnt',
    type: TaskType.VIDEO,
    difficulty: 'Easy',
    rating: 3.9,
    image: 'https://picsum.photos/100/100?random=4'
  },
  {
    id: 't5',
    title: 'Crypto Trader Pro',
    description: 'Daftar dan lakukan perdagangan pertama Anda.',
    reward: 675000,
    timeEstimate: '2 hari',
    type: TaskType.APP_DOWNLOAD,
    difficulty: 'Hard',
    rating: 4.9,
    image: 'https://picsum.photos/100/100?random=5'
  },
  {
    id: 't6',
    title: 'Uji Aplikasi Kebugaran',
    description: 'Uji aplikasi kebugaran ini selama 10 menit.',
    reward: 37500,
    timeEstimate: '10 mnt',
    type: TaskType.APP_DOWNLOAD,
    difficulty: 'Medium',
    rating: 4.0,
    image: 'https://picsum.photos/100/100?random=6'
  },
  {
    id: 't7',
    title: 'Survei Makanan Cepat Saji',
    description: 'Berikan opini Anda tentang restoran favorit.',
    reward: 22500,
    timeEstimate: '7 mnt',
    type: TaskType.SURVEY,
    difficulty: 'Easy',
    rating: 4.3,
    image: 'https://picsum.photos/100/100?random=20'
  },
  {
    id: 't8',
    title: 'Mainkan: Galaxy Wars',
    description: 'Capai markas level 10 dalam waktu 7 hari.',
    reward: 375000,
    timeEstimate: '7 hari',
    type: TaskType.GAME,
    difficulty: 'Hard',
    rating: 4.7,
    image: 'https://picsum.photos/100/100?random=21'
  },
  {
    id: 't9',
    title: 'VPN Secure: Uji Coba',
    description: 'Mulai uji coba gratis 7 hari (pengguna baru saja).',
    reward: 75000,
    timeEstimate: '5 mnt',
    type: TaskType.APP_DOWNLOAD,
    difficulty: 'Medium',
    rating: 4.1,
    image: 'https://picsum.photos/100/100?random=22'
  },
  {
    id: 't10',
    title: 'Kuis Pengetahuan Umum',
    description: 'Jawab 20 pertanyaan dengan benar 100%.',
    reward: 7500,
    timeEstimate: '4 mnt',
    type: TaskType.GAME,
    difficulty: 'Easy',
    rating: 3.8,
    image: 'https://picsum.photos/100/100?random=23'
  },
  {
    id: 't11',
    title: 'Daftar Bank Digital',
    description: 'Buka akun dan verifikasi ID Anda.',
    reward: 450000,
    timeEstimate: '15 mnt',
    type: TaskType.APP_DOWNLOAD,
    difficulty: 'Hard',
    rating: 4.6,
    image: 'https://picsum.photos/100/100?random=24'
  },
  {
    id: 't12',
    title: 'Survei Perjalanan',
    description: 'Ceritakan pengalaman liburan terakhir Anda.',
    reward: 30000,
    timeEstimate: '12 mnt',
    type: TaskType.SURVEY,
    difficulty: 'Medium',
    rating: 4.4,
    image: 'https://picsum.photos/100/100?random=25'
  },
  {
    id: 't13',
    title: 'E-Wallet Plus',
    description: 'Upgrade akun E-Wallet ke Premium.',
    reward: 52500,
    timeEstimate: '10 mnt',
    type: TaskType.APP_DOWNLOAD,
    difficulty: 'Medium',
    rating: 4.5,
    image: 'https://picsum.photos/100/100?random=26'
  },
  {
    id: 't14',
    title: 'Survei Politik 2024',
    description: 'Pendapat Anda tentang pemilu mendatang.',
    reward: 26500,
    timeEstimate: '8 mnt',
    type: TaskType.SURVEY,
    difficulty: 'Medium',
    rating: 4.1,
    image: 'https://picsum.photos/100/100?random=27'
  },
  {
    id: 't15',
    title: 'Kingdom Rise',
    description: 'Selesaikan tutorial dan rekrut 5 hero.',
    reward: 63000,
    timeEstimate: '20 mnt',
    type: TaskType.GAME,
    difficulty: 'Medium',
    rating: 4.3,
    image: 'https://picsum.photos/100/100?random=28'
  },
  {
    id: 't16',
    title: 'Review Produk Skincare',
    description: 'Tulis review jujur tentang produk perawatan wajah.',
    reward: 13500,
    timeEstimate: '5 mnt',
    type: TaskType.SURVEY,
    difficulty: 'Easy',
    rating: 4.0,
    image: 'https://picsum.photos/100/100?random=29'
  },
  {
    id: 't17',
    title: 'Trading Saham Pemula',
    description: 'Deposit minimal $10 di aplikasi trading ini.',
    reward: 225000,
    timeEstimate: '15 mnt',
    type: TaskType.APP_DOWNLOAD,
    difficulty: 'Hard',
    rating: 4.8,
    image: 'https://picsum.photos/100/100?random=30'
  },
  {
    id: 't18',
    title: 'Puzzle Master',
    description: 'Selesaikan level 50 tanpa bantuan.',
    reward: 120000,
    timeEstimate: '2 jam',
    type: TaskType.GAME,
    difficulty: 'Hard',
    rating: 4.2,
    image: 'https://picsum.photos/100/100?random=31'
  },
  {
    id: 't19',
    title: 'Langganan Musik Streaming',
    description: 'Daftar paket keluarga (bulan pertama gratis).',
    reward: 97500,
    timeEstimate: '5 mnt',
    type: TaskType.APP_DOWNLOAD,
    difficulty: 'Medium',
    rating: 4.4,
    image: 'https://picsum.photos/100/100?random=32'
  },
  {
    id: 't20',
    title: 'Survei Kendaraan Bermotor',
    description: 'Apakah Anda berencana membeli mobil baru?',
    reward: 16500,
    timeEstimate: '4 mnt',
    type: TaskType.SURVEY,
    difficulty: 'Easy',
    rating: 3.9,
    image: 'https://picsum.photos/100/100?random=33'
  },
  {
    id: 't21',
    title: 'Belajar Bahasa Asing',
    description: 'Selesaikan 3 pelajaran pertama di aplikasi ini.',
    reward: 34000,
    timeEstimate: '20 mnt',
    type: TaskType.APP_DOWNLOAD,
    difficulty: 'Easy',
    rating: 4.6,
    image: 'https://picsum.photos/100/100?random=34'
  },
  {
    id: 't22',
    title: 'Zombie Survival',
    description: 'Bertahan hidup selama 10 malam dalam game.',
    reward: 270000,
    timeEstimate: '3 hari',
    type: TaskType.GAME,
    difficulty: 'Hard',
    rating: 4.7,
    image: 'https://picsum.photos/100/100?random=35'
  }
];

export const MOCK_REWARDS: Reward[] = [
  { id: 'r1', name: 'PayPal', minAmount: 75000, image: 'https://picsum.photos/200/200?random=10', color: 'bg-blue-600' },
  { id: 'r2', name: 'Bitcoin', minAmount: 150000, image: 'https://picsum.photos/200/200?random=11', color: 'bg-orange-500' },
  { id: 'r3', name: 'Kartu Hadiah Amazon', minAmount: 75000, image: 'https://picsum.photos/200/200?random=12', color: 'bg-yellow-600' },
  { id: 'r4', name: 'Ethereum', minAmount: 225000, image: 'https://picsum.photos/200/200?random=13', color: 'bg-indigo-600' },
  { id: 'r5', name: 'Visa Prepaid', minAmount: 300000, image: 'https://picsum.photos/200/200?random=14', color: 'bg-blue-800' },
  { id: 'r6', name: 'Steam Wallet', minAmount: 150000, image: 'https://picsum.photos/200/200?random=15', color: 'bg-slate-700' },
  { id: 'r7', name: 'Gopay / OVO', minAmount: 75000, image: 'https://picsum.photos/200/200?random=16', color: 'bg-green-600' },
  { id: 'r8', name: 'Dana', minAmount: 75000, image: 'https://picsum.photos/200/200?random=17', color: 'bg-blue-500' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', type: 'EARN', amount: 18750, description: 'Menyelesaikan Survei #293', date: '2023-10-25', status: 'COMPLETED' },
  { id: 'tx2', type: 'EARN', amount: 7500, description: 'Bonus Harian', date: '2023-10-24', status: 'COMPLETED' },
  { id: 'tx3', type: 'WITHDRAW', amount: -150000, description: 'Penarikan PayPal', date: '2023-10-20', status: 'COMPLETED' },
  { id: 'tx4', type: 'EARN', amount: 225000, description: 'Tugas: Raid Legends', date: '2023-10-18', status: 'COMPLETED' },
];
